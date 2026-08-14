/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from "vite";
import packageJson from "./package.json";
import dts from 'vite-plugin-dts';

const packageName = packageJson.name;


export default defineConfig({

	plugins: [
		dts({
			outDirs: ['dist'], // dts.root + 'dist' => where we need to rollup.
			root: "./", //vite.root + ../ = ./ = (dts.root)
			include: ['sources/**/*.ts'],
			exclude: ['**/*.test.ts', 'test/**', 'demo.ts', 'vite.config.ts'],
			staticImport: true,
			insertTypesEntry: true
		})
	],
	build: {
		minify: false,
		outDir: './dist',
		sourcemap: true,
		lib: {
			entry: resolve(__dirname, "./sources/index.ts"),
			name: 'index',
			formats: ['es'],
			'fileName': 'index'
		},
	},
	resolve: {
		alias: [{ find: packageName, replacement: resolve(__dirname, 'sources/index.ts') }]
	}
});