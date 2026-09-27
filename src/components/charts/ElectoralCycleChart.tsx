"use client";

import { Area, AreaChart, CartesianGrid, ReferenceArea, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import serie from "@/data/serie_modalidad_mensual.json";
import { COLOR_EVENTO, EVENTOS_ELECTORALES } from "@/lib/elecciones";
import { formatMesCorto, formatMesEje, yearlyTicks } from "@/lib/format";
import { AXIS, TooltipBox, TooltipRow } from "./_shared";

const data = serie.map((d) => ({ mes: d.mes, pctDirecta: d.pct_valor_directa }));
const mesesDisponibles = new Set(data.map((d) => d.mes));
const ticks = yearlyTicks(data.map((d) => d.mes));

const AREA_COLOR = "#8b5cf6";

function mesFromFecha(fecha: string): string {
  return fecha.slice(0, 7);
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const evento = EVENTOS_ELECTORALES.find((e) => mesFromFecha(e.fecha) === label);
  return (
    <TooltipBox title={formatMesCorto(label)}>
      <TooltipRow label="Contratación directa" value={`${payload[0].value}% del valor`} color={AREA_COLOR} />
      {evento && (
        <p className="mt-1 text-[12px] font-semibold" style={{ color: COLOR_EVENTO[evento.tipo] }}>
          {evento.nombre}
        </p>
      )}
    </TooltipBox>
  );
}

export default function ElectoralCycleChart({ height = 320 }: { height?: number }) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="fillDirecta" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={AREA_COLOR} stopOpacity={0.22} />
              <stop offset="100%" stopColor={AREA_COLOR} stopOpacity={0.02} />
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

          {EVENTOS_ELECTORALES.filter((e) => e.ventanaInicio).map((e) => {
            const x1 = mesFromFecha(e.ventanaInicio!);
            const x2 = mesFromFecha(e.fecha);
            if (!mesesDisponibles.has(x1) || !mesesDisponibles.has(x2)) return null;
            return <ReferenceArea key={`w-${e.fecha}`} x1={x1} x2={x2} fill={COLOR_EVENTO[e.tipo]} fillOpacity={0.08} strokeOpacity={0} />;
          })}

          {EVENTOS_ELECTORALES.map((e) => {
            const x = mesFromFecha(e.fecha);
            if (!mesesDisponibles.has(x)) return null;
            return <ReferenceLine key={e.fecha} x={x} stroke={COLOR_EVENTO[e.tipo]} strokeDasharray="4 3" strokeWidth={1.5} />;
          })}

          <Area
            type="monotone"
            dataKey="pctDirecta"
            stroke={AREA_COLOR}
            strokeWidth={2.5}
            fill="url(#fillDirecta)"
            activeDot={{ r: 4.5, strokeWidth: 2, stroke: "#fff", fill: AREA_COLOR }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
