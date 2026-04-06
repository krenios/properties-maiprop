import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cormorant";
import { loadFont as loadRaleway } from "@remotion/google-fonts/Raleway";

const { fontFamily: serif } = loadFont("normal", { weights: ["600", "700"], subsets: ["latin"] });
const { fontFamily: sans } = loadRaleway("normal", { weights: ["300", "400"], subsets: ["latin"] });

const properties = [
  { title: "Plaka Residence", location: "Athens Historic Center", price: "€285,000", beds: "2 Bed", size: "78m²", color: "#D4622B" },
  { title: "Kolonaki Penthouse", location: "Athens Premium District", price: "€520,000", beds: "3 Bed", size: "125m²", color: "#F5A623" },
  { title: "Glyfada Villa", location: "Athens Riviera", price: "€750,000", beds: "4 Bed", size: "210m²", color: "#E8813A" },
];

const PropertyCard = ({ p, index }: { p: typeof properties[0]; index: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = index * 12;
  const s = spring({ frame: frame - delay, fps, config: { damping: 16, stiffness: 130 } });
  const op = interpolate(frame, [delay, delay + 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(s, [0, 1], [100, 0]);
  const scale = interpolate(s, [0, 1], [0.92, 1]);

  return (
    <div style={{
      opacity: op, transform: `translateY(${y}px) scale(${scale})`,
      background: "linear-gradient(135deg, rgba(45,18,0,0.9), rgba(26,10,0,0.95))",
      border: `1px solid ${p.color}33`, borderRadius: 16,
      padding: "32px 30px", marginBottom: 24,
    }}>
      <div style={{
        width: 40, height: 3, backgroundColor: p.color, marginBottom: 16, borderRadius: 2,
      }} />
      <div style={{ fontFamily: serif, fontSize: 34, color: "#FFF5E6", fontWeight: 700 }}>
        {p.title}
      </div>
      <div style={{ fontFamily: sans, fontSize: 20, color: "#FFD9A0", fontWeight: 300, marginTop: 6 }}>
        {p.location}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, alignItems: "center" }}>
        <div style={{ fontFamily: serif, fontSize: 36, color: p.color, fontWeight: 600 }}>
          {p.price}
        </div>
        <div style={{ fontFamily: sans, fontSize: 18, color: "#FFD9A088" }}>
          {p.beds} · {p.size}
        </div>
      </div>
    </div>
  );
};

export const ScenePropertiesV3 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const headY = interpolate(spring({ frame, fps, config: { damping: 22 } }), [0, 1], [40, 0]);

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(180deg, #1a0a00 0%, #0f0600 100%)",
    }}>
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "60px 50px",
      }}>
        <div style={{
          fontFamily: serif, fontSize: 48, fontWeight: 600, color: "#F5A623",
          textAlign: "center", opacity: headOp, transform: `translateY(${headY}px)`,
          marginBottom: 50,
        }}>
          Featured Properties
        </div>

        {properties.map((p, i) => (
          <Sequence key={i} from={15}>
            <PropertyCard p={p} index={i} />
          </Sequence>
        ))}
      </div>
    </AbsoluteFill>
  );
};
