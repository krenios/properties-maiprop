import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cormorant";
import { loadFont as loadRaleway } from "@remotion/google-fonts/Raleway";

const { fontFamily: serif } = loadFont("normal", { weights: ["700"], subsets: ["latin"] });
const { fontFamily: sans } = loadRaleway("normal", { weights: ["300", "400"], subsets: ["latin"] });

export const SceneHeroV3 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoom = interpolate(frame, [0, 210], [1.05, 1.18], { extrapolateRight: "clamp" });
  const overlayOp = interpolate(frame, [0, 60], [0.7, 0.45], { extrapolateRight: "clamp" });

  const titleY = interpolate(
    spring({ frame: frame - 20, fps, config: { damping: 18, stiffness: 120 } }),
    [0, 1], [80, 0]
  );
  const titleOp = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const subtitleOp = interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subtitleY = interpolate(
    spring({ frame: frame - 50, fps, config: { damping: 20 } }),
    [0, 1], [40, 0]
  );

  const lineW = interpolate(
    spring({ frame: frame - 35, fps, config: { damping: 200 } }),
    [0, 1], [0, 200]
  );

  const tagOp = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <Img
          src={staticFile("images/greece-sunset-v3.jpg")}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: `scale(${zoom})`,
          }}
        />
      </div>
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(180deg, rgba(26,10,0,${overlayOp}) 0%, rgba(139,37,0,0.25) 50%, rgba(26,10,0,${overlayOp + 0.15}) 100%)`,
      }} />

      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: "60px 50px",
      }}>
        <div style={{
          opacity: tagOp, fontFamily: sans, fontSize: 28, letterSpacing: 6,
          color: "#F5A623", textTransform: "uppercase", marginBottom: 30,
          fontWeight: 300,
        }}>
          mAI Properties
        </div>

        <div style={{
          width: lineW, height: 2, backgroundColor: "#F5A623", marginBottom: 40,
        }} />

        <div style={{
          fontFamily: serif, fontSize: 82, fontWeight: 700, color: "#FFF5E6",
          textAlign: "center", lineHeight: 1.1, opacity: titleOp,
          transform: `translateY(${titleY}px)`,
          textShadow: "0 4px 30px rgba(0,0,0,0.5)",
        }}>
          Your Gateway{"\n"}to the EU
        </div>

        <div style={{
          fontFamily: sans, fontSize: 32, color: "#FFD9A0", marginTop: 30,
          opacity: subtitleOp, transform: `translateY(${subtitleY}px)`,
          textAlign: "center", fontWeight: 300, lineHeight: 1.5,
          textShadow: "0 2px 15px rgba(0,0,0,0.4)",
        }}>
          Greek Golden Visa
        </div>
      </div>
    </AbsoluteFill>
  );
};
