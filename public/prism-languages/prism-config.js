/**
 * Prism.js Custom Language Definition - Config
 * A custom configuration language for PrismJS
 * 
 * Usage:
 * 1. Include this file after prism.js
 * 2. Use language-config class in your code blocks
 * 
 * Example:
 * <pre><code class="language-config">
 * [database]
 * host = "localhost"
 * port = 5432
 * enabled = true
 * 
 * [server]
 * timeout = 30s
 * max_connections = 100
 * </code></pre>
 */

(function (Prism) {
  'use strict';

  Prism.languages.config = {
    // Comments
    'comment': {
      pattern: /(^|[^\\])(?:#.*|;.*)/,
      lookbehind: true
    },

    // Sections [section_name]
    'section': {
      pattern: /^\s*\[[^\]\r\n]+\]/m,
      inside: {
        'punctuation': /[\[\]]/,
        'section-name': {
          pattern: /[^\[\]]+/,
          alias: 'class-name'
        }
      }
    },

    // Key-value pairs
    'property': {
      pattern: /(^|[\r\n])\s*[^\r\n=]+(?=\s*=)/,
      lookbehind: true,
      alias: 'attr-name'
    },

    // Values
    'value': {
      pattern: /=\s*(?:[^\r\n"'`]|"[^"]*"|'[^']*'|`[^`]*`)*/,
      inside: {
        'punctuation': /^=/,
        'string': {
          pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
          greedy: true
        },
        'number': /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/,
        'boolean': /\b(?:true|false|yes|no|on|off|enabled|disabled)\b/i,
        'unit': /\b\d+(?:s|ms|m|h|d|kb|mb|gb|tb)\b/i,
        'null': /\b(?:null|none|nil)\b/i
      }
    },

    // Operators
    'operator': /=/,

    // Punctuation
    'punctuation': /[\[\]]/
  };

  // Add aliases
  Prism.languages.conf = Prism.languages.config;
  Prism.languages.ini = Prism.languages.config;
  Prism.languages.cfg = Prism.languages.config;

})(Prism);