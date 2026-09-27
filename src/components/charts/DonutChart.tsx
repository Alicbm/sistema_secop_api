"use client";

export type DonutSlice = { label: string; value: number; color: string; valueLabel: string };

export default function DonutChart({
  data,
  size = 168,
  thickness = 22,
  centerValue,
  centerLabel,
  className = "",
}: {
  data: DonutSlice[];
  size?: number;
  thickness?: number;
  centerValue?: string;
  centerLabel?: string;
  className?: string;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const cx = size / 2;
  const cy = size / 2;
  const gap = total > 0 ? Math.min(0.04 * c, 6) : 0; // separación entre segmentos

  let acc = 0;
  const segments = data.map((d) => {
    const frac = total > 0 ? d.value / total : 0;
    const len = frac * c;
    const seg = {
      color: d.color,
      dash: Math.max(0, len - gap),
      offset: -acc,
      rest: c,
    };
    acc += len;
    return seg;
  });

  return (
    <div className={`flex flex-col items-center gap-6 sm:flex-row sm:items-center ${className}`}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#eef2ee" strokeWidth={thickness} />
          {segments.map((s, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeDasharray={`${s.dash} ${s.rest - s.dash}`}
              strokeDashoffset={s.offset}
              strokeLinecap="butt"
            />
          ))}
        </svg>
        {(centerValue || centerLabel) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-center" style={{ width: size - thickness * 2 - 8 }}>
              {centerValue && <span className="block text-[18px] font-extrabold leading-none text-ink-primary">{centerValue}</span>}
              {centerLabel && <span className="mt-1 block text-[10px] font-medium leading-tight text-ink-muted">{centerLabel}</span>}
            </div>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        {data.map((d) => {
          const pct = total > 0 ? (d.value / total) * 100 : 0;
          return (
            <div key={d.label} className="flex min-w-0 items-start gap-2.5">
              <span className="mt-1 h-3 w-3 shrink-0 rounded-[4px]" style={{ backgroundColor: d.color }} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-[13px] font-semibold text-ink-primary">{d.label}</p>
                  <span className="shrink-0 text-[13px] font-bold tabular-nums text-ink-primary">
                    {pct.toLocaleString("es-CO", { maximumFractionDigits: 1 })}%
                  </span>
                </div>
                <p className="text-[11px] leading-tight text-ink-muted">{d.valueLabel}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
