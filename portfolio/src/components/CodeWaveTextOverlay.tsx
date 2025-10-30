"use client";

import { useEffect, useRef } from "react";

const TEXT = "CODEWAVE";

type LetterState = {
    basePhase: number; // per-letter phase offset for breathing
    hover: boolean;
};

export default function CodewaveTextOverlay() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const letterRefs = useRef<HTMLSpanElement[]>([]);
    const letterState = useRef<LetterState[]>(
        TEXT.split("").map((_, i) => ({
            basePhase: i * 0.7,
            hover: false,
        }))
    );

    useEffect(() => {
        let frameId: number;
        const start = performance.now();

        const tick = (now: number) => {
            const t = (now - start) / 1000; // seconds

            // animate each letter
            letterRefs.current.forEach((el, i) => {
                if (!el) return;

                const state = letterState.current[i];

                // slow breathing scale
                const breathe =
                    1 + 0.04 * Math.sin(t * 0.8 + state.basePhase);

                // hover pop
                const targetScale = state.hover ? breathe + 0.18 : breathe;

                // slight idle rotation for life (2D rotate / skew, not 3D depth)
                const tiltDeg = 2 * Math.sin(t * 0.4 + state.basePhase); // small, ±2deg
                const hoverBrightness = state.hover ? 1 : 0.8;

                el.style.transform = `
          scale(${targetScale})
          rotate(${tiltDeg}deg)
        `;
                el.style.color = `rgba(255,255,255,${hoverBrightness})`;
                el.style.textShadow = state.hover
                    ? "0 0 12px rgba(255,255,255,0.9), 0 0 24px rgba(255,255,255,0.6)"
                    : "0 0 6px rgba(255,255,255,0.4)";

            });

            frameId = requestAnimationFrame(tick);
        };

        frameId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: "absolute",
                inset: 0,
                zIndex: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none", // allows scroll/swipe passthrough EXCEPT for letters below
                fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
                fontWeight: 600,
                transform: "translateY(-10%)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    gap: "0.4rem",
                    pointerEvents: "auto", // re-enable pointer on the actual word so we can hover letters
                    userSelect: "none",
                    lineHeight: 1,
                }}
            >
                {TEXT.split("").map((ch, i) => (
                    <span
                        key={i}
                        ref={(el) => {
                            if (el) {
                                letterRefs.current[i] = el;
                            }
                        }}
                        onMouseEnter={() => {
                            letterState.current[i].hover = true;
                        }}
                        onMouseLeave={() => {
                            letterState.current[i].hover = false;
                        }}
                        style={{
                            fontSize: "clamp(2rem, 4vw, 4rem)", // responsive size
                            color: "rgba(255,255,255,0.8)",
                            textShadow:
                                "0 0 6px rgba(255,255,255,0.4)",
                            display: "inline-block",
                            transformOrigin: "center center",
                            transition: "color 0.08s linear, text-shadow 0.08s linear",
                            willChange: "transform, color, text-shadow",
                        }}
                    >
                        {ch}
                    </span>
                ))}
            </div>
        </div>
    );
}
