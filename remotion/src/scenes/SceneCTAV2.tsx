import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cormorant";
const { fontFamily: display } = loadFont("normal", { weights: ["600", "700"], subsets: ["latin"] });
import { loadFont as loadRaleway } from "@remotion/google-fonts/Raleway";
const { fontFamily: body } = loadRaleway("normal", { weights: ["300", "400"], subsets: ["latin"] });

const ACCENT = "#2AABB3";
const ACCENT_LIGHT = "#5DD9E0";

export const SceneCTAV2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSp = spring({ frame: frame - 10, fps, config: { damping: 20, stiffness: 100 } });
  const logoScale = interpolate(logoSp, [0, 1], [0.7, 1]);
  const logoOp = interpolate(logoSp, [0, 1], [0, 1]);

  const textSp = spring({ frame: frame - 30, fps, config: { damping: 22 } });
  const textY = interpolate(textSp, [0, 1], [40, 0]);

  const urlSp = spring({ frame: frame - 50, fps, config: { damping: 25 } });
  const urlY = interpolate(urlSp, [0, 1], [30, 0]);

  const glowScale = 1 + Math.sin(frame * 0.06) * 0.05;
  const glowOp = 0.12 + Math.sin(frame * 0.04) * 0.04;

  const line1W = interpolate(frame, [40, 80], [0, 300], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line2W = interpolate(frame, [45, 85], [0, 300], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, #0d2a36 0%, #071a26 70%)" }} />

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(42,171,179,0.18) 0%, transparent 70%)`,
          transform: `translate(-50%, -60%) scale(${glowScale})`,
          opacity: glowOp,
        }}
      />

      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Img
          src={staticFile("images/logo.png")}
          style={{
            height: 100,
            opacity: logoOp,
            transform: `scale(${logoScale})`,
            marginBottom: 30,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 30 }}>
          <div style={{ width: line1W, height: 1, background: `linear-gradient(90deg, transparent, ${ACCENT})` }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
          <div style={{ width: line2W, height: 1, background: `linear-gradient(270deg, transparent, ${ACCENT})` }} />
        </div>

        <div style={{ textAlign: "center", opacity: textSp, transform: `translateY(${textY}px)` }}>
          <h2 style={{ fontFamily: display, fontSize: 54, fontWeight: 700, color: "white", margin: "0 0 12px" }}>
            Start Your <span style={{ color: ACCENT_LIGHT }}>Journey</span>
          </h2>
          <p style={{ fontFamily: body, fontSize: 21, fontWeight: 300, color: "rgba(255,255,255,0.65)", margin: 0 }}>
            Explore curated Golden Visa properties
          </p>
        </div>

        <div style={{ marginTop: 40, opacity: urlSp, transform: `translateY(${urlY}px)` }}>
          <div
            style={{
              fontFamily: body,
              fontSize: 24,
              fontWeight: 400,
              color: ACCENT_LIGHT,
              letterSpacing: 3,
              padding: "12px 40px",
              border: `1px solid rgba(42,171,179,0.4)`,
              borderRadius: 8,
            }}
          >
            properties.maiprop.co
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
