import type { Config } from "tailwindcss";

import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/preline/dist/*.js"
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        "default": colors.white,
        "default-m": colors.gray["100"],
        "default-d": colors.gray["200"],
        "default-dd": colors.gray["300"],
        "default-t": colors.gray["600"],
        
        "primary": colors.purple["500"],
        "primary-l": colors.purple["400"],
        "primary-el": colors.purple["200"],
        "primary-d": colors.purple["600"],
        "primary-dd": colors.purple["700"],
        "primary-t": colors.purple["800"],
        
        "secondary": colors.slate["100"],
        "secondary-l": colors.slate["50"],
        "secondary-d": colors.slate["200"],
        "secondary-dd": colors.slate["300"],
        "secondary-t": colors.slate["800"],
        
        "success": colors.emerald["500"],
        "success-l": colors.emerald["400"],
        "success-el": colors.emerald["200"],
        "success-d": colors.emerald["600"],
        "success-dd": colors.emerald["700"],
        "success-t": colors.emerald["800"],
        
        "warning": colors.yellow["300"],
        "warning-l": colors.yellow["200"],
        "warning-el": colors.yellow["100"],
        "warning-d": colors.yellow["400"],
        "warning-dd": colors.yellow["500"],
        "warning-t": colors.yellow["800"],
        
        "danger": colors.rose["500"],
        "danger-l": colors.rose["400"],
        "danger-el": colors.rose["100"],
        "danger-d": colors.rose["600"],
        "danger-dd": colors.rose["700"],
        "danger-t": colors.rose["800"],
        
        "bg-dark": colors.slate["700"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('preline/plugin'),
  ],
  safelist: [
    {
      pattern: /(bg|from|to)-(.*)-(50|100|200|300|400|500|600|700|800|900)/
    },
    "hidden"
  ]
};
export default config;
