import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cormorant";
import { loadFont as loadRaleway } from "@remotion/google-fonts/Raleway";

const { fontFamily: serif } = loadFont("normal", { weights: ["600"], subsets: ["latin"] });
const { fontFamily: sans } = loadRaleway("normal", { weights: ["300", "400"], subsets: ["latin"] });

const benefits = [
  { icon: "🏛", title: "EU Residency", desc: "Live & work across Europe" },
  { icon: "🎓", title: "Education", desc: "Access EU universities" },
  { icon: "💰", title: "From €250K", desc: "Strategic investment entry" },
  { icon: "✈️", title: "Visa-Free", desc: "Travel 27 Schengen nations" },
];

export const SceneBenefitsV3 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headOp = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const headY = interpolate(spring({ frame, fps, config: { damping: 20 } }), [0, 1], [50, 0]);

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(180deg, #1a0a00 0%, #2d1200 50%, #1a0a00 100%)",
    }}>
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "80px 55px",
      }}>
        <div style={{
          fontFamily: serif, fontSize: 54, fontWeight: 600, color: "#F5A623",
          textAlign: "center", opacity: headOp, transform: `translateY(${headY}px)`,
          marginBottom: 60, lineHeight: 1.2,
        }}>
          Golden Visa Benefits
        </div>

        {benefits.map((b, i) => {
          const delay = 25 + i * 18;
          const s = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 140 } });
          const op = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const x = interpolate(s, [0, 1], [80, 0]);

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 24,
              opacity: op, transform: `translateX(${x}px)`,
              marginBottom: 35, padding: "24px 30px",
              background: "rgba(245,166,35,0.08)",
              borderLeft: "3px solid #D4622B",
              borderRadius: 12,
            }}>
              <div style={{ fontSize: 48, flexShrink: 0 }}>{b.icon}</div>
              <div>
                <div style={{ fontFamily: serif, fontSize: 32, color: "#FFF5E6", fontWeight: 600 }}>
                  {b.title}
                </div>
                <div style={{ fontFamily: sans, fontSize: 22, color: "#FFD9A0", fontWeight: 300, marginTop: 4 }}>
                  {b.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
