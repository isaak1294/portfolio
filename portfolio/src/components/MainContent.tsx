// components/MainContent.tsx
"use client";

export default function MainContent() {
    return (
        <div
            className={`
        w-full
        max-w-[65ch]
        rounded-2xl
        border border-white/10
        bg-white/5
        backdrop-blur-sm
        p-8
        text-white
        shadow-[0_30px_80px_rgba(0,0,0,0.6)]
      `}
        >
            {/* --- Header --- */}
            <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">
                The Strudel Hackathon
            </h1>
            <p className="text-white/70 text-[0.95rem] leading-relaxed mb-6">
                A creative coding event where developers, musicians, and artists
                collaborate to explore the intersection of music and programming, using
                <span className="text-white font-semibold"> Strudel</span>, a live-coding
                environment for generative beats and algorithmic sound design.
            </p>

            {/* --- About Section --- */}
            <h2 className="text-xl font-semibold text-white mt-8 mb-2">About the Event</h2>
            <p className="text-white/70 text-[0.95rem] leading-relaxed mb-4">
                Thanks for stopping by! We're hosting a one-day hackathon designed to
                help you dive into Strudel, a powerful yet easy-to-learn system for
                writing music through code. You’ll get hands-on experience making
                polyrhythms, live loops, and generative soundscapes (like the one
                running on the right!).
            </p>
            <p className="text-white/70 text-[0.95rem] leading-relaxed mb-4">
                The hackathon kicks off at <strong>12 PM in Hickman 105</strong>.
                We’ll start with introductions, event logistics, and then a short
                optional workshop for anyone new to Strudel. You’ll have plenty of time
                afterward to experiment, collaborate, and build your project.
            </p>

            {/* --- Schedule --- */}
            <h2 className="text-xl font-semibold text-white mt-8 mb-2">Schedule</h2>
            <ul className="list-disc list-inside text-white/70 text-[0.95rem] leading-relaxed mb-4">
                <li>
                    <strong>12:00 PM – 12:30 PM:</strong> Kickoff and overview
                </li>
                <li>
                    <strong>12:30 PM – 1:00 PM:</strong> Optional Strudel workshop
                </li>
                <li>
                    <strong>1:00 PM – 5:00 PM:</strong> Build, jam, and collaborate
                </li>
                <li>
                    <strong>5:00 PM – 6:00 PM:</strong> Demos and judging
                </li>
            </ul>

            {/* --- FAQ --- */}
            <h2 className="text-xl font-semibold text-white mt-8 mb-2">FAQ</h2>

            <div className="mt-3 space-y-4">
                <div>
                    <h3 className="font-medium text-white">Can I work in a team?</h3>
                    <p className="text-white/70 text-[0.95rem] leading-relaxed">
                        Absolutely! Teams can be any size, or you can go solo. Since the
                        projects are creative and sound-based, smaller groups tend to work
                        better — but feel free to jam with as many friends as you like.
                    </p>
                </div>

                <div>
                    <h3 className="font-medium text-white">What will we be judged on?</h3>
                    <p className="text-white/70 text-[0.95rem] leading-relaxed">
                        Entries will be evaluated by a panel of professionals from both the
                        music and software industries. They’ll be looking at creativity,
                        originality, and how effectively you use Strudel to express an idea,
                        not just technical complexity.
                    </p>
                </div>

                <div>
                    <h3 className="font-medium text-white">Do I need prior experience?</h3>
                    <p className="text-white/70 text-[0.95rem] leading-relaxed">
                        Nope! Strudel is beginner-friendly, and we'll help you get started.
                        If you can type, you can make music.
                    </p>
                </div>
            </div>
        </div>
    );
}
