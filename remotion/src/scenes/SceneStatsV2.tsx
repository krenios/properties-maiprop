import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cormorant";
const { fontFamily: display } = loadFont("normal", { weights: ["700"], subsets: ["latin"] });
import { loadFont as loadRaleway } from "@remotion/google-fonts/Raleway";
const { fontFamily: body } = loadRaleway("normal", { weights: ["300", "400", "600"], subsets: ["latin"] });

const ACCENT = "#2AABB3";
const ACCENT_LIGHT = "#5DD9E0";

const stats = [
  { value: "€250K", label: "Minimum Investment" },
  { value: "5-7%", label: "Annual Rental Yield" },
  { value: "27", label: "EU Countries Access" },
  { value: "60 Days", label: "Approval Timeline" },
];

export const SceneStatsV2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #091e2c 0%, #071a26 50%, #0a2030 100%)" }} />

      {/* Large watermark */}
      <div
        style={{
          position: "absolute",
          top: -30,
          right: 50,
          fontFamily: display,
          fontSize: 300,
          fontWeight: 700,
          color: "rgba(42,171,179,0.04)",
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
            <h2 style={{ fontFamily: display, fontSize: 50, fontWeight: 700, color: "white", margin: 0 }}>
              By The <span style={{ color: ACCENT_LIGHT }}>Numbers</span>
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

          return (
            <div key={i} style={{ textAlign: "center", opacity: sp, transform: `translateY(${y}px)` }}>
              <div style={{ fontFamily: display, fontSize: 64, fontWeight: 700, color: ACCENT_LIGHT, marginBottom: 8, lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontFamily: body, fontSize: 17, fontWeight: 300, color: "rgba(255,255,255,0.55)", letterSpacing: 1 }}>
                {s.label}
              </div>
              <div style={{ width: interpolate(sp, [0, 1], [0, 60]), height: 2, background: ACCENT, margin: "12px auto 0", borderRadius: 1 }} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
