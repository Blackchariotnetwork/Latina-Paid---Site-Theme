import React, { useState } from 'react';
import {
  Grid,
  Columns,
  List,
  Search,
  CheckCircle2,
  Heart,
  Flame,
} from 'lucide-react';
import { MediaItem, UserSession, GalleryLayoutMode } from '../types';
import { ArtworkThumbnail } from './ArtworkThumbnail';

interface ContentGalleryProps {
  items: MediaItem[];
  userSession: UserSession;
  onSelectItem: (item: MediaItem) => void;
  onUnlockPPV: (item: MediaItem) => void;
  onOpenSubscribe: () => void;
  layoutMode: GalleryLayoutMode;
  onChangeLayout: (mode: GalleryLayoutMode) => void;
}

export const ContentGallery: React.FC<ContentGalleryProps> = ({
  items,
  userSession,
  onSelectItem,
  onUnlockPPV,
  onOpenSubscribe,
  layoutMode,
  onChangeLayout,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'views' | 'resolution'>('newest');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isItemUnlocked = (item: MediaItem) => {
    if (userSession.tier === 'diamond') return true;
    if (userSession.unlockedPPVIds.includes(item.id)) return true;
    if (item.isPPV) return false;
    if (userSession.tier === 'vip') return true;
    if (userSession.tier === 'club' && (item.tierRequired === 'club' || item.tierRequired === 'free_preview')) return true;
    return false;
  };

  // Filter items
  const filteredItems = items
    .filter(item => {
      // Category filter
      if (selectedCategory === 'video' && item.type !== 'video' && item.type !== 'bts' && item.type !== 'livestream') return false;
      if (selectedCategory === 'gallery' && item.type !== 'gallery') return false;
      if (selectedCategory === 'ppv' && !item.isPPV) return false;
      if (selectedCategory === 'unlocked' && !isItemUnlocked(item)) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesTags) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'views') return b.viewsCount - a.viewsCount;
      if (sortBy === 'resolution') return b.fps - a.fps;
      return 0; // default newest
    });

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Gallery Controls Header: Category Tabs + Search + Layout Switcher */}
      <div className="flex flex-col gap-5 mb-8">
        
        {/* Row 1: Section Title & Layout Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-amber-500 mb-1">
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              <span>Colección Exclusiva Valentina Sol</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
              Bóvedas & Archivos Privados
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Selecciona cualquier producción para iniciar el reproductor cinema 4K adaptativo o la galería RAW sin compresión.
            </p>
          </div>

          {/* Interactive Layout Switcher (Button tabs) */}
          <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => onChangeLayout('grid-3')}
              title="Cuadrícula Cinema 3 Columnas"
              className={`p-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                layoutMode === 'grid-3' ? 'bg-zinc-800 text-amber-400 shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onChangeLayout('grid-2')}
              title="Vista Ampliada 2 Columnas"
              className={`p-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                layoutMode === 'grid-2' ? 'bg-zinc-800 text-amber-400 shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Columns className="w-4 h-4" />
            </button>
            <button
              onClick={() => onChangeLayout('compact')}
              title="Lista Detallada con Especificaciones"
              className={`p-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                layoutMode === 'compact' ? 'bg-zinc-800 text-amber-400 shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Row 2: Category Filter Tabs & Live Search Box */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-zinc-900">
          
          {/* Functional Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'Todos los Estrenos' },
              { id: 'video', label: 'Cinema 4K UHD' },
              { id: 'gallery', label: 'Sets de Fotos RAW' },
              { id: 'ppv', label: 'Estrenos PPV' },
              { id: 'unlocked', label: 'Desbloqueados por Mí' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm shadow-orange-950 font-semibold'
                    : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar sets, Tulum, La Habana..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-900/90 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/80 transition-colors"
              />
            </div>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="newest">Más Recientes</option>
              <option value="views">Más Populares</option>
              <option value="resolution">Mayor Framerate (60fps)</option>
            </select>
          </div>

        </div>
      </div>

      {/* Gallery Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="py-20 text-center bg-zinc-900/40 rounded-2xl border border-zinc-800/80 p-8">
          <p className="text-base font-semibold text-zinc-300">No se encontraron producciones con este filtro</p>
          <p className="text-xs text-zinc-500 mt-1">Prueba cambiando el término de búsqueda o la categoría.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs text-white rounded-lg transition-colors cursor-pointer"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : layoutMode === 'compact' ? (
        /* Compact List View with Detailed Technical Specs */
        <div className="divide-y divide-zinc-800/80 border border-zinc-800/80 rounded-2xl overflow-hidden bg-zinc-900/40">
          {filteredItems.map(item => {
            const unlocked = isItemUnlocked(item);
            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-800/40 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-24 sm:w-32 aspect-video rounded-lg overflow-hidden shrink-0 relative">
                    <ArtworkThumbnail item={item} isUnlocked={unlocked} showBadges={false} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                      <span className="text-orange-400 font-semibold">{item.resolution}</span>
                      <span>·</span>
                      <span>{item.type.toUpperCase()}</span>
                      <span>·</span>
                      <span>{item.duration || `${item.photoCount} Fotos RAW`}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white truncate group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-1 max-w-xl mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-mono text-zinc-300">
                      {unlocked ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Acceso Completo
                        </span>
                      ) : item.isPPV ? (
                        <span className="text-orange-400 font-bold">PPV ${item.ppvPrice?.toFixed(2)}</span>
                      ) : (
                        <span className="text-amber-400 uppercase">Pase {item.tierRequired}</span>
                      )}
                    </div>
                    <div className="text-[11px] text-zinc-500 font-mono">
                      {item.bitrate}
                    </div>
                  </div>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      if (unlocked) {
                        onSelectItem(item);
                      } else if (item.isPPV) {
                        onUnlockPPV(item);
                      } else {
                        onOpenSubscribe();
                      }
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      unlocked
                        ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
                        : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold'
                    }`}
                  >
                    {unlocked ? 'Reproducir' : item.isPPV ? `Desbloquear ($${item.ppvPrice?.toFixed(2)})` : 'Mejorar Pase'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Grid Views: 2-column or 3-column */
        <div
          className={`grid gap-6 ${
            layoutMode === 'grid-2'
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filteredItems.map(item => {
            const unlocked = isItemUnlocked(item);
            const isFav = !!favorites[item.id];

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group flex flex-col bg-zinc-900/60 hover:bg-zinc-900/95 rounded-2xl overflow-hidden border border-zinc-800 hover:border-amber-700/50 transition-all duration-200 cursor-pointer shadow-lg hover:-translate-y-0.5"
              >
                {/* Media Image Thumbnail */}
                <div className="relative">
                  <ArtworkThumbnail item={item} isUnlocked={unlocked} />

                  {/* Favorite Like button on thumbnail */}
                  <button
                    onClick={e => toggleFavorite(item.id, e)}
                    className="absolute bottom-2.5 left-2.5 z-10 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-zinc-300 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-orange-500 text-orange-500' : ''}`} />
                  </button>
                </div>

                {/* Card Content & Metadata */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Quiet metadata line */}
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1.5">
                      <span className="text-amber-400">{item.type.toUpperCase()}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.releaseDate}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.viewsCount.toLocaleString()} vistas</span>
                    </div>

                    <h3 className="text-base font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Footer Action */}
                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-400">
                      {item.bitrate}
                    </span>

                    {unlocked ? (
                      <span className="text-xs font-semibold text-amber-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Ver Ahora →
                      </span>
                    ) : item.isPPV ? (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onUnlockPPV(item);
                        }}
                        className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 rounded-lg shadow-sm transition-colors cursor-pointer"
                      >
                        Desbloquear PPV ${item.ppvPrice?.toFixed(2)}
                      </button>
                    ) : (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onOpenSubscribe();
                        }}
                        className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 rounded-lg shadow-sm transition-colors cursor-pointer"
                      >
                        Unirse {item.tierRequired.toUpperCase()}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};
