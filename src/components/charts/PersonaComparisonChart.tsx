"use client";

import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import kpis from "@/data/kpis.json";
import { AXIS, CHART_COLORS, TooltipBox, TooltipRow } from "./_shared";
import { formatCOPShort, formatNumber } from "@/lib/format";

const COLOR_CONTRATOS = CHART_COLORS.blue;
const COLOR_VALOR = CHART_COLORS.emerald;

const data = [
  {
    grupo: "Persona natural",
    contratos: kpis.persona_natural.pct_contratos,
    valor: kpis.persona_natural.pct_valor,
    nContratos: kpis.persona_natural.n_contratos,
    valorCop: kpis.persona_natural.valor_cop,
  },
  {
    grupo: "Persona jurídica",
    contratos: kpis.persona_juridica.pct_contratos,
    valor: kpis.persona_juridica.pct_valor,
    nContratos: kpis.persona_juridica.n_contratos,
    valorCop: kpis.persona_juridica.valor_cop,
  },
];

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <TooltipBox title={p.grupo}>
      <TooltipRow label="% de contratos" value={`${p.contratos}%`} color={COLOR_CONTRATOS} />
      <TooltipRow label="% del valor" value={`${p.valor}%`} color={COLOR_VALOR} />
      <div className="my-1 border-t border-line-hairline" />
      <TooltipRow label="Contratos" value={formatNumber(p.nContratos)} />
      <TooltipRow label="Valor" value={formatCOPShort(p.valorCop)} />
    </TooltipBox>
  );
}

export default function PersonaComparisonChart() {
  return (
    <div className="w-full">
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 44, left: 4, bottom: 4 }}
            barGap={5}
            barCategoryGap={30}
          >
            <CartesianGrid stroke={AXIS.grid} horizontal={false} />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              type="category"
              dataKey="grupo"
              tick={{ ...AXIS.tickStrong, fontSize: 12, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              width={118}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f6f3" }} />
            <Bar dataKey="contratos" fill={COLOR_CONTRATOS} radius={[0, 5, 5, 0]} maxBarSize={20}>
              <LabelList dataKey="contratos" position="right" offset={8} formatter={(v: number) => `${v}%`} style={{ fill: "#586159", fontSize: 11.5, fontWeight: 700 }} />
            </Bar>
            <Bar dataKey="valor" fill={COLOR_VALOR} radius={[0, 5, 5, 0]} maxBarSize={20}>
              <LabelList dataKey="valor" position="right" offset={8} formatter={(v: number) => `${v}%`} style={{ fill: "#586159", fontSize: 11.5, fontWeight: 700 }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-t border-line-hairline pt-3">
        <div className="flex items-center gap-1.5 text-xs font-medium text-ink-secondary">
          <span className="h-2.5 w-2.5 rounded-[3px]" style={{ backgroundColor: COLOR_CONTRATOS }} /> % de contratos (cantidad)
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-ink-secondary">
          <span className="h-2.5 w-2.5 rounded-[3px]" style={{ backgroundColor: COLOR_VALOR }} /> % del valor contratado (monto)
        </div>
      </div>
    </div>
  );
}
