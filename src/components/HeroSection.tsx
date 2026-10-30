import React from 'react';
import { Play, Sparkles, ShieldCheck, Flame, Eye, MapPin } from 'lucide-react';
import { MediaItem, UserSession } from '../types';
import { ArtworkThumbnail } from './ArtworkThumbnail';

interface HeroSectionProps {
  featuredItem: MediaItem;
  userSession: UserSession;
  onPlayFeatured: () => void;
  onOpenSubscribe: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredItem,
  userSession,
  onPlayFeatured,
  onOpenSubscribe,
}) => {
  const isUnlocked = userSession.tier !== 'free_preview' || userSession.unlockedPPVIds.includes(featuredItem.id);

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-zinc-800/60">
      {/* Background warm tropical dusk glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-gradient-to-r from-orange-950/30 via-amber-950/20 to-rose-950/25 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Quiet metadata line (anti-pill zero-pill discipline) */}
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="text-orange-400 font-semibold tracking-wider uppercase flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                Estreno Exclusivo Tulum
              </span>
              <span aria-hidden="true">·</span>
              <span>Cinema 4K Ultra HD</span>
              <span aria-hidden="true">·</span>
              <span>60 FPS HDR Master</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-[1.15] text-balance">
              Haute Boudoir & Cinema Privado Latinoamericano
            </h1>

            <p className="text-base text-zinc-300 leading-relaxed max-w-xl">
              Un santuario privado dedicado a la elegancia y sensualidad latina. Producciones cinematográficas en 4K Ultra HD rodadas en villas privadas de Tulum, La Habana y Medellín, acompañadas de fotografía RAW de museo y streaming sin compresión.
            </p>

            {/* Creator signature kicker */}
            <div className="flex items-center gap-3 pt-1 text-xs text-zinc-300">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-orange-600 flex items-center justify-center font-bold text-white font-display text-sm shadow-md">
                VS
              </div>
              <div>
                <span className="font-semibold text-white">Valentina Sol</span>
                <span className="text-zinc-500 ml-1.5 flex items-center gap-1 inline-flex">
                  <MapPin className="w-3 h-3 text-orange-400" /> Tulum & Medellín
                </span>
              </div>
            </div>

            {/* Quick trust strip */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-zinc-400 pt-1">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Facturación Discreta en Tarjeta (FN-MEDIA-LUX)
              </span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Red CDN Ultra Rápida en 4K Sin Búfer
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onPlayFeatured}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 hover:from-orange-500 hover:to-amber-500 rounded-xl shadow-xl shadow-orange-950/40 transition-all hover:scale-[1.02] cursor-pointer whitespace-nowrap"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{isUnlocked ? 'Ver Edición Master 4K (29:40)' : 'Reproducir Preview en 4K'}</span>
              </button>

              {userSession.tier === 'free_preview' ? (
                <button
                  onClick={onOpenSubscribe}
                  className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-zinc-200 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Membresías VIP desde $14.99</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900/80 border border-amber-500/30 rounded-xl text-xs font-mono text-zinc-300">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Acceso VIP Activo ({userSession.tier.toUpperCase()})</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Featured Cinema Card Showcase */}
          <div className="lg:col-span-6">
            <div
              className="relative rounded-2xl p-1.5 bg-gradient-to-b from-amber-700/40 via-orange-900/20 to-zinc-950/90 shadow-2xl group cursor-pointer"
              onClick={onPlayFeatured}
            >
              <div className="rounded-xl overflow-hidden relative">
                <ArtworkThumbnail
                  item={featuredItem}
                  isUnlocked={true}
                  className="aspect-[16/10] sm:aspect-[16/9] w-full"
                />

                {/* Overlay info box */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex items-end justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono text-amber-400 tracking-wider uppercase block mb-1">
                      Estreno Destacado · Tulum Villa
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {featuredItem.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5 max-w-md">
                      {featuredItem.description}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-black/60 border border-white/10 text-xs font-mono text-zinc-300">
                      <Eye className="w-3.5 h-3.5 text-zinc-400" />
                      54.2k
                    </span>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-600 to-amber-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 ml-0.5 fill-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
