---
title: "Custom PrismJS Languages"
position: 3
---

# Custom PrismJS Languages

The application includes an automatic detection and loading system for custom PrismJS languages located in the `public/prism-languages/` directory.

## System Features

### 🔍 Automatic Detection
- Automatically scans the `public/prism-languages/` directory
- Uses a `manifest.json` file to get language information
- Fallback to pattern detection if manifest doesn't exist

### ⚡ Intelligent Loading
- Automatic loading of custom languages when initializing the application
- On-demand loading when a specific language is detected
- Fallback to CDN for built-in PrismJS languages

### 🎯 Complete Integration
- Works with all code components (`CodeBlock`, `TabbedCodeBlock`, `GeminiCodeAnalyzer`)
- Support for language aliases
- Robust error handling

## Included Languages

### MyLang
**File:** `prism-mylang.js`  
**Aliases:** `mylang`, `ml`  
**Description:** Fictional programming language with JavaScript-like syntax

```mylang
func hello(name) {
  print "Hello, " + name + "!"
}

var user = "World"
hello(user)
```

### Config
**File:** `prism-config.js`  
**Aliases:** `config`, `conf`, `ini`, `cfg`  
**Description:** Language for INI-type configuration files

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
**File:** `prism-queryql.js`  
**Aliases:** `queryql`, `qql`, `query`  
**Description:** Custom query language similar to SQL

```queryql
FIND users WHERE age > 18 AND status = "active"
SELECT name, email FROM users
ORDER BY created_at DESC
LIMIT 10
```

## How to Use

### In Markdown
```markdown
```mylang
func example() {
  return "Hello World"
}
```
```

### In HTML
```html
<pre><code class="language-config">
[section]
key = "value"
</code></pre>
```

### In React Components
```jsx
<CodeBlock 
  language="queryql" 
  code="FIND users WHERE active = true" 
/>
```

## Adding New Languages

### 1. Create the Definition File
Create a `prism-[name].js` file in `public/prism-languages/`:

```javascript
(function (Prism) {
  'use strict';

  Prism.languages.mylanguage = {
    'comment': /\/\/.*/,
    'string': /"[^"]*"/,
    'keyword': /\b(?:if|else|function)\b/,
    'number': /\b\d+\b/,
    'operator': /[+\-*/%=]/,
    'punctuation': /[{}[\]();,.]/
  };

  // Optional aliases
  Prism.languages.ml = Prism.languages.mylanguage;

})(Prism);
```

### 2. Update the Manifest
Edit `public/prism-languages/manifest.json`:

```json
{
  "version": "1.0.0",
  "description": "Custom PrismJS language definitions manifest",
  "languages": [
    {
      "name": "mylanguage",
      "file": "prism-mylanguage.js",
      "aliases": ["ml"],
      "description": "My custom language"
    }
  ]
}
```

### 3. Immediate Usage
The new language will be automatically available without needing to restart the application.

## System Architecture

### Main Components

#### `prismLanguageLoader.ts`
- **Function:** Main language loading service
- **Features:**
  - Automatic directory scanning
  - Loaded language cache management
  - API to check availability

#### `prismInit.ts`
- **Function:** Initialization utility
- **Features:**
  - Early initialization in app lifecycle
  - Utility functions to get language information
  - Auto-initialization when imported

#### Component Integration
- **CodeBlock.tsx:** Main code block component
- **TabbedCodeBlock.tsx:** Tabbed code component
- **GeminiCodeAnalyzer.tsx:** AI code analyzer

### Loading Flow

1. **Initialization:** When loading the app, `public/prism-languages/` is scanned
2. **Detection:** `manifest.json` is read or files are detected by pattern
3. **Automatic Loading:** All available custom languages are loaded
4. **Usage:** Code components automatically detect available languages
5. **Fallback:** If a language isn't available locally, it attempts to load from CDN

## System Advantages

### ✅ Automatic
- No manual configuration required
- Automatic detection of new languages
- Transparent integration with all components

### ✅ Extensible
- Easy to add new languages
- Support for multiple aliases
- Flexible manifest system

### ✅ Robust
- Graceful error handling
- Fallback to CDN for built-in languages
- Intelligent cache to avoid duplicate loads

### ✅ Performant
- On-demand loading
- Cache of already loaded languages
- Asynchronous initialization

## Troubleshooting

### Language Doesn't Load
1. Verify the file is in `public/prism-languages/`
2. Ensure the filename follows the pattern `prism-[name].js`
3. Check browser console for syntax errors
4. Verify that `manifest.json` is updated

### Syntax Not Highlighted
1. Confirm the language is loaded (check console)
2. Verify the language name or alias is correct
3. Ensure the language definition is valid

### Console Errors
- **"Failed to load custom language":** The language file couldn't be loaded
- **"Language not found in manifest":** The language isn't listed in the manifest
- **"Prism not found":** PrismJS isn't available (initialization problem)

## Additional Resources

- [Official PrismJS Documentation](https://prismjs.com/)
- [Guide to Creating Custom Languages](https://prismjs.com/extending.html#language-definitions)
- [Regular Expressions for Tokens](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Language Definition Examples](https://github.com/PrismJS/prism/tree/master/components)