import type { Metadata } from "next";

export const metadata: Metadata = {
    title: { absolute: "Strudel Hackathon" },
    description: "Make Music. Eat Pizza. Win Prizes.",
    openGraph: {
        title: "Strudel Hackathon",
        description: "Make Music. Eat Pizza. Win Prizes.",
        url: "https://jimmer.dev/strudel",
        images: [{ url: "https://jimmer.dev/og/mathine-features.png" }],
    },
    alternates: { canonical: "https://jimmer.dev/strudel" },
    robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
