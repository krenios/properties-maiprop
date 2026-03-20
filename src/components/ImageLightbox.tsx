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

  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartX.current = t?.clientX ?? null;
    touchStartY.current = t?.clientY ?? null;
    didSwipe.current = false;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
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
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close */}
      <button
        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-background/20 text-white backdrop-blur hover:bg-background/40 transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Prev */}
      {onPrev && images.length > 1 && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/20 text-white backdrop-blur hover:bg-background/40 transition-colors"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
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
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/20 px-3 py-1 text-xs text-white backdrop-blur">
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default ImageLightbox;
