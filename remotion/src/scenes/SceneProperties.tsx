import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/Playfair";
const { fontFamily: playfair } = loadFont("normal", { weights: ["600", "700"], subsets: ["latin"] });
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
const { fontFamily: inter } = loadInter("normal", { weights: ["300", "400", "500"], subsets: ["latin"] });

const properties = [
  { img: "prop1.webp", title: "Historical Building", location: "Thessaloniki", price: "€325,000", beds: 2, size: "75 m²" },
  { img: "prop2.jpg", title: "Family House", location: "West Athens", price: "€340,000", beds: 3, size: "102 m²" },
  { img: "prop4.jpg", title: "Coastline Apartment", location: "Glyfada", price: "€360,000", beds: 1, size: "49 m²" },
  { img: "prop6.jpg", title: "Athenian Riviera Villa", location: "Sounio", price: "€850,000", beds: 4, size: "265 m²" },
  { img: "prop3.jpg", title: "Investment in Piraeus", location: "Piraeus", price: "€250,000", beds: 1, size: "45 m²" },
  { img: "prop5.jpg", title: "Family House II", location: "West Athens", price: "€325,000", beds: 2, size: "100 m²" },
];

const PropertyCard = ({ prop, index, baseFrame }: { prop: typeof properties[0]; index: number; baseFrame: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * 8;
  const sp = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 160 } });
  const cardY = interpolate(sp, [0, 1], [80, 0]);
  const cardOp = interpolate(sp, [0, 1], [0, 1]);

  // Ken Burns on each card image
  const zoom = interpolate(frame, [delay, delay + 120], [1.0, 1.12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: 540,
        flexShrink: 0,
        borderRadius: 16,
        overflow: "hidden",
        background: "#111",
        border: "1px solid rgba(201,168,76,0.12)",
        transform: `translateY(${cardY}px)`,
        opacity: cardOp,
      }}
    >
      <div style={{ height: 320, overflow: "hidden", position: "relative" }}>
        <Img
          src={staticFile(`images/${prop.img}`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${zoom})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
          }}
        />
        {/* Price badge */}
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(201,168,76,0.9)",
            color: "#0a0a0a",
            fontFamily: inter,
            fontSize: 18,
            fontWeight: 500,
            padding: "6px 16px",
            borderRadius: 8,
          }}
        >
          {prop.price}
        </div>
      </div>
      <div style={{ padding: "20px 24px" }}>
        <h3 style={{ fontFamily: playfair, fontSize: 22, fontWeight: 600, color: "white", margin: "0 0 6px" }}>{prop.title}</h3>
        <p style={{ fontFamily: inter, fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: 0 }}>
          📍 {prop.location} · {prop.beds} bed · {prop.size}
        </p>
      </div>
    </div>
  );
};

export const SceneProperties = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleSp = spring({ frame: frame - 5, fps, config: { damping: 22, stiffness: 140 } });
  const titleY = interpolate(titleSp, [0, 1], [50, 0]);

  // Scroll the property row from right to left
  const scrollX = interpolate(frame, [30, 260], [50, -1200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0d0b08 0%, #0a0a0a 50%, #0f0d0a 100%)" }} />

      {/* Section title */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 100,
          transform: `translateY(${titleY}px)`,
          opacity: titleSp,
        }}
      >
        <p style={{ fontFamily: inter, fontSize: 16, color: "#C9A84C", letterSpacing: 4, textTransform: "uppercase", margin: 0, marginBottom: 10 }}>
          Curated Portfolio
        </p>
        <h2 style={{ fontFamily: playfair, fontSize: 52, fontWeight: 700, color: "white", margin: 0 }}>
          Featured <span style={{ color: "#C9A84C" }}>Properties</span>
        </h2>
      </div>

      {/* Scrolling property cards */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 0,
          display: "flex",
          gap: 32,
          transform: `translateX(${scrollX}px)`,
          paddingLeft: 100,
          paddingRight: 100,
        }}
      >
        {properties.map((p, i) => (
          <PropertyCard key={i} prop={p} index={i} baseFrame={30} />
        ))}
      </div>

      {/* Subtle gradient edges */}
      <div style={{ position: "absolute", top: 220, left: 0, width: 120, bottom: 0, background: "linear-gradient(90deg, #0a0a0a, transparent)" }} />
      <div style={{ position: "absolute", top: 220, right: 0, width: 120, bottom: 0, background: "linear-gradient(270deg, #0a0a0a, transparent)" }} />
    </AbsoluteFill>
  );
};
