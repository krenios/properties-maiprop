import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cormorant";
import { loadFont as loadRaleway } from "@remotion/google-fonts/Raleway";

const { fontFamily: serif } = loadFont("normal", { weights: ["700"], subsets: ["latin"] });
const { fontFamily: sans } = loadRaleway("normal", { weights: ["300"], subsets: ["latin"] });

const stats = [
  { value: "10,000+", label: "Visas Granted", accent: "#F5A623" },
  { value: "27", label: "EU Countries Access", accent: "#D4622B" },
  { value: "€250K", label: "Min. Investment", accent: "#E8813A" },
];

export const SceneStatsV3 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(180deg, #2d1200 0%, #1a0a00 100%)",
    }}>
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: "80px 50px", gap: 55,
      }}>
        {stats.map((s, i) => {
          const delay = i * 20;
          const sp = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 160 } });
          const op = interpolate(frame, [delay, delay + 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const scale = interpolate(sp, [0, 1], [0.6, 1]);

          return (
            <div key={i} style={{
              textAlign: "center", opacity: op, transform: `scale(${scale})`,
            }}>
              <div style={{
                fontFamily: serif, fontSize: 80, fontWeight: 700, color: s.accent,
                textShadow: `0 0 40px ${s.accent}44`,
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: sans, fontSize: 26, color: "#FFD9A0", fontWeight: 300,
                letterSpacing: 3, textTransform: "uppercase", marginTop: 8,
              }}>
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
