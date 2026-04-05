import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cormorant";
const { fontFamily: display } = loadFont("normal", { weights: ["600", "700"], subsets: ["latin"] });
import { loadFont as loadRaleway } from "@remotion/google-fonts/Raleway";
const { fontFamily: body } = loadRaleway("normal", { weights: ["300", "400"], subsets: ["latin"] });

const ACCENT = "#2AABB3";
const ACCENT_LIGHT = "#5DD9E0";

export const SceneHeroV2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow pan right + subtle zoom
  const zoom = interpolate(frame, [0, 210], [1.05, 1.18], { extrapolateRight: "clamp" });
  const panX = interpolate(frame, [0, 210], [0, -60], { extrapolateRight: "clamp" });

  // Title clip-reveal from left
  const titleClip = interpolate(frame, [25, 55], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleOp = interpolate(frame, [25, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Subtitle fade up
  const subSp = spring({ frame: frame - 50, fps, config: { damping: 25, stiffness: 100 } });
  const subY = interpolate(subSp, [0, 1], [30, 0]);

  // Logo
  const logoOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Accent line
  const lineW = interpolate(frame, [40, 75], [0, 180], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Vignette
  const vigOp = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      {/* Hero image with pan + zoom */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <Img
          src={staticFile("images/greece-hero-v2.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${zoom}) translateX(${panX}px)`,
          }}
        />
      </div>

      {/* Cinematic overlay — deep navy gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(170deg, rgba(8,28,40,0.25) 0%, rgba(8,28,40,0.55) 40%, rgba(8,28,40,0.92) 100%)",
          opacity: vigOp,
        }}
      />

      {/* Logo top-left */}
      <Img
        src={staticFile("images/logo.png")}
        style={{
          position: "absolute",
          top: 50,
          left: 60,
          height: 65,
          opacity: logoOp,
        }}
      />

      {/* Main title — clip reveal */}
      <div
        style={{
          position: "absolute",
          bottom: 230,
          left: 100,
          right: 100,
          clipPath: `inset(0 ${titleClip}% 0 0)`,
          opacity: titleOp,
        }}
      >
        <h1
          style={{
            fontFamily: display,
            fontSize: 88,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.05,
            margin: 0,
            textShadow: "0 4px 40px rgba(0,0,0,0.5)",
          }}
        >
          Greece
          <br />
          <span style={{ color: ACCENT_LIGHT }}>Golden Visa</span>
        </h1>
      </div>

      {/* Teal accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 205,
          left: 100,
          height: 3,
          width: lineW,
          background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_LIGHT})`,
          borderRadius: 2,
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: 100,
          transform: `translateY(${subY}px)`,
          opacity: subSp,
        }}
      >
        <p
          style={{
            fontFamily: body,
            fontSize: 26,
            fontWeight: 300,
            color: "rgba(255,255,255,0.85)",
            margin: 0,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Your Gateway to European Residency
        </p>
      </div>
    </AbsoluteFill>
  );
};
