import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
	input: "src/index.ts",
	plugins: [typescript()],
	output: [
		{
			file: "lib/index.js",
			format: "cjs",
		},
		{
			file: "dist/index.js",
			format: "iife",
			name: "translate",
		},
		{
			file: "dist/index.min.js",
			format: "iife",
			plugins: [terser()],
			name: "translate",
		},
	],
};
