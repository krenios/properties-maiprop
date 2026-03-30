import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Playfair";
const { fontFamily: playfair } = loadFont("normal", { weights: ["700"], subsets: ["latin"] });
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
const { fontFamily: inter } = loadInter("normal", { weights: ["300", "400"], subsets: ["latin"] });

export const SceneHero = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow Ken Burns zoom on hero image
  const zoom = interpolate(frame, [0, 210], [1.0, 1.15], { extrapolateRight: "clamp" });
  const imgY = interpolate(frame, [0, 210], [0, -30], { extrapolateRight: "clamp" });

  // Title reveal
  const titleSpring = spring({ frame: frame - 20, fps, config: { damping: 20, stiffness: 120 } });
  const titleY = interpolate(titleSpring, [0, 1], [80, 0]);
  const titleOp = interpolate(titleSpring, [0, 1], [0, 1]);

  // Subtitle
  const subSpring = spring({ frame: frame - 45, fps, config: { damping: 25, stiffness: 100 } });
  const subY = interpolate(subSpring, [0, 1], [40, 0]);
  const subOp = interpolate(subSpring, [0, 1], [0, 1]);

  // Logo
  const logoOp = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });

  // Gold line accent
  const lineW = interpolate(frame, [35, 70], [0, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Gradient overlay for text readability
  const gradientOp = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      {/* Hero image with Ken Burns */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <Img
          src={staticFile("images/greece-hero.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${zoom}) translateY(${imgY}px)`,
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.7) 60%, rgba(10,10,10,0.95) 100%)",
          opacity: gradientOp,
        }}
      />

      {/* Logo top-left */}
      <Img
        src={staticFile("images/logo.png")}
        style={{
          position: "absolute",
          top: 50,
          left: 60,
          height: 70,
          opacity: logoOp,
        }}
      />

      {/* Main title */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 100,
          right: 100,
          transform: `translateY(${titleY}px)`,
          opacity: titleOp,
        }}
      >
        <h1
          style={{
            fontFamily: playfair,
            fontSize: 82,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.1,
            margin: 0,
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
          }}
        >
          Greece
          <br />
          <span style={{ color: "#C9A84C" }}>Golden Visa</span>
        </h1>
      </div>

      {/* Gold accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 195,
          left: 100,
          height: 3,
          width: lineW,
          background: "linear-gradient(90deg, #C9A84C, #E8D48B)",
          borderRadius: 2,
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 100,
          transform: `translateY(${subY}px)`,
          opacity: subOp,
        }}
      >
        <p
          style={{
            fontFamily: inter,
            fontSize: 28,
            fontWeight: 300,
            color: "rgba(255,255,255,0.85)",
            margin: 0,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Your Gateway to European Residency
        </p>
      </div>
    </AbsoluteFill>
  );
};
