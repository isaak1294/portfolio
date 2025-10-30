// components/StrudelEmbedCard.tsx
"use client";

type StrudelEmbedCardProps = {
    title: string;
    description?: string;
    url: string;
};

export default function StrudelEmbedCard({
    title,
    description,
    url,
}: StrudelEmbedCardProps) {
    return (
        <div
            className={`
        w-full
        rounded-2xl
        border border-white/10
        bg-white/5
        backdrop-blur-sm
        p-4
        text-white
        shadow-[0_30px_80px_rgba(0,0,0,0.6)]
      `}
        >
            <div className="flex flex-col">
                <div className="mb-2">
                    <h2 className="text-white text-base font-semibold leading-tight">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-white/60 text-[0.8rem] leading-snug mt-1">
                            {description}
                        </p>
                    )}
                </div>

                <div
                    className={`
            w-full
            rounded-lg
            overflow-hidden
            border border-white/10
            bg-black
            shadow-inner
            /* taller on mobile, a bit less tall on desktop */
            h-[720px]
            lg:h-[850px]
          `}
                >
                    <iframe
                        src={url}
                        className="w-full h-full"
                        style={{
                            border: "0",
                        }}
                        allow="autoplay"
                    />
                </div>
            </div>
        </div>
    );
}
