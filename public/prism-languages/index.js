/**
 * Prism Custom Languages Index
 * Automatically loads all custom language definitions
 * 
 * Usage:
 * <script src="/prism-languages/index.js"></script>
 * 
 * Or load specific languages:
 * <script src="/prism-languages/prism-mylang.js"></script>
 */

(function() {
  'use strict';

  // List of available custom languages
  const customLanguages = [
    {
      name: 'mylang',
      file: 'prism-mylang.js',
      aliases: ['ml'],
      description: 'Custom programming language example'
    },
    {
      name: 'config',
      file: 'prism-config.js',
      aliases: ['conf', 'ini', 'cfg'],
      description: 'Configuration file language'
    },
    {
      name: 'queryql',
      file: 'prism-queryql.js',
      aliases: ['qql', 'query'],
      description: 'Custom query language'
    }
  ];

  // Function to load a language file
  function loadLanguage(languageFile) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `/prism-languages/${languageFile}`;
      script.onload = () => resolve(languageFile);
      script.onerror = () => reject(new Error(`Failed to load ${languageFile}`));
      document.head.appendChild(script);
    });
  }

  // Function to load all custom languages
  function loadAllLanguages() {
    const promises = customLanguages.map(lang => loadLanguage(lang.file));
    return Promise.all(promises);
  }

  // Function to load specific languages
  function loadSpecificLanguages(languageNames) {
    const promises = languageNames
      .map(name => {
        const lang = customLanguages.find(l => 
          l.name === name || l.aliases.includes(name)
        );
        return lang ? loadLanguage(lang.file) : null;
      })
      .filter(Boolean);
    
    return Promise.all(promises);
  }

  // Function to get available languages info
  function getAvailableLanguages() {
    return customLanguages.map(lang => ({
      name: lang.name,
      aliases: lang.aliases,
      description: lang.description
    }));
  }

  // Auto-load all languages if Prism is available
  if (typeof Prism !== 'undefined') {
    loadAllLanguages()
      .then(() => {
        console.log('✅ Custom Prism languages loaded successfully');
        
        // Trigger re-highlighting if Prism is ready
        if (Prism.highlightAll) {
          Prism.highlightAll();
        }
      })
      .catch(error => {
        console.error('❌ Error loading custom Prism languages:', error);
      });
  } else {
    console.warn('⚠️ Prism not found. Make sure to include prism.js before this file.');
  }

  // Expose functions globally
  window.PrismCustomLanguages = {
    loadAll: loadAllLanguages,
    loadSpecific: loadSpecificLanguages,
    getAvailable: getAvailableLanguages,
    languages: customLanguages
  };

})();