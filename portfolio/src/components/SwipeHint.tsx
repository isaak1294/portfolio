// components/SwipeHint.tsx
"use client";

type SwipeHintProps = {
    onActivate: () => void;
};

export default function SwipeHint({ onActivate }: SwipeHintProps) {
    return (
        <button
            onClick={onActivate}
            className={`
        absolute
        left-1/2
        bottom-[25vh]    /* higher on screen so it's obvious on mobile */
        -translate-x-1/2
        flex flex-col items-center
        px-5 py-4
        rounded-full
        bg-black/70
        border border-white/40
        text-white
        leading-tight
        backdrop-blur-md
        shadow-[0_30px_80px_rgba(0,0,0,0.9)]
        active:scale-[0.97]
      `}
            style={{
                WebkitBackdropFilter: "blur(8px)",
            }}
        >
            <span className="text-[0.9rem] font-semibold tracking-wide uppercase text-white">
                Tap or Swipe Up
            </span>
            <span className="text-[0.8rem] font-medium text-white/60 mt-1">
                Enter the experience
            </span>
        </button>
    );
}
