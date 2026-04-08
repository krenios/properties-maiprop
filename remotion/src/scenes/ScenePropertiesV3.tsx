import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cormorant";
import { loadFont as loadRaleway } from "@remotion/google-fonts/Raleway";

const { fontFamily: serif } = loadFont("normal", { weights: ["600", "700"], subsets: ["latin"] });
const { fontFamily: sans } = loadRaleway("normal", { weights: ["300", "400"], subsets: ["latin"] });

const properties = [
  {
    title: "Ideal Investment in a Historical Building",
    location: "Thessaloniki",
    price: "€325,000",
    beds: "2 Bed", size: "75m²",
    color: "#D4622B",
    opportunity: "Golden Visa eligible · 3.5% rental yield",
    tags: ["Neoclassical", "Balcony"],
  },
  {
    title: "Family House in West Athens",
    location: "Agioi Anargiroi",
    price: "€340,000",
    beds: "3 Bed", size: "102m²",
    color: "#F5A623",
    opportunity: "Under Construction · 4% rental yield",
    tags: ["Balcony", "Parking"],
  },
  {
    title: "Coastline Apartment",
    location: "Glyfada, Athens Riviera",
    price: "€360,000",
    beds: "1 Bed", size: "49m²",
    color: "#E8813A",
    opportunity: "Beachfront living · 4.2% rental yield",
    tags: ["Terrace", "Ready"],
  },
];

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
        justifyContent: "center", alignItems: "center", padding: "60px 50px",
      }}>
        <div style={{
          fontFamily: serif, fontSize: 48, fontWeight: 600, color: "#F5A623",
          textAlign: "center", opacity: headOp, transform: `translateY(${headY}px)`,
          marginBottom: 44, width: "100%",
        }}>
          Investment Opportunities
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, width: "100%" }}>
          {properties.map((p, i) => {
            const delay = 20 + i * 22;
            const s = spring({ frame: frame - delay, fps, config: { damping: 16, stiffness: 130 } });
            const op = interpolate(frame, [delay, delay + 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const y = interpolate(s, [0, 1], [60, 0]);
            const scale = interpolate(s, [0, 1], [0.95, 1]);

            const tagDelay = delay + 18;
            const tagOp = interpolate(frame, [tagDelay, tagDelay + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div key={i} style={{
                opacity: op, transform: `translateY(${y}px) scale(${scale})`,
                background: "linear-gradient(135deg, rgba(45,18,0,0.9), rgba(26,10,0,0.95))",
                border: `1px solid ${p.color}33`, borderRadius: 16,
                padding: "24px 28px",
              }}>
                <div style={{
                  width: 40, height: 3, backgroundColor: p.color, marginBottom: 12, borderRadius: 2,
                }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ fontFamily: serif, fontSize: 28, color: "#FFF5E6", fontWeight: 700, flex: 1, marginRight: 12 }}>
                    {p.title}
                  </div>
                  <div style={{ fontFamily: serif, fontSize: 28, color: p.color, fontWeight: 600, whiteSpace: "nowrap" }}>
                    {p.price}
                  </div>
                </div>
                <div style={{ fontFamily: sans, fontSize: 17, color: "#FFD9A0", fontWeight: 300, marginTop: 2 }}>
                  {p.location} · {p.beds} · {p.size}
                </div>
                {/* Tags row */}
                <div style={{
                  marginTop: 10, display: "flex", gap: 8, opacity: tagOp, flexWrap: "wrap",
                }}>
                  {p.tags.map((tag, ti) => (
                    <div key={ti} style={{
                      fontFamily: sans, fontSize: 14, fontWeight: 400,
                      color: "#FFE8C8", backgroundColor: `${p.color}22`,
                      border: `1px solid ${p.color}44`,
                      borderRadius: 20, padding: "3px 14px",
                    }}>
                      {tag}
                    </div>
                  ))}
                </div>
                {/* Opportunity tag */}
                <div style={{
                  marginTop: 10, opacity: tagOp,
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: 4,
                    backgroundColor: p.color,
                    boxShadow: `0 0 8px ${p.color}88`,
                  }} />
                  <div style={{
                    fontFamily: sans, fontSize: 17, fontWeight: 400,
                    color: "#FFE8C8",
                    letterSpacing: 0.3,
                  }}>
                    {p.opportunity}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
