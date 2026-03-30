import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { slide } from "@remotion/transitions/slide";
import { SceneHero } from "./scenes/SceneHero";
import { SceneBenefits } from "./scenes/SceneBenefits";
import { SceneProperties } from "./scenes/SceneProperties";
import { SceneStats } from "./scenes/SceneStats";
import { SceneCTA } from "./scenes/SceneCTA";

// Total: 210+200+270+120+100 = 900, minus 4×20 transitions = 820 visible
// Adjusted durations to hit 900 total with overlaps
export const MainVideo = () => {
  const t = springTiming({ config: { damping: 200 }, durationInFrames: 20 });

  return (
    <AbsoluteFill style={{ background: "#0a0a0a" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={210}>
          <SceneHero />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={200}>
          <SceneBenefits />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={t} />
        <TransitionSeries.Sequence durationInFrames={290}>
          <SceneProperties />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={t} />
        <TransitionSeries.Sequence durationInFrames={130}>
          <SceneStats />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={150}>
          <SceneCTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
