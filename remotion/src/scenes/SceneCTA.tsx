import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Playfair";
const { fontFamily: playfair } = loadFont("normal", { weights: ["600", "700"], subsets: ["latin"] });
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
const { fontFamily: inter } = loadInter("normal", { weights: ["300", "400"], subsets: ["latin"] });

export const SceneCTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoSp = spring({ frame: frame - 10, fps, config: { damping: 20, stiffness: 100 } });
  const logoScale = interpolate(logoSp, [0, 1], [0.7, 1]);
  const logoOp = interpolate(logoSp, [0, 1], [0, 1]);

  // Main text
  const textSp = spring({ frame: frame - 30, fps, config: { damping: 22 } });
  const textY = interpolate(textSp, [0, 1], [40, 0]);

  // URL
  const urlSp = spring({ frame: frame - 50, fps, config: { damping: 25 } });
  const urlY = interpolate(urlSp, [0, 1], [30, 0]);

  // Pulsing gold glow behind logo
  const glowScale = 1 + Math.sin(frame * 0.06) * 0.05;
  const glowOp = 0.15 + Math.sin(frame * 0.04) * 0.05;

  // Decorative lines
  const line1W = interpolate(frame, [40, 80], [0, 300], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line2W = interpolate(frame, [45, 85], [0, 300], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, #1a1510 0%, #0a0a0a 70%)" }} />

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.2) 0%, transparent 70%)",
          transform: `translate(-50%, -60%) scale(${glowScale})`,
          opacity: glowOp,
        }}
      />

      {/* Content */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {/* Logo */}
        <Img
          src={staticFile("images/logo.png")}
          style={{
            height: 100,
            opacity: logoOp,
            transform: `scale(${logoScale})`,
            marginBottom: 30,
          }}
        />

        {/* Lines */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 30 }}>
          <div style={{ width: line1W, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A84C" }} />
          <div style={{ width: line2W, height: 1, background: "linear-gradient(270deg, transparent, #C9A84C)" }} />
        </div>

        {/* Text */}
        <div style={{ textAlign: "center", opacity: textSp, transform: `translateY(${textY}px)` }}>
          <h2 style={{ fontFamily: playfair, fontSize: 52, fontWeight: 700, color: "white", margin: "0 0 12px" }}>
            Start Your <span style={{ color: "#C9A84C" }}>Journey</span>
          </h2>
          <p style={{ fontFamily: inter, fontSize: 22, fontWeight: 300, color: "rgba(255,255,255,0.7)", margin: 0 }}>
            Explore curated Golden Visa properties
          </p>
        </div>

        {/* URL */}
        <div style={{ marginTop: 40, opacity: urlSp, transform: `translateY(${urlY}px)` }}>
          <div
            style={{
              fontFamily: inter,
              fontSize: 24,
              fontWeight: 400,
              color: "#C9A84C",
              letterSpacing: 3,
              padding: "12px 40px",
              border: "1px solid rgba(201,168,76,0.4)",
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
