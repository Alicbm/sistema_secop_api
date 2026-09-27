"use client";

import origen from "@/data/origen_recursos.json";
import { formatNumber } from "@/lib/format";
import DonutChart, { type DonutSlice } from "./DonutChart";
import { CHART_COLORS } from "./_shared";

const COLORS = [CHART_COLORS.emerald, "#9aa39b"];
const total = origen.reduce((s, o) => s + o.n, 0);

const data: DonutSlice[] = [...origen]
  .sort((a, b) => b.n - a.n)
  .map((o, i) => ({
    label: o.origen,
    value: o.n,
    color: COLORS[i % COLORS.length],
    valueLabel: `${formatNumber(o.n)} contratos`,
  }));

export default function OrigenRecursosDonut() {
  return <DonutChart data={data} size={152} thickness={20} centerValue={formatNumber(total)} centerLabel="contratos" />;
}
