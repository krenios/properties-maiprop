import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Playfair";
const { fontFamily: playfair } = loadFont("normal", { weights: ["700"], subsets: ["latin"] });
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
const { fontFamily: inter } = loadInter("normal", { weights: ["300", "400", "600"], subsets: ["latin"] });

const stats = [
  { value: "€250K", label: "Minimum Investment" },
  { value: "5-7%", label: "Annual Rental Yield" },
  { value: "27", label: "EU Countries Access" },
  { value: "60 Days", label: "Approval Timeline" },
];

export const SceneStats = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #14120e 0%, #0a0a0a 50%, #110f0a 100%)" }} />

      {/* Large decorative number */}
      <div
        style={{
          position: "absolute",
          top: -40,
          right: 60,
          fontFamily: playfair,
          fontSize: 320,
          fontWeight: 700,
          color: "rgba(201,168,76,0.04)",
          lineHeight: 1,
        }}
      >
        GV
      </div>

      {/* Title */}
      {(() => {
        const sp = spring({ frame: frame - 5, fps, config: { damping: 20 } });
        return (
          <div style={{ position: "absolute", top: 120, left: 0, right: 0, textAlign: "center", opacity: sp, transform: `translateY(${interpolate(sp, [0, 1], [40, 0])}px)` }}>
            <h2 style={{ fontFamily: playfair, fontSize: 48, fontWeight: 700, color: "white", margin: 0 }}>
              By The <span style={{ color: "#C9A84C" }}>Numbers</span>
            </h2>
          </div>
        );
      })()}

      {/* Stats row */}
      <div style={{ position: "absolute", top: 320, left: 80, right: 80, display: "flex", justifyContent: "space-around" }}>
        {stats.map((s, i) => {
          const delay = 15 + i * 12;
          const sp = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 120 } });
          const y = interpolate(sp, [0, 1], [50, 0]);

          // Counter animation for numbers
          const progress = interpolate(frame, [delay, delay + 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <div key={i} style={{ textAlign: "center", opacity: sp, transform: `translateY(${y}px)` }}>
              <div style={{ fontFamily: playfair, fontSize: 64, fontWeight: 700, color: "#C9A84C", marginBottom: 8, lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontFamily: inter, fontSize: 18, fontWeight: 300, color: "rgba(255,255,255,0.6)", letterSpacing: 1 }}>
                {s.label}
              </div>
              {/* Underline accent */}
              <div style={{ width: interpolate(sp, [0, 1], [0, 60]), height: 2, background: "#C9A84C", margin: "12px auto 0", borderRadius: 1 }} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
