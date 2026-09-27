"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  IconBars,
  IconCalendar,
  IconChevronLeft,
  IconClose,
  IconGlobe,
  IconInfo,
  IconLeak,
  IconMap,
  IconMenu,
  IconNetwork,
  IconRadar,
  IconReport,
  IconExternal,
} from "./icons";

type NavItem = { href: string; label: string; short: string; Icon: (p: any) => JSX.Element };

const NAV: NavItem[] = [
  { href: "/", label: "Radar general", short: "Radar", Icon: IconRadar },
  { href: "/modalidades", label: "Modalidades y contratistas", short: "Modalidades", Icon: IconBars },
  { href: "/red", label: "Red entidad-proveedor", short: "Red", Icon: IconNetwork },
  { href: "/fuga-local", label: "Fuga de contratación local", short: "Fuga local", Icon: IconLeak },
  { href: "/ciclo-electoral", label: "Ciclo electoral y ejecución", short: "Ciclo electoral", Icon: IconCalendar },
  { href: "/metodologia", label: "Metodología y datos", short: "Metodología", Icon: IconInfo },
];

const ABOUT = [
  { href: "https://alic-barandica.vercel.app/", label: "Mi portafolio", short: "Portafolio", Icon: IconGlobe },
  {
    href: "https://alic-barandica.vercel.app/#/dashboards-departamentos",
    label: "Comparador departamental",
    short: "Comparador",
    Icon: IconMap,
  },
  {
    href: "https://alic-barandica.vercel.app/#/informes",
    label: "Informes mercado laboral",
    short: "Informes",
    Icon: IconReport,
  },
];

function LogoChip({ size = 40 }: { size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-xl2 bg-gradient-to-br from-brand-800 to-ink-primary shadow-soft"
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-ab-trim.png" alt="Logo Alic Barandica" className="w-[76%] object-contain" />
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("radar-sidebar-collapsed");
      if (saved === "1") setCollapsed(true);
    } catch {}
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function toggleCollapsed() {
    setCollapsed((v) => {
      const next = !v;
      try {
        localStorage.setItem("radar-sidebar-collapsed", next ? "1" : "0");
      } catch {}
      return next;
    });
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  const NavList = ({ expanded }: { expanded: boolean }) => (
    <nav className="flex flex-col gap-1">
      {NAV.map(({ href, label, Icon }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            title={!expanded ? label : undefined}
            className={`nav-link ${active ? "nav-link-active" : ""} ${expanded ? "" : "justify-center px-0"}`}
          >
            <Icon className={`h-[19px] w-[19px] shrink-0 ${active ? "text-white" : "text-ink-muted"}`} />
            {expanded && <span className="truncate">{label}</span>}
          </Link>
        );
      })}
    </nav>
  );

  const AboutList = ({ expanded }: { expanded: boolean }) => (
    <div className="flex flex-col gap-1">
      {ABOUT.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={!expanded ? label : undefined}
          className={`nav-link group ${expanded ? "" : "justify-center px-0"}`}
        >
          <Icon className="h-[18px] w-[18px] shrink-0 text-ink-muted transition-colors group-hover:text-brand-600" />
          {expanded && (
            <>
              <span className="truncate">{label}</span>
              <IconExternal className="ml-auto h-3.5 w-3.5 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100" />
            </>
          )}
        </a>
      ))}
    </div>
  );

  // Contenido interno compartido (desktop)
  const DesktopInner = () => {
    const expanded = !collapsed;
    return (
      <>
        {/* Header con logo + toggle */}
        <div className={`flex items-center gap-2.5 px-3 pb-4 pt-5 ${expanded ? "" : "flex-col"}`}>
          <LogoChip size={expanded ? 40 : 42} />
          {expanded && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-extrabold leading-tight text-ink-primary">Radar Magdalena</p>
              <p className="truncate text-[11px] font-medium leading-tight text-ink-muted">Contratación · SECOP II</p>
            </div>
          )}
          <button
            onClick={toggleCollapsed}
            aria-label={expanded ? "Colapsar menú" : "Expandir menú"}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-line-hairline bg-surface-card text-ink-muted transition-colors hover:border-brand-300 hover:text-brand-600"
          >
            <IconChevronLeft className={`h-4 w-4 transition-transform duration-200 ${expanded ? "" : "rotate-180"}`} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3">
          {expanded && <p className="section-label mb-2 mt-1 px-2">Análisis</p>}
          <NavList expanded={expanded} />

          <div className="my-4 border-t border-line-hairline" />

          {expanded && <p className="section-label mb-2 px-2">Sobre mí</p>}
          <AboutList expanded={expanded} />
        </div>

        {/* Pie del sidebar */}
        {expanded ? (
          <div className="m-3 rounded-xl2 border border-line-hairline bg-surface-sunken p-3.5">
            <p className="text-[12px] font-semibold leading-snug text-ink-secondary">Alic Barandica Mejía</p>
            <p className="mt-0.5 text-[11px] leading-snug text-ink-muted">Economista · Analista de Datos</p>
            <p className="mt-2 text-[10.5px] leading-snug text-ink-faint">
              Fotografía fija de SECOP II · no se actualiza en vivo.
            </p>
          </div>
        ) : (
          <div className="mb-3 flex justify-center">
            <div className="h-8 w-8 rounded-full bg-brand-50 ring-1 ring-brand-100" title="Alic Barandica Mejía" />
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {/* ===== Móvil: barra superior ===== */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-line-hairline bg-surface-card/90 px-4 py-3 backdrop-blur-md lg:hidden">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoChip size={36} />
          <div>
            <p className="text-[13px] font-extrabold leading-tight text-ink-primary">Radar Magdalena</p>
            <p className="text-[10px] font-medium leading-tight text-ink-muted">Contratación · SECOP II</p>
          </div>
        </Link>
        <button
          aria-label="Abrir menú"
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-line-hairline text-ink-secondary"
        >
          <IconMenu className="h-5 w-5" />
        </button>
      </header>

      {/* ===== Móvil: drawer ===== */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-ink-primary/40 backdrop-blur-sm" />
          <div
            className="absolute left-0 top-0 flex h-full w-[280px] animate-slide-in flex-col bg-surface-card shadow-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 pb-3 pt-4">
              <div className="flex items-center gap-2.5">
                <LogoChip size={38} />
                <div>
                  <p className="text-sm font-extrabold leading-tight text-ink-primary">Radar Magdalena</p>
                  <p className="text-[11px] font-medium leading-tight text-ink-muted">Contratación · SECOP II</p>
                </div>
              </div>
              <button
                aria-label="Cerrar menú"
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-surface-sunken"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3">
              <p className="section-label mb-2 mt-1 px-2">Análisis</p>
              <NavList expanded />
              <div className="my-4 border-t border-line-hairline" />
              <p className="section-label mb-2 px-2">Sobre mí</p>
              <AboutList expanded />
            </div>
            <div className="m-3 rounded-xl2 border border-line-hairline bg-surface-sunken p-3.5">
              <p className="text-[12px] font-semibold text-ink-secondary">Alic Barandica Mejía</p>
              <p className="mt-0.5 text-[11px] text-ink-muted">Economista · Analista de Datos</p>
            </div>
          </div>
        </div>
      )}

      {/* ===== Desktop: sidebar sticky colapsable ===== */}
      <aside
        className={`sticky top-0 z-30 hidden h-screen shrink-0 flex-col border-r border-line-hairline bg-surface-card transition-[width] duration-200 lg:flex ${
          collapsed ? "w-[80px]" : "w-[268px]"
        } ${mounted ? "" : ""}`}
      >
        <DesktopInner />
      </aside>
    </>
  );
}
