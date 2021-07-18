import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

const { PORT } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    port: PORT
  },
})
