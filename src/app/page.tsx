import Link from "next/link";
import kpis from "@/data/kpis.json";
import { Callout, Card, PageHeader, StatTile } from "@/components/ui";
import { formatCOPShort, formatNumber, formatPct } from "@/lib/format";
import { IconArrowRight, IconBuilding, IconCalendar, IconInfo, IconLayers, IconLeak, IconNetwork, IconPie, IconUsers, IconWallet } from "@/components/icons";
import MonthlyValueTrend from "@/components/charts/MonthlyValueTrend";
import PersonaComparisonChart from "@/components/charts/PersonaComparisonChart";
import TopEntidadesBar from "@/components/charts/TopEntidadesBar";
import OrdenDonut from "@/components/charts/OrdenDonut";
import MunicipiosBar from "@/components/charts/MunicipiosBar";

const EXPLORA = [
  { href: "/red", title: "Red entidad-proveedor", desc: "304 nodos y 300 vínculos en un grafo interactivo", Icon: IconNetwork, tone: "brand" as const },
  { href: "/fuga-local", title: "Fuga de contratación local", desc: "¿Cuánto del recurso sale del departamento?", Icon: IconLeak, tone: "coral" as const },
  { href: "/modalidades", title: "Modalidades y contratistas", desc: "Cómo se selecciona y con quién se contrata", Icon: IconPie, tone: "amber" as const },
];

export default function DashboardPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Radar · Magdalena"
        title="Panorama de la contratación pública"
        subtitle={`${formatNumber(kpis.total_contratos)} contratos registrados en SECOP II para entidades del Magdalena, entre ${kpis.periodo.desde.slice(0, 7)} y ${kpis.periodo.hasta.slice(0, 7)}.`}
        right={
          <div className="hidden items-center gap-2 rounded-xl2 border border-line-hairline bg-surface-card px-3.5 py-2 shadow-soft sm:flex">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            <span className="text-xs font-semibold text-ink-secondary">Corte {kpis.fecha_corte_descarga}</span>
          </div>
        }
      />

      {/* Hero + KPIs */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-xl3 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-5 text-white shadow-card lg:col-span-5">
          <div className="absolute -right-8 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute bottom-3 right-4 opacity-[0.14]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-ab-trim.png" alt="" className="h-16 w-auto brightness-0 invert" />
          </div>
          <div className="relative">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-brand-100">Valor total contratado</p>
            <p className="mt-2.5 text-[38px] font-extrabold leading-none tracking-tight">{formatCOPShort(kpis.total_contratado_cop)}</p>
            <p className="mt-2 text-[13px] text-brand-50/90">
              {formatNumber(kpis.total_contratos)} contratos · {kpis.periodo.desde.slice(0, 4)}–{kpis.periodo.hasta.slice(0, 4)}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl2 bg-white/10 p-3 backdrop-blur-sm">
                <p className="text-lg font-extrabold leading-none">{formatCOPShort(kpis.total_pagado_cop)}</p>
                <p className="mt-1 text-[11px] text-brand-50/80">pagado registrado</p>
              </div>
              <div className="rounded-xl2 bg-white/10 p-3 backdrop-blur-sm">
                <p className="text-lg font-extrabold leading-none">{formatPct(kpis.pct_valor_pyme)}</p>
                <p className="mt-1 text-[11px] text-brand-50/80">valor a PYMES</p>
              </div>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-7">
          <StatTile
            label="Valor pagado registrado"
            value={formatCOPShort(kpis.total_pagado_cop)}
            hint={`≈ ${formatPct((kpis.total_pagado_cop / kpis.total_contratado_cop) * 100)} del contratado`}
            tone="amber"
            icon={<IconWallet className="h-[18px] w-[18px]" />}
          />
          <StatTile
            label="Contratación PYME"
            value={formatCOPShort(kpis.total_pyme_cop)}
            hint={`${formatPct(kpis.pct_valor_pyme)} del valor · ${formatNumber(kpis.n_contratos_pyme)} contratos`}
            tone="brand"
            icon={<IconBuilding className="h-[18px] w-[18px]" />}
          />
          <StatTile
            label="Personas naturales"
            value={formatPct(kpis.persona_natural.pct_contratos)}
            hint={`de los contratos, pero solo ${formatPct(kpis.persona_natural.pct_valor)} del valor`}
            tone="blue"
            icon={<IconUsers className="h-[18px] w-[18px]" />}
          />
          <StatTile
            label="Personas jurídicas"
            value={formatPct(kpis.persona_juridica.pct_valor)}
            hint={`del valor, con solo ${formatPct(kpis.persona_juridica.pct_contratos)} de los contratos`}
            tone="purple"
            icon={<IconBuilding className="h-[18px] w-[18px]" />}
          />
        </div>
      </div>

      {/* Acerca del sistema */}
      <div className="mt-4 card p-[18px]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
          <div>
            <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-brand-700">
              <IconInfo className="h-3.5 w-3.5" /> Sobre este radar
            </div>
            <p className="text-[13.5px] leading-relaxed text-ink-secondary">
              Este sistema analiza la <strong className="text-ink-primary">contratación pública del departamento del Magdalena</strong> a
              partir de los datos abiertos de <strong className="text-ink-primary">SECOP II</strong> (Contratos Electrónicos ·
              Colombia Compra Eficiente). Reúne {formatNumber(kpis.total_contratos)} contratos suscritos por entidades con
              sede en el Magdalena entre {kpis.periodo.desde.slice(0, 4)} y {kpis.periodo.hasta.slice(0, 4)}, y los organiza
              en varias vistas: los <strong className="text-ink-primary">montos y KPIs generales</strong> de esta página, las{" "}
              <strong className="text-ink-primary">modalidades y el tipo de contratista</strong>, la{" "}
              <strong className="text-ink-primary">red entidad-proveedor</strong>, la{" "}
              <strong className="text-ink-primary">fuga de contratación</strong> hacia fuera del departamento y el efecto
              del <strong className="text-ink-primary">ciclo electoral</strong>.
            </p>
            <p className="mt-2.5 text-[12px] leading-relaxed text-ink-muted">
              Es una <strong className="text-ink-secondary">fotografía fija</strong> con corte al {kpis.fecha_corte_descarga} — no se
              conecta en vivo a la API. "Valor contratado" es el valor total del contrato en SECOP (incluye adiciones y, en
              convenios, cofinanciación). Todo el detalle y las limitaciones están en la{" "}
              <Link href="/metodologia" className="link-emerald">
                metodología
              </Link>
              .
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {[
              { Icon: IconLayers, tone: "brand", value: "SECOP II", label: "Contratos Electrónicos" },
              { Icon: IconCalendar, tone: "blue", value: `${kpis.periodo.desde.slice(0, 4)}–${kpis.periodo.hasta.slice(0, 4)}`, label: "años cubiertos" },
              { Icon: IconBuilding, tone: "amber", value: "Magdalena", label: "entidades con sede" },
              { Icon: IconInfo, tone: "purple", value: "Estático", label: "fotografía fija" },
            ].map(({ Icon, tone, value, label }) => (
              <div key={label} className="rounded-xl2 border border-line-hairline bg-surface-sunken/60 p-3">
                <span
                  className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${
                    tone === "brand" ? "bg-brand-100 text-brand-600" : tone === "blue" ? "bg-blue-100 text-[#2554c9]" : tone === "amber" ? "bg-accent-100 text-accent-600" : "bg-violet-100 text-[#7c4de0]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <p className="text-[13px] font-bold leading-none text-ink-primary">{value}</p>
                <p className="mt-1 text-[10.5px] leading-tight text-ink-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tendencia + orden */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Card title="Valor contratado por mes" subtitle="Suma mensual del valor de los contratos suscritos" className="lg:col-span-8">
          <MonthlyValueTrend />
        </Card>
        <Card title="Por orden de entidad" subtitle="Territorial, nacional o corporación autónoma" className="lg:col-span-4">
          <OrdenDonut />
        </Card>
      </div>

      {/* Persona + entidades */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Card
          title="Personas naturales vs. jurídicas"
          subtitle="Comparación en términos relativos, no de montos absolutos"
          className="lg:col-span-5"
        >
          <PersonaComparisonChart />
          <Callout tone="warning" icon={<span className="text-base leading-none">💡</span>}>
            El <strong className="text-accent-900">{formatPct(kpis.persona_natural.pct_contratos)}</strong> de los contratos
            son con personas naturales (contratistas individuales), pero apenas el{" "}
            <strong className="text-accent-900">{formatPct(kpis.persona_natural.pct_valor)}</strong> del valor. Mezclar
            ambos grupos en un promedio distorsiona el "contrato típico" — por eso siempre se separan.
          </Callout>
        </Card>
        <Card title="Top 10 entidades por valor" subtitle="Acumulado histórico disponible en SECOP II" className="lg:col-span-7">
          <TopEntidadesBar />
        </Card>
      </div>

      {/* Municipios + explora */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Card title="Concentración por municipio" subtitle="% del valor departamental · sede de la entidad contratante" className="lg:col-span-7">
          <MunicipiosBar />
          <Callout>
            Refleja la <strong className="text-ink-primary">sede de la entidad contratante</strong>, no el lugar de
            ejecución — por eso Santa Marta concentra la mayoría.{" "}
            <Link href="/metodologia" className="link-emerald">
              Ver metodología
            </Link>
            .
          </Callout>
        </Card>

        <div className="lg:col-span-5">
          <p className="section-label mb-3 px-1">Explora el resto del radar</p>
          <div className="flex flex-col gap-3.5">
            {EXPLORA.map(({ href, title, desc, Icon, tone }) => (
              <Link
                key={href}
                href={href}
                className="card card-hover group flex items-center gap-4 p-4"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl2 ${
                    tone === "brand" ? "bg-brand-50 text-brand-600" : tone === "coral" ? "bg-orange-50 text-status-serious" : "bg-accent-50 text-accent-500"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-ink-primary">{title}</p>
                  <p className="mt-0.5 text-xs text-ink-muted">{desc}</p>
                </div>
                <IconArrowRight className="h-4 w-4 shrink-0 text-ink-faint transition-all group-hover:translate-x-0.5 group-hover:text-brand-600" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
