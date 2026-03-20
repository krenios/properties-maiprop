import React, { Suspense } from "react";
import type { MapViewProps } from "./MapView";

const MapViewImpl = React.lazy(() =>
  import("./MapView").then((mod) => ({ default: mod.MapView }))
);

export function LazyMapView(props: MapViewProps) {
  const { height } = props;

  return (
    <Suspense
      fallback={
        <div
          style={{ width: "100%", height: height ?? 420, background: "rgba(0,0,0,0.03)" }}
          className="rounded-md"
        >
          Loading map...
        </div>
      }
    >
      <MapViewImpl {...props} />
    </Suspense>
  );
}

