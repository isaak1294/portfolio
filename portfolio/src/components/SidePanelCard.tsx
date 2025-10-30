// components/SidePanelCard.tsx
"use client";

type SidePanelCardProps = {
    title: string;
    children: React.ReactNode;
};

export default function SidePanelCard({ title, children }: SidePanelCardProps) {
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
      `}
        >
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
                    mt-2
                    text-[0.8rem]
                    leading-relaxed
                    text-white/70
        `}
            >
                {children}
            </div>
        </div>
    );
}
