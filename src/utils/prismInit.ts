/**
 * PrismJS Initialization Utility
 * Ensures custom language loader is initialized early in the application lifecycle
 */

import { prismLanguageLoader } from '../services/prismLanguageLoader';

/**
 * Initialize PrismJS with custom language support
 * This should be called early in the application lifecycle
 */
export const initializePrism = async (): Promise<void> => {
  try {
    // Ensure the custom language loader is initialized
    if (!prismLanguageLoader.isInitialized()) {
      await prismLanguageLoader.initialize();
    }
    
    console.log('✅ PrismJS initialization completed');
  } catch (error) {
    console.error('❌ Failed to initialize PrismJS:', error);
  }
};

/**
 * Get all available languages (built-in + custom)
 */
export const getAvailableLanguages = (): string[] => {
  const customLanguages = prismLanguageLoader.getAvailableLanguages();
  const builtInLanguages = [
    'javascript', 'typescript', 'python', 'java', 'c', 'cpp', 'csharp',
    'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'scala', 'r',
    'html', 'css', 'scss', 'sass', 'less', 'xml', 'json', 'yaml',
    'markdown', 'bash', 'powershell', 'sql', 'dockerfile', 'nginx',
    'apache', 'git', 'diff', 'makefile', 'cmake', 'latex'
  ];
  
  const customLanguageNames = customLanguages.map(lang => lang.name);
  const allAliases = customLanguages.flatMap(lang => lang.aliases);
  
  return [...new Set([...builtInLanguages, ...customLanguageNames, ...allAliases])];
};

/**
 * Check if a language is supported (either built-in or custom)
 */
export const isLanguageSupported = (language: string): boolean => {
  const availableLanguages = getAvailableLanguages();
  return availableLanguages.includes(language.toLowerCase());
};

/**
 * Get language information including whether it's custom or built-in
 */
export const getLanguageInfo = (language: string) => {
  const customLanguages = prismLanguageLoader.getAvailableLanguages();
  const customLang = customLanguages.find(lang => 
    lang.name === language || lang.aliases.includes(language)
  );
  
  if (customLang) {
    return {
      name: customLang.name,
      type: 'custom' as const,
      aliases: customLang.aliases,
      description: customLang.description
    };
  }
  
  return {
    name: language,
    type: 'built-in' as const,
    aliases: [],
    description: `Built-in ${language} language support`
  };
};

// Auto-initialize when this module is imported
if (typeof window !== 'undefined') {
  // Initialize after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePrism);
  } else {
    initializePrism();
  }
}