import React from 'react';
import { Film, Image as ImageIcon, Flame, Sliders, Sparkles } from 'lucide-react';
import { UserSession } from '../types';

interface MobileBottomNavProps {
  activeNav: string;
  onSelectNav: (nav: string) => void;
  onOpenSubscribe: () => void;
  onOpenTipJar: () => void;
  onToggleCreatorStudio: () => void;
  userSession: UserSession;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeNav,
  onSelectNav,
  onOpenSubscribe,
  onOpenTipJar,
  onToggleCreatorStudio,
  userSession,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-800/80 px-2 py-1.5 flex items-center justify-around text-[10px] font-medium text-zinc-400">
      
      <button
        onClick={() => onSelectNav('vault')}
        className={`flex flex-col items-center gap-1 p-1 transition-colors cursor-pointer ${
          activeNav === 'vault' ? 'text-amber-400 font-semibold' : 'hover:text-zinc-200'
        }`}
      >
        <Film className="w-4 h-4" />
        <span>Bóveda</span>
      </button>

      <button
        onClick={() => onSelectNav('4k-streams')}
        className={`flex flex-col items-center gap-1 p-1 transition-colors cursor-pointer ${
          activeNav === '4k-streams' ? 'text-amber-400 font-semibold' : 'hover:text-zinc-200'
        }`}
      >
        <Film className="w-4 h-4" />
        <span>Cinema 4K</span>
      </button>

      <button
        onClick={() => onSelectNav('galleries')}
        className={`flex flex-col items-center gap-1 p-1 transition-colors cursor-pointer ${
          activeNav === 'galleries' ? 'text-amber-400 font-semibold' : 'hover:text-zinc-200'
        }`}
      >
        <ImageIcon className="w-4 h-4" />
        <span>Fotos RAW</span>
      </button>

      <button
        onClick={onOpenSubscribe}
        className="flex flex-col items-center gap-1 p-1 text-amber-500 font-semibold cursor-pointer"
      >
        <Sparkles className="w-4 h-4" />
        <span>{userSession.tier === 'free_preview' ? 'Pase VIP' : 'Mi VIP'}</span>
      </button>

      <button
        onClick={onToggleCreatorStudio}
        className="flex flex-col items-center gap-1 p-1 text-orange-400 cursor-pointer"
      >
        <Sliders className="w-4 h-4" />
        <span>Estudio</span>
      </button>

    </div>
  );
};
