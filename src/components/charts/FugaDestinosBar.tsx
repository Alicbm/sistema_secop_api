"use client";

import fuga from "@/data/fuga_local.json";
import { formatCOPShort, formatPct } from "@/lib/format";
import HBarChart, { type HBarRow } from "./HBarChart";
import { CHART_COLORS } from "./_shared";

const rows: HBarRow[] = [...fuga.destinos_fuera]
  .sort((a, b) => b.valor_cop - a.valor_cop)
  .slice(0, 10)
  .map((d) => ({
    name: d.departamento,
    value: d.valor_cop,
    tipLabel: formatPct(d.pct_de_fuga),
    tooltipTitle: d.departamento,
    tooltipRows: [
      { label: "% de la fuga identificada", value: formatPct(d.pct_de_fuga), color: CHART_COLORS.coral },
      { label: "Valor contratado", value: formatCOPShort(d.valor_cop) },
    ],
  }));

export default function FugaDestinosBar() {
  return <HBarChart data={rows} color={CHART_COLORS.coral} height={340} yWidth={96} gradient />;
}
