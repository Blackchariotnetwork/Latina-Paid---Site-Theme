import React from 'react';
import { Flame, Sparkles, User, Sun, Moon } from 'lucide-react';
import { UserSession } from '../types';

interface TopNavigationProps {
  userSession: UserSession;
  activeNav: string;
  onSelectNav: (nav: string) => void;
  onOpenSubscribe: () => void;
  onOpenAccount: () => void;
  onOpenTipJar: () => void;
  onToggleCreatorStudio: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  userSession,
  activeNav,
  onSelectNav,
  onOpenSubscribe,
  onOpenAccount,
  onOpenTipJar,
  onToggleCreatorStudio,
  isDarkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectNav('vault')}
          className="text-left group flex items-center gap-2 cursor-pointer focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 via-orange-600 to-rose-600 flex items-center justify-center text-white shadow-md shadow-orange-950/40">
            <Flame className="w-4 h-4 fill-white" />
          </div>
          <span className="text-xl font-extrabold tracking-wider font-display text-white group-hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            FUEGO NOIR
          </span>
          <span className="hidden sm:inline text-[10px] font-mono text-amber-500 uppercase tracking-widest pl-1">
            Privé
          </span>
        </button>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <button
            onClick={() => onSelectNav('vault')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeNav === 'vault' ? 'text-white border-b-2 border-amber-500 pb-0.5' : ''
            }`}
          >
            Bóveda Privada
          </button>
          <button
            onClick={() => onSelectNav('4k-streams')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeNav === '4k-streams' ? 'text-white border-b-2 border-amber-500 pb-0.5' : ''
            }`}
          >
            Cinema 4K
          </button>
          <button
            onClick={() => onSelectNav('galleries')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeNav === 'galleries' ? 'text-white border-b-2 border-amber-500 pb-0.5' : ''
            }`}
          >
            Sets & Fotos RAW
          </button>
          <button
            onClick={() => onSelectNav('memberships')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeNav === 'memberships' ? 'text-white border-b-2 border-amber-500 pb-0.5' : ''
            }`}
          >
            Membresías VIP
          </button>
          <button
            onClick={onOpenTipJar}
            className="cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-amber-400 text-zinc-400 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Propinas VIP
          </button>
        </nav>

        {/* Zone 3: 1 primary action / Member state control */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Dark / Light toggle */}
          <button
            onClick={onToggleDarkMode}
            title={isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Creator Studio Theme Customizer toggle button */}
          <button
            onClick={onToggleCreatorStudio}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-amber-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Estudio Creadora</span>
          </button>

          {/* Primary CTA based on session */}
          {userSession.tier === 'free_preview' ? (
            <button
              onClick={onOpenSubscribe}
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 rounded-lg shadow-md shadow-orange-950 transition-all hover:scale-[1.02] cursor-pointer whitespace-nowrap shrink-0"
            >
              Unirse al VIP Oro
            </button>
          ) : (
            <button
              onClick={onOpenAccount}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-amber-500/40 rounded-lg text-xs font-medium text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono text-[11px]">{userSession.subscriberId}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
