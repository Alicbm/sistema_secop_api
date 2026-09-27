import meta from "@/data/meta.json";
import kpis from "@/data/kpis.json";
import { Card, PageHeader, StatTile } from "@/components/ui";
import { formatNumber } from "@/lib/format";
import { IconLayers } from "@/components/icons";

export default function MetodologiaPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Transparencia de datos"
        title="Metodología y calidad de los datos"
        subtitle="Este radar es una fotografía estática construida con datos abiertos de SECOP II. Aquí se documentan las fuentes, el alcance y las limitaciones conocidas del análisis."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label="Contratos analizados" value={formatNumber(kpis.total_contratos)} hint="tras la limpieza de datos" tone="brand" icon={<IconLayers className="h-[18px] w-[18px]" />} />
        <StatTile label="Outliers excluidos" value={formatNumber(kpis.calidad_datos.registros_excluidos_outliers)} hint="errores de digitación de valor" tone="coral" />
        <StatTile label="Valor cero excluido" value={formatNumber(kpis.calidad_datos.registros_valor_cero_excluidos)} hint="registros sin monto" tone="neutral" />
        <StatTile label="Fecha de corte" value={meta.fecha_corte} hint="descarga de SECOP II" tone="blue" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Fuente de datos">
          <dl className="space-y-4 text-sm">
            {[
              ["Dataset principal", meta.fuente],
              ["Cobertura geográfica", meta.cobertura_geografica],
              ["Periodo — indicadores generales", meta.periodo_kpis],
              ["Periodo — series temporales", meta.periodo_series_temporales],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="section-label mb-1">{k}</dt>
                <dd className="leading-relaxed text-ink-secondary">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card title="Criterio de limpieza">
          <div className="space-y-3">
            <div className="flex items-baseline justify-between border-b border-line-soft pb-2.5">
              <span className="text-sm text-ink-secondary">Contratos incluidos</span>
              <span className="font-bold tabular-nums text-ink-primary">{formatNumber(kpis.total_contratos)}</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-line-soft pb-2.5">
              <span className="text-sm text-ink-secondary">Excluidos por outlier de valor</span>
              <span className="font-bold tabular-nums text-ink-primary">{formatNumber(kpis.calidad_datos.registros_excluidos_outliers)}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-ink-secondary">Excluidos por valor en cero</span>
              <span className="font-bold tabular-nums text-ink-primary">{formatNumber(kpis.calidad_datos.registros_valor_cero_excluidos)}</span>
            </div>
            <div className="mt-2 rounded-xl2 bg-surface-sunken p-3.5">
              <p className="section-label mb-1">Criterio de outlier</p>
              <p className="text-xs leading-relaxed text-ink-secondary">{kpis.calidad_datos.criterio_outlier}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-4">
        <Card title="Notas metodológicas y limitaciones conocidas">
          <ol className="space-y-3.5">
            {meta.metodologia_limpieza.map((nota, i) => (
              <li key={i} className="flex gap-3.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[11px] font-bold text-brand-700">
                  {i + 1}
                </span>
                <span className="text-[13.5px] leading-relaxed text-ink-secondary">{nota}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <div className="mt-4">
        <Card title="Sobre este proyecto">
          <p className="text-[13.5px] leading-relaxed text-ink-secondary">
            Sistema construido como proyecto personal de portafolio por <strong className="text-ink-primary">{meta.autor.nombre}</strong>,{" "}
            {meta.autor.rol}. Es una fotografía fija de los datos disponibles en SECOP II a la fecha de corte indicada —
            no se conecta en vivo a la API ni se actualiza automáticamente. Todos los datos utilizados son públicos y
            agregados; <strong className="text-ink-primary">no se incluyen datos personales</strong> de contratistas
            (teléfonos, correos, direcciones o datos de representantes legales) en ninguna vista.
          </p>
        </Card>
      </div>
    </div>
  );
}
