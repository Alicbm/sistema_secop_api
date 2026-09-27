"use client";

import modalidad from "@/data/modalidad.json";
import { formatCOPAxis, formatCOPShort, formatNumber } from "@/lib/format";
import HBarChart, { type HBarRow } from "./HBarChart";
import { CHART_COLORS } from "./_shared";

const rows: HBarRow[] = [...modalidad]
  .sort((a, b) => b.valor_cop - a.valor_cop)
  .slice(0, 8)
  .map((m) => ({
    name: m.modalidad,
    value: m.valor_cop,
    tipLabel: `$${formatCOPAxis(m.valor_cop)}`,
    tooltipTitle: m.modalidad,
    tooltipRows: [
      { label: "Valor contratado", value: formatCOPShort(m.valor_cop), color: CHART_COLORS.amber },
      { label: "N.º de contratos", value: formatNumber(m.n_contratos) },
    ],
  }));

export default function ModalidadOverallBar() {
  return <HBarChart data={rows} color={CHART_COLORS.amber} height={300} yWidth={172} gradient />;
}
