import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cormorant";
import { loadFont as loadRaleway } from "@remotion/google-fonts/Raleway";

const { fontFamily: serif } = loadFont("normal", { weights: ["600", "700"], subsets: ["latin"] });
const { fontFamily: sans } = loadRaleway("normal", { weights: ["300", "400"], subsets: ["latin"] });

const properties = [
  {
    title: "Plaka Residence",
    location: "Athens Historic Center",
    price: "€285,000",
    beds: "2 Bed", size: "78m²",
    color: "#D4622B",
    opportunity: "Golden Visa eligible · 6.2% rental yield",
  },
  {
    title: "Kolonaki Penthouse",
    location: "Athens Premium District",
    price: "€520,000",
    beds: "3 Bed", size: "125m²",
    color: "#F5A623",
    opportunity: "Prime location · 18% capital appreciation",
  },
  {
    title: "Glyfada Villa",
    location: "Athens Riviera",
    price: "€750,000",
    beds: "4 Bed", size: "210m²",
    color: "#E8813A",
    opportunity: "Beachfront living · Residency for whole family",
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

            // Opportunity tag fades in after the card
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
                  <div style={{ fontFamily: serif, fontSize: 30, color: "#FFF5E6", fontWeight: 700 }}>
                    {p.title}
                  </div>
                  <div style={{ fontFamily: serif, fontSize: 30, color: p.color, fontWeight: 600 }}>
                    {p.price}
                  </div>
                </div>
                <div style={{ fontFamily: sans, fontSize: 18, color: "#FFD9A0", fontWeight: 300, marginTop: 2 }}>
                  {p.location} · {p.beds} · {p.size}
                </div>
                {/* Opportunity tag */}
                <div style={{
                  marginTop: 12, opacity: tagOp,
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
