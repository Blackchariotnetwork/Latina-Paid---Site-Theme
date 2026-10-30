import React from 'react';
import { Play, Image as ImageIcon, Lock, CheckCircle2, Film } from 'lucide-react';
import { MediaItem } from '../types';

interface ArtworkThumbnailProps {
  item: MediaItem;
  isUnlocked: boolean;
  className?: string;
  showBadges?: boolean;
}

export const ArtworkThumbnail: React.FC<ArtworkThumbnailProps> = ({
  item,
  isUnlocked,
  className = '',
  showBadges = true,
}) => {
  // Artistic deterministic Latin visual artwork for each catalog item
  const renderLatinArtisticScene = () => {
    switch (item.id) {
      case 'media-01': // Tulum Sunset Sanctuary
        return (
          <svg className="w-full h-full object-cover" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="tulumSun" cx="45%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ea580c" stopOpacity="0.65" />
                <stop offset="35%" stopColor="#c2410c" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#431407" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#09090b" stopOpacity="0.95" />
              </radialGradient>
              <linearGradient id="tulumWater" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#7c2d12" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#09090b" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <rect width="800" height="450" fill="#09090b" />
            <circle cx="360" cy="160" r="220" fill="url(#tulumSun)" />
            {/* Palm & foliage artistic silhouettes */}
            <path d="M 0,450 Q 120,280 260,210 Q 180,310 150,450 Z" fill="#18181b" opacity="0.8" />
            <path d="M 800,450 Q 660,260 520,220 Q 620,330 650,450 Z" fill="#18181b" opacity="0.85" />
            {/* Cenote pool reflection and ripples */}
            <path d="M 0,310 Q 400,240 800,320 L 800,450 L 0,450 Z" fill="url(#tulumWater)" />
            <ellipse cx="400" cy="380" rx="300" ry="40" fill="none" stroke="rgba(251,146,60,0.25)" strokeWidth="1.5" />
            <ellipse cx="400" cy="380" rx="180" ry="24" fill="none" stroke="rgba(251,146,60,0.18)" strokeWidth="1" />
          </svg>
        );

      case 'media-02': // Habana Nights
        return (
          <svg className="w-full h-full object-cover" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="habanaGrad" cx="60%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#d97706" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#9a3412" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#09090b" stopOpacity="0.95" />
              </radialGradient>
            </defs>
            <rect width="800" height="450" fill="#09090b" />
            <circle cx="500" cy="140" r="240" fill="url(#habanaGrad)" />
            {/* Colonial wooden shutter slats with warm Cuban sunset light */}
            {Array.from({ length: 10 }).map((_, idx) => (
              <line
                key={idx}
                x1={60 + idx * 75}
                y1="0"
                x2={-80 + idx * 75}
                y2="450"
                stroke="rgba(245,158,11,0.09)"
                strokeWidth="20"
              />
            ))}
            {/* Mahogany arch framing */}
            <path d="M 120,450 L 120,180 Q 400,60 680,180 L 680,450" fill="none" stroke="#292524" strokeWidth="24" opacity="0.75" />
            <path d="M 0,390 Q 400,330 800,380 L 800,450 L 0,450 Z" fill="#1c1917" opacity="0.9" />
          </svg>
        );

      case 'media-03': // Medellín Penthouse PPV
        return (
          <svg className="w-full h-full object-cover" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="medellinSky" cx="50%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#e11d48" stopOpacity="0.45" />
                <stop offset="45%" stopColor="#881337" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#09090b" stopOpacity="0.95" />
              </radialGradient>
            </defs>
            <rect width="800" height="450" fill="#09090b" />
            <circle cx="400" cy="180" r="260" fill="url(#medellinSky)" />
            {/* Mountain skyline and city lights of El Poblado */}
            <path d="M 0,280 Q 220,190 400,240 T 800,200 L 800,450 L 0,450 Z" fill="#18181b" opacity="0.9" />
            {Array.from({ length: 24 }).map((_, i) => (
              <circle
                key={i}
                cx={(i * 34 + 60) % 760}
                cy={250 + (i % 5) * 28}
                r={(i % 3) + 1.2}
                fill="rgba(251,191,36,0.6)"
              />
            ))}
            {/* Wet infinity pool edge */}
            <line x1="0" y1="360" x2="800" y2="360" stroke="rgba(225,29,72,0.3)" strokeWidth="2" />
          </svg>
        );

      case 'media-04': // San Juan Colonial Atelier
        return (
          <svg className="w-full h-full object-cover" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="sanjuanGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d97706" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#b45309" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#09090b" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            <rect width="800" height="450" fill="#09090b" />
            <rect width="800" height="450" fill="url(#sanjuanGold)" />
            <path d="M 0,380 Q 300,320 800,370" stroke="rgba(251,191,36,0.18)" strokeWidth="3" fill="none" />
            {/* Balcony wrought iron curves */}
            <path d="M 100,450 C 150,300 250,300 300,450" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
            <path d="M 500,450 C 550,300 650,300 700,450" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
          </svg>
        );

      case 'media-05': // Cartagena Esmeralda
        return (
          <svg className="w-full h-full object-cover" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="emeraldGrad" cx="40%" cy="45%" r="65%">
                <stop offset="0%" stopColor="#059669" stopOpacity="0.5" />
                <stop offset="45%" stopColor="#064e3b" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#09090b" stopOpacity="0.95" />
              </radialGradient>
            </defs>
            <rect width="800" height="450" fill="#09090b" />
            <circle cx="350" cy="210" r="240" fill="url(#emeraldGrad)" />
            {/* Emerald silk wave */}
            <path d="M 0,260 Q 240,160 500,290 T 800,210 L 800,450 L 0,450 Z" fill="#064e3b" opacity="0.3" />
            <circle cx="350" cy="210" r="140" fill="none" stroke="rgba(52,211,153,0.2)" strokeWidth="1.5" />
          </svg>
        );

      case 'media-06': // Rio Ipanema
        return (
          <svg className="w-full h-full object-cover" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="rioDusk" x1="0%" y1="0%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#c026d3" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#09090b" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            <rect width="800" height="450" fill="#09090b" />
            <rect width="800" height="450" fill="url(#rioDusk)" />
            {/* Dois Irmãos twin mountain contours */}
            <path d="M 120,450 Q 220,180 340,320 Q 420,120 540,450 Z" fill="#18181b" opacity="0.8" />
            {/* Ocean wave reflection */}
            <path d="M 0,370 Q 400,320 800,380" stroke="rgba(56,189,248,0.25)" strokeWidth="2" fill="none" />
          </svg>
        );

      default:
        return (
          <svg className="w-full h-full object-cover" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="latinDef" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#ea580c" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#09090b" stopOpacity="0.95" />
              </radialGradient>
            </defs>
            <rect width="800" height="450" fill="#09090b" />
            <circle cx="400" cy="225" r="220" fill="url(#latinDef)" />
            <path d="M 0,320 Q 400,220 800,340" stroke="rgba(251,146,60,0.15)" strokeWidth="2" fill="none" />
          </svg>
        );
    }
  };

  return (
    <div className="relative overflow-hidden group select-none aspect-video bg-zinc-950 ${className}">
      {/* Background SVG scene */}
      <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
        {renderLatinArtisticScene()}
      </div>

      {/* Cinematic subtle vignette & warm film texture */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10 pointer-events-none" />

      {/* Lock blur overlay if not unlocked */}
      {!isUnlocked && (
        <div className="absolute inset-0 backdrop-blur-[6px] bg-black/45 flex flex-col items-center justify-center p-4 text-center transition-all duration-300">
          <div className="w-11 h-11 rounded-full bg-zinc-900/90 border border-amber-600/60 flex items-center justify-center mb-2 shadow-xl text-amber-400 group-hover:scale-110 transition-transform">
            <Lock className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-zinc-200 tracking-wide">
            {item.isPPV ? `ESTRENO PPV $${item.ppvPrice?.toFixed(2)}` : `PASE ${item.tierRequired.toUpperCase()} REQUERIDO`}
          </span>
          <span className="text-[11px] text-amber-300/80 mt-0.5">Click para desbloquear acceso</span>
        </div>
      )}

      {/* Badges and metadata */}
      {showBadges && (
        <>
          {/* Top Left: Media Type & Resolution */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10 pointer-events-none">
            <span className="bg-black/75 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[11px] font-mono font-medium text-zinc-200 flex items-center gap-1">
              {item.type === 'video' ? <Film className="w-3 h-3 text-orange-400" /> : <ImageIcon className="w-3 h-3 text-amber-400" />}
              {item.resolution}
            </span>
            {item.fps > 0 && (
              <span className="bg-black/75 backdrop-blur-md border border-white/10 px-1.5 py-0.5 rounded text-[10px] font-mono text-amber-300">
                {item.fps}FPS
              </span>
            )}
          </div>

          {/* Top Right: Access Status */}
          <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
            {isUnlocked ? (
              <span className="bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Desbloqueado
              </span>
            ) : item.isPPV ? (
              <span className="bg-orange-950/80 border border-orange-500/40 text-orange-300 px-2 py-0.5 rounded text-[11px] font-medium font-mono">
                PPV ${item.ppvPrice?.toFixed(2)}
              </span>
            ) : (
              <span className="bg-amber-950/80 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded text-[11px] font-medium uppercase tracking-wider">
                {item.tierRequired}
              </span>
            )}
          </div>

          {/* Bottom Right: Duration or Photo count */}
          <div className="absolute bottom-2.5 right-2.5 z-10 pointer-events-none">
            <span className="bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-mono text-zinc-300 border border-white/10">
              {item.type === 'gallery' ? `${item.photoCount} Fotos RAW` : item.duration}
            </span>
          </div>

          {/* Center Play Icon hover state when unlocked */}
          {isUnlocked && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-orange-600/90 text-white flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                {item.type === 'video' || item.type === 'bts' || item.type === 'livestream' ? (
                  <Play className="w-5 h-5 ml-0.5 fill-white" />
                ) : (
                  <ImageIcon className="w-5 h-5" />
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
