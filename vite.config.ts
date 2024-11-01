import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint2';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    server: {
        port: 3000
    },
    plugins: [react(), eslint(), svgr()],
    base: './',
    build: {
        minify: 'esbuild',
        target: 'esnext'
    },
    resolve: {
        alias: {
            '@root': path.resolve(__dirname, './src')
        }
    }
});
