import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Playfair";
const { fontFamily: playfair } = loadFont("normal", { weights: ["600", "700"], subsets: ["latin"] });
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
const { fontFamily: inter } = loadInter("normal", { weights: ["300", "400"], subsets: ["latin"] });

const benefits = [
  { icon: "🇪🇺", title: "EU Residency", desc: "Live, work & travel freely across 27 EU nations" },
  { icon: "🏠", title: "From €250K", desc: "Minimum property investment for full eligibility" },
  { icon: "👨‍👩‍👧‍👦", title: "Family Included", desc: "Spouse, children & parents all qualify" },
  { icon: "📈", title: "High ROI", desc: "Strong rental yields in prime Greek locations" },
];

export const SceneBenefits = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section title
  const titleSp = spring({ frame: frame - 10, fps, config: { damping: 20, stiffness: 150 } });
  const titleY = interpolate(titleSp, [0, 1], [60, 0]);

  // Gold line under title
  const lineW = interpolate(frame, [20, 55], [0, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Subtle background drift
  const bgX = interpolate(frame, [0, 200], [0, -40], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      {/* Dark gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at ${50 + bgX * 0.1}% 40%, #1a1510 0%, #0a0a0a 70%)`,
        }}
      />

      {/* Decorative gold circle */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -150,
          width: 600,
          height: 600,
          borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.1)",
          opacity: interpolate(frame, [0, 40], [0, 0.6], { extrapolateRight: "clamp" }),
        }}
      />

      {/* Section title */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 100,
          transform: `translateY(${titleY}px)`,
          opacity: titleSp,
        }}
      >
        <p style={{ fontFamily: inter, fontSize: 16, color: "#C9A84C", letterSpacing: 4, textTransform: "uppercase", margin: 0, marginBottom: 12 }}>
          Why Greece
        </p>
        <h2 style={{ fontFamily: playfair, fontSize: 58, fontWeight: 700, color: "white", margin: 0, lineHeight: 1.15 }}>
          Golden Visa <span style={{ color: "#C9A84C" }}>Benefits</span>
        </h2>
        <div style={{ height: 3, width: lineW, background: "linear-gradient(90deg, #C9A84C, #E8D48B)", borderRadius: 2, marginTop: 16 }} />
      </div>

      {/* Benefits grid */}
      <div
        style={{
          position: "absolute",
          top: 340,
          left: 80,
          right: 80,
          display: "flex",
          gap: 32,
        }}
      >
        {benefits.map((b, i) => {
          const delay = 40 + i * 18;
          const sp = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 140 } });
          const cardY = interpolate(sp, [0, 1], [60, 0]);
          const cardOp = interpolate(sp, [0, 1], [0, 1]);

          // Subtle float
          const floatY = Math.sin((frame - delay) * 0.04) * 3;

          return (
            <div
              key={i}
              style={{
                flex: 1,
                background: "linear-gradient(180deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.02) 100%)",
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: 16,
                padding: "40px 28px",
                transform: `translateY(${cardY + floatY}px)`,
                opacity: cardOp,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>{b.icon}</div>
              <h3 style={{ fontFamily: playfair, fontSize: 24, fontWeight: 600, color: "white", margin: "0 0 10px" }}>{b.title}</h3>
              <p style={{ fontFamily: inter, fontSize: 16, fontWeight: 300, color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.5 }}>{b.desc}</p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
