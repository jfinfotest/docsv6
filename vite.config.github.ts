import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';

// Plugin para copiar temas de Prism durante el desarrollo y build
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
    },
    generateBundle() {
      // Copiar archivos de prism-themes al build
      const prismThemesSource = path.join(__dirname, 'node_modules/prism-themes/themes');
      const prismCoreSource = path.join(__dirname, 'node_modules/prismjs/themes');
      const distPrismThemes = path.join(__dirname, 'dist/prism-themes');
      const distPrismCore = path.join(__dirname, 'dist/prism-core');
      
      // Crear directorios si no existen
      if (!fs.existsSync(distPrismThemes)) {
        fs.mkdirSync(distPrismThemes, { recursive: true });
      }
      if (!fs.existsSync(distPrismCore)) {
        fs.mkdirSync(distPrismCore, { recursive: true });
      }
      
      // Copiar archivos CSS de prism-themes
      if (fs.existsSync(prismThemesSource)) {
        const files = fs.readdirSync(prismThemesSource);
        files.forEach(file => {
          if (file.endsWith('.css')) {
            fs.copyFileSync(
              path.join(prismThemesSource, file),
              path.join(distPrismThemes, file)
            );
          }
        });
      }
      
      // Copiar archivos CSS de prismjs core
      if (fs.existsSync(prismCoreSource)) {
        const files = fs.readdirSync(prismCoreSource);
        files.forEach(file => {
          if (file.endsWith('.css')) {
            fs.copyFileSync(
              path.join(prismCoreSource, file),
              path.join(distPrismCore, file)
            );
          }
        });
      }
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
        scope: '/docsv6/',
        start_url: '/docsv6/',
        icons: [
          {
            src: '/docsv6/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/docsv6/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/docsv6/pwa-512x512.png',
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
  // Configuración específica para GitHub Pages
  base: '/docsv6/', // Cambia esto por el nombre de tu repositorio
  define: {
    global: 'globalThis',
    // Inyectar configuración de GitHub Pages
    __GITHUB_PAGES_CONFIG__: JSON.stringify({
      basePath: '/docsv6',
      docsPath: '/docsv6/docs',
      isGitHubPages: true
    })
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
    // Configuración optimizada para GitHub Pages
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
        },
        // Optimización para GitHub Pages
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mermaid: ['mermaid'],
          markdown: ['react-markdown', 'remark-gfm', 'rehype-katex', 'remark-math']
        }
      }
    },
    // Copiar la carpeta docs al directorio de build
    copyPublicDir: true,
    // Configuraciones adicionales para GitHub Pages
    sourcemap: false, // Desactivar sourcemaps para reducir tamaño
    minify: 'terser', // Usar terser para mejor minificación
    terserOptions: {
      compress: {
        drop_console: true, // Remover console.log en producción
        drop_debugger: true
      }
    }
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