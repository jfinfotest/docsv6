/**
 * Automatic PrismJS Custom Language Loader
 * Detects and loads custom language definitions from /prism-languages directory
 */

export interface CustomLanguage {
  name: string;
  file: string;
  aliases: string[];
  description?: string;
}

export interface PrismLanguageLoaderConfig {
  baseUrl: string;
  languagesPath: string;
  autoLoad: boolean;
}

class PrismLanguageLoader {
  private loadedLanguages = new Set<string>();
  private languageLoadPromises: Record<string, Promise<void>> = {};
  private customLanguages: CustomLanguage[] = [];
  private config: PrismLanguageLoaderConfig;
  private initialized = false;

  constructor(config: Partial<PrismLanguageLoaderConfig> = {}) {
    this.config = {
      baseUrl: import.meta.env.BASE_URL || '/',
      languagesPath: 'prism-languages',
      autoLoad: true,
      ...config
    };
  }

  /**
   * Initialize the loader by scanning for available custom languages
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      await this.scanCustomLanguages();
      
      if (this.config.autoLoad) {
        await this.loadAllCustomLanguages();
      }
      
      this.initialized = true;
      console.log('✅ PrismJS Custom Language Loader initialized');
    } catch (error) {
      console.error('❌ Failed to initialize PrismJS Custom Language Loader:', error);
    }
  }

  /**
   * Scan the prism-languages directory for available custom languages
   */
  private async scanCustomLanguages(): Promise<void> {
    try {
      // Try to fetch the directory listing or use a manifest approach
      const response = await fetch(`${this.getLanguagesUrl()}/manifest.json`);
      
      if (response.ok) {
        const manifest = await response.json();
        this.customLanguages = manifest.languages || [];
      } else {
        // Fallback: try to detect languages by attempting to load known patterns
        await this.detectLanguagesByPattern();
      }
    } catch (error) {
      console.warn('Could not scan custom languages directory, using fallback detection');
      await this.detectLanguagesByPattern();
    }
  }

  /**
   * Detect languages by trying common patterns
   */
  private async detectLanguagesByPattern(): Promise<void> {
    const commonLanguageNames = [
      'mylang', 'config', 'queryql', 'custom', 'dsl', 'template',
      'markup', 'query', 'conf', 'ini', 'cfg', 'spec', 'schema'
    ];

    const detectedLanguages: CustomLanguage[] = [];

    for (const langName of commonLanguageNames) {
      try {
        const response = await fetch(`${this.getLanguagesUrl()}/prism-${langName}.js`, { method: 'HEAD' });
        if (response.ok) {
          detectedLanguages.push({
            name: langName,
            file: `prism-${langName}.js`,
            aliases: [langName],
            description: `Custom ${langName} language`
          });
        }
      } catch {
        // Language file doesn't exist, continue
      }
    }

    this.customLanguages = detectedLanguages;
  }

  /**
   * Get the full URL for the languages directory
   */
  private getLanguagesUrl(): string {
    return `${this.config.baseUrl}${this.config.languagesPath}`.replace(/\/+/g, '/');
  }

  /**
   * Load all detected custom languages
   */
  async loadAllCustomLanguages(): Promise<void> {
    const promises = this.customLanguages.map(lang => this.loadLanguageFile(lang.file));
    await Promise.allSettled(promises);
  }

  /**
   * Load a specific language file
   */
  async loadLanguageFile(filename: string): Promise<void> {
    if (this.languageLoadPromises[filename]) {
      return this.languageLoadPromises[filename];
    }

    const promise = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `${this.getLanguagesUrl()}/${filename}`;
      script.async = true;
      
      script.onload = () => {
        console.log(`✅ Loaded custom language: ${filename}`);
        delete this.languageLoadPromises[filename];
        resolve();
      };
      
      script.onerror = () => {
        console.error(`❌ Failed to load custom language: ${filename}`);
        delete this.languageLoadPromises[filename];
        reject(new Error(`Failed to load ${filename}`));
      };
      
      document.head.appendChild(script);
    });

    this.languageLoadPromises[filename] = promise;
    return promise;
  }

  /**
   * Load a language by name (including aliases)
   */
  async loadLanguage(languageName: string): Promise<void> {
    const language = this.findLanguageByName(languageName);
    if (language) {
      await this.loadLanguageFile(language.file);
      this.loadedLanguages.add(languageName);
    }
  }

  /**
   * Check if a language is available (either custom or built-in)
   */
  isLanguageAvailable(languageName: string): boolean {
    // Check if it's a custom language
    if (this.findLanguageByName(languageName)) {
      return true;
    }

    // Check if it's already loaded in Prism
    if (typeof window !== 'undefined' && window.Prism && window.Prism.languages[languageName]) {
      return true;
    }

    return false;
  }

  /**
   * Find a language by name or alias
   */
  private findLanguageByName(name: string): CustomLanguage | undefined {
    return this.customLanguages.find(lang => 
      lang.name === name || lang.aliases.includes(name)
    );
  }

  /**
   * Get all available custom languages
   */
  getAvailableLanguages(): CustomLanguage[] {
    return [...this.customLanguages];
  }

  /**
   * Get language aliases mapping
   */
  getLanguageAliases(): Record<string, string> {
    const aliases: Record<string, string> = {};
    
    this.customLanguages.forEach(lang => {
      lang.aliases.forEach(alias => {
        aliases[alias] = lang.name;
      });
    });
    
    return aliases;
  }

  /**
   * Check if loader is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }
}

// Create singleton instance
export const prismLanguageLoader = new PrismLanguageLoader();

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      prismLanguageLoader.initialize();
    });
  } else {
    prismLanguageLoader.initialize();
  }
}

export default prismLanguageLoader;