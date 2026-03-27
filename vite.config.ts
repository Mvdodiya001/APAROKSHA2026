import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // react-snap bundles a very old Chromium (~v71).
    // Setting target to es2019 forces Vite to transform
    // modern syntax like optional chaining (?.) into
    // older equivalents that react-snap's headless browser can parse.
    target: 'es2019',
  },
})
