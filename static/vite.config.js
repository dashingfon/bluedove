import { dirname, resolve, join} from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { readdirSync, statSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'

const __dirname = dirname(fileURLToPath(import.meta.url))


// Helper function to find all HTML files
function getHtmlEntries(dir) {
  const entries = {}
  const files = readdirSync(dir)
  
  files.forEach(file => {
    const fullPath = join(dir, file)
    if (statSync(fullPath).isFile() && file.endsWith('.html')) {
      const name = file.replace('.html', '')
      entries[name] = resolve(fullPath)
    }
  })
  
  return entries
}

export default defineConfig({
  build: {
    outDir: "./dist",
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "assets/[name][extname]",
      },
        input: getHtmlEntries(__dirname)
        // input: getHtmlEntries('./src')
        // input: "sample.html"
    }
  },
  plugins: [
    tailwindcss(),
  ],
})
