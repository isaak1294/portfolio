// app/page.tsx
"use client";

import { useRef, useEffect } from "react";

import HeroCanvas from "@/components/HeroCanvas";
import CodewaveTextOverlay from "@/components/CodeWaveTextOverlay";
import SwipeHint from "@/components/SwipeHint";

import MainShell from "@/components/MainShell";

export default function HomePage() {
    // scrollable wrapper for the two main sections
    const scrollRef = useRef<HTMLDivElement | null>(null);

    // ref to the second (main app) section so we can scroll to it
    const section2Ref = useRef<HTMLElement | null>(null);

    // helper: programmatic smooth scroll into section 2
    const goToSection2 = () => {
        if (!scrollRef.current || !section2Ref.current) return;
        const top = section2Ref.current.offsetTop;
        scrollRef.current.scrollTo({
            top,
            behavior: "smooth",
        });
    };

    // touch swipe-up detection on the hero section (mobile)
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        let startY = 0;
        let endY = 0;

        function onTouchStart(e: TouchEvent) {
            if (el!.scrollTop !== 0) return; // only detect swipe if we're at the first section
            startY = e.touches[0].clientY;
            endY = startY;
        }

        function onTouchMove(e: TouchEvent) {
            endY = e.touches[0].clientY;
        }

        function onTouchEnd() {
            const delta = startY - endY;
            // if user swiped up a decent amount and we're still near the top, snap to section 2
            if (delta > 60 && el!.scrollTop < window.innerHeight * 0.5) {
                goToSection2();
            }
        }

        el.addEventListener("touchstart", onTouchStart, { passive: true });
        el.addEventListener("touchmove", onTouchMove, { passive: true });
        el.addEventListener("touchend", onTouchEnd);

        return () => {
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchmove", onTouchMove);
            el.removeEventListener("touchend", onTouchEnd);
        };
    }, []);

    // wheel scroll-down detection on desktop
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        function onWheel(e: WheelEvent) {
            const atTopSection = el!.scrollTop < window.innerHeight * 0.3;
            const scrollingDown = e.deltaY > 20;

            // hijack that first wheel to smoothly scroll instead of letting the browser stutter-scroll
            if (atTopSection && scrollingDown) {
                e.preventDefault();
                goToSection2();
            }
        }

        el.addEventListener("wheel", onWheel, { passive: false });

        return () => {
            el.removeEventListener("wheel", onWheel);
        };
    }, []);

    return (
        <div
            ref={scrollRef}
            style={{
                position: "fixed",
                inset: 0,
                overflowY: "auto",
                scrollSnapType: "y mandatory",
                scrollBehavior: "smooth",
                backgroundColor: "#000", // fallback bg behind canvases
                color: "white",
                fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
            }}
        >
            {/* SECTION 1: Hero / landing */}
            <section
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100vh",
                    scrollSnapAlign: "start",
                    overflow: "hidden",
                }}
            >
                {/* Heartbeat monitor canvas in the back */}
                <HeroCanvas />

                {/* Brand wordmark overlay with breathing/hover text */}
                <CodewaveTextOverlay />

                {/* Swipe up hint at the bottom */}
                <SwipeHint onActivate={goToSection2} />
            </section>

            {/* SECTION 2: Main app surface */}
            <section
                ref={section2Ref}
                style={{
                    width: "100%",
                    minHeight: "100vh",
                    scrollSnapAlign: "start",
                    // We let MainShell fully control background, layout, etc.
                    // but we keep this wrapper block-level so snap works.
                }}
            >
                <MainShell />
            </section>
        </div>
    );
}
