import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      PUBLIC_URL: '',
      NODE_ENV: JSON.stringify('development'),
    },
    global: 'window',
  },
  server: {
    port: 3000,
    open: false,
  },
});
