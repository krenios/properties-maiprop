import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cormorant";
import { loadFont as loadRaleway } from "@remotion/google-fonts/Raleway";

const { fontFamily: serif } = loadFont("normal", { weights: ["600", "700"], subsets: ["latin"] });
const { fontFamily: sans } = loadRaleway("normal", { weights: ["300", "400"], subsets: ["latin"] });

export const SceneHeroV4 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoom = interpolate(frame, [0, 180], [1.0, 1.15], { extrapolateRight: "clamp" });
  const overlayOp = interpolate(frame, [0, 60], [0.8, 0.5], { extrapolateRight: "clamp" });

  const brandOp = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const lineW = interpolate(spring({ frame: frame - 30, fps, config: { damping: 200 } }), [0, 1], [0, 240]);

  const titleOp = interpolate(frame, [35, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleY = interpolate(spring({ frame: frame - 35, fps, config: { damping: 16, stiffness: 120 } }), [0, 1], [70, 0]);

  const subOp = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subY = interpolate(spring({ frame: frame - 70, fps, config: { damping: 20 } }), [0, 1], [35, 0]);

  const visaOp = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <Img
          src={staticFile("images/greece-sunset-v3.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})` }}
        />
      </div>
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(180deg, rgba(26,10,0,${overlayOp}) 0%, rgba(80,25,0,0.3) 50%, rgba(10,5,0,${overlayOp + 0.2}) 100%)`,
      }} />

      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: "60px 50px",
      }}>
        <div style={{
          opacity: brandOp, fontFamily: sans, fontSize: 24, letterSpacing: 8,
          color: "#F5A623", textTransform: "uppercase", fontWeight: 300, marginBottom: 24,
        }}>
          mAI Properties
        </div>

        <div style={{ width: lineW, height: 2, backgroundColor: "#F5A623", marginBottom: 40 }} />

        <div style={{
          fontFamily: serif, fontSize: 76, fontWeight: 700, color: "#FFF5E6",
          textAlign: "center", lineHeight: 1.1, opacity: titleOp,
          transform: `translateY(${titleY}px)`,
          textShadow: "0 4px 30px rgba(0,0,0,0.6)",
        }}>
          Premium{"\n"}Greek{"\n"}Properties
        </div>

        <div style={{
          fontFamily: sans, fontSize: 28, color: "#FFD9A0", marginTop: 35,
          opacity: subOp, transform: `translateY(${subY}px)`,
          textAlign: "center", fontWeight: 300, lineHeight: 1.5,
        }}>
          Handpicked investments across Greece
        </div>

        <div style={{
          marginTop: 40, opacity: visaOp, display: "flex", alignItems: "center", gap: 12,
          padding: "12px 28px", borderRadius: 30,
          background: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.3)",
        }}>
          <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#F5A623", boxShadow: "0 0 10px #F5A62388" }} />
          <div style={{ fontFamily: sans, fontSize: 20, color: "#FFE8C8", fontWeight: 400, letterSpacing: 0.5 }}>
            Golden Visa Eligible · From €250K
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
