/**
 * Prism.js Custom Language Definition - QueryQL
 * A custom query language for PrismJS
 * 
 * Usage:
 * 1. Include this file after prism.js
 * 2. Use language-queryql class in your code blocks
 * 
 * Example:
 * <pre><code class="language-queryql">
 * FIND users WHERE age > 18 AND status = "active"
 * SELECT name, email FROM users
 * ORDER BY created_at DESC
 * LIMIT 10
 * </code></pre>
 */

(function (Prism) {
  'use strict';

  Prism.languages.queryql = {
    // Comments
    'comment': {
      pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|--.*)/,
      lookbehind: true,
      greedy: true
    },

    // Strings
    'string': {
      pattern: /(["'])(?:\\[\s\S]|(?!\1)[^\\\r\n])*\1/,
      greedy: true
    },

    // Keywords
    'keyword': /\b(?:FIND|SELECT|FROM|WHERE|AND|OR|NOT|IN|LIKE|BETWEEN|IS|NULL|ORDER|BY|GROUP|HAVING|LIMIT|OFFSET|ASC|DESC|DISTINCT|COUNT|SUM|AVG|MIN|MAX|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS|UNION|ALL|EXISTS|CASE|WHEN|THEN|ELSE|END|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|INDEX|DROP|ALTER|ADD|COLUMN|PRIMARY|KEY|FOREIGN|REFERENCES|UNIQUE|CHECK|DEFAULT)\b/i,

    // Functions
    'function': /\b[a-zA-Z_][a-zA-Z0-9_]*(?=\s*\()/,

    // Numbers
    'number': /\b(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,

    // Operators
    'operator': /[+\-*/%=<>!&|^~]+|\b(?:AND|OR|NOT|IN|LIKE|BETWEEN|IS)\b/i,

    // Identifiers (table names, column names)
    'identifier': {
      pattern: /\b[a-zA-Z_][a-zA-Z0-9_]*\b/,
      alias: 'variable'
    },

    // Punctuation
    'punctuation': /[{}[\]();,.]/,

    // Special tokens
    'wildcard': /\*/,
    'parameter': /[@$][a-zA-Z_][a-zA-Z0-9_]*/
  };

  // Add aliases
  Prism.languages.qql = Prism.languages.queryql;
  Prism.languages.query = Prism.languages.queryql;

})(Prism);