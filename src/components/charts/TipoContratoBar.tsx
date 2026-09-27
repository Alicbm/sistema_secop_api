"use client";

import tipoContrato from "@/data/tipo_contrato.json";
import { formatCOPAxis, formatCOPShort, formatNumber } from "@/lib/format";
import HBarChart, { type HBarRow } from "./HBarChart";
import { CHART_COLORS } from "./_shared";

const rows: HBarRow[] = [...tipoContrato]
  .sort((a, b) => b.valor_cop - a.valor_cop)
  .slice(0, 8)
  .map((t) => ({
    name: t.tipo,
    value: t.valor_cop,
    tipLabel: `$${formatCOPAxis(t.valor_cop)}`,
    tooltipTitle: t.tipo,
    tooltipRows: [
      { label: "Valor contratado", value: formatCOPShort(t.valor_cop), color: CHART_COLORS.purple },
      { label: "N.º de contratos", value: formatNumber(t.n_contratos) },
    ],
  }));

export default function TipoContratoBar() {
  return <HBarChart data={rows} color={CHART_COLORS.purple} height={300} yWidth={172} gradient />;
}
