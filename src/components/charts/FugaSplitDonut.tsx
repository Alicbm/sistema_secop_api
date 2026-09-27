"use client";

import fuga from "@/data/fuga_local.json";
import { formatCOPShort, formatNumber, formatPct } from "@/lib/format";
import DonutChart, { type DonutSlice } from "./DonutChart";
import { CHART_COLORS } from "./_shared";

const data: DonutSlice[] = [
  {
    label: "Se queda en el Magdalena",
    value: fuga.resumen.valor_magdalena_cop,
    color: CHART_COLORS.emerald,
    valueLabel: `${formatCOPShort(fuga.resumen.valor_magdalena_cop)} · ${formatNumber(fuga.resumen.n_proveedores_magdalena)} proveedores`,
  },
  {
    label: "Sale a otros departamentos",
    value: fuga.resumen.valor_fuera_cop,
    color: CHART_COLORS.coral,
    valueLabel: `${formatCOPShort(fuga.resumen.valor_fuera_cop)} · ${formatNumber(fuga.resumen.n_proveedores_fuera)} proveedores`,
  },
];

export default function FugaSplitDonut() {
  return (
    <DonutChart
      data={data}
      size={172}
      thickness={24}
      centerValue={formatPct(fuga.resumen.pct_fuera_de_identificado)}
      centerLabel="sale del depto."
    />
  );
}
