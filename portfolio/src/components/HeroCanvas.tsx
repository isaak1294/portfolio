// components/HeroCanvas.tsx
"use client";

import { useEffect, useRef } from "react";

export default function HeroCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // --- Config knobs ---
        const BPM = 40;
        const SECONDS_PER_BEAT = 60 / BPM; // ~1.5s between spikes
        const LINE_WIDTH = 4; // px thickness of ECG trace
        const TRAIL_FADE = 0.03; // 0.03 = long trail, 0.15 = short trail
        const SCAN_SPEED = 250; // px/sec horizontal sweep speed

        // Animation state
        let headX = 0;
        let prevX = 0;
        let prevY = 0;

        let startBeatTime = performance.now() / 1000; // seconds
        let lastFrameTime = performance.now() / 1000; // seconds

        // We'll track canvas logical size locally so helpers can close over them
        let canvasWidth = 0;
        let canvasHeight = 0;

        // Helpers that depend on canvas size
        const baselineY = () => canvasHeight * 0.6;
        const spikeAmplitude = () => canvasHeight * 0.12;

        // Stylized heartbeat waveform: returns vertical offset from baseline in px
        function ecgWaveform(tSinceBeat: number): number {
            const amp = spikeAmplitude();

            // 0.00s-0.05s: baseline
            // 0.05s-0.07s: sharp upstroke
            // 0.07s-0.09s: dive below baseline
            // 0.09s-0.14s: rebound up toward baseline
            // >0.14s: rest at baseline
            if (tSinceBeat < 0.05) {
                return 0;
            } else if (tSinceBeat < 0.07) {
                const phase = (tSinceBeat - 0.05) / 0.02; // 0..1
                return amp * (0.2 + 0.8 * phase); // shoot up
            } else if (tSinceBeat < 0.09) {
                const phase = (tSinceBeat - 0.07) / 0.02; // 0..1
                return amp * (1.0 - 1.8 * phase); // cross zero, dip hard
            } else if (tSinceBeat < 0.14) {
                const phase = (tSinceBeat - 0.09) / 0.05; // 0..1
                return amp * (-0.8 + 0.8 * phase); // come back toward baseline
            } else {
                return 0;
            }
        }

        // Given "now" in seconds, compute the Y pixel position for the head
        function currentY(nowSec: number): number {
            const tSinceBeat = nowSec - startBeatTime;
            if (tSinceBeat > SECONDS_PER_BEAT) {
                // start a new beat cycle
                startBeatTime = nowSec;
            }

            const offset = ecgWaveform(nowSec - startBeatTime);
            // canvas y grows downward, so subtract offset
            return baselineY() - offset;
        }

        // Handle canvas sizing and reset pass
        function resizeCanvas() {
            canvasWidth = window.innerWidth;
            canvasHeight = window.innerHeight;

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            // Hard clear so we don't smear old pixels after resize
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            // Reset sweep positions
            headX = 0;
            prevX = 0;
            prevY = baselineY();
        }

        // Main animation loop
        let frameId: number;
        function loop() {
            const nowSec = performance.now() / 1000;
            const dt = nowSec - lastFrameTime;
            lastFrameTime = nowSec;

            // advance the sweep head
            headX += SCAN_SPEED * dt;

            // wrap sweep when we hit the right edge
            if (headX > canvasWidth) {
                // full clear between sweeps
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);

                headX = 0;
                prevX = 0;
                prevY = currentY(nowSec);
            }

            // fade old trail: translucent black over the whole canvas
            ctx.fillStyle = `rgba(0,0,0,${TRAIL_FADE})`;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            // compute new Y from ECG at this time
            const y = currentY(nowSec);

            // draw latest segment
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(headX, y);
            ctx.strokeStyle = "white";
            ctx.lineWidth = LINE_WIDTH;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();

            prevX = headX;
            prevY = y;

            frameId = requestAnimationFrame(loop);
        }

        // init
        resizeCanvas();
        lastFrameTime = performance.now() / 1000;
        prevY = baselineY();

        frameId = requestAnimationFrame(loop);

        // listen for viewport resize
        window.addEventListener("resize", resizeCanvas);

        // cleanup on unmount
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                display: "block",
            }}
        />
    );
}
