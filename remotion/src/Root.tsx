import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import { MainVideoV2 } from "./MainVideoV2";
import { MainVideoV3 } from "./MainVideoV3";

export const RemotionRoot = () => (
  <>
    <Composition
      id="main"
      component={MainVideo}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="main-v2"
      component={MainVideoV2}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="main-v3"
      component={MainVideoV3}
      durationInFrames={900}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);
