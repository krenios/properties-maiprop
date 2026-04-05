import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { slide } from "@remotion/transitions/slide";
import { SceneHeroV2 } from "./scenes/SceneHeroV2";
import { SceneBenefitsV2 } from "./scenes/SceneBenefitsV2";
import { ScenePropertiesV2 } from "./scenes/ScenePropertiesV2";
import { SceneStatsV2 } from "./scenes/SceneStatsV2";
import { SceneCTAV2 } from "./scenes/SceneCTAV2";

export const MainVideoV2 = () => {
  const t = springTiming({ config: { damping: 200 }, durationInFrames: 20 });

  return (
    <AbsoluteFill style={{ background: "#071a26" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={210}>
          <SceneHeroV2 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={200}>
          <SceneBenefitsV2 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={t} />
        <TransitionSeries.Sequence durationInFrames={290}>
          <ScenePropertiesV2 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={t} />
        <TransitionSeries.Sequence durationInFrames={130}>
          <SceneStatsV2 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={150}>
          <SceneCTAV2 />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
