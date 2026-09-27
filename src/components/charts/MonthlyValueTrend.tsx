"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import serie from "@/data/serie_modalidad_mensual.json";
import { formatCOPAxis, formatCOPShort, formatMesCorto, formatMesEje, formatNumber, yearlyTicks } from "@/lib/format";
import { AXIS, CHART_COLORS, TooltipBox, TooltipRow } from "./_shared";

const data = serie.map((d) => ({ mes: d.mes, valor: d.valor_cop, n: d.n_contratos }));
const ticks = yearlyTicks(data.map((d) => d.mes));

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <TooltipBox title={formatMesCorto(label)}>
      <TooltipRow label="Valor contratado" value={formatCOPShort(p.valor)} color={CHART_COLORS.emerald} />
      <TooltipRow label="N.º de contratos" value={formatNumber(p.n)} />
    </TooltipBox>
  );
}

export default function MonthlyValueTrend({ height = 288 }: { height?: number }) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="fillValor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART_COLORS.emerald} stopOpacity={0.24} />
              <stop offset="100%" stopColor={CHART_COLORS.emerald} stopOpacity={0.02} />
            </linearGradient>
          </defs>
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
          <YAxis tickFormatter={formatCOPAxis} tick={AXIS.tick} axisLine={false} tickLine={false} width={50} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#d5dad5", strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="valor"
            stroke={CHART_COLORS.emeraldDark}
            strokeWidth={2.5}
            fill="url(#fillValor)"
            activeDot={{ r: 4.5, strokeWidth: 2, stroke: "#fff", fill: CHART_COLORS.emeraldDark }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
