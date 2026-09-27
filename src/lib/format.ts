// Utilidades de formato para cifras en pesos colombianos (COP)

/** Formatea un valor COP grande en una forma corta y legible: $8,9 billones, $412 mil millones, $3,2 millones */
export function formatCOPShort(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 1_000_000_000_000) {
    return `${sign}$${(abs / 1_000_000_000_000).toLocaleString("es-CO", { maximumFractionDigits: 1 })} billones`;
  }
  if (abs >= 1_000_000_000) {
    return `${sign}$${(abs / 1_000_000_000).toLocaleString("es-CO", { maximumFractionDigits: 1 })} mil millones`;
  }
  if (abs >= 1_000_000) {
    return `${sign}$${(abs / 1_000_000).toLocaleString("es-CO", { maximumFractionDigits: 1 })} millones`;
  }
  return `${sign}$${abs.toLocaleString("es-CO", { maximumFractionDigits: 0 })}`;
}

/** Versión compacta para ejes de gráficos: 8,9B / 412MM / 3,2M */
export function formatCOPAxis(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 1_000_000_000_000) return `${sign}${(abs / 1_000_000_000_000).toLocaleString("es-CO", { maximumFractionDigits: 1 })}B`;
  if (abs >= 1_000_000_000) return `${sign}${(abs / 1_000_000_000).toLocaleString("es-CO", { maximumFractionDigits: 0 })}MM`;
  if (abs >= 1_000_000) return `${sign}${(abs / 1_000_000).toLocaleString("es-CO", { maximumFractionDigits: 0 })}M`;
  return `${sign}${abs}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("es-CO");
}

export function formatPct(value: number, digits = 1): string {
  return `${value.toLocaleString("es-CO", { maximumFractionDigits: digits, minimumFractionDigits: digits })}%`;
}

const MESES_ES = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
];

/** "2023-07" -> "jul 2023" */
export function formatMesCorto(mes: string): string {
  const [y, m] = mes.split("-");
  const idx = parseInt(m, 10) - 1;
  return `${MESES_ES[idx]} ${y}`;
}

/** "2023-07" -> "jul '23" (más compacto para ejes) */
export function formatMesEje(mes: string): string {
  const [y, m] = mes.split("-");
  const idx = parseInt(m, 10) - 1;
  return `${MESES_ES[idx]} '${y.slice(2)}`;
}

/**
 * Dado un arreglo de meses "YYYY-MM" en orden, devuelve solo el primer mes de
 * cada año (normalmente enero). Se usa como set fijo de ticks en los ejes de
 * tiempo para evitar que las etiquetas se amontonen o se sobrepongan en
 * pantallas angostas, sin depender de un "interval" fijo pensado para desktop.
 */
export function yearlyTicks(meses: string[]): string[] {
  const seen = new Set<string>();
  const ticks: string[] = [];
  for (const mes of meses) {
    const anio = mes.slice(0, 4);
    if (!seen.has(anio)) {
      seen.add(anio);
      ticks.push(mes);
    }
  }
  return ticks;
}
