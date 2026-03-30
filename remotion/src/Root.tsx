import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";

// 30fps × 30s = 900 frames
export const RemotionRoot = () => (
  <Composition
    id="main"
    component={MainVideo}
    durationInFrames={900}
    fps={30}
    width={1920}
    height={1080}
  />
);
