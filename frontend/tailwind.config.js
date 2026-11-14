/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#00081e",
        "primary-container": "#0a1f44",
        "on-primary": "#ffffff",
        "on-primary-container": "#7687b2",
        "inverse-primary": "#b4c6f4",
        "primary-fixed": "#d9e2ff",
        "primary-fixed-dim": "#b4c6f4",
        "on-primary-fixed": "#041a3f",
        "on-primary-fixed-variant": "#34466d",
        "secondary": "#755a24",
        "secondary-container": "#ffdb99",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#795f28",
        "secondary-fixed": "#ffdea4",
        "secondary-fixed-dim": "#e5c281",
        "on-secondary-fixed": "#261900",
        "on-secondary-fixed-variant": "#5b430e",
        "tertiary": "#0f0800",
        "tertiary-container": "#2c1e00",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#a48340",
        "tertiary-fixed": "#ffdea4",
        "tertiary-fixed-dim": "#e8c178",
        "on-tertiary-fixed": "#261900",
        "on-tertiary-fixed-variant": "#5d4202",
        "surface": "#fbf9f5",
        "surface-dim": "#dbdad6",
        "surface-bright": "#fbf9f5",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f3ef",
        "surface-container": "#efeeea",
        "surface-container-high": "#eae8e4",
        "surface-container-highest": "#e4e2de",
        "surface-variant": "#e4e2de",
        "on-surface": "#1b1c1a",
        "on-surface-variant": "#44464e",
        "inverse-surface": "#30312e",
        "inverse-on-surface": "#f2f0ed",
        "surface-tint": "#4c5e86",
        "background": "#fbf9f5",
        "on-background": "#1b1c1a",
        "outline": "#75777f",
        "outline-variant": "#c5c6cf",
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a"
      },
      borderRadius: {
        DEFAULT: "0px",
        none: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        full: "9999px"
      },
      spacing: {
        "margin": "4rem",
        "gutter-mobile": "0.75rem",
        "margin-mobile": "1.25rem",
        "space-xs": "0.25rem",
        "gutter": "1.5rem",
        "space-sm": "0.5rem",
        "space-lg": "2rem",
        "space-md": "1rem",
        "space-xl": "3.5rem"
      },
      fontFamily: {
        "title-editorial": ["Playfair Display", "serif"],
        "body-sm": ["Inter", "sans-serif"],
        "headline-lg": ["Playfair Display", "serif"],
        "label-md": ["Inter", "sans-serif"],
        "display-hero": ["Playfair Display", "serif"],
        "headline-lg-mobile": ["Playfair Display", "serif"],
        "headline-md": ["Playfair Display", "serif"],
        "headline-sm": ["Playfair Display", "serif"],
        "body-lg": ["Inter", "sans-serif"],
        "label-caps": ["Inter", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "display-hero-mobile": ["Playfair Display", "serif"]
      },
      fontSize: {
        "title-editorial": [
          "18px",
          {
            lineHeight: "26px",
            letterSpacing: "0.04em",
            fontWeight: "400"
          }
        ],
        "body-sm": [
          "13px",
          {
            lineHeight: "20px",
            fontWeight: "400"
          }
        ],
        "headline-lg": [
          "40px",
          {
            lineHeight: "48px",
            letterSpacing: "-0.01em",
            fontWeight: "400"
          }
        ],
        "label-md": [
          "13px",
          {
            lineHeight: "18px",
            letterSpacing: "0.02em",
            fontWeight: "500"
          }
        ],
        "display-hero": [
          "56px",
          {
            lineHeight: "64px",
            letterSpacing: "-0.02em",
            fontWeight: "400"
          }
        ],
        "headline-lg-mobile": [
          "28px",
          {
            lineHeight: "36px",
            letterSpacing: "0",
            fontWeight: "400"
          }
        ],
        "headline-md": [
          "28px",
          {
            lineHeight: "36px",
            fontWeight: "500"
          }
        ],
        "headline-sm": [
          "22px",
          {
            lineHeight: "30px",
            fontWeight: "500"
          }
        ],
        "body-lg": [
          "18px",
          {
            lineHeight: "28px",
            fontWeight: "300"
          }
        ],
        "label-caps": [
          "11px",
          {
            lineHeight: "14px",
            letterSpacing: "0.14em",
            fontWeight: "600"
          }
        ],
        "label-sm": [
          "11px",
          {
            lineHeight: "16px",
            fontWeight: "500"
          }
        ],
        "body-md": [
          "15px",
          {
            lineHeight: "24px",
            fontWeight: "400"
          }
        ],
        "display-hero-mobile": [
          "36px",
          {
            lineHeight: "44px",
            letterSpacing: "-0.01em",
            fontWeight: "400"
          }
        ]
      }
    },
  },
  plugins: [],
}
