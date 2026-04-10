import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cormorant";
import { loadFont as loadRaleway } from "@remotion/google-fonts/Raleway";

const { fontFamily: serif } = loadFont("normal", { weights: ["600", "700"], subsets: ["latin"] });
const { fontFamily: sans } = loadRaleway("normal", { weights: ["300", "400"], subsets: ["latin"] });

const points = [
  { icon: "🏛", value: "€250K", label: "Minimum Investment", accent: "#F5A623" },
  { icon: "🇪🇺", value: "27", label: "EU Nations Access", accent: "#D4622B" },
  { icon: "📈", value: "3.5–4.8%", label: "Rental Yields", accent: "#E8813A" },
];

export const SceneVisaV4 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headOp = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const headY = interpolate(spring({ frame, fps, config: { damping: 20 } }), [0, 1], [50, 0]);

  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #1a0a00 0%, #2d1200 50%, #1a0a00 100%)" }}>
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: "80px 50px",
      }}>
        <div style={{
          fontFamily: serif, fontSize: 50, fontWeight: 600, color: "#F5A623",
          textAlign: "center", opacity: headOp, transform: `translateY(${headY}px)`,
          marginBottom: 16, lineHeight: 1.2,
        }}>
          Greek Golden Visa
        </div>
        <div style={{
          fontFamily: sans, fontSize: 22, color: "#FFD9A0", fontWeight: 300,
          textAlign: "center", opacity: headOp, marginBottom: 55,
        }}>
          EU residency through property investment
        </div>

        {points.map((p, i) => {
          const delay = 25 + i * 22;
          const s = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 140 } });
          const op = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const x = interpolate(s, [0, 1], [80, 0]);

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 22,
              opacity: op, transform: `translateX(${x}px)`,
              marginBottom: 32, padding: "22px 28px", width: "100%",
              background: "rgba(245,166,35,0.08)",
              borderLeft: `3px solid ${p.accent}`,
              borderRadius: 12,
            }}>
              <div style={{ fontSize: 44, flexShrink: 0 }}>{p.icon}</div>
              <div>
                <div style={{ fontFamily: serif, fontSize: 38, color: p.accent, fontWeight: 700 }}>
                  {p.value}
                </div>
                <div style={{ fontFamily: sans, fontSize: 20, color: "#FFD9A0", fontWeight: 300, marginTop: 2 }}>
                  {p.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
