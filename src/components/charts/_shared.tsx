"use client";

import type { ReactNode } from "react";

export const AXIS = {
  tick: { fontSize: 11, fill: "#8b938c", fontWeight: 500 },
  tickStrong: { fontSize: 11, fill: "#586159", fontWeight: 500 },
  line: "#e7ebe7",
  grid: "#eef1ee",
};

export const CHART_COLORS = {
  emerald: "#12a67a",
  emeraldDark: "#0c8763",
  blue: "#2f6df0",
  amber: "#f5a623",
  purple: "#8b5cf6",
  pink: "#ec7a9e",
  coral: "#ec7a4d",
  cyan: "#0ea5b7",
  red: "#dc3d3d",
  track: "#eef2ee",
};

/** Contenedor estilizado para tooltips de recharts */
export function TooltipBox({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="min-w-[168px] rounded-xl border border-line-hairline bg-surface-card px-3.5 py-2.5 shadow-lifted">
      {title && <p className="mb-1.5 text-[13px] font-bold leading-snug text-ink-primary">{title}</p>}
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

export function TooltipRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center justify-between gap-5 text-[12px]">
      <span className="flex items-center gap-1.5 text-ink-secondary">
        {color && <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: color }} />}
        {label}
      </span>
      <span className="font-semibold tabular-nums text-ink-primary">{value}</span>
    </div>
  );
}
