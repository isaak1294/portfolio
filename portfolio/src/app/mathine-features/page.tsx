"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";

// app/mathine-features/page.tsx
export const metadata = {
    title: "Mathine — Features",
    description: "See what's up next, in progress, and awaiting merge for Mathine.",
    openGraph: {
        title: "Mathine — Features",
        description: "Roadmap snapshot for Mathine.",
        url: "https://your.site/mathine-features",
        images: [{ url: "/og/mathine-features.png" }],
    },
    robots: { index: true, follow: true },
};


// ------------------------------------------------------------
// Types
// ------------------------------------------------------------
type Issue = {
    id: string;
    title: string;
    summary?: string;
    description?: string;
    labels?: string[];
    number?: number; // e.g., GitHub issue number
    url?: string; // external link to issue tracker
    updatedAt?: string; // ISO string
    assignees?: { name: string; avatarUrl?: string }[];
    // status is one of the three columns on this board
    status: "up_next" | "doing" | "awaiting_merge";
};

// ------------------------------------------------------------
// Mock data (replace with data fetched from your API if desired)
// ------------------------------------------------------------
const MOCK: Issue[] = [
    {
        id: "ISSUE-101",
        title: "Crowdmark compatability",
        summary: "Enable Mathiné to receive info from crowdmark."
        ,
        description:
            "Consolidate animation utilities, ensure skip goes to final state immediately without layout shift.",
        labels: ["backend", "api"],
        number: 101,
        url: "#",
        updatedAt: new Date().toISOString(),
        status: "up_next",
    },
    {
        id: "ISSUE-29",
        title: "Mobile View",
        summary: "Create a mobile view for Mathine",
        description:
            "",
        labels: ["meta", "ui"],
        number: 29,
        url: "#",
        updatedAt: new Date().toISOString(),
        status: "doing",
    },
    {
        id: "ISSUE-22",
        title: "Import/Export from other calendars",
        summary: "Allow importing and exporting from Google Calendar, Apple Calendar, etc.",
        description:
            "",
        labels: ["compatability", "qol"],
        number: 22,
        url: "#",
        updatedAt: new Date().toISOString(),
        status: "awaiting_merge",
    },
    {
        id: "ISSUE-4",
        title: "Improved Braindump formatting",
        summary: "Allow bullet points, bold, italics in braindump notes.",
        description:
            "",
        labels: ["UI", "qol"],
        number: 4,
        url: "#",
        updatedAt: new Date().toISOString(),
        status: "awaiting_merge",
    },
];

// ------------------------------------------------------------
// Small UI helpers shared with your existing style
// Assumes your Tailwind setup includes custom classes like bg-gradient-radial
// ------------------------------------------------------------
const BoardSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="sticky top-0 z-10 bg-black/70 backdrop-blur text-sm tracking-widest font-mono px-3 py-3 border-b border-white/10">
        {children}
    </h2>
);

// ------------------------------------------------------------
// IssueCard Component (separate, reusable)
// ------------------------------------------------------------
const IssueCard: React.FC<{
    issue: Issue;
    onClick?: (issue: Issue) => void;
}> = ({ issue, onClick }) => {
    const updated = issue.updatedAt
        ? new Date(issue.updatedAt).toLocaleString()
        : undefined;

    return (
        <button
            onClick={() => onClick?.(issue)}
            className={clsx(
                "group relative text-left w-full rounded-2xl border border-white/10",
                "bg-gray-800/40 hover:bg-gray-800/60 transition-all duration-200",
                "p-4 overflow-hidden focus:outline-none focus:ring-2 focus:ring-white/30"
            )}
            onMouseMove={(e) => {
                const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                (e.currentTarget as HTMLButtonElement).style.setProperty("--x", `${x}px`);
                (e.currentTarget as HTMLButtonElement).style.setProperty("--y", `${y}px`);
            }}
        >
            {/* hover sheen */}
            <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: "radial-gradient(200px circle at var(--x) var(--y), rgba(255,255,255,0.1), transparent 40%)",
                }}
            />

            <div className="flex items-start gap-3 relative z-10">
                {/* Status accent dot via border */}
                <span
                    className={clsx(
                        "mt-1 h-2.5 w-2.5 rounded-full border",
                        issue.status === "up_next" && "bg-blue-400/80 border-blue-300/40",
                        issue.status === "doing" && "bg-yellow-300/80 border-yellow-200/40",
                        issue.status === "awaiting_merge" && "bg-emerald-400/80 border-emerald-300/40"
                    )}
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        {typeof issue.number === "number" && (
                            <span className="text-xs font-mono text-white/50">#{issue.number}</span>
                        )}
                        <h3 className="text-base sm:text-lg font-semibold leading-tight">{issue.title}</h3>
                    </div>
                    {issue.summary && (
                        <p className="mt-1 text-sm text-white/80 line-clamp-2">{issue.summary}</p>
                    )}
                    {issue.labels?.length ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {issue.labels.map((l) => (
                                <span
                                    key={l}
                                    className="text-[11px] uppercase tracking-wide font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10"
                                >
                                    {l}
                                </span>
                            ))}
                        </div>
                    ) : null}
                    {updated && (
                        <p className="mt-2 text-[11px] font-mono text-white/40">Updated {updated}</p>
                    )}
                </div>
            </div>
        </button>
    );
};

// ------------------------------------------------------------
// Issue Detail Drawer (click an issue to view more)
// ------------------------------------------------------------
const IssueDrawer: React.FC<{
    issue?: Issue | null;
    onClose: () => void;
}> = ({ issue, onClose }) => {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    if (!issue) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/70" onClick={onClose} />
            <aside className="absolute right-0 top-0 h-full w-full sm:w-[520px] bg-black text-white border-l border-white/10 shadow-2xl p-6 overflow-y-auto">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-mono text-white/50">{issue.id}</p>
                        <h3 className="mt-1 text-xl font-bold">{issue.title}</h3>
                        {typeof issue.number === "number" && (
                            <p className="mt-1 text-xs font-mono text-white/50">Issue #{issue.number}</p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full border border-white/10 px-3 py-1.5 hover:bg-white/10"
                        aria-label="Close issue details"
                    >
                        Close
                    </button>
                </div>

                {issue.labels?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {issue.labels.map((l) => (
                            <span key={l} className="text-[11px] uppercase tracking-wide font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">
                                {l}
                            </span>
                        ))}
                    </div>
                ) : null}

                {issue.description && (
                    <p className="mt-4 text-sm leading-6 text-white/90 whitespace-pre-wrap">{issue.description}</p>
                )}

                {issue.url && (
                    <div className="mt-6">
                        <Link href={issue.url} className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-gray-700 font-semibold hover:bg-gray-600 transition">
                            Open in tracker
                        </Link>
                    </div>
                )}
            </aside>
        </div>
    );
};

// ------------------------------------------------------------
// The Page (styles match your aesthetic: black bg, mono accents, sheen buttons)
// ------------------------------------------------------------
export default function IssuesBoardPage() {
    const [selected, setSelected] = useState<Issue | null>(null);

    // Replace MOCK with fetched data if desired
    const issues = useMemo(() => MOCK, []);

    const columns = useMemo(
        () => ({
            up_next: issues.filter((i) => i.status === "up_next"),
            doing: issues.filter((i) => i.status === "doing"),
            awaiting_merge: issues.filter((i) => i.status === "awaiting_merge"),
        }),
        [issues]
    );

    const openIssue = useCallback((issue: Issue) => setSelected(issue), []);
    const closeIssue = useCallback(() => setSelected(null), []);

    return (
        <div className="w-screen min-h-screen bg-black text-white flex flex-col items-center px-4 overflow-hidden">
            {/* Header to mirror your home styling */}
            <header className="w-full max-w-7xl flex flex-col items-center text-center pt-16 pb-8">
                <h1 className={clsx("text-4xl sm:text-5xl font-bold", "animate-flicker")}>Mathiné Development</h1>
                <p className="mt-3 text-sm sm:text-base font-mono text-white/70">Features that are currently in production for Mathiné.</p>
            </header>

            {/* Board */}
            <main className="w-full max-w-7xl pb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {/* Up Next */}
                    <section className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden min-h-[50vh]">
                        <BoardSectionTitle>UP NEXT</BoardSectionTitle>
                        <div className="p-3 md:p-4 flex flex-col gap-3">
                            {columns.up_next.length ? (
                                columns.up_next.map((i) => (
                                    <IssueCard key={i.id} issue={i} onClick={openIssue} />
                                ))
                            ) : (
                                <EmptyState text="Nothing queued. Enjoy the calm." />
                            )}
                        </div>
                    </section>

                    {/* Doing */}
                    <section className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden min-h-[50vh]">
                        <BoardSectionTitle>DOING</BoardSectionTitle>
                        <div className="p-3 md:p-4 flex flex-col gap-3">
                            {columns.doing.length ? (
                                columns.doing.map((i) => (
                                    <IssueCard key={i.id} issue={i} onClick={openIssue} />
                                ))
                            ) : (
                                <EmptyState text="No active tasks. Time to start something." />
                            )}
                        </div>
                    </section>

                    {/* Awaiting Merge */}
                    <section className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden min-h-[50vh]">
                        <BoardSectionTitle>AWAITING MERGE</BoardSectionTitle>
                        <div className="p-3 md:p-4 flex flex-col gap-3">
                            {columns.awaiting_merge.length ? (
                                columns.awaiting_merge.map((i) => (
                                    <IssueCard key={i.id} issue={i} onClick={openIssue} />
                                ))
                            ) : (
                                <EmptyState text="No PRs in the queue." />
                            )}
                        </div>
                    </section>
                </div>
            </main>

            <IssueDrawer issue={selected ?? undefined} onClose={closeIssue} />
        </div>
    );
}

// ------------------------------------------------------------
// Empty state helper
// ------------------------------------------------------------
const EmptyState: React.FC<{ text: string }> = ({ text }) => (
    <div className="rounded-2xl border border-white/10 p-6 text-center text-white/60 font-mono">
        {text}
    </div>
);
