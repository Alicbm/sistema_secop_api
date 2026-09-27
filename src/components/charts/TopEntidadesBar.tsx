"use client";

import entidades from "@/data/entidades.json";
import { formatCOPAxis, formatCOPShort, formatNumber } from "@/lib/format";
import HBarChart, { type HBarRow } from "./HBarChart";
import { CHART_COLORS } from "./_shared";

const rows: HBarRow[] = [...entidades]
  .sort((a, b) => b.valor_cop - a.valor_cop)
  .slice(0, 10)
  .map((e) => ({
    name: e.entidad,
    value: e.valor_cop,
    tipLabel: `$${formatCOPAxis(e.valor_cop)}`,
    tooltipTitle: e.entidad,
    tooltipRows: [
      { label: "Valor contratado", value: formatCOPShort(e.valor_cop), color: CHART_COLORS.emerald },
      { label: "N.º de contratos", value: formatNumber(e.n_contratos) },
      { label: "Orden", value: e.orden },
      { label: "Ciudad (sede)", value: e.ciudad },
    ],
  }));

export default function TopEntidadesBar() {
  return <HBarChart data={rows} color={CHART_COLORS.emerald} height={430} yWidth={190} gradient />;
}
