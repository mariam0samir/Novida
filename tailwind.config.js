/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#162D77",
        navy: "#0A183B ",
        secondary2: "#485578",
        textPara: "#909EB1",
        lightGray: "#E5E7EB",
        third: "#DEEDFF",
        secondary: "#F1F5F8",
        thirdd:"#007aff",
      },

      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
    },
  },

  plugins: [],
};

// --radius: 1rem;
//     --background: oklch(100% 0 0);
//     --foreground: oklch(22% .07 265);
//     --card: oklch(100% 0 0);
//     --card-foreground: oklch(22% .07 265);
//     --popover: oklch(100% 0 0);
//     --popover-foreground: oklch(22% .07 265);
//     --primary: oklch(33% .13 266);
//     --primary-foreground: oklch(99% .002 250);
//     --secondary: oklch(96.8% .006 250);
//     --secondary-foreground: oklch(33% .13 266);
//     --muted: oklch(97.2% .005 250);
//     --muted-foreground: oklch(52% .03 258);
//     --accent: oklch(94% .03 255);
//     --accent-foreground: oklch(33% .13 266);
//     --destructive: oklch(57.7% .245 27.325);
//     --destructive-foreground: oklch(99% .002 250);
//     --border: oklch(92% .008 255);
//     --input: oklch(92% .008 255);
//     --ring: oklch(33% .13 266);
//     --navy: oklch(33% .13 266);
//     --navy-deep: oklch(23% .1 266);
//     --navy-soft: oklch(45% .13 264);
//     --sky: oklch(72% .09 250);
//     --sand: oklch(90% .035 85);
// }