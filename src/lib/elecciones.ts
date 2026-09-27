// Calendario electoral colombiano relevante para el período analizado (2020-2026).
// Fechas verificadas: Registraduría Nacional / cobertura de prensa (El Espectador, Wikipedia).
// La "ventana de restricción" es una referencia aproximada de 4 meses antes de cada elección,
// periodo en el que la Ley de Garantías Electorales (Ley 996 de 2005) limita la contratación
// directa de las entidades públicas. El alcance exacto puede variar según el nivel de gobierno
// y el tipo de elección: se muestra como contexto, no como determinación jurídica precisa.

export type EventoElectoral = {
  fecha: string; // YYYY-MM-DD
  tipo: "regional" | "congreso" | "presidencial_1" | "presidencial_2";
  nombre: string;
  ventanaInicio?: string; // inicio aproximado de restricción de Ley de Garantías
};

export const EVENTOS_ELECTORALES: EventoElectoral[] = [
  {
    fecha: "2019-10-27",
    tipo: "regional",
    nombre: "Elecciones regionales 2019 (gobernadores y alcaldes)",
    ventanaInicio: "2019-06-27",
  },
  {
    fecha: "2022-03-13",
    tipo: "congreso",
    nombre: "Elecciones de Congreso 2022",
  },
  {
    fecha: "2022-05-29",
    tipo: "presidencial_1",
    nombre: "Presidencial 2022 · 1ª vuelta",
    ventanaInicio: "2022-01-29",
  },
  {
    fecha: "2022-06-19",
    tipo: "presidencial_2",
    nombre: "Presidencial 2022 · 2ª vuelta",
  },
  {
    fecha: "2023-10-29",
    tipo: "regional",
    nombre: "Elecciones regionales 2023 (gobernadores y alcaldes)",
    ventanaInicio: "2023-06-29",
  },
  {
    fecha: "2026-03-08",
    tipo: "congreso",
    nombre: "Elecciones de Congreso 2026",
  },
  {
    fecha: "2026-05-31",
    tipo: "presidencial_1",
    nombre: "Presidencial 2026 · 1ª vuelta",
    ventanaInicio: "2026-01-31",
  },
  {
    fecha: "2026-06-21",
    tipo: "presidencial_2",
    nombre: "Presidencial 2026 · 2ª vuelta",
  },
];

export const COLOR_EVENTO: Record<EventoElectoral["tipo"], string> = {
  regional: "#4a3aa7",
  congreso: "#eda100",
  presidencial_1: "#e34948",
  presidencial_2: "#e34948",
};
