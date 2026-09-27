"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import serie from "@/data/serie_modalidad_mensual.json";
import { formatMesCorto, formatMesEje, formatPct, yearlyTicks } from "@/lib/format";
import { AXIS, TooltipBox, TooltipRow } from "./_shared";

const data = serie.map((d) => ({
  mes: d.mes,
  Directa: d.pct_valor_directa,
  "Régimen especial": d.pct_valor_regimen_especial,
  Competitiva: d.pct_valor_competitiva,
}));
const ticks = yearlyTicks(data.map((d) => d.mes));

const COLORS: Record<string, string> = {
  Directa: "#8b5cf6",
  "Régimen especial": "#12a67a",
  Competitiva: "#2f6df0",
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <TooltipBox title={formatMesCorto(label)}>
      {payload
        .slice()
        .reverse()
        .map((p: any) => (
          <TooltipRow key={p.dataKey} label={p.dataKey} value={formatPct(p.value)} color={p.stroke} />
        ))}
    </TooltipBox>
  );
}

export default function ModalidadStackedArea({ height = 320 }: { height?: number }) {
  return (
    <div className="w-full">
      <div style={{ height }} className="w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={AXIS.grid} vertical={false} />
            <XAxis
              dataKey="mes"
              ticks={ticks}
              interval={0}
              tickFormatter={formatMesEje}
              tick={AXIS.tick}
              axisLine={{ stroke: AXIS.line }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickFormatter={(v: number) => `${Math.round(v)}%`}
              tick={AXIS.tick}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#d5dad5", strokeWidth: 1 }} />
            <Area type="monotone" dataKey="Competitiva" stackId="1" stroke={COLORS["Competitiva"]} fill={COLORS["Competitiva"]} fillOpacity={0.82} strokeWidth={0} />
            <Area type="monotone" dataKey="Régimen especial" stackId="1" stroke={COLORS["Régimen especial"]} fill={COLORS["Régimen especial"]} fillOpacity={0.82} strokeWidth={0} />
            <Area type="monotone" dataKey="Directa" stackId="1" stroke={COLORS["Directa"]} fill={COLORS["Directa"]} fillOpacity={0.82} strokeWidth={0} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-t border-line-hairline pt-3">
        {Object.entries(COLORS).map(([k, c]) => (
          <div key={k} className="flex items-center gap-1.5 text-xs font-medium text-ink-secondary">
            <span className="h-2.5 w-2.5 rounded-[3px]" style={{ backgroundColor: c }} /> {k}
          </div>
        ))}
      </div>
    </div>
  );
}
