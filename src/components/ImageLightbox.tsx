import { useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

const ImageLightbox = ({ images, index, onClose, onPrev, onNext }: Props) => {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const didSwipe = useRef(false);
  const ignoreSwipe = useRef(false);
  const closeOnce = useRef(false);

  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;

  const isControlTarget = (target: EventTarget | null) => {
    const el = target as HTMLElement | null;
    if (!el) return false;
    return !!el.closest('button[aria-label="Close"], button[aria-label="Next"], button[aria-label="Previous"]');
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartX.current = t?.clientX ?? null;
    touchStartY.current = t?.clientY ?? null;
    didSwipe.current = false;
    ignoreSwipe.current = isControlTarget(e.target);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    if (ignoreSwipe.current) {
      touchStartX.current = null;
      touchStartY.current = null;
      ignoreSwipe.current = false;
      return;
    }
    const t = e.changedTouches[0];
    const endX = t?.clientX ?? null;
    const endY = t?.clientY ?? null;
    if (endX === null || endY === null) return;

    const dx = endX - touchStartX.current;
    const dy = endY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;

    // Horizontal swipe -> previous/next
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const SWIPE_THRESHOLD = 45;
    if (absDx < SWIPE_THRESHOLD || absDx < absDy) return;

    if (dx < 0) {
      didSwipe.current = true;
      onNext?.();
    }
    if (dx > 0) {
      didSwipe.current = true;
      onPrev?.();
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        e.stopImmediatePropagation();
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    closeOnce.current = false;
    // Capture phase so ESC can't also be handled by Radix Dialog underneath.
    document.addEventListener("keydown", handleKeyDown, true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.body.style.overflow = prevOverflow;
    };
  }, [handleKeyDown]);

  const doClose = () => {
    if (closeOnce.current) return;
    closeOnce.current = true;
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      style={{ zIndex: 2147483647, pointerEvents: "auto" }}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        doClose();
      }}
      onTouchStart={(e) => {
        e.stopPropagation();
        handleTouchStart(e);
      }}
      onTouchEnd={(e) => {
        e.stopPropagation();
        handleTouchEnd(e);
      }}
    >
      {/* Close */}
      <button
        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-background/20 text-white backdrop-blur hover:bg-background/40 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          ignoreSwipe.current = true;
          didSwipe.current = false;
          doClose();
        }}
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Prev */}
      {onPrev && images.length > 1 && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/20 text-white backdrop-blur hover:bg-background/40 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            ignoreSwipe.current = true;
            onPrev();
          }}
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {/* Image */}
      <img
        src={images[index]}
        alt={`Image ${index + 1} of ${images.length}`}
        className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
        onClick={(e) => {
          // Prevent "tap image to close" on desktop; enable it on mobile for easier exit.
          e.stopPropagation();
          if (!isMobile) return;
          // If the user just swiped to navigate, suppress the "tap to close".
          if (didSwipe.current) {
            didSwipe.current = false;
            return;
          }
          onClose();
        }}
        draggable={false}
      />

      {/* Next */}
      {onNext && images.length > 1 && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/20 text-white backdrop-blur hover:bg-background/40 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            ignoreSwipe.current = true;
            onNext();
          }}
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/* Counter */}
      {images.length > 1 && (
        // Allow taps/clicks to pass through the counter so "tap image to close" works reliably on mobile.
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/20 px-3 py-1 text-xs text-white backdrop-blur">
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default ImageLightbox;
