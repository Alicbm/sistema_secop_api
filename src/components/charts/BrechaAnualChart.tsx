"use client";

import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import brecha from "@/data/brecha_anual.json";
import { formatCOPAxis, formatCOPShort, formatPct } from "@/lib/format";
import { AXIS, CHART_COLORS, TooltipBox, TooltipRow } from "./_shared";

const data = brecha.map((b) => ({
  anio: String(b.anio),
  contratado: b.contratado_cop,
  pagado: b.pagado_cop,
  pct: b.pct_pagado,
}));

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const p = payload[0]?.payload;
  return (
    <TooltipBox title={label}>
      <TooltipRow label="Contratado" value={formatCOPShort(p.contratado)} color="#c7cdc7" />
      <TooltipRow label="Pagado (registrado)" value={formatCOPShort(p.pagado)} color={CHART_COLORS.amber} />
      <TooltipRow label="% pagado" value={formatPct(p.pct)} />
    </TooltipBox>
  );
}

export default function BrechaAnualChart() {
  return (
    <div className="w-full">
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 18, right: 8, left: 0, bottom: 0 }} barGap={3}>
            <CartesianGrid stroke={AXIS.grid} vertical={false} />
            <XAxis dataKey="anio" tick={AXIS.tickStrong} axisLine={{ stroke: AXIS.line }} tickLine={false} />
            <YAxis tickFormatter={formatCOPAxis} tick={AXIS.tick} axisLine={false} tickLine={false} width={48} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f6f3" }} />
            <Bar dataKey="contratado" fill="#cdd3cd" radius={[5, 5, 0, 0]} maxBarSize={30} />
            <Bar dataKey="pagado" fill={CHART_COLORS.amber} radius={[5, 5, 0, 0]} maxBarSize={30}>
              <LabelList dataKey="pct" position="top" offset={6} formatter={(v: number) => formatPct(v)} style={{ fill: "#586159", fontSize: 10.5, fontWeight: 700 }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-t border-line-hairline pt-3">
        <div className="flex items-center gap-1.5 text-xs font-medium text-ink-secondary">
          <span className="h-2.5 w-2.5 rounded-[3px] bg-[#cdd3cd]" /> Contratado
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-ink-secondary">
          <span className="h-2.5 w-2.5 rounded-[3px]" style={{ backgroundColor: CHART_COLORS.amber }} /> Pagado (registrado en SECOP II)
        </div>
      </div>
    </div>
  );
}
