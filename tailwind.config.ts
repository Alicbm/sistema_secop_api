import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Marca (emerald del logo AB)
        brand: {
          50: "#e9faf3",
          100: "#c9f3e1",
          200: "#96e7c8",
          300: "#5bd6a9",
          400: "#24bd8c",
          500: "#12a67a",
          600: "#0c8763",
          700: "#0c6c51",
          800: "#0e5541",
          900: "#0c4636",
          950: "#04271e",
        },
        // Acento cálido para gauges/realces (estilo Nura)
        accent: {
          50: "#fef7ea",
          100: "#fdebc6",
          200: "#fbd689",
          300: "#f8bd4c",
          400: "#f5a623",
          500: "#e08706",
          600: "#bd6408",
          700: "#96490d",
          800: "#7c3b11",
          900: "#6a3211",
        },
        ink: {
          primary: "#141a16",
          secondary: "#586159",
          muted: "#8b938c",
          faint: "#aeb4ae",
        },
        surface: {
          page: "#f3f6f3",
          card: "#ffffff",
          sunken: "#eef2ee",
          raised: "#f8faf8",
          inverse: "#141a16",
        },
        line: {
          hairline: "#e7ebe7",
          soft: "#eef1ee",
          strong: "#d5dad5",
        },
        status: {
          good: "#0f9d5f",
          warning: "#f5a623",
          serious: "#ec7a4d",
          critical: "#dc3d3d",
        },
        // Paleta categórica para gráficos (orden fijo)
        series: {
          1: "#12a67a", // emerald marca
          2: "#2f6df0", // azul
          3: "#f5a623", // ámbar
          4: "#8b5cf6", // púrpura
          5: "#ec7a9e", // rosa
          6: "#ec7a4d", // coral
          7: "#0ea5b7", // cian
          8: "#dc3d3d", // rojo
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans Variable'", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.5rem",
        xl4: "1.75rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16,24,20,0.04), 0 1px 3px rgba(16,24,20,0.05)",
        card: "0 1px 2px rgba(16,24,20,0.04), 0 12px 26px -16px rgba(14,60,44,0.16)",
        lifted: "0 10px 34px -14px rgba(14,60,44,0.24)",
        pop: "0 16px 48px -18px rgba(14,60,44,0.30)",
        inset: "inset 0 1px 2px rgba(16,24,20,0.05)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease both",
        "slide-in": "slide-in 0.25s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
