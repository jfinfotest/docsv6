import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';

// Plugin para copiar temas de Prism durante el desarrollo
const copyPrismThemes = () => {
  return {
    name: 'copy-prism-themes',
    configureServer(server) {
      // Middleware para servir temas de prism-themes
      server.middlewares.use('/prism-themes', (req, res, next) => {
        const filePath = path.join(__dirname, 'node_modules/prism-themes/themes', req.url.replace('/prism-themes/', ''));
        if (fs.existsSync(filePath)) {
          res.setHeader('Content-Type', 'text/css');
          fs.createReadStream(filePath).pipe(res);
        } else {
          next();
        }
      });
      
      // Middleware para servir temas core de prismjs
      server.middlewares.use('/prism-core', (req, res, next) => {
        const filePath = path.join(__dirname, 'node_modules/prismjs/themes', req.url.replace('/prism-core/', ''));
        if (fs.existsSync(filePath)) {
          res.setHeader('Content-Type', 'text/css');
          fs.createReadStream(filePath).pipe(res);
        } else {
          next();
        }
      });
    }
  };
};

export default defineConfig({
  plugins: [
    react(), 
    copyPrismThemes(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Static Docs Site',
        short_name: 'DocsSite',
        description: 'A modern, responsive static documentation site',
        theme_color: '#4F46E5',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  root: 'src',
  publicDir: '../public',
  define: {
    global: 'globalThis'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  optimizeDeps: {
    include: ['buffer']
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html')
      },
      output: {
        // Asegurar que los archivos de documentación se copien al build
        assetFileNames: (assetInfo) => {
          // Mantener la estructura de carpetas para archivos de docs
          if (assetInfo.name && assetInfo.name.includes('docs/')) {
            return assetInfo.name;
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    // Copiar la carpeta docs al directorio de build
    copyPublicDir: true
  },
  assetsInclude: ['**/*.md', '**/*.json'],
  server: {
    port: 5173,
    host: '127.0.0.1',
    fs: {
      allow: ['..', '.', '../docs']
    }
  }
});
