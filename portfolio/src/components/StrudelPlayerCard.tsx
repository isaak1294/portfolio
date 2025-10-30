// components/StrudelPlayerCard.tsx
"use client";

type StrudelPlayerCardProps = {
    title?: string;       // display title, like "Grease Set 10/30"
    description?: string; // short line under title
    src: string;          // audio URL from backend/stream
};

export default function StrudelPlayerCard({
    title = "Now Playing",
    description = "Live Strudel session",
    src,
}: StrudelPlayerCardProps) {
    return (
        <div
            className={`
                rounded-xl
                border border-white/10
                bg-white/5
                backdrop-blur-sm
                p-4
                text-white
                shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                flex
                flex-col
                gap-3
      `}
        >
            <div className="flex flex-col">
                <div
                    className={`
                    text-[0.7rem]
                    font-semibold
                    uppercase tracking-[0.08em]
                    text-white
          `}
                >
                    {title}
                </div>

                <div
                    className={`
                    text-[0.8rem]
                    leading-snug
                    text-white/60
          `}
                >
                    {description}
                </div>
            </div>

            <audio
                className={`
                w-full
                mt-1
                rounded
                bg-black/40
        `}
                controls
                src={src}
            >
                Your browser does not support the audio element.
            </audio>

            <div
                className={`
                text-[0.7rem]
                leading-snug
                text-white/40
        `}
            >
                Streaming from backend.
            </div>
        </div>
    );
}
