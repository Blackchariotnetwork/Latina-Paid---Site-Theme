import React, { useState } from 'react';
import {
  X,
  Sliders,
  DollarSign,
  Users,
  Eye,
  Plus,
  Shield,
  Layers,
  Sparkles,
  TrendingUp,
  UploadCloud,
  Check,
  Flame,
} from 'lucide-react';
import { ThemeConfig, ThemeAccentColor, UserSession } from '../types';

interface CreatorStudioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  themeConfig: ThemeConfig;
  onChangeThemeConfig: (config: Partial<ThemeConfig>) => void;
  currentSession: UserSession;
  onSwitchSession: (roleKey: 'guest' | 'vip' | 'creator') => void;
  onPublishMockItem: (newItem: { title: string; type: 'video' | 'gallery'; price: number; resolution: string }) => void;
}

export const CreatorStudioDrawer: React.FC<CreatorStudioDrawerProps> = ({
  isOpen,
  onClose,
  themeConfig,
  onChangeThemeConfig,
  currentSession,
  onSwitchSession,
  onPublishMockItem,
}) => {
  const [activeTab, setActiveTab] = useState<'theme' | 'analytics' | 'publish'>('theme');
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'video' | 'gallery'>('video');
  const [newPrice, setNewPrice] = useState(19.99);
  const [publishSuccess, setPublishSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onPublishMockItem({
      title: newTitle,
      type: newType,
      price: newPrice,
      resolution: newType === 'video' ? '4K HDR 60fps' : '4K UHD RAW',
    });
    setPublishSuccess(true);
    setTimeout(() => {
      setPublishSuccess(false);
      setNewTitle('');
    }, 2000);
  };

  const accentOptions: { id: ThemeAccentColor; label: string; color: string }[] = [
    { id: 'fuego', label: 'Fuego Terracota', color: '#ea580c' },
    { id: 'oro', label: 'Oro 24K Ámbar', color: '#f59e0b' },
    { id: 'esmeralda', label: 'Esmeralda Caribe', color: '#10b981' },
    { id: 'habano', label: 'Habano Bronce', color: '#c2410c' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-zinc-900 border-l border-zinc-800 h-full flex flex-col justify-between shadow-2xl text-zinc-100 overflow-y-auto">
        
        {/* Header */}
        <div>
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Flame className="w-4 h-4 fill-orange-500" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-display text-white">Estudio Valentina Sol & Personalización</h3>
                <span className="text-[11px] text-zinc-400">Control de tema, bóvedas e ingresos</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Persona Switcher Strip */}
          <div className="p-4 bg-zinc-950/70 border-b border-zinc-800">
            <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">
              Probar Vista de Usuario:
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => onSwitchSession('guest')}
                className={`py-1.5 px-2 rounded-lg transition-colors cursor-pointer border ${
                  currentSession.role === 'guest'
                    ? 'bg-orange-950 border-orange-500/50 text-orange-300 font-semibold'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                Visitante (Bloqueado)
              </button>
              <button
                type="button"
                onClick={() => onSwitchSession('vip')}
                className={`py-1.5 px-2 rounded-lg transition-colors cursor-pointer border ${
                  currentSession.role === 'subscriber'
                    ? 'bg-amber-950 border-amber-500/50 text-amber-300 font-semibold'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                Carlos (VIP Oro)
              </button>
              <button
                type="button"
                onClick={() => onSwitchSession('creator')}
                className={`py-1.5 px-2 rounded-lg transition-colors cursor-pointer border ${
                  currentSession.role === 'creator'
                    ? 'bg-gradient-to-r from-orange-950 to-amber-950 border-amber-500/70 text-amber-200 font-semibold'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                Valentina (Admin)
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-zinc-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('theme')}
              className={`flex-1 py-3 text-center transition-colors cursor-pointer border-b-2 ${
                activeTab === 'theme' ? 'border-amber-500 text-white bg-zinc-850/40' : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              Estilo del Tema
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 py-3 text-center transition-colors cursor-pointer border-b-2 ${
                activeTab === 'analytics' ? 'border-amber-500 text-white bg-zinc-850/40' : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              Ingresos MRR
            </button>
            <button
              onClick={() => setActiveTab('publish')}
              className={`flex-1 py-3 text-center transition-colors cursor-pointer border-b-2 ${
                activeTab === 'publish' ? 'border-amber-500 text-white bg-zinc-850/40' : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              Publicar Estreno
            </button>
          </div>

          {/* Tab 1: Theme Styling */}
          {activeTab === 'theme' && (
            <div className="p-5 space-y-6">
              
              {/* Palette Accent */}
              <div>
                <label className="text-xs font-semibold text-zinc-200 block mb-2.5">
                  Paleta de Acentos Latinos
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {accentOptions.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => onChangeThemeConfig({ accent: opt.id })}
                      className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-xs transition-all cursor-pointer ${
                        themeConfig.accent === opt.id
                          ? 'border-amber-400 bg-zinc-800 text-white shadow-md'
                          : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: opt.color }} />
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Blur Level for Locked Content */}
              <div>
                <label className="text-xs font-semibold text-zinc-200 block mb-2">
                  Intensidad de Desenfoque en Teasers
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {(['subtle', 'medium', 'heavy'] as const).map(b => (
                    <button
                      key={b}
                      onClick={() => onChangeThemeConfig({ blurStrength: b })}
                      className={`py-2 rounded-xl border text-center capitalize cursor-pointer transition-colors ${
                        themeConfig.blurStrength === b
                          ? 'bg-zinc-800 border-amber-500 text-amber-300'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      {b === 'subtle' ? 'Sutil' : b === 'medium' ? 'Medio' : 'Intenso'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Anti-Piracy Watermark Configuration */}
              <div className="space-y-3 pt-2 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-200">Marca de Agua Anti-Filtraciones (DRM)</span>
                  <input
                    type="checkbox"
                    checked={themeConfig.watermarkEnabled}
                    onChange={e => onChangeThemeConfig({ watermarkEnabled: e.target.checked })}
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                  />
                </div>
                {themeConfig.watermarkEnabled && (
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase">Texto de Marca Forense</label>
                    <input
                      type="text"
                      value={themeConfig.watermarkText}
                      onChange={e => onChangeThemeConfig({ watermarkText: e.target.value })}
                      className="w-full mt-1 px-3 py-2 text-xs font-mono bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    />
                    <p className="text-[10px] text-zinc-500 mt-1">
                      Se superpone sutilmente sobre los streams en 4K para identificar capturas no autorizadas.
                    </p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Tab 2: MRR & Paysite Analytics */}
          {activeTab === 'analytics' && (
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                  <div className="text-[10px] font-mono uppercase text-zinc-400">Ingresos Mensuales (MRR)</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">$48,650</div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">+18.4% este mes</div>
                </div>
                <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                  <div className="text-[10px] font-mono uppercase text-zinc-400">Miembros VIP Activos</div>
                  <div className="text-2xl font-bold font-mono text-white mt-1">1,680</div>
                  <div className="text-[11px] text-emerald-400 mt-0.5">94.2% Retención</div>
                </div>
              </div>

              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-3">
                <div className="text-xs font-semibold text-white">Desglose de Ingresos</div>
                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <div className="flex justify-between text-zinc-300 mb-1">
                      <span>Suscripciones VIP Oro</span>
                      <span>$32,400 (66.5%)</span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '66.5%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-zinc-300 mb-1">
                      <span>Estrenos Pay-Per-View (PPV)</span>
                      <span>$11,360 (23.4%)</span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '23.4%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-zinc-300 mb-1">
                      <span>Propinas VIP en Mensajes</span>
                      <span>$4,890 (10.1%)</span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: '10.1%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
                <span>Liquidación a Billetera:</span>
                <span className="text-emerald-400 font-mono">Próximo Pago: 1 Nov 2026</span>
              </div>
            </div>
          )}

          {/* Tab 3: Publish New Mock Release */}
          {activeTab === 'publish' && (
            <form onSubmit={handlePublish} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-200 block mb-1">Título de la Producción</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Tulum Cenote Secreto — Master 4K"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-200 block mb-1">Formato</label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="video">Cinema 4K (60fps HDR)</option>
                    <option value="gallery">Set de Fotos RAW (6144×4096)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-200 block mb-1">Precio PPV ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={newPrice}
                    onChange={e => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-mono bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-xs font-semibold text-white rounded-xl shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {publishSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>¡Publicado en la Bóveda!</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" />
                    <span>Publicar Estreno Privado</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 text-[11px] text-zinc-500 text-center font-mono">
          Fuego Noir Latina Paysite Engine v3.4 · Edición Privada
        </div>

      </div>
    </div>
  );
};
