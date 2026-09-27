import { Callout, Card, PageHeader, StatTile } from "@/components/ui";
import ModalidadStackedArea from "@/components/charts/ModalidadStackedArea";
import ModalidadOverallBar from "@/components/charts/ModalidadOverallBar";
import TipoContratoBar from "@/components/charts/TipoContratoBar";
import OrigenRecursosDonut from "@/components/charts/OrigenRecursosDonut";
import modalidad from "@/data/modalidad.json";
import tipoContrato from "@/data/tipo_contrato.json";
import { formatCOPShort, formatNumber } from "@/lib/format";
import { IconBars, IconLayers, IconPie } from "@/components/icons";

const topModalidad = [...modalidad].sort((a, b) => b.valor_cop - a.valor_cop)[0];
const topTipo = [...tipoContrato].sort((a, b) => b.valor_cop - a.valor_cop)[0];
const nModalidades = modalidad.length;

export default function ModalidadesPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Cómo se contrata"
        title="Modalidades, tipo de contrato y recursos"
        subtitle="Cómo se distribuye el valor contratado entre las modalidades de selección del contratista y los tipos de contrato usados en el Magdalena."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatTile
          label="Modalidad principal"
          value={formatCOPShort(topModalidad.valor_cop)}
          hint={topModalidad.modalidad}
          tone="amber"
          icon={<IconBars className="h-[18px] w-[18px]" />}
        />
        <StatTile
          label="Tipo de contrato principal"
          value={formatCOPShort(topTipo.valor_cop)}
          hint={`${topTipo.tipo} · ${formatNumber(topTipo.n_contratos)} contratos`}
          tone="purple"
          icon={<IconLayers className="h-[18px] w-[18px]" />}
        />
        <StatTile
          label="Modalidades distintas"
          value={String(nModalidades)}
          hint="usadas por entidades del departamento"
          tone="brand"
          icon={<IconPie className="h-[18px] w-[18px]" />}
        />
      </div>

      <div className="mt-4">
        <Card title="Evolución mensual por modalidad" subtitle="% del valor contratado cada mes">
          <ModalidadStackedArea />
          <Callout>
            "Régimen especial" agrupa las modalidades propias de entidades con régimen especial (ICBF, universidades
            públicas, ESE, entre otras). Las modalidades competitivas incluyen licitación pública, selección abreviada y
            concurso de méritos.
          </Callout>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Valor por modalidad" subtitle="Acumulado histórico · top 8">
          <ModalidadOverallBar />
        </Card>
        <Card title="Valor por tipo de contrato" subtitle="Acumulado histórico · top 8">
          <TipoContratoBar />
        </Card>
      </div>

      <div className="mt-4">
        <Card title="Origen de los recursos" subtitle="Recursos propios vs. distribuidos por el nivel nacional (número de contratos)">
          <OrigenRecursosDonut />
          <Callout>
            SECOP II no reporta de forma consistente la fuente presupuestal detallada (PGN, SGP, SGR, crédito) para las
            entidades del Magdalena — esos campos están vacíos. Este es el máximo detalle disponible: solo distingue si
            el recurso es propio de la entidad o proviene de una distribución externa.
          </Callout>
        </Card>
      </div>
    </div>
  );
}
