"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation } from "d3-force";
import raw from "@/data/red_entidad_proveedor.json";
import contratosData from "@/data/red_contratos.json";
import { formatCOPShort, formatNumber } from "@/lib/format";
import { IconNetwork, IconExternal, IconClose } from "../icons";

type RawNode = {
  id: string;
  tipo: "entidad" | "proveedor";
  nombre: string;
  valor_total_cop: number;
  n_contratos: number;
  es_persona_natural?: boolean;
};
type RawEdge = { source: string; target: string; valor_cop: number; n_contratos: number };
type SimNode = RawNode & { x: number; y: number; r: number };
type SimEdge = { source: SimNode; target: SimNode; valor_cop: number; n_contratos: number };
type Conn = { other: SimNode; valor_cop: number; n_contratos: number };
type Contrato = { r: string; v: number; f: string; u: string; o: string; p?: string };

const CONTR = contratosData as Record<string, Contrato[]>;

const COLOR_ENTIDAD = "#0c8763";
const COLOR_JURIDICA = "#2f6df0";
const COLOR_NATURAL = "#f5a623";
const WIDTH = 1000;
const HEIGHT = 680;

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
function fmtFecha(f: string) {
  if (!f || f.length < 7) return "";
  const [y, m, d] = f.split("-");
  return `${d ? d + " " : ""}${MESES[parseInt(m, 10) - 1] ?? ""} ${y}`;
}
function colorFor(n: RawNode) {
  if (n.tipo === "entidad") return COLOR_ENTIDAD;
  return n.es_persona_natural ? COLOR_NATURAL : COLOR_JURIDICA;
}
function tipoLabel(n: RawNode) {
  if (n.tipo === "entidad") return "Entidad pública";
  return n.es_persona_natural ? "Proveedor · persona natural" : "Proveedor · persona jurídica";
}
function contratosFor(a: SimNode, b: SimNode): Contrato[] {
  const ent = a.tipo === "entidad" ? a : b;
  const prov = a.tipo === "entidad" ? b : a;
  const key = ent.id.slice(3) + "||" + prov.id.slice(3);
  return CONTR[key] ?? [];
}
function secopUrl(u: string) {
  return u ? `https://community.secop.gov.co/Public/Tendering/OpportunityDetail/Index?noticeUID=${u}&isFromPublicArea=True` : "";
}

export default function NetworkGraph() {
  const [nodes, setNodes] = useState<SimNode[] | null>(null);
  const [edges, setEdges] = useState<SimEdge[] | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  const drag = useRef({ on: false, sx: 0, sy: 0, ox: 0, oy: 0, moved: false });
  const svgRef = useRef<SVGSVGElement>(null);
  const fitRef = useRef({ x: 0, y: 0, k: 1 });

  useEffect(() => {
    const maxValor = Math.max(...(raw.nodes as RawNode[]).map((n) => n.valor_total_cop));
    const radius = (v: number) => 5 + Math.sqrt(v / maxValor) * 30;
    const simNodes: SimNode[] = (raw.nodes as RawNode[]).map((n) => ({
      ...n,
      x: WIDTH / 2 + (Math.random() - 0.5) * 240,
      y: HEIGHT / 2 + (Math.random() - 0.5) * 240,
      r: radius(n.valor_total_cop),
    }));
    const byId = new Map(simNodes.map((n) => [n.id, n]));
    const simEdges: SimEdge[] = (raw.edges as RawEdge[])
      .map((e) => ({ source: byId.get(e.source)!, target: byId.get(e.target)!, valor_cop: e.valor_cop, n_contratos: e.n_contratos }))
      .filter((e) => e.source && e.target);

    const sim = forceSimulation(simNodes as any)
      .force("link", forceLink(simEdges as any).id((d: any) => d.id).distance(64).strength(0.28))
      .force("charge", forceManyBody().strength(-110).distanceMax(340))
      .force("center", forceCenter(WIDTH / 2, HEIGHT / 2))
      .force("collide", forceCollide((d: any) => d.r + 4))
      .stop();
    for (let i = 0; i < 300; i++) sim.tick();

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    simNodes.forEach((n) => {
      minX = Math.min(minX, n.x - n.r);
      maxX = Math.max(maxX, n.x + n.r);
      minY = Math.min(minY, n.y - n.r);
      maxY = Math.max(maxY, n.y + n.r);
    });
    const pad = 28;
    const bw = Math.max(1, maxX - minX);
    const bh = Math.max(1, maxY - minY);
    const k = Math.min((WIDTH - 2 * pad) / bw, (HEIGHT - 2 * pad) / bh, 1.5);
    const fit = { x: (WIDTH - bw * k) / 2 - minX * k, y: (HEIGHT - bh * k) / 2 - minY * k, k };
    fitRef.current = fit;
    setNodes(simNodes);
    setEdges(simEdges);
    setTransform(fit);
  }, []);

  const { neighbors, connections } = useMemo(() => {
    const nb = new Map<string, Set<string>>();
    const conn = new Map<string, Conn[]>();
    if (edges) {
      edges.forEach((e) => {
        if (!nb.has(e.source.id)) nb.set(e.source.id, new Set());
        if (!nb.has(e.target.id)) nb.set(e.target.id, new Set());
        nb.get(e.source.id)!.add(e.target.id);
        nb.get(e.target.id)!.add(e.source.id);
        if (!conn.has(e.source.id)) conn.set(e.source.id, []);
        if (!conn.has(e.target.id)) conn.set(e.target.id, []);
        conn.get(e.source.id)!.push({ other: e.target, valor_cop: e.valor_cop, n_contratos: e.n_contratos });
        conn.get(e.target.id)!.push({ other: e.source, valor_cop: e.valor_cop, n_contratos: e.n_contratos });
      });
      conn.forEach((arr) => arr.sort((a, b) => b.valor_cop - a.valor_cop));
    }
    return { neighbors: nb, connections: conn };
  }, [edges]);

  // La selección FIJA el resaltado (persiste). Sin selección, el hover resalta temporalmente.
  const highlightId = selectedId ?? hoverId;
  const highlightNeighbors = highlightId ? neighbors.get(highlightId) : null;
  const selectedNode = selectedId ? nodes?.find((n) => n.id === selectedId) ?? null : null;
  const hoverNode = hoverId ? nodes?.find((n) => n.id === hoverId) ?? null : null;
  const hasQuery = query.trim().length > 1;
  const q = query.trim().toLowerCase();

  // vínculo entre el nodo seleccionado y el nodo bajo el cursor (para tooltip de monto)
  const hoverEdge = useMemo(() => {
    if (!selectedId || !hoverId || selectedId === hoverId) return null;
    return (connections.get(selectedId) ?? []).find((c) => c.other.id === hoverId) ?? null;
  }, [selectedId, hoverId, connections]);

  const labelIds = useMemo(() => {
    if (!nodes) return new Set<string>();
    const top = [...nodes].filter((n) => n.tipo === "entidad").sort((a, b) => b.valor_total_cop - a.valor_total_cop).slice(0, 7);
    return new Set(top.map((n) => n.id));
  }, [nodes]);

  const topEntidades = useMemo(() => {
    if (!nodes) return [];
    return [...nodes].filter((n) => n.tipo === "entidad").sort((a, b) => b.valor_total_cop - a.valor_total_cop).slice(0, 6);
  }, [nodes]);

  function linkPath(s: SimNode, t: SimNode) {
    const dx = t.x - s.x, dy = t.y - s.y;
    const mx = (s.x + t.x) / 2, my = (s.y + t.y) / 2;
    const norm = Math.hypot(dx, dy) || 1;
    const off = Math.min(norm * 0.12, 26);
    return `M ${s.x} ${s.y} Q ${mx - (dy / norm) * off} ${my + (dx / norm) * off} ${t.x} ${t.y}`;
  }

  function onWheel(e: React.WheelEvent<SVGSVGElement>) {
    e.preventDefault();
    setTransform((t) => ({ ...t, k: Math.min(4, Math.max(0.4, t.k - e.deltaY * 0.0016 * t.k)) }));
  }
  function onPointerDown(e: React.PointerEvent<SVGSVGElement>) {
    drag.current = { on: true, sx: e.clientX, sy: e.clientY, ox: transform.x, oy: transform.y, moved: false };
  }
  function onPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!drag.current.on) return;
    const dx = e.clientX - drag.current.sx, dy = e.clientY - drag.current.sy;
    if (Math.abs(dx) + Math.abs(dy) > 3) drag.current.moved = true;
    setTransform((t) => ({ ...t, x: drag.current.ox + dx, y: drag.current.oy + dy }));
  }
  function onPointerUp() {
    drag.current.on = false;
  }
  function selectNode(id: string) {
    setSelectedId(id);
    setExpanded(null);
  }
  function clearSelection() {
    setSelectedId(null);
    setExpanded(null);
  }

  const maxEdgeValor = useMemo(() => (edges ? Math.max(...edges.map((e) => e.valor_cop)) : 1), [edges]);

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_330px]">
      {/* ==== Lienzo ==== */}
      <div className="card overflow-hidden p-0">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-hairline px-3.5 py-2.5">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar entidad o proveedor…"
            className="w-full max-w-xs rounded-xl border border-line-hairline bg-surface-sunken py-2 px-3 text-[13px] text-ink-primary placeholder:text-ink-muted focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          <div className="flex items-center gap-1.5">
            {selectedId && (
              <button onClick={clearSelection} className="flex items-center gap-1 rounded-lg border border-line-hairline bg-surface-card px-2.5 py-1.5 text-[12px] font-semibold text-ink-secondary hover:border-brand-300 hover:text-brand-600">
                <IconClose className="h-3.5 w-3.5" /> Limpiar
              </button>
            )}
            <button onClick={() => setTransform((t) => ({ ...t, k: Math.min(4, t.k * 1.25) }))} className="h-8 w-8 rounded-lg border border-line-hairline text-ink-secondary hover:bg-surface-sunken" aria-label="Acercar">+</button>
            <button onClick={() => setTransform((t) => ({ ...t, k: Math.max(0.4, t.k / 1.25) }))} className="h-8 w-8 rounded-lg border border-line-hairline text-ink-secondary hover:bg-surface-sunken" aria-label="Alejar">−</button>
            <button onClick={() => setTransform(fitRef.current)} className="rounded-lg border border-line-hairline px-2.5 py-1.5 text-[12px] font-semibold text-ink-secondary hover:bg-surface-sunken">Encuadrar</button>
          </div>
        </div>

        <div className="relative">
          {!nodes ? (
            <div className="flex h-[520px] items-center justify-center text-sm text-ink-muted">Calculando distribución de la red…</div>
          ) : (
            <svg
              ref={svgRef}
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              preserveAspectRatio="xMidYMid meet"
              className="h-[520px] w-full cursor-grab touch-none bg-[linear-gradient(#f8faf8,#f3f6f3)] active:cursor-grabbing"
              onWheel={onWheel}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              onClick={() => { if (!drag.current.moved) clearSelection(); }}
            >
              <g transform={`translate(${transform.x} ${transform.y}) scale(${transform.k})`}>
                <g>
                  {edges!.map((e, i) => {
                    const on = highlightId && (e.source.id === highlightId || e.target.id === highlightId);
                    const dim = highlightId && !on;
                    const w = 0.6 + (e.valor_cop / maxEdgeValor) * 3.2;
                    return (
                      <path
                        key={i}
                        d={linkPath(e.source, e.target)}
                        fill="none"
                        stroke={on ? COLOR_ENTIDAD : "#c2c7c2"}
                        strokeOpacity={dim ? 0.07 : on ? 0.6 : 0.28}
                        strokeWidth={on ? Math.max(1.5, w) : w}
                      />
                    );
                  })}
                </g>
                <g>
                  {nodes!.map((n) => {
                    const isHover = n.id === hoverId;
                    const isNb = !!highlightId && highlightNeighbors?.has(n.id);
                    const dim = !!highlightId && n.id !== highlightId && !isNb;
                    const isSelected = n.id === selectedId;
                    const match = hasQuery && n.nombre.toLowerCase().includes(q);
                    const dimQ = hasQuery && !match && !highlightId;
                    const ringed = isHover || match || isSelected;
                    return (
                      <g
                        key={n.id}
                        transform={`translate(${n.x} ${n.y})`}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoverId(n.id)}
                        onMouseLeave={() => setHoverId(null)}
                        onClick={(ev) => { ev.stopPropagation(); if (!drag.current.moved) selectNode(n.id); }}
                      >
                        {isSelected && <circle r={n.r + 4} fill="none" stroke={colorFor(n)} strokeOpacity={0.4} strokeWidth={2.5} />}
                        <circle
                          r={n.r}
                          fill={colorFor(n)}
                          fillOpacity={dim || dimQ ? 0.16 : 0.92}
                          stroke={ringed ? "#141a16" : "#ffffff"}
                          strokeWidth={ringed ? 2.5 : 1.5}
                        />
                      </g>
                    );
                  })}
                </g>
                <g className="pointer-events-none">
                  {nodes!
                    .filter((n) => labelIds.has(n.id) || n.id === highlightId || n.id === selectedId)
                    .map((n) => {
                      const dim = !!highlightId && n.id !== highlightId && !highlightNeighbors?.has(n.id);
                      if (dim) return null;
                      const label = n.nombre.length > 26 ? n.nombre.slice(0, 25) + "…" : n.nombre;
                      return (
                        <text
                          key={`l${n.id}`}
                          transform={`translate(${n.x} ${n.y - n.r - 6})`}
                          textAnchor="middle"
                          className="fill-ink-primary"
                          style={{ fontSize: 11, fontWeight: 700, paintOrder: "stroke", stroke: "#f6f8f6", strokeWidth: 3 }}
                        >
                          {label}
                        </text>
                      );
                    })}
                </g>
              </g>

              {/* tooltip del nodo bajo el cursor */}
              {hoverNode && (() => {
                const sx = hoverNode.x * transform.k + transform.x;
                const sy = hoverNode.y * transform.k + transform.y;
                const tw = 236;
                const x = Math.max(6, Math.min(sx + 12, WIDTH - tw - 6));
                const y = Math.max(6, Math.min(sy - 20, HEIGHT - 118));
                return (
                  <foreignObject x={x} y={y} width={tw} height={116} style={{ pointerEvents: "none" }}>
                    <div className="rounded-xl border border-line-hairline bg-surface-card px-3 py-2.5 shadow-lifted">
                      <div className="mb-1 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: colorFor(hoverNode) }} />
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">{tipoLabel(hoverNode)}</span>
                      </div>
                      <p className="text-[12.5px] font-bold leading-tight text-ink-primary">{hoverNode.nombre}</p>
                      {hoverEdge ? (
                        <div className="mt-1.5 rounded-lg bg-brand-50 px-2 py-1.5">
                          <p className="text-[10px] font-medium text-brand-700">Contrata con la entidad seleccionada</p>
                          <p className="text-[13px] font-extrabold text-brand-800">{formatCOPShort(hoverEdge.valor_cop)} <span className="text-[10px] font-medium text-brand-600">· {formatNumber(hoverEdge.n_contratos)} contratos</span></p>
                        </div>
                      ) : (
                        <p className="mt-1 text-[11px] text-ink-secondary">{formatCOPShort(hoverNode.valor_total_cop)} · {formatNumber(hoverNode.n_contratos)} contratos</p>
                      )}
                    </div>
                  </foreignObject>
                );
              })()}
            </svg>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line-hairline px-4 py-2.5 text-[12px] text-ink-secondary">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLOR_ENTIDAD }} /> Entidad pública</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLOR_JURIDICA }} /> Proveedor · jurídica</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLOR_NATURAL }} /> Proveedor · natural</span>
          <span className="ml-auto hidden text-ink-muted sm:inline">Tamaño y grosor ∝ valor contratado</span>
        </div>
      </div>

      {/* ==== Panel de detalle ==== */}
      <div className="flex flex-col gap-4">
        {selectedNode ? (
          <div className="card p-4">
            <div className="flex items-start justify-between gap-2">
              <span className="badge" style={{ backgroundColor: `${colorFor(selectedNode)}1a`, color: colorFor(selectedNode) }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: colorFor(selectedNode) }} />
                {tipoLabel(selectedNode)}
              </span>
              <button onClick={clearSelection} className="shrink-0 rounded-lg p-1 text-ink-muted hover:bg-surface-sunken hover:text-ink-primary" aria-label="Limpiar selección">
                <IconClose className="h-4 w-4" />
              </button>
            </div>
            <h3 className="mt-2 text-[15px] font-bold leading-snug text-ink-primary">{selectedNode.nombre}</h3>

            <div className="mt-3.5 grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-surface-sunken px-2 py-2 text-center">
                <p className="text-[14px] font-extrabold leading-none text-ink-primary">{formatCOPShort(selectedNode.valor_total_cop)}</p>
                <p className="mt-1 text-[10px] font-medium text-ink-muted">valor total</p>
              </div>
              <div className="rounded-xl bg-surface-sunken px-2 py-2 text-center">
                <p className="text-[14px] font-extrabold leading-none text-ink-primary">{formatNumber(selectedNode.n_contratos)}</p>
                <p className="mt-1 text-[10px] font-medium text-ink-muted">contratos</p>
              </div>
              <div className="rounded-xl bg-surface-sunken px-2 py-2 text-center">
                <p className="text-[14px] font-extrabold leading-none text-ink-primary">{neighbors.get(selectedNode.id)?.size ?? 0}</p>
                <p className="mt-1 text-[10px] font-medium text-ink-muted">vínculos</p>
              </div>
            </div>

            <p className="section-label mb-2 mt-4">
              {selectedNode.tipo === "entidad" ? "Proveedores · toca para ver contratos" : "Contratantes · toca para ver contratos"}
            </p>
            <div className="-mr-1 flex max-h-[420px] flex-col gap-1 overflow-y-auto pr-1">
              {(connections.get(selectedNode.id) ?? []).map((cn, i) => {
                const key = selectedNode.id + "|" + cn.other.id;
                const open = expanded === key;
                const contratos = open ? contratosFor(selectedNode, cn.other) : [];
                return (
                  <div key={i} className={`rounded-xl border ${open ? "border-brand-200 bg-brand-50/40" : "border-transparent"}`}>
                    <button
                      onClick={() => setExpanded(open ? null : key)}
                      className="flex w-full items-center gap-2.5 px-2 py-1.5 text-left"
                    >
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: colorFor(cn.other) }} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12.5px] font-semibold text-ink-primary">{cn.other.nombre}</span>
                        <span className="block text-[10.5px] text-ink-muted">{formatNumber(cn.n_contratos)} contrato{cn.n_contratos !== 1 ? "s" : ""}</span>
                      </span>
                      <span className="shrink-0 text-[12px] font-bold tabular-nums text-brand-700">{formatCOPShort(cn.valor_cop)}</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`h-3.5 w-3.5 shrink-0 text-ink-faint transition-transform ${open ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    {open && (
                      <ul className="flex flex-col gap-1.5 px-2 pb-2.5 pt-0.5">
                        {contratos.length === 0 && <li className="px-1 text-[11px] text-ink-muted">Sin detalle de contratos individuales.</li>}
                        {contratos.map((c, j) => (
                          <li key={j} className="rounded-lg border border-line-hairline bg-surface-card px-2.5 py-2">
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-[11px] font-bold text-ink-primary">{c.r || "Sin referencia"}</span>
                              <span className="shrink-0 text-[11.5px] font-extrabold tabular-nums text-brand-700">{formatCOPShort(c.v)}</span>
                            </div>
                            {c.p && c.p !== cn.other.nombre && (
                              <p className="mt-0.5 text-[10px] font-semibold text-ink-secondary">Proveedor: {c.p}</p>
                            )}
                            {c.o && <p className="mt-0.5 line-clamp-2 text-[10.5px] leading-snug text-ink-secondary">{c.o}</p>}
                            <div className="mt-1 flex items-center justify-between gap-2">
                              <span className="text-[10px] text-ink-muted">{fmtFecha(c.f) || "Fecha n/d"}</span>
                              {c.u && (
                                <a href={secopUrl(c.u)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-0.5 text-[10px] font-semibold text-brand-600 hover:text-brand-700">
                                  Ver proceso en SECOP <IconExternal className="h-2.5 w-2.5" />
                                </a>
                              )}
                            </div>
                          </li>
                        ))}
                        {contratos.length > 0 && (
                          <li className="px-1 pt-0.5 text-[9.5px] leading-snug text-ink-faint">
                            Valor = valor total del contrato en SECOP (incluye adiciones y, en convenios, cofinanciación).
                            Puede diferir del “precio estimado” de la ficha del proceso.
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="card p-5">
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl2 bg-brand-50 text-brand-500"><IconNetwork className="h-5 w-5" /></span>
              <p className="text-sm font-bold text-ink-primary">Explora la red</p>
              <p className="text-xs leading-relaxed text-ink-secondary">
                Haz clic en un nodo para <strong className="text-ink-primary">fijar</strong> sus relaciones. Luego pasa el cursor
                sobre una entidad vinculada para ver el monto, o ábrela para ver cada contrato individual.
              </p>
            </div>
            <p className="section-label mb-2 mt-4">Entidades principales</p>
            <div className="flex flex-col gap-1">
              {topEntidades.map((n) => (
                <button key={n.id} onClick={() => selectNode(n.id)} className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-left transition-colors hover:bg-surface-sunken">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: COLOR_ENTIDAD }} />
                  <span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold text-ink-primary">{n.nombre}</span>
                  <span className="shrink-0 text-[12px] font-bold tabular-nums text-brand-700">{formatCOPShort(n.valor_total_cop)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="card p-4">
          <p className="section-label mb-2.5">Cómo leer el grafo</p>
          <ul className="flex flex-col gap-2 text-[12px] leading-relaxed text-ink-secondary">
            <li className="flex gap-2"><span className="mt-px text-brand-500">•</span><span><strong className="text-ink-primary">Clic</strong> en un nodo fija sus relaciones (quedan resaltadas hasta que uses “Limpiar” o hagas clic en el fondo).</span></li>
            <li className="flex gap-2"><span className="mt-px text-brand-500">•</span><span>Con una entidad fijada, <strong className="text-ink-primary">pasa el cursor</strong> sobre una vinculada para ver el monto de esa relación.</span></li>
            <li className="flex gap-2"><span className="mt-px text-brand-500">•</span><span>En el panel, <strong className="text-ink-primary">abre</strong> cada relación para ver sus contratos individuales con valor, fecha y enlace a SECOP.</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
