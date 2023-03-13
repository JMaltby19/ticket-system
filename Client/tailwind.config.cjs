/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			sans: ["sofia-pro", "sans-serif"],
			bold: ["sofia-pro", "sans-serif"],
			body: ["sofia-pro", "sans-serif"],
			code: ["attribute-mono", "sans-serif"],
		},
		extend: {},
	},
	plugins: [],
};
