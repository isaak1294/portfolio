// components/StrudelEmbedCard.tsx
"use client";

type StrudelEmbedCardProps = {
    title?: string;
    description?: string;
    url: string; // full strudel.cc URL including the hash
};

export default function StrudelEmbedCard({
    title = "Now Playing",
    description = "Live Strudel patch",
    url,
}: StrudelEmbedCardProps) {
    return (
        <div
            className={`
        rounded-2xl
        border border-white/10
        bg-white/5
        backdrop-blur-sm
        p-6
        text-white
        shadow-[0_25px_90px_rgba(0,0,0,0.6)]
        flex
        flex-col
        gap-4
      `}

        >
            <div className="flex flex-col">
                <div
                    className={`
            text-[0.75rem]
            font-semibold
            uppercase tracking-[0.08em]
            text-white
          `}
                >
                    {title}
                </div>

                <div
                    className={`
            text-[0.85rem]
            leading-snug
            text-white/60
          `}
                >
                    {description}
                </div>
            </div>

            {/* Bigger embed viewport */}
            <div
                className={`
          rounded-xl
          overflow-hidden
          border border-white/10
          bg-black/70
        `}
                style={{
                    height: "420px",     // taller viewport
                    minWidth: "320px",   // wider footprint inside the rail
                }}
            >
                <iframe
                    src={url}
                    className="w-full h-full"
                    allow="autoplay; microphone"
                    allowFullScreen
                />
            </div>

            <div
                className={`
          text-[0.75rem]
          leading-snug
          text-white/40
          text-right
        `}
            >
                Powered by strudel.cc
            </div>
        </div>
    );
}
