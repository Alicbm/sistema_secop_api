<div align="center">

# 📡 Radar de Contratación Pública del Magdalena

**Análisis interactivo de la contratación pública del departamento del Magdalena (Colombia) a partir de los datos abiertos de SECOP II.**

Montos, entidades, modalidades, red entidad‑proveedor, fuga de contratación local y efecto del ciclo electoral — en un solo sistema.

[Ver demo](#) · [Portafolio](https://alic-barandica.vercel.app/) · [LinkedIn](https://www.linkedin.com/in/alic-barandica)

</div>

---

## 🎯 De qué se trata

**Radar de Contratación** es un tablero analítico que toma los datos abiertos de **SECOP II** (Contratos Electrónicos · Colombia Compra Eficiente) y los convierte en una lectura clara de **cómo, con quién y en qué se contrata** en el departamento del Magdalena.

Reúne **119.189 contratos** por un valor total de **~$8,9 billones COP**, suscritos por entidades con sede en el Magdalena entre **2020 y 2026**, y los organiza en seis vistas que responden preguntas concretas sobre el gasto público territorial.

> Es una **fotografía fija** (corte al 26‑09‑2026): no se conecta en vivo a la API. Todos los datos ya vienen procesados como archivos JSON dentro del proyecto (`src/data/`), sin base de datos ni backend.

---

## 🧭 Secciones

| Vista | Ruta | Qué muestra |
|---|---|---|
| **Radar general** | `/` | KPIs del departamento, tendencia mensual del valor contratado, distribución por orden de entidad y la comparación **relativa** persona natural vs. jurídica. |
| **Modalidades y contratistas** | `/modalidades` | Evolución mensual por modalidad de selección, valor por modalidad y por tipo de contrato, y origen de los recursos. |
| **Red entidad‑proveedor** | `/red` | Grafo interactivo de quién contrata a quién; al fijar una entidad se despliega **cada contrato individual** (valor, objeto, fecha y enlace a SECOP). |
| **Fuga de contratación local** | `/fuga-local` | Cuánto del recurso departamental termina en proveedores **fuera** del Magdalena, con su cobertura y limitaciones. |
| **Ciclo electoral y ejecución** | `/ciclo-electoral` | Contratación directa superpuesta con elecciones y la Ley de Garantías Electorales, más la brecha contratado‑pagado. |
| **Metodología y datos** | `/metodologia` | Fuente, alcance, criterios de limpieza y limitaciones conocidas. |

---

## 📊 Algunos hallazgos

- **La paradoja del contratista individual:** el **89,3%** de los contratos son con personas naturales, pero representan apenas el **16,4%** del valor. El **83,6%** del dinero se concentra en el **10,7%** de contratos (personas jurídicas). Por eso el sistema separa siempre *cantidad de contratos* de *monto contratado*.
- **Fuga de recursos:** del valor con ubicación identificada, el **38,7%** sale del departamento — principalmente hacia **Atlántico (50,1%)** y **Bogotá D.C. (23,8%)**.
- **Concentración:** **20 entidades** y sus **300 vínculos** de mayor valor concentran cerca del **79%** de todo lo contratado.
- **Brecha de ejecución:** el pago registrado en SECOP II subestima la ejecución real, porque depende de que cada entidad actualice manualmente el contrato.

---

## 🛠️ Stack técnico

- **[Next.js 14](https://nextjs.org/)** (App Router) + **TypeScript**
- **[Tailwind CSS](https://tailwindcss.com/)** para el sistema de diseño
- **[Recharts](https://recharts.org/)** para series, barras y áreas
- **[d3-force](https://d3js.org/d3-force)** para el grafo de red (simulación físico‑dirigida, renderizado en SVG)
- **Sin base de datos:** los datos viven como JSON estático en `src/data/`
- Tipografía **Plus Jakarta Sans** auto‑hospedada

---

## 🗂️ Datos y metodología

- **Fuente:** SECOP II — *Contratos Electrónicos* (dataset `jbjy-vk9h`) y *Proveedores Registrados* (`qmzu-gj57`), vía la API Socrata de [datos.gov.co](https://www.datos.gov.co/).
- **Cobertura:** entidades con domicilio en el Magdalena (campo `departamento`).
- **Limpieza:** se excluyeron 73 registros con errores de digitación (valores atípicos > $50.000 millones en un solo contrato) y 2.508 registros con valor cero.
- **"Valor contratado"** usa el campo `valor_del_contrato`: es el valor total del contrato (incluye adiciones y, en convenios, cofinanciación), por lo que puede diferir del "precio estimado" de la ficha del proceso en SECOP.
- Todas las limitaciones están documentadas de forma transparente en la vista **Metodología**.

> Este es un proyecto **independiente**, sin afiliación oficial con ninguna entidad del Estado. No incluye datos personales de contratistas.

---

## 🚀 Cómo correrlo

```bash
# 1. Instalar dependencias
npm install

# 2. Modo desarrollo
npm run dev
# abre http://localhost:3000

# 3. Build de producción
npm run build
npm run start
```

---

## 📁 Estructura

```
src/
├── app/                 # Rutas (App Router): una carpeta por vista
├── components/
│   ├── charts/          # Gráficos (Recharts) y el grafo de red (d3-force)
│   ├── Sidebar.tsx      # Navegación colapsable
│   ├── Footer.tsx
│   ├── ui.tsx           # Primitivas de UI (Card, StatTile, gauges, etc.)
│   └── icons.tsx
├── data/                # Datos ya procesados (JSON estático)
└── lib/                 # Formateo COP, calendario electoral, utilidades
```

---

## 👤 Autor

**Alic Barandica Mejía** — Economista · Analista de Datos

[Portafolio](https://alic-barandica.vercel.app/) · [Comparador departamental](https://alic-barandica.vercel.app/#/dashboards-departamentos) · [Informes de mercado laboral](https://alic-barandica.vercel.app/#/informes) · [LinkedIn](https://www.linkedin.com/in/alic-barandica) · [GitHub](https://github.com/Alicbm)

<sub>Construido con el apoyo de Claude (Anthropic) como par de programación: la dirección analítica, el diseño conceptual y las decisiones del proyecto son propias; la implementación en código se desarrolló en colaboración.</sub>
