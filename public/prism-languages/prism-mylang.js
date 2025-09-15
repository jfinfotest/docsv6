/**
 * Prism.js Custom Language Definition - MyLang
 * A custom language example for PrismJS
 * 
 * Usage:
 * 1. Include this file after prism.js
 * 2. Use language-mylang class in your code blocks
 * 
 * Example:
 * <pre><code class="language-mylang">
 * func hello(name) {
 *   print "Hello, " + name + "!"
 * }
 * </code></pre>
 */

(function (Prism) {
  'use strict';

  Prism.languages.mylang = {
    // Comments
    'comment': {
      pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)|(?:^|[^\\:])#.*/,
      lookbehind: true,
      greedy: true
    },

    // Strings
    'string': {
      pattern: /(["'])(?:\\[\s\S]|(?!\1)[^\\\r\n])*\1/,
      greedy: true
    },

    // Keywords
    'keyword': /\b(?:func|if|else|while|for|return|var|let|const|true|false|null|undefined|print|import|export|class|extends|new|this|super)\b/,

    // Functions
    'function': /\b[a-zA-Z_][a-zA-Z0-9_]*(?=\s*\()/,

    // Numbers
    'number': /\b(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,

    // Operators
    'operator': /[+\-*/%=<>!&|^~?:]+/,

    // Punctuation
    'punctuation': /[{}[\]();,.]/,

    // Variables (identifiers)
    'variable': /\b[a-zA-Z_][a-zA-Z0-9_]*\b/
  };

  // Add aliases
  Prism.languages.ml = Prism.languages.mylang;

})(Prism);