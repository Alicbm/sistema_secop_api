import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconWallet(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3.5 7.5A2 2 0 0 1 5.5 5.5h11A2 2 0 0 1 18.5 7.5v1H6a1.5 1.5 0 0 0 0 3h13a1.5 1.5 0 0 1 1.5 1.5v4A2 2 0 0 1 18.5 19H5.5a2 2 0 0 1-2-2V7.5Z" />
      <path d="M16.5 13.5h.01" />
    </svg>
  );
}

export function IconBuilding(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 20.5V5a1.5 1.5 0 0 1 1.5-1.5H13A1.5 1.5 0 0 1 14.5 5v15.5" />
      <path d="M14.5 9h3A1.5 1.5 0 0 1 19 10.5v10M3.5 20.5h17M8 7h3.5M8 10.5h3.5M8 14h3.5" />
    </svg>
  );
}

export function IconUsers(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <path d="M16 5.2a3 3 0 0 1 0 5.6M17.5 14c2.2.5 3.5 2.4 3.5 5" />
    </svg>
  );
}

export function IconLayers(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="m12 3.5 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4M4 16.5l8 4 8-4" />
    </svg>
  );
}

export function IconPie(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5H12V3.5Z" />
      <path d="M14.5 3.9A8.5 8.5 0 0 1 20.1 9.5H14.5V3.9Z" />
    </svg>
  );
}

export function IconArrowRight(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconRadar(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 12h4l2.4 6.2L14 5.5l2.2 6.5H21" />
    </svg>
  );
}

export function IconBars(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3.5" y="12" width="4" height="8.5" rx="1.3" />
      <rect x="10" y="7" width="4" height="13.5" rx="1.3" />
      <rect x="16.5" y="3.5" width="4" height="17" rx="1.3" />
    </svg>
  );
}

export function IconNetwork(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="5.5" cy="6" r="2.3" />
      <circle cx="18.5" cy="6" r="2.3" />
      <circle cx="12" cy="18" r="2.3" />
      <path d="M7.4 7.2 10.5 16M16.6 7.2 13.5 16M7.8 6h8.4" />
    </svg>
  );
}

export function IconLeak(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3v10" />
      <path d="m7.5 9 4.5 4.5L16.5 9" />
      <path d="M4 16.5c0 2 3.6 3.5 8 3.5s8-1.5 8-3.5" />
    </svg>
  );
}

export function IconCalendar(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3.5" y="4.5" width="17" height="16" rx="2.6" />
      <path d="M3.5 9.5h17M8 3v3M16 3v3" />
    </svg>
  );
}

export function IconInfo(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 11v5.4M12 7.7v.1" />
    </svg>
  );
}

export function IconGlobe(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M3.5 12h17M12 3.4c2.4 2.3 3.6 5.4 3.6 8.6s-1.2 6.3-3.6 8.6c-2.4-2.3-3.6-5.4-3.6-8.6s1.2-6.3 3.6-8.6Z" />
    </svg>
  );
}

export function IconMap(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="m9 4-6 2.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4Z" />
      <path d="M9 4v13M15 6.5v13" />
    </svg>
  );
}

export function IconReport(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6.5 3.5h7L18 8v11.5a1 1 0 0 1-1 1H6.5a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
      <path d="M13 3.5V8h4.5M8.5 13h7M8.5 16.5h7" />
    </svg>
  );
}

export function IconExternal(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M14 5h5v5M19 5l-7.5 7.5M17 13.5V18a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 5 18V9a1.5 1.5 0 0 1 1.5-1.5H11" />
    </svg>
  );
}

export function IconChevronLeft(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="m14.5 6-6 6 6 6" />
    </svg>
  );
}

export function IconMenu(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconLinkedin(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.3 8.4h3.28V20H3.3V8.4Zm5.24 0h3.14v1.58h.05c.44-.83 1.5-1.7 3.1-1.7 3.32 0 3.93 2.18 3.93 5.02V20h-3.28v-5.14c0-1.23-.02-2.8-1.71-2.8-1.71 0-1.97 1.34-1.97 2.72V20H8.54V8.4Z" />
    </svg>
  );
}

export function IconGithub(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export function IconMail(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.2" />
      <path d="m4.5 7 7.5 5.5L19.5 7" />
    </svg>
  );
}
