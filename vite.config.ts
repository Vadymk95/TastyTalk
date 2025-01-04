import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import eslint from 'vite-plugin-eslint2';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    server: {
        port: 3000,
        cors: true
    },
    plugins: [
        react(),
        eslint(),
        svgr(),
        compression({
            algorithm: 'brotliCompress',
            ext: '.br',
            deleteOriginFile: false
        })
    ],
    base: '/',
    build: {
        minify: 'esbuild',
        target: 'esnext',
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom', 'react-router-dom'],
                    firebase: [
                        'firebase/app',
                        'firebase/auth',
                        'firebase/firestore',
                        'firebase/storage'
                    ]
                }
            }
        },
        terserOptions: {
            format: {
                comments: false
            }
        },
        outDir: 'dist'
    },
    resolve: {
        alias: {
            '@root': path.resolve(__dirname, './src')
        }
    }
});
