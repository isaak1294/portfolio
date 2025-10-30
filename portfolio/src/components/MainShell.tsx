// components/MainShell.tsx
"use client";

import MainContent from "@/components/MainContent";
import SidePanelCard from "@/components/SidePanelCard";
import StrudelEmbedCard from "@/components/StrudelEmbedCard";
import Mini3DButton from "@/components/Mini3DButton";

const goRegister = () => {
    window.open(
        "https://docs.google.com/forms/d/e/1FAIpQLSdsbVq0Z7YHgQCsAc-kwDZZ9SP3O6epdQ7kUSMccU29UhCB7w/viewform?usp=header",
        "_blank",
        "noopener,noreferrer"
    );
};

const goDiscord = () => {
    window.open(
        "https://discord.gg/xv2gUXyS",
        "_blank",
        "noopener,noreferrer"
    );
};

const goStrudel = () => {
    window.open(
        "https://strudel.cc/#Ly8gImNvYXN0bGluZSIgQGJ5IGVkZHlmbHV4Ci8vIEB2ZXJzaW9uIDEuMApzYW1wbGVzKCdnaXRodWI6ZWRkeWZsdXgvY3JhdGUnKQpzZXRjcHMoLjc1KQpsZXQgY2hvcmRzID0gY2hvcmQoIjxCYm05IEZtOT4vNCIpLmRpY3QoJ2lyZWFsJykKc3RhY2soCiAgc3RhY2soIC8vIERSVU1TCiAgICBzKCJiZCIpLnN0cnVjdCgiPFt4KjwxIDI%2BIFt%2BQDMgeF1dIHg%2BIikuX3NwZWN0cnVtKCksCiAgICBzKCJ%2BIFtyaW0sIHNkOjwyIDM%2BXSIpLnJvb20oIjwwIC4yPiIpLAogICAgbigiWzAgPDEgMz5dKjwyITMgND4iKS5zKCJoaCIpLl9wdW5jaGNhcmQoKSwKICAgIHMoInJkOjwxITMgMj4qMiIpLm1hc2soIjwwIDAgMSAxPi8xNiIpLmdhaW4oLjUpCiAgKS5iYW5rKCdjcmF0ZScpCiAgLm1hc2soIjxbMCAxXSAxIDEgMT4vMTYiLmVhcmx5KC41KSkKICAsIC8vIENIT1JEUwogIGNob3Jkcy5vZmZzZXQoLTEpLnZvaWNpbmcoKS5zKCJnbV9lcGlhbm8xOjEiKQogIC5waGFzZXIoNCkucm9vbSguNSkuX3NwZWN0cnVtKCkKICAsIC8vIE1FTE9EWQogIG4oIjwwITMgMSoyPiIpLnNldChjaG9yZHMpLm1vZGUoInJvb3Q6ZzIiKQogIC52b2ljaW5nKCkucygiZ21fYWNvdXN0aWNfYmFzcyIpLAogIGNob3Jkcy5uKCJbMCA8NCAzIDwyIDU%2BPioyXSg8MyA1Piw4KSIpLl9waWFub3JvbGwoKQogIC5hbmNob3IoIkQ1Iikudm9pY2luZygpCiAgLnNlZ21lbnQoNCkuY2xpcChyYW5kLnJhbmdlKC40LC44KSkKICAucm9vbSguNzUpLnNoYXBlKC4zKS5kZWxheSguMjUpCiAgLmZtKHNpbmUucmFuZ2UoMyw4KS5zbG93KDgpKQogIC5scGYoc2luZS5yYW5nZSg1MDAsMTAwMCkuc2xvdyg4KSkubHBxKDUpCiAgLnJhcmVseShwbHkoIjIiKSkuY2h1bmsoNCwgZmFzdCgyKSkKICAuZ2FpbihwZXJsaW4ucmFuZ2UoLjYsIC45KSkKICAubWFzaygiPDAgMSAxIDA%2BLzE2IikKKQoubGF0ZSgiWzAgLjAxXSo0IikubGF0ZSgiWzAgLjAxXSoyIikuc2l6ZSg0KQ%3D%3D",
        "_blank",
        "noopener,noreferrer"
    );
};

export default function MainShell() {
    return (
        <div className="w-full min-h-screen bg-[#0f0f10] text-white font-sans flex justify-center px-4 py-8 lg:py-16">
            <div
                className={`
                    w-full
                    max-w-[1600px]
                    grid
                    gap-8
                    grid-cols-1

                    /* desktop layout:
                       - left rail min 240px
                       - center up to 800px
                       - right rail min 360px (more room for Strudel)
                    */
                    lg:grid-cols-[minmax(240px,1fr)_minmax(0,800px)_minmax(360px,1fr)]
                `}
            >
                {/* LEFT RAIL 
                   mobile: visible, appears first
                   desktop: sticky sidebar
                */}
                <aside
                    className={`
                        order-1
                        flex flex-col gap-4
                        lg:order-1
                        lg:sticky lg:top-8
                        self-start
                    `}
                >
                    <SidePanelCard title="Register Now!">
                        <div className="text-white text-sm leading-snug">
                            Spots are limited, reserve your spot here.
                        </div>

                        <div className="mt-4 w-full max-w-[200px]">
                            <Mini3DButton
                                variant="register"
                                onClick={goRegister}
                            />
                        </div>
                    </SidePanelCard>

                    <SidePanelCard title="Join The Discord!">
                        <div className="text-white text-sm leading-snug">
                            Announcements and schedule drops.
                        </div>
                        <div className="text-white/50 text-[0.7rem] leading-snug mt-1">
                            Everything you need before the event.
                        </div>

                        <div className="mt-4 w-full max-w-[200px]">
                            <Mini3DButton
                                variant="discord"
                                onClick={goDiscord}
                            />
                        </div>
                    </SidePanelCard>

                    <SidePanelCard title="Check out Strudel!">
                        <div className="text-white text-sm leading-snug">
                            Live-coded beats. Dirty club textures. No presets.
                        </div>

                        <div className="mt-4 w-full max-w-[200px]">
                            <Mini3DButton
                                variant="strudel"
                                onClick={goStrudel}
                            />
                        </div>
                    </SidePanelCard>
                </aside>

                {/* CENTER CONTENT 
                   mobile: comes after left rail
                   desktop: middle column
                */}
                <main
                    className={`
                        order-2
                        lg:order-2
                        flex justify-center
                    `}
                >
                    <MainContent />
                </main>

                {/* RIGHT RAIL 
                   mobile: comes last, scrolls like normal
                   desktop: sticky sidebar with roomy Strudel
                */}
                <aside
                    className={`
                        order-3
                        flex flex-col gap-4
                        lg:order-3
                        lg:sticky lg:top-8
                        self-start
                    `}
                >
                    <StrudelEmbedCard
                        title="Now Playing"
                        description="Strudel session // live code synth"
                        url="https://strudel.cc/#Ly8gImNvYXN0bGluZSIgQGJ5IGVkZHlmbHV4Ci8vIEB2ZXJzaW9uIDEuMApzYW1wbGVzKCdnaXRodWI6ZWRkeWZsdXgvY3JhdGUnKQpzZXRjcHMoLjc1KQpsZXQgY2hvcmRzID0gY2hvcmQoIjxCYm05IEZtOT4vNCIpLmRpY3QoJ2lyZWFsJykKc3RhY2soCiAgc3RhY2soIC8vIERSVU1TCiAgICBzKCJiZCIpLnN0cnVjdCgiPFt4KjwxIDI%2BIFt%2BQDMgeF1dIHg%2BIikuX3NwZWN0cnVtKCksCiAgICBzKCJ%2BIFtyaW0sIHNkOjwyIDM%2BXSIpLnJvb20oIjwwIC4yPiIpLAogICAgbigiWzAgPDEgMz5dKjwyITMgND4iKS5zKCJoaCIpLl9wdW5jaGNhcmQoKSwKICAgIHMoInJkOjwxITMgMj4qMiIpLm1hc2soIjwwIDAgMSAxPi8xNiIpLmdhaW4oLjUpCiAgKS5iYW5rKCdjcmF0ZScpCiAgLm1hc2soIjxbMCAxXSAxIDEgMT4vMTYiLmVhcmx5KC41KSkKICAsIC8vIENIT1JEUwogIGNob3Jkcy5vZmZzZXQoLTEpLnZvaWNpbmcoKS5zKCJnbV9lcGlhbm8xOjEiKQogIC5waGFzZXIoNCkucm9vbSguNSkuX3NwZWN0cnVtKCkKICAsIC8vIE1FTE9EWQogIG4oIjwwITMgMSoyPiIpLnNldChjaG9yZHMpLm1vZGUoInJvb3Q6ZzIiKQogIC52b2ljaW5nKCkucygiZ21fYWNvdXN0aWNfYmFzcyIpLAogIGNob3Jkcy5uKCJbMCA8NCAzIDwyIDU%2BPioyXSg8MyA1Piw4KSIpLl9waWFub3JvbGwoKQogIC5hbmNob3IoIkQ1Iikudm9pY2luZygpCiAgLnNlZ21lbnQoNCkuY2xpcChyYW5kLnJhbmdlKC40LC44KSkKICAucm9vbSguNzUpLnNoYXBlKC4zKS5kZWxheSguMjUpCiAgLmZtKHNpbmUucmFuZ2UoMyw4KS5zbG93KDgpKQogIC5scGYoc2luZS5yYW5nZSg1MDAsMTAwMCkuc2xvdyg4KSkubHBxKDUpCiAgLnJhcmVseShwbHkoIjIiKSkuY2h1bmsoNCwgZmFzdCgyKSkKICAuZ2FpbihwZXJsaW4ucmFuZ2UoLjYsIC45KSkKICAubWFzaygiPDAgMSAxIDA%2BLzE2IikKKQoubGF0ZSgiWzAgLjAxXSo0IikubGF0ZSgiWzAgLjAxXSoyIikuc2l6ZSg0KQ%3D%3D"
                    />
                </aside>
            </div>
        </div>
    );
}
