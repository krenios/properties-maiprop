import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { slide } from "@remotion/transitions/slide";
import { SceneHeroV3 } from "./scenes/SceneHeroV3";
import { SceneBenefitsV3 } from "./scenes/SceneBenefitsV3";
import { ScenePropertiesV3 } from "./scenes/ScenePropertiesV3";
import { SceneStatsV3 } from "./scenes/SceneStatsV3";
import { SceneCTAV3 } from "./scenes/SceneCTAV3";
import { CaptionsOverlay } from "./components/CaptionsOverlay";

export const MainVideoV3 = () => {
  const t = springTiming({ config: { damping: 200 }, durationInFrames: 20 });

  return (
    <AbsoluteFill style={{ background: "#1a0a00" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={210}>
          <SceneHeroV3 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={200}>
          <SceneBenefitsV3 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom" })} timing={t} />
        <TransitionSeries.Sequence durationInFrames={290}>
          <ScenePropertiesV3 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={t} />
        <TransitionSeries.Sequence durationInFrames={130}>
          <SceneStatsV3 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={150}>
          <SceneCTAV3 />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      {/* Captions overlay on top of everything */}
      <CaptionsOverlay />
    </AbsoluteFill>
  );
};
