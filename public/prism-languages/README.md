# Lenguajes Personalizados para PrismJS

Este directorio contiene definiciones de lenguajes personalizados para PrismJS que puedes usar en tu documentación.

## Lenguajes Disponibles

### 1. MyLang (`prism-mylang.js`)
Un lenguaje de programación ficticio con sintaxis similar a JavaScript.

**Aliases:** `mylang`, `ml`

**Ejemplo:**
```mylang
func hello(name) {
  print "Hello, " + name + "!"
}

var user = "World"
hello(user)
```

### 2. Config (`prism-config.js`)
Un lenguaje para archivos de configuración tipo INI.

**Aliases:** `config`, `conf`, `ini`, `cfg`

**Ejemplo:**
```config
[database]
host = "localhost"
port = 5432
enabled = true

[server]
timeout = 30s
max_connections = 100
```

### 3. QueryQL (`prism-queryql.js`)
Un lenguaje de consultas personalizado similar a SQL.

**Aliases:** `queryql`, `qql`, `query`

**Ejemplo:**
```queryql
FIND users WHERE age > 18 AND status = "active"
SELECT name, email FROM users
ORDER BY created_at DESC
LIMIT 10
```

## Cómo Usar

### 1. Incluir en HTML
```html
<!-- Después de incluir prism.js -->
<script src="/prism-languages/prism-mylang.js"></script>
<script src="/prism-languages/prism-config.js"></script>
<script src="/prism-languages/prism-queryql.js"></script>
```

### 2. Usar en Markdown
```markdown
```mylang
func example() {
  return "Hello World"
}
```
```

### 3. Usar en HTML
```html
<pre><code class="language-mylang">
func example() {
  return "Hello World"
}
</code></pre>
```

## Crear Nuevos Lenguajes

Para crear un nuevo lenguaje personalizado:

1. Crea un archivo `prism-[nombre].js`
2. Define la gramática usando la API de PrismJS
3. Incluye el archivo después de `prism.js`

### Estructura Básica
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

## Recursos

- [Documentación oficial de PrismJS](https://prismjs.com/)
- [Guía para crear lenguajes personalizados](https://prismjs.com/extending.html#language-definitions)
- [Expresiones regulares para tokens](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

## Notas

- Los archivos deben incluirse **después** de `prism.js`
- Los nombres de clase deben usar el prefijo `language-`
- Las expresiones regulares deben ser cuidadosamente diseñadas para evitar conflictos
- Puedes definir múltiples aliases para el mismo lenguaje