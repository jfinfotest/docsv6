# Despliegue en GitHub Pages

Este proyecto incluye una configuración específica para desplegar en GitHub Pages que lee documentos de la carpeta `docs`.

## Configuración Automática

### 1. Workflow de GitHub Actions

El archivo `.github/workflows/deploy.yml` contiene un workflow que:
- Se ejecuta automáticamente en cada push a la rama `main`
- Instala dependencias
- Ejecuta el build optimizado para GitHub Pages
- Despliega automáticamente el sitio

### 2. Scripts de Build

Se han agregado scripts específicos en `package.json`:

```bash
# Build para GitHub Pages
npm run build:github

# Preview local del build de GitHub Pages
npm run preview:github
```

## Configuración Manual

### Paso 1: Configurar el repositorio

1. **Configuración automática de la base URL**: El proyecto está configurado para obtener automáticamente el nombre del repositorio desde `package.json`. La configuración en `vite.config.github.ts` es:
   ```typescript
   base: `/${repoName}/`, // Nombre del repositorio obtenido automáticamente desde package.json
   ```
   Si necesitas cambiar el nombre base, actualiza el campo `name` en `package.json`:
   ```json
   {
     "name": "tu-repositorio-nombre"
   }
   ```

### Paso 2: Habilitar GitHub Pages

1. Ve a la configuración de tu repositorio en GitHub
2. Navega a **Settings** > **Pages**
3. En **Source**, selecciona **"GitHub Actions"**
4. Si no aparece la opción, asegúrate de que el repositorio sea público o tengas GitHub Pro/Enterprise
5. El workflow intentará habilitar Pages automáticamente, pero es recomendable hacerlo manualmente primero
6. El workflow se ejecutará automáticamente en el próximo push

### Paso 3: Configurar Permisos

1. Ve a **Settings** > **Actions** > **General**
2. En "Workflow permissions", selecciona "Read and write permissions"
3. Marca "Allow GitHub Actions to create and approve pull requests"
4. Guarda los cambios

### Paso 4: Verificar Environment

1. Ve a **Settings** > **Environments**
2. Debería aparecer automáticamente un environment llamado "github-pages"
3. Si no existe, créalo manualmente

### Paso 5: Estructura de documentos

Asegúrate de que tus documentos estén en la carpeta `docs/` con la siguiente estructura:

```
docs/
├── file-manifest.json
├── v1.0/
│   ├── en/
│   │   └── *.md
│   └── es/
│       └── *.md
└── v2.0/
    ├── en/
    │   └── *.md
    └── es/
        └── *.md
```

## Características del Build de GitHub Pages

### Optimizaciones incluidas:
- ✅ **Code splitting**: Separación automática de vendors, mermaid y markdown
- ✅ **Minificación avanzada**: Usando Terser con eliminación de console.log y debugger
- ✅ **Sin sourcemaps**: Para reducir el tamaño del bundle
- ✅ **Archivo .nojekyll**: Para evitar procesamiento de Jekyll
- ✅ **Base URL configurada**: Obtenida automáticamente desde package.json
- ✅ **PWA Support**: Configuración automática para Progressive Web App
- ✅ **Prism themes**: Copia automática de temas de sintaxis durante el build
- ✅ **Asset optimization**: Gestión optimizada de archivos estáticos

### Tamaños de bundle optimizados:
- **Vendor** (React, React-DOM): Separado automáticamente
- **Markdown** (react-markdown, remark-gfm, rehype-katex, remark-math): Separado automáticamente
- **Mermaid**: Separado automáticamente para carga bajo demanda
- **Main**: Código principal de la aplicación

## Comandos útiles

```bash
# Desarrollo local (incluye actualización automática del manifest)
npm run dev

# Build para GitHub Pages (incluye actualización automática del manifest)
npm run build:github

# Build estándar (incluye actualización automática del manifest)
npm run build

# Preview del build de GitHub Pages
npm run preview:github

# Preview del build estándar
npm run preview

# Actualizar manifest de archivos manualmente
npm run update-file-manifest
```

## Solución de problemas

### Error: "Get Pages site failed" o "Resource not accessible by integration"
**Causa**: GitHub Pages no está habilitado o el token no tiene permisos suficientes

**Solución**:
1. **Habilitar GitHub Pages manualmente**:
   - Ve a **Settings** > **Pages** en GitHub
   - En "Source", selecciona **"GitHub Actions"**
   - Si el repositorio es privado, necesitas GitHub Pro/Enterprise

2. **Verificar permisos del repositorio**:
   - Ve a **Settings** > **Actions** > **General**
   - En "Workflow permissions", selecciona **"Read and write permissions"**
   - Marca **"Allow GitHub Actions to create and approve pull requests"**

3. **Esperar y reintentar**:
   - Espera unos minutos después de habilitar Pages
   - Vuelve a ejecutar el workflow desde la pestaña **Actions**

### El sitio no carga correctamente
1. Verifica que la `base` URL en `vite.config.github.ts` coincida con el nombre de tu repositorio
2. Asegúrate de que GitHub Pages esté configurado para usar GitHub Actions

### Los documentos no se cargan
1. Verifica que la carpeta `docs/` contenga el `file-manifest.json`
2. Ejecuta `npm run update-file-manifest` para regenerar el manifest

### Errores de build
1. Verifica que todas las dependencias estén instaladas: `npm install`
2. Limpia la caché: `rm -rf node_modules/.vite` (Linux/Mac) o `rmdir /s node_modules\.vite` (Windows)
3. Regenera el manifest de archivos: `npm run update-file-manifest`
4. Verifica que el script predev se ejecute correctamente antes del build

## Dominio personalizado (opcional)

Para usar un dominio personalizado:
1. Agrega tu dominio en el archivo `.github/workflows/deploy.yml`:
   ```yaml
   cname: tu-dominio.com
   ```
2. Configura los registros DNS de tu dominio para apuntar a GitHub Pages