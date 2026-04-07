import { useState, useEffect, useCallback, useMemo } from "react";
import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig, Sequence } from "remotion";
import { createTikTokStyleCaptions } from "@remotion/captions";
import type { Caption, TikTokPage } from "@remotion/captions";
import { loadFont as loadRaleway } from "@remotion/google-fonts/Raleway";

const { fontFamily: sans } = loadRaleway("normal", { weights: ["400", "700"], subsets: ["latin"] });

const SWITCH_CAPTIONS_EVERY_MS = 1800;
const HIGHLIGHT_COLOR = "#F5A623";

const CaptionPage: React.FC<{ page: TikTokPage }> = ({ page }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTimeMs = (frame / fps) * 1000;
  const absoluteTimeMs = page.startMs + currentTimeMs;

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 140 }}>
      <div style={{
        backgroundColor: "rgba(10, 5, 0, 0.75)",
        borderRadius: 14, padding: "14px 28px",
        maxWidth: 900,
      }}>
        <div style={{
          fontFamily: sans, fontSize: 38, fontWeight: 700,
          textAlign: "center", whiteSpace: "pre-wrap", lineHeight: 1.35,
        }}>
          {page.tokens.map((token) => {
            const isActive = token.fromMs <= absoluteTimeMs && token.toMs > absoluteTimeMs;
            return (
              <span key={token.fromMs} style={{
                color: isActive ? HIGHLIGHT_COLOR : "#FFFFFF",
                textShadow: isActive ? `0 0 12px ${HIGHLIGHT_COLOR}66` : "0 2px 4px rgba(0,0,0,0.5)",
                transition: "none",
              }}>
                {token.text}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const CaptionsOverlay: React.FC = () => {
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const { fps } = useVideoConfig();
  const [handle, setHandle] = useState<number | null>(null);

  const { delayRender, continueRender, cancelRender } = (() => {
    try {
      const { delayRender, continueRender, cancelRender } = require("remotion");
      return { delayRender, continueRender, cancelRender };
    } catch {
      return { delayRender: () => 0, continueRender: () => {}, cancelRender: () => {} };
    }
  })();

  useEffect(() => {
    const h = delayRender();
    setHandle(h);
    fetch(staticFile("captions-v3.json"))
      .then((r) => r.json())
      .then((data: Caption[]) => {
        setCaptions(data);
        continueRender(h);
      })
      .catch((e) => cancelRender(e));
  }, []);

  const pages = useMemo(() => {
    if (!captions) return [];
    const { pages } = createTikTokStyleCaptions({
      captions,
      combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
    });
    return pages;
  }, [captions]);

  if (!captions) return null;

  return (
    <AbsoluteFill>
      {pages.map((page, index) => {
        const nextPage = pages[index + 1] ?? null;
        const startFrame = (page.startMs / 1000) * fps;
        const endFrame = Math.min(
          nextPage ? (nextPage.startMs / 1000) * fps : Infinity,
          startFrame + (SWITCH_CAPTIONS_EVERY_MS / 1000) * fps,
        );
        const durationInFrames = Math.max(1, Math.round(endFrame - startFrame));

        return (
          <Sequence key={index} from={Math.round(startFrame)} durationInFrames={durationInFrames}>
            <CaptionPage page={page} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
