// components/StrudelEmbedCard.tsx
"use client";

type StrudelEmbedCardProps = {
    title: string;
    description?: string;
    url: string; // full strudel.cc/#... link
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
                bg-black/40
                border border-white/10
                shadow-[0_30px_80px_rgba(0,0,0,0.8)]
                p-4
                flex
                flex-col
                text-white
                overflow-hidden
                /* bigger on desktop */
                lg:p-6
            `}
        >
            <div className="mb-4">
                <div className="text-sm font-semibold leading-tight text-white">
                    {title}
                </div>
                {description && (
                    <div className="text-[0.7rem] text-white/50 leading-snug mt-1">
                        {description}
                    </div>
                )}
            </div>

            {/* EMBED WRAPPER */}
            <div
                className={`
                    relative
                    w-full
                    /* mobile height */
                    h-[240px]

                    /* desktop: taller */
                    lg:h-[360px]

                    rounded-lg
                    bg-black/60
                    border border-white/10
                    overflow-hidden
                `}
            >
                {/* The Strudel IDE / player */}
                <iframe
                    src={url}
                    className={`
                        absolute inset-0
                        w-full h-full
                        border-0
                        overflow-hidden
                    `}
                    // sandbox keeps it from nuking your page if Strudel does window.top stuff
                    sandbox="allow-scripts allow-same-origin"
                />
            </div>
        </div>
    );
}
