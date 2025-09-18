import type { Metadata } from "next";

export const metadata: Metadata = {
    title: { absolute: "Mathine — Features" },
    description: "See what's up next, in progress, and awaiting merge for Mathine.",
    openGraph: {
        title: "Mathine — Features",
        description: "Roadmap snapshot for Mathine.",
        url: "https://jimmer.dev/mathine-features",
        images: [{ url: "https://jimmer.dev/og/mathine-features.png" }],
    },
    alternates: { canonical: "https://jimmer.dev/mathine-features" },
    robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
