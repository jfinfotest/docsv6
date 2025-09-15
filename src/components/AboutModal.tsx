import React from 'react';
import ReactDOM from 'react-dom';
import { useI18n } from '../context/I18nContext';
import { APP_CONFIG } from '../constants';
import { CloseIcon, ExternalLinkIcon, GitHubIcon, HeartIcon } from './Icons';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const technologies = [
    { name: 'React', url: 'https://react.dev/', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
    { name: 'TypeScript', url: 'https://www.typescriptlang.org/', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
    { name: 'Tailwind CSS', url: 'https://tailwindcss.com/', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300' },
    { name: 'Vite', url: 'https://vitejs.dev/', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
    { name: 'Google Gemini', url: 'https://ai.google.dev/', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
    { name: 'Prism.js', url: 'https://prismjs.com/', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
    { name: 'Mermaid.js', url: 'https://mermaid.js.org/', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300' },
    { name: 'Chart.js', url: 'https://www.chartjs.org/', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
];

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
    const { t } = useI18n();
    
    if (!isOpen) return null;
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;

    const TechBadge: React.FC<{ name: string; url: string; color: string }> = ({ name, url, color }) => (
        <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md ${color}`}
        >
            {name} <ExternalLinkIcon className="w-3.5 h-3.5 ml-1.5" />
        </a>
    );

    return ReactDOM.createPortal(
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-modal-title"
        >
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
                .gradient-bg {
                    background: linear-gradient(-45deg, #3b82f6, #1e40af, #0ea5e9, #0284c7);
                    background-size: 400% 400%;
                    animation: gradient 15s ease infinite;
                }
            `}</style>
            <div
                className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl relative overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Header con gradiente */}
                <div className="gradient-bg p-6 text-center relative flex-shrink-0">
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full hover:bg-white/20 transition-all duration-200" 
                        aria-label={t('closeAbout')}
                    >
                        <CloseIcon className="w-5 h-5" />
                    </button>                    
                  
                    <h2 id="about-modal-title" className="text-2xl font-bold text-white mb-1">
                        FusionDoc
                    </h2>
                    <p className="text-white/90 text-base font-medium">Next-Gen Documentation</p>
                </div>
                
                {/* Contenido principal */}
                <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                        {/* Información del autor */}
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                                <span className="text-2xl font-bold text-white">JF</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Jhon Valencia</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">Full Stack Developer & UI/UX Designer</p>
                            {/* <div className="flex justify-center">
                                <a 
                                    href="https://github.com/jhonfreddy" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
                                >
                                    <GitHubIcon className="w-4 h-4 mr-2" />
                                    GitHub
                                </a>
                            </div> */}
                        </div>
                        
                        {/* Tecnologías */}
                        <div className="lg:col-span-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4 flex items-center justify-center">
                                <span className="mr-2">🚀</span>
                                Tecnologías Utilizadas
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {technologies.map(tech => (
                                    <TechBadge key={tech.name} name={tech.name} url={tech.url} color={tech.color} />
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 text-center flex-shrink-0">
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
                            Hecho con <HeartIcon className="w-4 h-4 mx-1 text-red-500" /> para la comunidad
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            © 2025 FusionDoc. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </div>,
        modalRoot
    );
};

export default AboutModal;