// components/MainContent.tsx
"use client";

export default function MainContent() {
    return (
        <div
            className={`
        w-full
        max-w-[60ch]
        rounded-2xl
        border border-white/10
        bg-white/5
        backdrop-blur-sm
        p-6
        text-white
        shadow-[0_30px_80px_rgba(0,0,0,0.6)]
      `}
        >
            <h2
                className={`
          text-xl font-semibold leading-tight text-white
        `}
            >
                About
            </h2>

            <p
                className={`
          mt-4 text-[0.95rem] leading-[1.5] text-white/70
        `}
            >
                Hey, thanks for stopping by! We are putting on a fun hackathon to help people explore music and coding through Strudel.
                Strudel is a super approachable, powerful, and easy-to-learn library that can make super cool music (like the pattern shown to the right).

                The hackathon itself will start at 12pm in Hickman 105, where everyone will meet up, get a rundown on the event. Shortly after, we will run a brief
                optional workshop for anyone who wants to learn the basics of Strudel.

                FAQ:

                Can I work in a team?

                Yes! Teams can be as big as you want, or you can work solo. Given the nature of the event, we don't see much benefit in having a large team, but if you'd
                like to work with all of your friends, that's totally fine by us!

                What will we be judged on?


            </p>

            <p
                className={`
          mt-4 text-[0.95rem] leading-[1.5] text-white/70
        `}
            >
                On desktop, this panel is centered between side rails. On mobile,
                this is the first block in the scroll.
            </p>
        </div>
    );
}
