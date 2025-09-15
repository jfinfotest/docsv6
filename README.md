# DocsV2 - Sistema de Documentación Moderno

Un sistema de documentación moderno y completo construido con React, TypeScript y Vite, diseñado para crear sitios de documentación interactivos y responsivos.

## 🚀 Características Principales

### 📚 Gestión de Contenido
- **Markdown Dinámico**: Renderizado completo de Markdown con soporte para componentes personalizados
- **Versionado**: Sistema de versiones integrado para documentación evolutiva
- **Internacionalización**: Soporte completo para múltiples idiomas (i18n)
- **Navegación Inteligente**: Sidebar izquierdo con navegación jerárquica y TOC derecho

### 🎨 Experiencia de Usuario
- **Tema Oscuro/Claro**: Cambio dinámico de temas con persistencia
- **Diseño Responsivo**: Optimizado para desktop, tablet y móvil
- **Búsqueda Avanzada**: Sistema de búsqueda en tiempo real
- **PWA**: Aplicación web progresiva con soporte offline

### 🛠️ Componentes Avanzados
- **Bloques de Código**: Syntax highlighting con múltiples temas Prism
- **Diagramas Mermaid**: Renderizado de diagramas y flowcharts
- **Matemáticas**: Soporte para fórmulas con KaTeX
- **Componentes Interactivos**: Quiz, carruseles, galerías, timelines
- **Integración IA**: Herramientas Gemini para análisis y generación de contenido

### 📊 Herramientas de Desarrollo
- **API Explorer**: Explorador interactivo de APIs
- **REST Client**: Cliente HTTP integrado
- **Live Code**: Embebido de código ejecutable
- **Análisis de Código**: Herramientas de análisis con IA

## 🏗️ Tecnologías

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Markdown**: Procesamiento avanzado con componentes personalizados
- **Diagramas**: Mermaid
- **Matemáticas**: KaTeX
- **PWA**: Vite PWA Plugin
- **IA**: Integración con Google Gemini

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd docsv2

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles

```bash
# Desarrollo
npm run predev          # Actualiza manifest de archivos
npm run dev             # Servidor de desarrollo (puerto 5173)

# Construcción
npm run build           # Build para producción
npm run build:github    # Build optimizado para GitHub Pages
npm run preview         # Preview del build
```

## 📁 Estructura del Proyecto

```
docsv2/
├── docs/                   # Contenido de documentación
│   └── v1.0/
│       ├── en/            # Documentación en inglés
│       └── es/            # Documentación en español
├── src/
│   ├── components/        # Componentes React
│   ├── context/          # Contextos de React
│   ├── hooks/            # Hooks personalizados
│   └── config/           # Configuraciones
├── public/               # Archivos estáticos
├── config/               # Configuración de la aplicación
└── .github/workflows/    # CI/CD con GitHub Actions
```

## ⚙️ Configuración

### Configuración de la Aplicación
Edita `config/app-config.json` para personalizar:
- Información del sitio
- Configuración de navegación
- Temas y estilos
- Integraciones externas

### Variables de Entorno
Crea un archivo `.env` para configuraciones sensibles:
```env
VITE_GEMINI_API_KEY=tu_api_key_aqui
```

## 🌐 Despliegue

### GitHub Pages
El proyecto incluye configuración automática para GitHub Pages:

1. El workflow `.github/workflows/deploy.yml` se ejecuta automáticamente
2. La configuración base URL se obtiene automáticamente del `package.json`
3. Ver `README-GITHUB-PAGES.md` para instrucciones detalladas

### Otros Proveedores
- **Netlify**: Usar `npm run build`
- **Vercel**: Configuración automática
- **Servidor Propio**: Build estático en `dist/`

## 🎯 Características Destacadas

### Sistema de Componentes
- **Admonitions**: Notas, advertencias, tips
- **Cards**: Tarjetas informativas
- **Accordion**: Contenido colapsable
- **Timeline**: Líneas de tiempo interactivas
- **Charts**: Gráficos y visualizaciones
- **Image Gallery**: Galerías con lightbox

### Herramientas IA (Gemini)
- **Chat**: Asistente conversacional
- **Summarizer**: Resúmenes automáticos
- **Quiz Generator**: Generación de cuestionarios
- **Code Analyzer**: Análisis de código
- **Simplifier**: Simplificación de contenido

## 🔧 Desarrollo

### Agregar Nuevo Contenido
1. Crear archivos Markdown en `docs/v1.0/{idioma}/`
2. Ejecutar `npm run predev` para actualizar el manifest
3. El contenido aparecerá automáticamente en la navegación

### Personalizar Componentes
- Los componentes están en `src/components/`
- Usar TypeScript para type safety
- Seguir las convenciones de Tailwind CSS

### Temas y Estilos
- Configurar temas en `src/themes.ts`
- Personalizar Prism themes en `src/config/prism-themes.ts`
- Estilos globales en `src/styles/main.css`

## 📝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abrir un Pull Request

## 📄 Licencia

[Especificar licencia aquí]

## 🆘 Soporte

Para reportar bugs o solicitar características:
- Abrir un issue en GitHub
- Consultar la documentación en el sitio
- Revisar los logs de desarrollo para debugging

---

**Desarrollado con ❤️ usando tecnologías modernas para crear la mejor experiencia de documentación.**