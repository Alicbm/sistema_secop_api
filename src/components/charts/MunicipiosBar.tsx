"use client";

import municipios from "@/data/municipios.json";
import { formatCOPShort, formatNumber, formatPct } from "@/lib/format";
import HBarChart, { type HBarRow } from "./HBarChart";
import { CHART_COLORS } from "./_shared";

const rows: HBarRow[] = [...municipios]
  .sort((a, b) => b.valor_cop - a.valor_cop)
  .slice(0, 8)
  .map((m) => ({
    name: m.municipio,
    value: m.valor_cop,
    tipLabel: formatPct(m.pct_valor_departamento),
    tooltipTitle: m.municipio,
    tooltipRows: [
      { label: "% del valor departamental", value: formatPct(m.pct_valor_departamento), color: CHART_COLORS.blue },
      { label: "Valor contratado", value: formatCOPShort(m.valor_cop) },
      { label: "N.º de contratos", value: formatNumber(m.n_contratos) },
    ],
  }));

export default function MunicipiosBar() {
  return <HBarChart data={rows} color={CHART_COLORS.blue} height={280} yWidth={92} gradient />;
}
