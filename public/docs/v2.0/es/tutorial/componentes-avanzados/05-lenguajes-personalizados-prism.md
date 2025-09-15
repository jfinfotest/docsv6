---
title: "Lenguajes Personalizados de PrismJS"
position: 5
---

# Lenguajes Personalizados de PrismJS

La aplicación incluye un sistema automático de detección y carga de lenguajes personalizados de PrismJS ubicados en el directorio `public/prism-languages/`.

## Características del Sistema

### 🔍 Detección Automática
- Escanea automáticamente el directorio `public/prism-languages/`
- Utiliza un archivo `manifest.json` para obtener información de los lenguajes
- Fallback a detección por patrones si no existe el manifest

### ⚡ Carga Inteligente
- Carga automática de lenguajes personalizados al inicializar la aplicación
- Carga bajo demanda cuando se detecta un lenguaje específico
- Fallback a CDN para lenguajes integrados de PrismJS

### 🎯 Integración Completa
- Funciona con todos los componentes de código (`CodeBlock`, `TabbedCodeBlock`, `GeminiCodeAnalyzer`)
- Soporte para aliases de lenguajes
- Manejo de errores robusto

## Lenguajes Incluidos

### MyLang
**Archivo:** `prism-mylang.js`  
**Aliases:** `mylang`, `ml`  
**Descripción:** Lenguaje de programación ficticio con sintaxis similar a JavaScript

```mylang
func hello(name) {
  print "Hello, " + name + "!"
}

var user = "World"
hello(user)
```

### Config
**Archivo:** `prism-config.js`  
**Aliases:** `config`, `conf`, `ini`, `cfg`  
**Descripción:** Lenguaje para archivos de configuración tipo INI

```config
[database]
host = "localhost"
port = 5432
enabled = true

[server]
timeout = 30s
max_connections = 100
```

### QueryQL
**Archivo:** `prism-queryql.js`  
**Aliases:** `queryql`, `qql`, `query`  
**Descripción:** Lenguaje de consultas personalizado similar a SQL

```queryql
FIND users WHERE age > 18 AND status = "active"
SELECT name, email FROM users
ORDER BY created_at DESC
LIMIT 10
```

## Cómo Usar

### En Markdown
```markdown
```mylang
func example() {
  return "Hello World"
}
```
```

### En HTML
```html
<pre><code class="language-config">
[section]
key = "value"
</code></pre>
```

### En Componentes React
```jsx
<CodeBlock 
  language="queryql" 
  code="FIND users WHERE active = true" 
/>
```

## Agregar Nuevos Lenguajes

### 1. Crear el Archivo de Definición
Crea un archivo `prism-[nombre].js` en `public/prism-languages/`:

```javascript
(function (Prism) {
  'use strict';

  Prism.languages.milenguaje = {
    'comment': /\/\/.*/,
    'string': /"[^"]*"/,
    'keyword': /\b(?:if|else|function)\b/,
    'number': /\b\d+\b/,
    'operator': /[+\-*/%=]/,
    'punctuation': /[{}[\]();,.]/
  };

  // Aliases opcionales
  Prism.languages.ml = Prism.languages.milenguaje;

})(Prism);
```

### 2. Actualizar el Manifest
Edita `public/prism-languages/manifest.json`:

```json
{
  "version": "1.0.0",
  "description": "Custom PrismJS language definitions manifest",
  "languages": [
    {
      "name": "milenguaje",
      "file": "prism-milenguaje.js",
      "aliases": ["ml"],
      "description": "Mi lenguaje personalizado"
    }
  ]
}
```

### 3. Uso Inmediato
El nuevo lenguaje estará disponible automáticamente sin necesidad de reiniciar la aplicación.

## Arquitectura del Sistema

### Componentes Principales

#### `prismLanguageLoader.ts`
- **Función:** Servicio principal de carga de lenguajes
- **Características:**
  - Escaneo automático del directorio
  - Gestión de cache de lenguajes cargados
  - API para verificar disponibilidad

#### `prismInit.ts`
- **Función:** Utilidad de inicialización
- **Características:**
  - Inicialización temprana en el ciclo de vida de la app
  - Funciones de utilidad para obtener información de lenguajes
  - Auto-inicialización cuando se importa

#### Integración en Componentes
- **CodeBlock.tsx:** Componente principal de bloques de código
- **TabbedCodeBlock.tsx:** Componente para código con pestañas
- **GeminiCodeAnalyzer.tsx:** Analizador de código con IA

### Flujo de Carga

1. **Inicialización:** Al cargar la aplicación, se escanea `public/prism-languages/`
2. **Detección:** Se lee el `manifest.json` o se detectan archivos por patrón
3. **Carga Automática:** Se cargan todos los lenguajes personalizados disponibles
4. **Uso:** Los componentes de código detectan automáticamente los lenguajes disponibles
5. **Fallback:** Si un lenguaje no está disponible localmente, se intenta cargar desde CDN

## Ventajas del Sistema

### ✅ Automático
- No requiere configuración manual
- Detección automática de nuevos lenguajes
- Integración transparente con todos los componentes

### ✅ Extensible
- Fácil agregar nuevos lenguajes
- Soporte para aliases múltiples
- Sistema de manifest flexible

### ✅ Robusto
- Manejo de errores graceful
- Fallback a CDN para lenguajes integrados
- Cache inteligente para evitar cargas duplicadas

### ✅ Performante
- Carga bajo demanda
- Cache de lenguajes ya cargados
- Inicialización asíncrona

## Solución de Problemas

### Lenguaje No Se Carga
1. Verifica que el archivo esté en `public/prism-languages/`
2. Asegúrate de que el nombre del archivo siga el patrón `prism-[nombre].js`
3. Revisa la consola del navegador para errores de sintaxis
4. Verifica que el `manifest.json` esté actualizado

### Sintaxis No Se Resalta
1. Confirma que el lenguaje esté cargado (revisa la consola)
2. Verifica que el nombre del lenguaje o alias sea correcto
3. Asegúrate de que la definición del lenguaje sea válida

### Errores en la Consola
- **"Failed to load custom language":** El archivo del lenguaje no se pudo cargar
- **"Language not found in manifest":** El lenguaje no está listado en el manifest
- **"Prism not found":** PrismJS no está disponible (problema de inicialización)

## Recursos Adicionales

- [Documentación oficial de PrismJS](https://prismjs.com/)
- [Guía para crear lenguajes personalizados](https://prismjs.com/extending.html#language-definitions)
- [Expresiones regulares para tokens](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Ejemplos de definiciones de lenguajes](https://github.com/PrismJS/prism/tree/master/components)