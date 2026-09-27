import fuga from "@/data/fuga_local.json";
import { Badge, Callout, Card, PageHeader, StatTile } from "@/components/ui";
import { formatCOPShort, formatNumber, formatPct } from "@/lib/format";
import FugaSplitDonut from "@/components/charts/FugaSplitDonut";
import FugaDestinosBar from "@/components/charts/FugaDestinosBar";
import { IconLeak, IconWallet } from "@/components/icons";

export default function FugaLocalPage() {
  const top = [...fuga.top_proveedores_fuera].sort((a, b) => b.valor_cop - a.valor_cop).slice(0, 15);

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Análisis prioritario"
        title="Fuga de contratación local"
        subtitle="¿Cuánto del recurso contratado por entidades del Magdalena termina en proveedores con domicilio fuera del departamento?"
      />

      <Callout tone="warning" icon={<span className="text-base leading-none">⚠️</span>}>
        <span className="text-accent-900">
          <strong>Cobertura del análisis:</strong> se identificó la ubicación de solo el{" "}
          <strong>{formatPct(fuga.cobertura.pct_identificado_del_top)}</strong> del valor de los{" "}
          {formatNumber(fuga.cobertura.top_proveedores_analizados)} proveedores de mayor monto. El{" "}
          {formatPct(100 - fuga.cobertura.pct_identificado_del_top)} restante corresponde, en su mayoría, a entidades
          públicas actuando como proveedor en convenios interadministrativos, sin registro de ubicación en SECOP II. Las
          cifras describen el subconjunto identificado, no el 100% de la contratación.
        </span>
      </Callout>

      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile
          label="Sale del departamento"
          value={formatPct(fuga.resumen.pct_fuera_de_identificado)}
          hint={`${formatNumber(fuga.resumen.n_proveedores_fuera)} proveedores fuera`}
          tone="coral"
          icon={<IconLeak className="h-[18px] w-[18px]" />}
        />
        <StatTile
          label="Se queda en el Magdalena"
          value={formatPct(fuga.resumen.pct_magdalena_de_identificado)}
          hint={`${formatNumber(fuga.resumen.n_proveedores_magdalena)} proveedores locales`}
          tone="brand"
          icon={<IconWallet className="h-[18px] w-[18px]" />}
        />
        <StatTile
          label="Valor identificado"
          value={formatCOPShort(fuga.cobertura.valor_identificado_cop)}
          hint={`${formatPct(fuga.cobertura.pct_identificado_del_total_departamento)} del valor departamental`}
          tone="blue"
          icon={<IconWallet className="h-[18px] w-[18px]" />}
        />
        <StatTile
          label="No identificable"
          value={formatCOPShort(fuga.cobertura.valor_no_identificable_cop)}
          hint="convenios y proveedores sin registro"
          tone="neutral"
          icon={<IconWallet className="h-[18px] w-[18px]" />}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="¿Dónde se queda el recurso identificado?" subtitle="Del valor con ubicación identificada">
          <FugaSplitDonut />
        </Card>
        <Card title="Principales destinos de la fuga" subtitle="Departamentos que más reciben recurso del Magdalena">
          <FugaDestinosBar />
        </Card>
      </div>

      <div className="mt-4">
        <Card title="Principales proveedores fuera del departamento" subtitle="Top 15 por valor · entre los proveedores con ubicación identificada">
          <div className="-mx-1 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line-hairline text-left text-[11px] font-bold uppercase tracking-wide text-ink-muted">
                  <th className="px-3 py-2.5 font-bold">#</th>
                  <th className="px-3 py-2.5 font-bold">Proveedor</th>
                  <th className="px-3 py-2.5 font-bold">Departamento</th>
                  <th className="px-3 py-2.5 font-bold">Municipio</th>
                  <th className="px-3 py-2.5 text-right font-bold">Valor contratado</th>
                </tr>
              </thead>
              <tbody>
                {top.map((p, i) => (
                  <tr key={i} className="border-b border-line-soft last:border-0 transition-colors hover:bg-surface-sunken/60">
                    <td className="px-3 py-3 text-xs font-bold text-ink-faint tabular-nums">{i + 1}</td>
                    <td className="px-3 py-3 font-semibold text-ink-primary">{p.proveedor}</td>
                    <td className="px-3 py-3">
                      <Badge tone="serious">{p.departamento}</Badge>
                    </td>
                    <td className="px-3 py-3 text-ink-secondary">{p.municipio}</td>
                    <td className="px-3 py-3 text-right font-bold text-ink-primary tabular-nums">{formatCOPShort(p.valor_cop)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
