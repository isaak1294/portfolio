"use client";

import { useRef, useEffect } from "react";
import HeroCanvas from "@/components/HeroCanvas";
import SwipeHint from "@/components/SwipeHint";
import MainShell from "@/components/MainShell"; // assuming section 2 is this
import CodewaveTextOverlay from "@/components/CodeWaveTextOverlay";

export default function HomePage() {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const section2Ref = useRef<HTMLDivElement | null>(null);

    const goToSection2 = () => {
        if (!scrollRef.current || !section2Ref.current) return;
        const top = section2Ref.current.offsetTop;
        scrollRef.current.scrollTo({
            top,
            behavior: "smooth",
        });
    };

    // touch swipe-up detection, ONLY when we're basically at the top
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        let startY = 0;
        let endY = 0;

        function onTouchStart(e: TouchEvent) {
            // only activate swipe detection if we're near the very top already
            if (el.scrollTop > 20) return;
            startY = e.touches[0].clientY;
            endY = startY;
        }

        function onTouchMove(e: TouchEvent) {
            // if we didn't start in section 1, ignore
            if (el.scrollTop > 20) return;
            endY = e.touches[0].clientY;
        }

        function onTouchEnd() {
            // if we didn't start in section 1, ignore
            if (el.scrollTop > 20) return;
            const delta = startY - endY;
            // user swiped up by at least ~60px while at the top
            if (delta > 60) {
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

    // wheel "scroll down to snap" (desktop only)
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        function onWheel(e: WheelEvent) {
            const atTopSection = el.scrollTop < window.innerHeight * 0.3;
            const scrollingDown = e.deltaY > 20;

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
                WebkitOverflowScrolling: "touch",
                backgroundColor: "#000", // safety background
            }}
        >
            {/* SECTION 1 */}
            <section
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100vh",
                    scrollSnapAlign: "start",
                    overflow: "hidden",
                    color: "white",
                    fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
                }}
            >
                <CodewaveTextOverlay />

                {/* Hero canvas behind */}
                <HeroCanvas />

                {/* CTA hint */}
                <SwipeHint onActivate={goToSection2} />
            </section>

            {/* SECTION 2 */}
            <section
                ref={section2Ref}
                style={{
                    width: "100%",
                    minHeight: "100vh",
                    scrollSnapAlign: "start",
                    backgroundColor: "#0f0f10",
                    color: "white",
                    fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* your actual app shell */}
                <MainShell />
            </section>
        </div>
    );
}
