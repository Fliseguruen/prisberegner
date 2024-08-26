import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    files: {
      lib: "src"
    },
    paths: {
      base: process.argv.includes('dev') ? '' : process.env.BASE_PATH,
      relative: false
    }
  },
}

export default config