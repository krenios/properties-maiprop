import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cormorant";
import { loadFont as loadRaleway } from "@remotion/google-fonts/Raleway";

const { fontFamily: serif } = loadFont("normal", { weights: ["600", "700"], subsets: ["latin"] });
const { fontFamily: sans } = loadRaleway("normal", { weights: ["300", "400"], subsets: ["latin"] });

export const SceneCTAV3 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s1 = spring({ frame, fps, config: { damping: 18 } });
  const headOp = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const headY = interpolate(s1, [0, 1], [60, 0]);

  const lineW = interpolate(spring({ frame: frame - 30, fps, config: { damping: 200 } }), [0, 1], [0, 180]);

  const urlOp = interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const urlY = interpolate(spring({ frame: frame - 50, fps, config: { damping: 20 } }), [0, 1], [30, 0]);

  const tagOp = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const glowPulse = interpolate(frame, [0, 150], [0, Math.PI * 4]);
  const glowRadius = 60 + Math.sin(glowPulse) * 20;

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(180deg, #1a0a00 0%, #2d1200 50%, #1a0a00 100%)",
    }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: glowRadius * 6, height: glowRadius * 6,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(212,98,43,0.15) 0%, transparent 70%)`,
        transform: "translate(-50%, -50%)",
      }} />

      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: "60px 50px",
      }}>
        <div style={{
          fontFamily: serif, fontSize: 58, fontWeight: 700, color: "#FFF5E6",
          textAlign: "center", opacity: headOp, transform: `translateY(${headY}px)`,
          lineHeight: 1.2,
        }}>
          Start Your{"\n"}Journey Today
        </div>

        <div style={{
          width: lineW, height: 2, backgroundColor: "#F5A623",
          marginTop: 35, marginBottom: 35,
        }} />

        <div style={{
          fontFamily: sans, fontSize: 34, color: "#F5A623", fontWeight: 400,
          opacity: urlOp, transform: `translateY(${urlY}px)`,
          letterSpacing: 1,
        }}>
          properties.maiprop.co
        </div>

        <div style={{
          fontFamily: sans, fontSize: 22, color: "#FFD9A088", fontWeight: 300,
          opacity: tagOp, marginTop: 30, letterSpacing: 4, textTransform: "uppercase",
        }}>
          mAI Properties
        </div>
      </div>
    </AbsoluteFill>
  );
};
