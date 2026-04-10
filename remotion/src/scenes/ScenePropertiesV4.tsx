import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cormorant";
import { loadFont as loadRaleway } from "@remotion/google-fonts/Raleway";

const { fontFamily: serif } = loadFont("normal", { weights: ["600", "700"], subsets: ["latin"] });
const { fontFamily: sans } = loadRaleway("normal", { weights: ["300", "400"], subsets: ["latin"] });

const properties = [
  {
    title: "Historical Building",
    location: "Thessaloniki",
    price: "€325,000",
    beds: 2, size: "75m²",
    yield: "3.5%",
    tags: ["Neoclassical", "Balcony"],
    color: "#D4622B",
    highlight: "Golden Visa Eligible",
  },
  {
    title: "Family House",
    location: "Agioi Anargiroi, Athens",
    price: "€340,000",
    beds: 3, size: "102m²",
    yield: "4%",
    tags: ["Under Construction", "Parking"],
    color: "#E8813A",
    highlight: "New Build · 2025 Delivery",
  },
  {
    title: "Investment Opportunity",
    location: "Piraeus",
    price: "€250,000",
    beds: 1, size: "45m²",
    yield: "4%",
    tags: ["Ready", "City Center"],
    color: "#C47A2B",
    highlight: "Lowest Entry Price",
  },
  {
    title: "Coastline Apartment",
    location: "Glyfada, Athens Riviera",
    price: "€360,000",
    beds: 1, size: "49m²",
    yield: "4.2%",
    tags: ["Terrace", "Beachfront"],
    color: "#F5A623",
    highlight: "Premium Location",
  },
  {
    title: "Family House",
    location: "Agioi Anargiroi, Athens",
    price: "€325,000",
    beds: 2, size: "100m²",
    yield: "3.5%",
    tags: ["Balcony", "Parking"],
    color: "#D4622B",
    highlight: "Move-in Ready",
  },
  {
    title: "Cozy Apartment",
    location: "Agioi Anargiroi, Athens",
    price: "€250,000",
    beds: 2, size: "55m²",
    yield: "4.8%",
    tags: ["Balcony", "Parking"],
    color: "#E8813A",
    highlight: "Highest Yield · 4.8%",
  },
];

// Show properties in 2 groups of 3, each group gets ~240 frames
const GROUP_DURATION = 240;

export const ScenePropertiesV4 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const groupIndex = Math.min(Math.floor(frame / GROUP_DURATION), 1);
  const groupFrame = frame - groupIndex * GROUP_DURATION;
  const group = properties.slice(groupIndex * 3, groupIndex * 3 + 3);

  // Group transition
  const groupOp = groupIndex === 1
    ? interpolate(groupFrame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  const headOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const headY = interpolate(spring({ frame, fps, config: { damping: 22 } }), [0, 1], [40, 0]);

  // Counter text
  const counterText = groupIndex === 0 ? "1 — 3 of 6" : "4 — 6 of 6";

  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #1a0a00 0%, #0f0600 100%)" }}>
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: "50px 44px",
      }}>
        {/* Header */}
        <div style={{
          fontFamily: serif, fontSize: 46, fontWeight: 600, color: "#F5A623",
          textAlign: "center", opacity: headOp, transform: `translateY(${headY}px)`,
          marginBottom: 10, width: "100%",
        }}>
          Featured Properties
        </div>
        <div style={{
          fontFamily: sans, fontSize: 16, color: "#FFD9A066", fontWeight: 300,
          letterSpacing: 3, textTransform: "uppercase", marginBottom: 36,
          opacity: headOp,
        }}>
          {counterText}
        </div>

        {/* Property cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", opacity: groupOp }}>
          {group.map((p, i) => {
            const delay = (groupIndex === 0 ? 18 : 0) + i * 20;
            const adjustedFrame = groupFrame;
            const s = spring({ frame: adjustedFrame - delay, fps, config: { damping: 14, stiffness: 140 } });
            const op = interpolate(adjustedFrame, [delay, delay + 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const y = interpolate(s, [0, 1], [50, 0]);
            const scale = interpolate(s, [0, 1], [0.96, 1]);

            const tagDelay = delay + 16;
            const tagOp = interpolate(adjustedFrame, [tagDelay, tagDelay + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div key={`${groupIndex}-${i}`} style={{
                opacity: op, transform: `translateY(${y}px) scale(${scale})`,
                background: "linear-gradient(135deg, rgba(45,18,0,0.92), rgba(26,10,0,0.96))",
                border: `1px solid ${p.color}33`, borderRadius: 16,
                padding: "20px 24px",
              }}>
                {/* Color accent */}
                <div style={{ width: 36, height: 3, backgroundColor: p.color, marginBottom: 10, borderRadius: 2 }} />

                {/* Title + Price row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ fontFamily: serif, fontSize: 26, color: "#FFF5E6", fontWeight: 700, flex: 1, marginRight: 10 }}>
                    {p.title}
                  </div>
                  <div style={{ fontFamily: serif, fontSize: 26, color: p.color, fontWeight: 600, whiteSpace: "nowrap" }}>
                    {p.price}
                  </div>
                </div>

                {/* Details row */}
                <div style={{ fontFamily: sans, fontSize: 16, color: "#FFD9A0", fontWeight: 300, marginTop: 3 }}>
                  {p.location} · {p.beds} Bed · {p.size} · {p.yield} yield
                </div>

                {/* Tags row */}
                <div style={{ marginTop: 8, display: "flex", gap: 7, opacity: tagOp, flexWrap: "wrap" }}>
                  {p.tags.map((tag, ti) => (
                    <div key={ti} style={{
                      fontFamily: sans, fontSize: 13, fontWeight: 400,
                      color: "#FFE8C8", backgroundColor: `${p.color}22`,
                      border: `1px solid ${p.color}44`,
                      borderRadius: 20, padding: "2px 12px",
                    }}>
                      {tag}
                    </div>
                  ))}
                </div>

                {/* Highlight */}
                <div style={{ marginTop: 8, opacity: tagOp, display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: p.color, boxShadow: `0 0 8px ${p.color}88` }} />
                  <div style={{ fontFamily: sans, fontSize: 15, fontWeight: 400, color: "#FFE8C8", letterSpacing: 0.3 }}>
                    {p.highlight}
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
