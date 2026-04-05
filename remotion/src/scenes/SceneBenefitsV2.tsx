import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cormorant";
const { fontFamily: display } = loadFont("normal", { weights: ["600", "700"], subsets: ["latin"] });
import { loadFont as loadRaleway } from "@remotion/google-fonts/Raleway";
const { fontFamily: body } = loadRaleway("normal", { weights: ["300", "400"], subsets: ["latin"] });

const ACCENT = "#2AABB3";
const ACCENT_LIGHT = "#5DD9E0";

const benefits = [
  { icon: "🇪🇺", title: "EU Residency", desc: "Live, work & travel freely across 27 EU nations" },
  { icon: "🏠", title: "From €250K", desc: "Minimum property investment for full eligibility" },
  { icon: "👨‍👩‍👧‍👦", title: "Family Included", desc: "Spouse, children & parents all qualify" },
  { icon: "📈", title: "High ROI", desc: "Strong rental yields in prime Greek locations" },
];

export const SceneBenefitsV2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSp = spring({ frame: frame - 10, fps, config: { damping: 20, stiffness: 150 } });
  const titleY = interpolate(titleSp, [0, 1], [60, 0]);

  const lineW = interpolate(frame, [20, 55], [0, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Flowing background
  const bgShift = interpolate(frame, [0, 200], [0, 30], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      {/* Deep ocean gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(145deg, #071e2a 0%, #0a2e3d ${40 + bgShift * 0.3}%, #081c28 100%)`,
        }}
      />

      {/* Decorative circle — teal */}
      <div
        style={{
          position: "absolute",
          top: -180,
          right: -120,
          width: 550,
          height: 550,
          borderRadius: "50%",
          border: `1px solid rgba(42,171,179,0.12)`,
          opacity: interpolate(frame, [0, 40], [0, 0.7], { extrapolateRight: "clamp" }),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -250,
          left: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: `1px solid rgba(42,171,179,0.07)`,
          opacity: interpolate(frame, [10, 50], [0, 0.5], { extrapolateRight: "clamp" }),
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
        <p style={{ fontFamily: body, fontSize: 15, color: ACCENT, letterSpacing: 5, textTransform: "uppercase", margin: 0, marginBottom: 12 }}>
          Why Greece
        </p>
        <h2 style={{ fontFamily: display, fontSize: 60, fontWeight: 700, color: "white", margin: 0, lineHeight: 1.15 }}>
          Golden Visa <span style={{ color: ACCENT_LIGHT }}>Benefits</span>
        </h2>
        <div style={{ height: 3, width: lineW, background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_LIGHT})`, borderRadius: 2, marginTop: 16 }} />
      </div>

      {/* Benefits grid */}
      <div
        style={{
          position: "absolute",
          top: 340,
          left: 80,
          right: 80,
          display: "flex",
          gap: 28,
        }}
      >
        {benefits.map((b, i) => {
          const delay = 40 + i * 18;
          const sp = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 140 } });
          const cardY = interpolate(sp, [0, 1], [60, 0]);
          const cardOp = interpolate(sp, [0, 1], [0, 1]);
          const floatY = Math.sin((frame - delay) * 0.04) * 3;

          return (
            <div
              key={i}
              style={{
                flex: 1,
                background: "linear-gradient(180deg, rgba(42,171,179,0.1) 0%, rgba(42,171,179,0.03) 100%)",
                border: "1px solid rgba(42,171,179,0.18)",
                borderRadius: 14,
                padding: "38px 26px",
                transform: `translateY(${cardY + floatY}px)`,
                opacity: cardOp,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 46, marginBottom: 14 }}>{b.icon}</div>
              <h3 style={{ fontFamily: display, fontSize: 24, fontWeight: 600, color: "white", margin: "0 0 10px" }}>{b.title}</h3>
              <p style={{ fontFamily: body, fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.5 }}>{b.desc}</p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
