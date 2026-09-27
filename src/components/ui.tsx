import type { ReactNode } from "react";

/* ============ Encabezado de página ============ */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  right,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && (
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-brand-700">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            {eyebrow}
          </div>
        )}
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle mt-2">{subtitle}</p>}
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  );
}

/* ============ Card genérica ============ */
export function Card({
  title,
  subtitle,
  children,
  className = "",
  action,
  bodyClassName = "",
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
  bodyClassName?: string;
}) {
  return (
    <div className={`card p-[18px] ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

/* ============ Chip de ícono coloreado ============ */
const ICON_TONES: Record<string, string> = {
  brand: "bg-brand-50 text-brand-600",
  blue: "bg-blue-50 text-[#2f6df0]",
  amber: "bg-accent-50 text-accent-500",
  purple: "bg-violet-50 text-[#8b5cf6]",
  coral: "bg-orange-50 text-status-serious",
  neutral: "bg-surface-sunken text-ink-secondary",
};

export function IconChip({
  children,
  tone = "brand",
  size = 38,
}: {
  children: ReactNode;
  tone?: keyof typeof ICON_TONES | string;
  size?: number;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-xl2 ${ICON_TONES[tone] ?? ICON_TONES.brand}`}
      style={{ width: size, height: size }}
    >
      {children}
    </span>
  );
}

/* ============ Stat tile (KPI) ============ */
export function StatTile({
  label,
  value,
  hint,
  delta,
  icon,
  tone = "brand",
  className = "",
}: {
  label: string;
  value: string;
  hint?: string;
  delta?: { value: string; positive?: boolean };
  icon?: ReactNode;
  tone?: keyof typeof ICON_TONES | string;
  className?: string;
}) {
  return (
    <div className={`card card-hover flex flex-col gap-2.5 p-4 ${className}`}>
      <div className="flex items-start justify-between gap-2">
        <span className="section-label pt-1">{label}</span>
        {icon && (
          <IconChip tone={tone} size={36}>
            {icon}
          </IconChip>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className="kpi-value">{value}</span>
        {delta && (
          <span
            className={`chip mb-0.5 ${
              delta.positive ? "bg-brand-50 text-brand-700" : "bg-orange-50 text-status-serious"
            }`}
          >
            {delta.positive ? "▲" : "▼"} {delta.value}
          </span>
        )}
      </div>
      {hint && <p className="text-xs leading-snug text-ink-muted">{hint}</p>}
    </div>
  );
}

/* ============ Anillo de progreso (círculo completo) ============ */
export function ProgressRing({
  value,
  size = 92,
  stroke = 10,
  color = "#12a67a",
  trackColor = "#eef2ee",
  children,
}: {
  value: number; // 0-100
  size?: number;
  stroke?: number;
  color?: string;
  trackColor?: string;
  children?: ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const dash = (pct / 100) * c;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  );
}

/* ============ Gauge semicircular (arco 180°) ============ */
export function RadialGauge({
  value,
  max = 100,
  color = "#12a67a",
  trackColor = "#eef2ee",
  size = 160,
  stroke = 14,
  children,
}: {
  value: number;
  max?: number;
  color?: string;
  trackColor?: string;
  size?: number;
  stroke?: number;
  children?: ReactNode;
}) {
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = Math.PI * r; // media circunferencia
  const pct = Math.max(0, Math.min(1, value / max));
  const height = size / 2 + stroke;
  return (
    <div className="relative" style={{ width: size, height }}>
      <svg width={size} height={height}>
        <g transform={`rotate(180 ${cx} ${cy})`}>
          <path
            d={`M ${stroke / 2} ${cy} A ${r} ${r} 0 0 1 ${size - stroke / 2} ${cy}`}
            fill="none"
            stroke={trackColor}
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <path
            d={`M ${stroke / 2} ${cy} A ${r} ${r} 0 0 1 ${size - stroke / 2} ${cy}`}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${pct * circ} ${circ}`}
          />
        </g>
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pb-1 text-center">
        {children}
      </div>
    </div>
  );
}

/* ============ Badges y chips ============ */
export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "good" | "warning" | "serious" | "critical" | "brand" | "blue";
}) {
  const map: Record<string, string> = {
    neutral: "bg-surface-sunken text-ink-secondary",
    good: "bg-brand-50 text-brand-700",
    warning: "bg-accent-50 text-accent-700",
    serious: "bg-orange-50 text-status-serious",
    critical: "bg-red-50 text-status-critical",
    brand: "bg-brand-50 text-brand-700",
    blue: "bg-blue-50 text-[#2554c9]",
  };
  return <span className={`badge ${map[tone]}`}>{children}</span>;
}

/* ============ Callout ============ */
export function Callout({
  children,
  tone = "neutral",
  icon,
  className = "mt-4",
}: {
  children: ReactNode;
  tone?: "neutral" | "warning" | "brand";
  icon?: ReactNode;
  className?: string;
}) {
  const map: Record<string, string> = {
    neutral: "border-line-hairline bg-surface-sunken text-ink-secondary",
    warning: "border-accent-200 bg-accent-50 text-accent-900",
    brand: "border-brand-200 bg-brand-50 text-brand-900",
  };
  return (
    <div className={`callout flex gap-2.5 ${map[tone]} ${className}`}>
      {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
      <div>{children}</div>
    </div>
  );
}

/* ============ Leyenda ============ */
export function Legend({ items }: { items: { color: string; label: string; value?: string }[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-2 text-[13px]">
          <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: it.color }} />
          <span className="text-ink-secondary">{it.label}</span>
          {it.value && <span className="ml-auto font-semibold text-ink-primary tabular-nums">{it.value}</span>}
        </div>
      ))}
    </div>
  );
}
