// DropIndicator.tsx

import type { CSSProperties } from "react";
import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/types";
import { cn } from "@/lib/utils";

export type DropIndicatorProps = {
  edge: Edge;
  gap?: string;
};

const terminalSize = 8;

const line = {
  borderRadius: 0,
  thickness: 2,
  backgroundColor: "bg-white", // Assuming this maps to the correct color in your Tailwind config
};

const offsetToAlignTerminalWithLine = (line.thickness - terminalSize) / 2;

const edgeToOrientationMap: Record<Edge, "horizontal" | "vertical"> = {
  top: "horizontal",
  bottom: "horizontal",
  left: "vertical",
  right: "vertical",
};

export function DropIndicator({ edge, gap = "0px" }: DropIndicatorProps) {
  const lineOffset = `calc(-0.5 * (${gap} + ${line.thickness}px))`;

  const orientationClasses = {
    horizontal: "h-0.5 left-2 right-0 before:left-[-8px]",
    vertical: "w-0.5 top-2 bottom-0 before:top-[-8px]",
  };

  const edgeClasses = {
    top: `top-[var(${lineOffset})] before:top-[${offsetToAlignTerminalWithLine}px]`,
    // right: `right-[var(${lineOffset})] before:right-[${offsetToAlignTerminalWithLine}px]`,
    bottom: `bottom-[var(${lineOffset})] before:bottom-[${offsetToAlignTerminalWithLine}px]`,
    // left: `left-[var(${lineOffset})] before:left-[${offsetToAlignTerminalWithLine}px]`,
  };

  return (
    <div
      className={cn(
        'z-1 bg-white before:border-white pointer-events-none absolute before:absolute before:box-border before:h-2 before:w-2 before:rounded-full before:border-2 before:content-[""]',
        orientationClasses[edgeToOrientationMap[edge]],
        edgeClasses[edge]
      )}
    //   style={{ "--local-line-offset": lineOffset } as CSSProperties}
    />
  );
}

export default DropIndicator;
