import meta from "@/data/meta.json";
import { IconGithub, IconGlobe, IconLinkedin, IconMail, IconMap, IconReport, IconExternal } from "./icons";

const PROYECTOS = [
  { href: "https://alic-barandica.vercel.app/", label: "Portafolio", Icon: IconGlobe },
  { href: "https://alic-barandica.vercel.app/#/dashboards-departamentos", label: "Comparador departamental", Icon: IconMap },
  { href: "https://alic-barandica.vercel.app/#/informes", label: "Informes mercado laboral", Icon: IconReport },
];

export default function Footer() {
  const { autor } = meta as any;

  return (
    <footer className="mt-14 border-t border-line-hairline bg-surface-card">
      <div className="mx-auto max-w-[1360px] px-4 py-10 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Marca + descripción */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl2 bg-gradient-to-br from-brand-800 to-ink-primary">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-ab-trim.png" alt="Logo Alic Barandica" className="w-[74%] object-contain" />
              </div>
              <div>
                <p className="text-[15px] font-extrabold leading-tight text-ink-primary">Radar de Contratación</p>
                <p className="text-xs font-medium leading-tight text-ink-muted">Departamento del Magdalena · SECOP II</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-ink-secondary">
              Proyecto personal de análisis de datos abiertos sobre la contratación pública del Magdalena. Es una
              fotografía fija con corte al <span className="font-semibold text-ink-primary">{meta.fecha_corte}</span>; no
              se actualiza en vivo.
            </p>
          </div>

          {/* Autor */}
          <div className="md:col-span-4">
            <p className="section-label mb-3">Autoría</p>
            <p className="text-sm font-bold text-ink-primary">{autor.nombre}</p>
            <p className="text-xs text-ink-muted">{autor.rol}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={autor.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-line-hairline text-ink-secondary transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
              >
                <IconLinkedin className="h-4 w-4" />
              </a>
              <a
                href={autor.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-line-hairline text-ink-secondary transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
              >
                <IconGithub className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${autor.email}`}
                aria-label="Correo"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-line-hairline text-ink-secondary transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
              >
                <IconMail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Otros proyectos */}
          <div className="md:col-span-3">
            <p className="section-label mb-3">Otros proyectos</p>
            <ul className="flex flex-col gap-2.5">
              {PROYECTOS.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-[13px] font-medium text-ink-secondary transition-colors hover:text-brand-600"
                  >
                    <Icon className="h-4 w-4 text-ink-muted transition-colors group-hover:text-brand-600" />
                    {label}
                    <IconExternal className="h-3 w-3 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-2 border-t border-line-hairline pt-5 text-[11px] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Fuente: SECOP II — Colombia Compra Eficiente (datos.gov.co). Proyecto independiente, sin afiliación oficial.</p>
          <p>© {new Date().getFullYear()} Alic Barandica Mejía</p>
        </div>
      </div>
    </footer>
  );
}
