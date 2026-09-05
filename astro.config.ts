import { satteri, satteriHeadingIdsPlugin } from '@astrojs/markdown-satteri'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import satteriSandpack from '@lekoarts/satteri-sandpack'
import tailwindcss from '@tailwindcss/vite'
import expressiveCode from 'astro-expressive-code'
import { defineConfig, fontProviders } from 'astro/config'
import { SITE } from './src/constants'
import { satteriAsides, satteriExternalLinks, satteriHeadingPermalinks } from './src/markdown'
import { pagefindIntegration } from './src/utils'

export default defineConfig({
	output: 'static',
	trailingSlash: 'always',
	site: SITE.url,
	integrations: [expressiveCode(), mdx(), sitemap(), pagefindIntegration(), react()],
	vite: {
		// Sandpack imports these CommonJS packages as ESM, so Vite must prebundle them for development.
		optimizeDeps: {
			include: [
				'@codesandbox/sandpack-react > anser',
				'@codesandbox/sandpack-react > escape-carriage',
				'@codesandbox/sandpack-react > lz-string',
				'@codesandbox/sandpack-react > @codesandbox/sandpack-client > mime-db',
			],
		},
		plugins: [tailwindcss()],
	},
	devToolbar: {
		enabled: false,
	},
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'IBM Plex Sans',
			weights: ['400', '500', '600'],
			subsets: ['latin'],
			cssVariable: '--font-plex-sans',
		},
	],
	markdown: {
		processor: satteri({
			features: { directive: true },
			mdastPlugins: [satteriAsides, satteriSandpack({ componentName: ['Playground'] })],
			hastPlugins: [satteriHeadingIdsPlugin(), satteriExternalLinks, satteriHeadingPermalinks],
		}),
	},
})
