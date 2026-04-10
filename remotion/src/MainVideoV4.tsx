import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { slide } from "@remotion/transitions/slide";
import { SceneHeroV4 } from "./scenes/SceneHeroV4";
import { ScenePropertiesV4 } from "./scenes/ScenePropertiesV4";
import { SceneVisaV4 } from "./scenes/SceneVisaV4";
import { SceneCTAV3 } from "./scenes/SceneCTAV3";

export const MainVideoV4 = () => {
  const t = springTiming({ config: { damping: 200 }, durationInFrames: 20 });

  return (
    <AbsoluteFill style={{ background: "#1a0a00" }}>
      <TransitionSeries>
        {/* Hero intro - 5.5s */}
        <TransitionSeries.Sequence durationInFrames={165}>
          <SceneHeroV4 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        {/* Properties showcase - 16s (2 groups x 8s) */}
        <TransitionSeries.Sequence durationInFrames={480}>
          <ScenePropertiesV4 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom" })} timing={t} />
        {/* Quick visa stats - 4.5s */}
        <TransitionSeries.Sequence durationInFrames={135}>
          <SceneVisaV4 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={t} />
        {/* CTA - 4s */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <SceneCTAV3 />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
