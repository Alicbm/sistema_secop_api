import { PageHeader, StatTile, Callout } from "@/components/ui";
import NetworkGraph from "@/components/charts/NetworkGraph";
import redData from "@/data/red_entidad_proveedor.json";
import { formatNumber } from "@/lib/format";
import { IconBuilding, IconNetwork, IconUsers } from "@/components/icons";

export default function RedPage() {
  const nEntidades = redData.nodes.filter((n) => n.tipo === "entidad").length;
  const nProveedores = redData.nodes.filter((n) => n.tipo !== "entidad").length;
  const nNatural = redData.nodes.filter((n: any) => n.tipo === "proveedor" && n.es_persona_natural).length;

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Interconectividad contractual"
        title="Red entidad-proveedor"
        subtitle="Un mapa de quién contrata a quién en el Magdalena. Cada vínculo representa el flujo de recursos entre una entidad pública y un proveedor; el grafo revela concentraciones, proveedores dominantes y la estructura de las relaciones contractuales."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label="Entidades" value={formatNumber(nEntidades)} hint="públicas contratantes" tone="brand" icon={<IconBuilding className="h-[18px] w-[18px]" />} />
        <StatTile label="Proveedores" value={formatNumber(nProveedores)} hint={`${formatNumber(nNatural)} personas naturales`} tone="blue" icon={<IconUsers className="h-[18px] w-[18px]" />} />
        <StatTile label="Vínculos" value={formatNumber(redData.edges.length)} hint="relaciones de contratación" tone="amber" icon={<IconNetwork className="h-[18px] w-[18px]" />} />
        <StatTile label="Cobertura" value="≈79%" hint="del valor total del departamento" tone="purple" icon={<IconNetwork className="h-[18px] w-[18px]" />} />
      </div>

      <Callout tone="brand" icon={<IconNetwork className="h-4 w-4" />}>
        <span className="text-brand-900">
          Se muestran los <strong>300 vínculos entidad-proveedor de mayor valor</strong> del Magdalena (2020-2026), que
          concentran cerca del 79% del valor total contratado. No incluye la cola larga de miles de contratistas
          individuales de montos pequeños. <strong>Haz clic en cualquier nodo</strong> para ver su detalle completo.
        </span>
      </Callout>

      <div className="mt-4">
        <NetworkGraph />
      </div>
    </div>
  );
}
