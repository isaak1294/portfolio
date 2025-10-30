// components/SwipeHint.tsx
"use client";

type SwipeHintProps = {
    onActivate: () => void;
};

export default function SwipeHint({ onActivate }: SwipeHintProps) {
    return (
        <button
            onClick={onActivate}
            style={{
                position: "absolute",
                left: "50%",
                bottom: "2rem",
                transform: "translateX(-50%)",
                color: "white",
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: "9999px",
                padding: "0.75rem 1rem",
                fontSize: "0.8rem",
                lineHeight: 1,
                letterSpacing: "0.05em",
                fontWeight: 500,
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                cursor: "pointer",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.4rem",
                }}
            >
                <span style={{ textTransform: "uppercase" }}>Swipe up</span>
                <span
                    style={{
                        display: "block",
                        width: "2px",
                        height: "16px",
                        backgroundColor: "white",
                        borderRadius: "1px",
                        animation: "hintPulse 1.4s infinite",
                    }}
                />
            </div>
        </button>
    );
}
