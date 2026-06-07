import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/my-project/' : '/',
  server: {
    proxy: {
      '/tasks': 'http://localhost:4000'
    }
  }
});
