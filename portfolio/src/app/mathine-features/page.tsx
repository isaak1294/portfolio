import type { Metadata } from "next";
import MathineFeaturesClient from "@/components/MathineFeaturesClient";

export const metadata: Metadata = {
    title: { absolute: "Mathine — Features" },
    description: "See what's up next, in progress, and awaiting merge for Mathine.",
    openGraph: {
        title: "Mathine — Features",
        description: "Roadmap snapshot for Mathine.",
        url: "https://your.site/mathine-features",
        images: [{ url: "/og/mathine-features.png" }],
    },
    robots: { index: true, follow: true },
};

export default function Page() {
    return <MathineFeaturesClient />;
}
