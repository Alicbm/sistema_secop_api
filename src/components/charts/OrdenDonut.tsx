"use client";

import orden from "@/data/orden_entidad.json";
import { formatCOPShort, formatNumber } from "@/lib/format";
import DonutChart, { type DonutSlice } from "./DonutChart";
import { CHART_COLORS } from "./_shared";

const COLORS = [CHART_COLORS.emerald, CHART_COLORS.blue, CHART_COLORS.amber];
const total = orden.reduce((s, o) => s + o.valor_cop, 0);

const data: DonutSlice[] = [...orden]
  .sort((a, b) => b.valor_cop - a.valor_cop)
  .map((o, i) => ({
    label: o.orden,
    value: o.valor_cop,
    color: COLORS[i % COLORS.length],
    valueLabel: `${formatCOPShort(o.valor_cop)} · ${formatNumber(o.n_contratos)} contratos`,
  }));

export default function OrdenDonut() {
  return <DonutChart data={data} size={156} thickness={20} centerValue={formatCOPShort(total)} centerLabel="valor total" />;
}
