import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';
import { MenuIcon, MoonIcon, SunIcon, SettingsIcon, GitHubIcon, TwitterIcon, DiscordIcon, TranslateIcon, VersionsIcon, ChevronDownIcon, InfoCircleIcon, SearchIcon, CloseIcon } from './Icons';
import { APP_CONFIG, HEADER_LINKS, I18N_CONFIG, VERSION_CONFIG } from '../constants';
import AppIcon from './AppIcon';
import SearchBar from './SearchBar';
import Tooltip from './Tooltip';
import { useI18n } from '../context/I18nContext';
import { useVersion } from '../context/VersionContext';

interface HeaderProps {
    onMenuClick: () => void;
    onSettingsClick: () => void;
    onAboutClick: () => void;
    showMenuButton?: boolean;
}

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
    GitHub: GitHubIcon,
    Twitter: TwitterIcon,
    Discord: DiscordIcon,
};

// --- Custom Dropdown Component for Header ---
interface DropdownOption {
    value: string;
    label: string;
}

interface HeaderDropdownProps {
    options: DropdownOption[];
    value: string;
    onChange: (value: string) => void;
    Icon: React.FC<{ className?: string }>;
    ariaLabel: string;
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ options, value, onChange, Icon, ariaLabel }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (newValue: string) => {
        onChange(newValue);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-start space-x-1 tablet:space-x-1.5 px-1.5 tablet:px-2.5 py-0.5 tablet:py-1.5 text-xs tablet:text-xs bg-primary-600 hover:bg-primary-500 border border-primary-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-white transition-colors duration-200 w-full"
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-label={ariaLabel}
            >
                <Icon className="w-4 h-4 tablet:w-5 tablet:h-5 text-primary-200 flex-shrink-0" />
                <span className="text-left truncate">{selectedOption?.label}</span>
                <ChevronDownIcon className={`w-3 h-3 tablet:w-4 tablet:h-4 text-primary-200 transition-transform duration-200 flex-shrink-0 ml-auto ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full mt-2 w-full min-w-32 tablet:w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10 animate-fade-in-down">
                    <ul className="py-1">
                        {options.map(option => (
                            <li key={option.value}>
                                <button
                                    onClick={() => handleSelect(option.value)}
                                    className={`w-full text-left px-2.5 tablet:px-3 py-0.5 tablet:py-1.5 text-xs tablet:text-xs flex items-center ${
                                        option.value === value
                                            ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <style>{`
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down { animation: fade-in-down 0.2s ease-out; }
            `}</style>
        </div>
    );
};


const Header: React.FC<HeaderProps> = ({ onMenuClick, onSettingsClick, onAboutClick, showMenuButton = true }) => {
    const [isDarkMode, toggleDarkMode] = useDarkMode();
    const { t, lang, setLang, languages } = useI18n();
    const { version, setVersion, versions } = useVersion();
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const navigate = useNavigate();

    const validLinks = HEADER_LINKS.filter(link => iconMap[link.icon] && link.url);

    return (
        <header className="relative flex-shrink-0 z-60 bg-primary-700 border-b border-primary-600 w-full">
            {/* Main header bar */}
            <div className="max-w-screen-2xl mx-auto">
                <div className="flex items-center justify-between px-4 tablet:px-4 laptop:px-6 h-14 tablet:h-12 laptop:h-12">
                {/* Left section - Menu button and logo */}
                <div className="flex items-center min-w-0 flex-shrink-0">
                    {showMenuButton && (
                        <Tooltip content={t('openNavigationMenu')} position="bottom">
                            <button 
                                onClick={onMenuClick} 
                                className="text-primary-200 hover:text-white focus:outline-none laptop:hidden mr-3 p-1.5"
                                aria-label="Toggle menu"
                            >
                                <MenuIcon className="w-6 h-6 tablet:w-6 tablet:h-6" />
                            </button>
                        </Tooltip>
                    )}
                    
                    {/* Desktop logo and title */}
                    <div className="hidden laptop:flex items-center space-x-2.5 text-white">
                        <AppIcon className="h-8 w-8 desktop:h-10 desktop:w-10 text-3xl desktop:text-4xl flex-shrink-0" />
                        <div className="min-w-0">
                            <span className="block text-lg desktop:text-xl font-semibold leading-tight truncate">{APP_CONFIG.title}</span>
                            {APP_CONFIG.subtitle && (
                                <span className="block text-xs desktop:text-xs text-primary-200/80 leading-tight truncate">{APP_CONFIG.subtitle}</span>
                            )}
                        </div>
                    </div>
                    
                    {/* Tablet logo with title */}
                    <div className="hidden tablet:flex laptop:hidden items-center space-x-1.5 text-white">
                        <AppIcon className="h-8 w-8 text-3xl flex-shrink-0" />
                        <div className="min-w-0">
                            <span className="block text-base font-semibold leading-tight truncate">{APP_CONFIG.title}</span>
                        </div>
                    </div>
                    
                    {/* Mobile logo - only icon */}
                    <div className="tablet:hidden flex items-center text-white">
                        <AppIcon className="h-8 w-8 xs:h-9 xs:w-9 text-3xl xs:text-4xl" />
                    </div>
                </div>

                {/* Center section - Mobile title (only on very small screens) */}
                <div className="flex-1 flex justify-center tablet:hidden px-3 min-w-0">
                    <div className="text-center text-white max-w-full">
                        <span className="block text-sm xs:text-base font-semibold leading-tight truncate">{APP_CONFIG.title}</span>
                        {APP_CONFIG.subtitle && (
                            <span className="hidden xs:block text-xs text-primary-200/80 leading-tight truncate">{APP_CONFIG.subtitle}</span>
                        )}
                    </div>
                </div>
            
                {/* Right section - Search, dropdowns and action buttons */}
                <div className="flex items-center min-w-0 flex-shrink-0">
                    {/* Desktop search bar */}
                    <div className="hidden desktop:block max-w-xs mr-4">
                        <SearchBar />
                    </div>
                    
                    {/* External links - desktop only */}
                    {validLinks.length > 0 && (
                        <>
                            <div className="hidden desktop:flex items-center space-x-0.5 mr-2.5">
                                {validLinks.map((link) => {
                                    const IconComponent = iconMap[link.icon];
                                    return (
                                        <Tooltip key={link.icon} content={`${t('goToGitHub')}: ${link.label}`} position="bottom">
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center w-9 h-9 rounded-full text-primary-200 hover:text-white hover:bg-primary-600 focus:outline-none transition-colors duration-200"
                                                aria-label={link.label}
                                            >
                                                <IconComponent className="w-5 h-5" />
                                            </a>
                                        </Tooltip>
                                    );
                                })}
                            </div>
                            <div className="hidden desktop:block w-px h-6 bg-primary-500/50 mr-3"></div>
                        </>
                    )}
                    
                    {/* Language and version dropdowns */}
                    <div className="hidden laptop:flex items-center space-x-1.5 mr-2.5">
                        {I18N_CONFIG.enabled && (
                            <HeaderDropdown
                                Icon={TranslateIcon}
                                options={languages.map(l => ({ value: l.code, label: l.name }))}
                                value={lang}
                                onChange={(newLang) => {
                                    setLang(newLang);
                                    navigate('/');
                                }}
                                ariaLabel={t('language')}
                            />
                        )}
                        {VERSION_CONFIG.enabled && (
                            <HeaderDropdown
                                Icon={VersionsIcon}
                                options={versions.map(v => ({ value: v, label: v }))}
                                value={version}
                                onChange={(newVersion) => {
                                    setVersion(newVersion);
                                    navigate('/');
                                }}
                                ariaLabel={t('version')}
                            />
                        )}
                    </div>

                    {/* Divider before action buttons */}
                    {(I18N_CONFIG.enabled || VERSION_CONFIG.enabled) && <div className="hidden laptop:block w-px h-6 bg-primary-500/50 mr-3"></div>}

                    {/* Action buttons */}
                    <div className="flex items-center space-x-0.5">
                        {/* Dark mode toggle */}
                        <Tooltip content={isDarkMode ? t('switchToLightMode') : t('switchToDarkMode')} position="bottom">
                            <button
                                onClick={() => toggleDarkMode()}
                                className="hidden desktop:flex items-center justify-center w-7 h-7 tablet:w-8 tablet:h-8 laptop:w-9 laptop:h-9 rounded-full text-primary-200 hover:text-white hover:bg-primary-600 focus:outline-none transition-colors duration-200"
                                aria-label={t('toggleDarkMode')}
                            >
                                {isDarkMode ? (
                                    <SunIcon className="w-4 h-4 tablet:w-5 tablet:h-5 laptop:w-6 laptop:h-6" />
                                ) : (
                                    <MoonIcon className="w-4 h-4 tablet:w-5 tablet:h-5 laptop:w-6 laptop:h-6" />
                                )}
                            </button>
                        </Tooltip>
                        
                        {/* Settings button */}
                        <Tooltip content={t('openSettings')} position="bottom">
                            <button
                                onClick={onSettingsClick}
                                className="hidden desktop:flex items-center justify-center w-7 h-7 tablet:w-8 tablet:h-8 laptop:w-9 laptop:h-9 rounded-full text-primary-200 hover:text-white hover:bg-primary-600 focus:outline-none transition-colors duration-200"
                                aria-label={t('openSettings')}
                            >
                                <SettingsIcon className="w-4 h-4 tablet:w-5 tablet:h-5 laptop:w-6 laptop:h-6" />
                            </button>
                        </Tooltip>
                        
                        {/* About button */}
                        <Tooltip content={t('openAbout')} position="bottom">
                            <button
                                onClick={onAboutClick}
                                className="hidden desktop:flex items-center justify-center w-7 h-7 tablet:w-8 tablet:h-8 laptop:w-9 laptop:h-9 rounded-full text-primary-200 hover:text-white hover:bg-primary-600 focus:outline-none transition-colors duration-200"
                                aria-label={t('openAbout')}
                            >
                                <InfoCircleIcon className="w-4 h-4 tablet:w-5 tablet:h-5 laptop:w-6 laptop:h-6" />
                            </button>
                        </Tooltip>
                        
                        {/* Mobile menu toggle - positioned at the end */}
                        <Tooltip content={showMobileMenu ? t('hideMenu') : t('showMenu')} position="bottom">
                            <button
                                onClick={() => setShowMobileMenu(!showMobileMenu)}
                                className="desktop:hidden flex items-center justify-center w-7 h-7 tablet:w-8 tablet:h-8 rounded-full text-primary-200 hover:text-white hover:bg-primary-600 focus:outline-none transition-colors duration-200"
                                aria-label={showMobileMenu ? t('hideMenu') : t('showMenu')}
                            >
                                <MenuIcon className="w-4 h-4 tablet:w-5 tablet:h-5" />
                            </button>
                        </Tooltip>
                    </div>
                </div>
            </div>
            </div>
            
            {/* Mobile/Tablet search overlay */}
            {showMobileSearch && (
                <div className="absolute inset-0 bg-primary-700 z-50 h-10 tablet:h-11 laptop:h-12">
                    <div className="max-w-screen-2xl mx-auto h-full flex items-center px-3 tablet:px-4">
                        <div className="flex-1 mr-3">
                            <SearchBar />
                        </div>
                        <Tooltip content={t('closeSearch')} position="bottom">
                            <button
                                onClick={() => setShowMobileSearch(false)}
                                className="text-primary-200 hover:text-white focus:outline-none w-8 h-8 tablet:w-9 tablet:h-9 flex items-center justify-center rounded transition-colors"
                                aria-label={t('closeSearch')}
                            >
                                <CloseIcon className="w-5 h-5 tablet:w-6 tablet:h-6" />
                            </button>
                        </Tooltip>
                    </div>
                </div>
            )}
            
            {/* Mobile/Tablet navigation menu for dropdowns */}
            {showMobileMenu && (validLinks.length > 0 || I18N_CONFIG.enabled || VERSION_CONFIG.enabled) && (
                <div className="desktop:hidden border-t border-primary-600 bg-primary-700">
                    <div className="max-w-screen-2xl mx-auto">
                        <div className="px-3 tablet:px-4 py-2 tablet:py-3">
                        {/* External links */}
                        {validLinks.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                                {validLinks.map((link) => {
                                    const IconComponent = iconMap[link.icon];
                                    return (
                                        <a
                                            key={link.icon}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2 px-3 py-2 rounded-md text-primary-200 hover:text-white hover:bg-primary-600 transition-colors text-sm tablet:text-base"
                                            aria-label={link.label}
                                        >
                                            <IconComponent className="w-4 h-4 tablet:w-5 tablet:h-5" />
                                            <span>{link.label}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                        
                        {/* Action buttons for mobile/tablet */}
                        <div className="desktop:hidden">
                            {(validLinks.length > 0 || I18N_CONFIG.enabled || VERSION_CONFIG.enabled) && <div className="w-full border-t border-primary-600 mb-3"></div>}
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                {/* Search button */}
                                <button
                                    onClick={() => {
                                        setShowMobileSearch(!showMobileSearch);
                                        setShowMobileMenu(false);
                                    }}
                                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-primary-200 hover:text-white hover:bg-primary-600 transition-colors text-sm tablet:text-base"
                                    aria-label={t('search')}
                                >
                                    <SearchIcon className="w-4 h-4 tablet:w-5 tablet:h-5" />
                                    <span>{t('search')}</span>
                                </button>
                                
                                {/* Dark mode toggle */}
                                <button
                                    onClick={() => toggleDarkMode()}
                                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-primary-200 hover:text-white hover:bg-primary-600 transition-colors text-sm tablet:text-base"
                                    aria-label={t('toggleDarkMode')}
                                >
                                    {isDarkMode ? (
                                        <SunIcon className="w-4 h-4 tablet:w-5 tablet:h-5" />
                                    ) : (
                                        <MoonIcon className="w-4 h-4 tablet:w-5 tablet:h-5" />
                                    )}
                                    <span>{isDarkMode ? t('lightMode') : t('darkMode')}</span>
                                </button>
                                
                                {/* Settings button */}
                                <button
                                    onClick={() => {
                                        onSettingsClick();
                                        setShowMobileMenu(false);
                                    }}
                                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-primary-200 hover:text-white hover:bg-primary-600 transition-colors text-sm tablet:text-base"
                                    aria-label={t('openSettings')}
                                >
                                    <SettingsIcon className="w-4 h-4 tablet:w-5 tablet:h-5" />
                                    <span>{t('settings')}</span>
                                </button>
                                
                                {/* About button */}
                                <button
                                    onClick={() => {
                                        onAboutClick();
                                        setShowMobileMenu(false);
                                    }}
                                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-primary-200 hover:text-white hover:bg-primary-600 transition-colors text-sm tablet:text-base"
                                    aria-label={t('openAbout')}
                                >
                                    <InfoCircleIcon className="w-4 h-4 tablet:w-5 tablet:h-5" />
                                    <span>{t('about')}</span>
                                </button>
                            </div>
                        </div>
                        
                        {/* Language and version dropdowns for mobile/tablet */}
                        {(I18N_CONFIG.enabled || VERSION_CONFIG.enabled) && (
                            <div className="laptop:hidden flex flex-wrap gap-2 w-full">
                                {I18N_CONFIG.enabled && (
                                    <div className="flex-1 min-w-0">
                                        <HeaderDropdown
                                            Icon={TranslateIcon}
                                            options={languages.map(l => ({ value: l.code, label: l.name }))}
                                            value={lang}
                                            onChange={(newLang) => {
                                                setLang(newLang);
                                                navigate('/');
                                            }}
                                            ariaLabel={t('language')}
                                        />
                                    </div>
                                )}
                                {VERSION_CONFIG.enabled && (
                                    <div className="flex-1 min-w-0">
                                        <HeaderDropdown
                                            Icon={VersionsIcon}
                                            options={versions.map(v => ({ value: v, label: v }))}
                                            value={version}
                                            onChange={(newVersion) => {
                                                setVersion(newVersion);
                                                navigate('/');
                                            }}
                                            ariaLabel={t('version')}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;