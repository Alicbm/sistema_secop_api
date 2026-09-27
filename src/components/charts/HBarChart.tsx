"use client";

import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AXIS, TooltipBox, TooltipRow } from "./_shared";

export type HBarRow = {
  name: string;
  value: number;
  tipLabel: string;
  tooltipTitle: string;
  tooltipRows: { label: string; value: string; color?: string }[];
};

function trunc(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload as HBarRow;
  return (
    <TooltipBox title={p.tooltipTitle}>
      {p.tooltipRows.map((r, i) => (
        <TooltipRow key={i} label={r.label} value={r.value} color={r.color} />
      ))}
    </TooltipBox>
  );
}

export default function HBarChart({
  data,
  color = "#12a67a",
  height = 320,
  yWidth = 176,
  barSize = 16,
  nameMax = 30,
  tipColor = "#586159",
  gradient = false,
}: {
  data: HBarRow[];
  color?: string;
  height?: number;
  yWidth?: number;
  barSize?: number;
  nameMax?: number;
  tipColor?: string;
  gradient?: boolean;
}) {
  const rows = [...data].sort((a, b) => a.value - b.value); // asc → mayor arriba en layout vertical
  const gid = `hbar-${color.replace("#", "")}`;
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} layout="vertical" margin={{ top: 4, right: 56, left: 4, bottom: 4 }} barCategoryGap={10}>
          {gradient && (
            <defs>
              <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={color} stopOpacity={0.75} />
                <stop offset="100%" stopColor={color} stopOpacity={1} />
              </linearGradient>
            </defs>
          )}
          <CartesianGrid stroke={AXIS.grid} horizontal={false} />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ ...AXIS.tickStrong }}
            tickFormatter={(v: string) => trunc(v, nameMax)}
            axisLine={false}
            tickLine={false}
            width={yWidth}
            interval={0}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f6f3" }} />
          <Bar dataKey="value" fill={gradient ? `url(#${gid})` : color} radius={[0, 6, 6, 0]} maxBarSize={barSize}>
            <LabelList
              dataKey="tipLabel"
              position="right"
              offset={8}
              style={{ fill: tipColor, fontSize: 11.5, fontWeight: 700 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
