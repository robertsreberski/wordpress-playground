/// <reference types='vitest' />
import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import dts from 'vite-plugin-dts';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { viteTsConfigPaths } from '../../vite-ts-config-paths';

const path = (filename: string) => new URL(filename, import.meta.url).pathname;
export default defineConfig({
	assetsInclude: ['**/*.wasm', '*.data'],
	cacheDir: '../../../node_modules/.vite/playground-wordpress',
	plugins: [
		viteTsConfigPaths({
			root: '../../../',
		}),
		dts({
			entryRoot: 'src',
			tsconfigPath: path('tsconfig.lib.json'),
		}),
		{
			name: 'use-correct-wp-data-file-url-in-vitest-environment',
			/**
			 * When ran inside the `wordpress` package, vitest resolves `wp-6-4.data?url`
			 * as `/src/wordpress/wp-6-4.data?url`. However, when ran inside other packages,
			 * it resolves as `/@fs/full/path/to/wp-6-4.data`.
			 *
			 * This plugin ensures that the `wp-6-4.data` file is always consistently resolved
			 * as the latter.
			 */
			transform(code, id) {
				if (id.match(new RegExp(`/wp-\\d.\\d\\.data\\?url`))) {
					const fullyQualifiedPath = '/@fs' + path(id.split('?')[0]);
					return `export default ${JSON.stringify(
						fullyQualifiedPath
					)};`;
				}
				return code;
			},
		} as Plugin,
	],

	build: {
		target: 'esnext',
		// Important: Vite does not extract static assets as separate files
		//            in the library mode. assetsInlineLimit: 0 only works
		//            in the app mode.
		// @see https://github.com/vitejs/vite/issues/3295
		assetsInlineLimit: 0,
		rollupOptions: {
			input: path('src/index.ts'),
			// These additional options are required to preserve
			// all the exports from the entry point. Otherwise,
			// vite only preserves the ones it considers to be used.
			output: {
				name: 'exportsFromEntryPoint',
				// Ensure the main entry point always gets output as index.js
				entryFileNames: (chunkInfo: any) => {
					if (chunkInfo.name === 'index') {
						return 'index.js';
					}
					return '[name]-[hash].js';
				},
			},
			preserveEntrySignatures: 'strict',
		},
	},

	test: {
		globals: true,
		cache: {
			dir: '../../../node_modules/.vitest',
		},
		environment: 'node',
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
	},
});