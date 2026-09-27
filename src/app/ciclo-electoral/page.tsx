import { Callout, Card, PageHeader } from "@/components/ui";
import ElectoralCycleChart from "@/components/charts/ElectoralCycleChart";
import BrechaAnualChart from "@/components/charts/BrechaAnualChart";
import { COLOR_EVENTO } from "@/lib/elecciones";

export default function CicloElectoralPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Ley de Garantías y ciclos electorales"
        title="Contratación directa y el ciclo electoral"
        subtitle="Porcentaje del valor mensual contratado por contratación directa, superpuesto con las elecciones y las ventanas de restricción de la Ley de Garantías Electorales (Ley 996 de 2005)."
      />

      <Card>
        <ElectoralCycleChart />
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-t border-line-hairline pt-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-ink-secondary">
            <span className="h-2.5 w-2.5 rounded-[3px]" style={{ backgroundColor: "#8b5cf6" }} /> Contratación directa (% del valor)
          </div>
          {(["regional", "congreso", "presidencial_1"] as const).map((tipo) => (
            <div key={tipo} className="flex items-center gap-1.5 text-xs font-medium text-ink-secondary">
              <span className="h-0 w-4 border-t-2 border-dashed" style={{ borderColor: COLOR_EVENTO[tipo] }} />
              {tipo === "regional" ? "Elecciones regionales" : tipo === "congreso" ? "Elecciones de Congreso" : "Elecciones presidenciales"}
            </div>
          ))}
          <div className="flex items-center gap-1.5 text-xs font-medium text-ink-secondary">
            <span className="h-2.5 w-4 rounded-sm bg-brand-900/10" /> Ventana de restricción (~4 meses antes)
          </div>
        </div>
        <div className="mt-4">
          <Callout>
            La ventana de restricción es una referencia aproximada de 4 meses antes de cada elección — el alcance exacto
            de la Ley de Garantías varía según el nivel de gobierno y el tipo de elección, y se muestra como contexto, no
            como determinación jurídica. Aun así, se observa que los picos de contratación directa no siempre bajan dentro
            de esas ventanas, lo que sugiere que otros factores (fin de vigencia presupuestal, arranque de nuevas
            administraciones) también influyen.
          </Callout>
        </div>
      </Card>

      <div className="mt-8 border-t border-dashed border-line-strong pt-7">
        <div className="mb-4">
          <span className="badge bg-surface-sunken text-ink-muted">Complementario · no es el foco principal</span>
          <h2 className="mt-2 text-lg font-bold tracking-tight text-ink-primary">Brecha entre lo contratado y lo pagado</h2>
          <p className="mt-1 max-w-2xl text-sm text-ink-secondary">Por año, el valor contratado frente al valor efectivamente pagado según SECOP II.</p>
        </div>
        <Card>
          <BrechaAnualChart />
          <Callout tone="warning">
            Se incluye como referencia, no como indicador principal: el registro de pagos en SECOP II depende de que cada
            entidad actualice manualmente el contrato a medida que se ejecuta, y muchas no lo hacen de forma consistente —
            incluso años ya cerrados muestran porcentajes de pago bajos que probablemente subestiman la ejecución real.
            Interprétese como una limitación de reporte, no como una medida fiel de incumplimiento.
          </Callout>
        </Card>
      </div>
    </div>
  );
}
