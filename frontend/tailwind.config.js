/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				background: "rgba(var(--background))",
				textColor: "rgba(var(--textColor))",
				color01: "rgba(var(--color01))",
				color02: "rgba(var(--color02))",
				color03: "rgba(var(--color03))",
				color04: "rgba(var(--color04))",
				color05: "rgba(var(--color05))",
				color06: "rgba(var(--color06))",
				color07: "rgba(var(--color07))",
				color08: "rgba(var(--color08))",
				color09: "rgba(var(--color09))",
				color10: "rgba(var(--color10))",
				color11: "rgba(var(--color11))",
				color12: "rgba(var(--color12))",
				color13: "rgba(var(--color13))",
				color14: "rgba(var(--color14))",
				color15: "rgba(var(--color15))",
				color16: "rgba(var(--color16))",
			},
			fontFamily: {
				JetBrainsMono: ['JetBrainsMono', 'monospace'],
				Onest: ['Onest', 'sans-serif'],
				YoungSerif: ['YoungSerif', 'serif'],
			},
		},
	},
	plugins: [],
};
