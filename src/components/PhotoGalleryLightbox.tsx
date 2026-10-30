import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut, Info, ShieldCheck, Lock } from 'lucide-react';
import { MediaItem, UserSession } from '../types';

interface PhotoGalleryLightboxProps {
  item: MediaItem;
  userSession: UserSession;
  onClose: () => void;
  onUnlock: () => void;
}

export const PhotoGalleryLightbox: React.FC<PhotoGalleryLightboxProps> = ({
  item,
  userSession,
  onClose,
  onUnlock,
}) => {
  const isUnlocked =
    userSession.tier === 'diamond' ||
    userSession.tier === 'vip' ||
    userSession.unlockedPPVIds.includes(item.id) ||
    (!item.isPPV && userSession.tier === 'club');

  const photos = item.galleryPhotos || [
    { id: '1', title: 'Haute Studio Plate I', resolution: '6144×4096', aspect: '4:3', accentColor: '#be123c', moodDescription: 'Direct strobe contour lighting with deep velvet shadows' },
    { id: '2', title: 'Silk Reflection Plate II', resolution: '6144×4096', aspect: '3:4', accentColor: '#9f1239', moodDescription: 'High gloss floor specular reflections and fluid drape' },
    { id: '3', title: 'Archival Portrait Plate III', resolution: '6144×4096', aspect: '4:3', accentColor: '#4c0519', moodDescription: 'Monochrome contrast study with fine silver grain' },
    { id: '4', title: 'Boudoir Twilight Plate IV', resolution: '6144×4096', aspect: '16:9', accentColor: '#881337', moodDescription: 'Golden hour amber sidelight through vintage French shutters' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showExif, setShowExif] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const activePhoto = photos[currentIndex];

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % photos.length);
    setZoomLevel(1);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + photos.length) % photos.length);
    setZoomLevel(1);
  };

  const handleDownload = () => {
    if (!isUnlocked) {
      onUnlock();
      return;
    }
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between overflow-hidden">
      {/* Top action bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-zinc-800 bg-zinc-950/90 z-20">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-semibold text-rose-500 uppercase tracking-wider">
            RAW Master Photo Set
          </span>
          <span className="text-zinc-600">·</span>
          <h2 className="text-sm sm:text-base font-semibold text-white tracking-tight truncate max-w-sm sm:max-w-md">
            {item.title} ({currentIndex + 1} of {photos.length})
          </h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
            <button
              onClick={() => setZoomLevel(prev => Math.max(1, prev - 0.25))}
              className="p-1.5 text-zinc-400 hover:text-white cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono px-2 text-zinc-300">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.25))}
              className="p-1.5 text-zinc-400 hover:text-white cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* EXIF info toggle */}
          <button
            onClick={() => setShowExif(!showExif)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              showExif ? 'bg-rose-950 border border-rose-500/50 text-rose-300' : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Camera Spec</span>
          </button>

          {/* RAW Download */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-medium text-white transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">{downloadSuccess ? 'Downloaded!' : 'Download RAW DNG'}</span>
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden select-none">
        
        {/* Navigation Arrow: Left */}
        <button
          onClick={handlePrev}
          className="absolute left-4 z-20 w-12 h-12 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/60 text-white flex items-center justify-center transition-all cursor-pointer shadow-2xl hover:scale-105"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Navigation Arrow: Right */}
        <button
          onClick={handleNext}
          className="absolute right-4 z-20 w-12 h-12 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/60 text-white flex items-center justify-center transition-all cursor-pointer shadow-2xl hover:scale-105"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Photo Display Canvas */}
        <div
          style={{ transform: `scale(${zoomLevel})` }}
          className="max-w-4xl w-full aspect-[4/3] bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800/90 shadow-2xl transition-transform duration-200 relative flex items-center justify-center"
        >
          {/* Aesthetic High-Res Master Plate Graphic */}
          <svg className="w-full h-full object-cover" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id={`photoGrad-${currentIndex}`} cx="45%" cy="40%" r="65%">
                <stop offset="0%" stopColor={activePhoto.accentColor} stopOpacity="0.5" />
                <stop offset="45%" stopColor="#18181b" stopOpacity="0.4" />
                <stop offset="90%" stopColor="#09090b" stopOpacity="0.95" />
              </radialGradient>
              <linearGradient id={`sweep-${currentIndex}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                <stop offset="50%" stopColor={activePhoto.accentColor} stopOpacity="0.2" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <rect width="1200" height="900" fill="#09090b" />
            <rect width="1200" height="900" fill={`url(#photoGrad-${currentIndex})`} />
            <path d="M 0,600 Q 300,350 700,550 T 1200,420 L 1200,900 L 0,900 Z" fill={`url(#sweep-${currentIndex})`} />
            <ellipse cx="600" cy="450" rx="350" ry="240" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
            <circle cx="600" cy="450" r="140" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="6 12" />
          </svg>

          {/* Watermark security overlay */}
          <div className="absolute bottom-4 right-4 pointer-events-none opacity-30 text-[11px] font-mono tracking-widest text-amber-200 uppercase">
            <span>FUEGO NOIR · {userSession.subscriberId} · ARCHIVAL RAW DNG</span>
          </div>

          {/* Locked state if user lacks access */}
          {!isUnlocked && (
            <div className="absolute inset-0 z-30 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-950 to-amber-950 border border-amber-500/40 flex items-center justify-center mb-3 text-amber-400">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display mb-2">Set Fotográfico en Formato RAW 6144×4096</h3>
              <p className="text-xs text-zinc-400 max-w-sm mb-5">
                Las descargas sin compresión y galerías sin censura están incluidas con los pases Miembro Fuego y VIP Oro.
              </p>
              <button
                onClick={onUnlock}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 rounded-xl shadow-lg shadow-orange-950/40 cursor-pointer"
              >
                Desbloquear Acceso VIP
              </button>
            </div>
          )}

          {/* Technical EXIF HUD overlay */}
          {showExif && (
            <div className="absolute top-4 left-4 z-20 bg-black/85 backdrop-blur-md border border-zinc-800 rounded-xl p-3.5 text-xs font-mono text-zinc-300 space-y-1.5 shadow-2xl max-w-xs">
              <div className="text-rose-400 font-bold border-b border-zinc-800 pb-1">
                HASSELBLAD H6D-100c ARCHIVAL SPEC
              </div>
              <div>Frame: <span className="text-white font-semibold">{activePhoto.title}</span></div>
              <div>Sensor Res: <span className="text-white font-semibold">100 Megapixel (11600 × 8700)</span></div>
              <div>Color Space: <span className="text-white font-semibold">16-bit Hasselblad RGB</span></div>
              <div>Lens: <span className="text-white font-semibold">HC 2.2/100mm Prime</span></div>
              <div>Aperture & ISO: <span className="text-emerald-400 font-semibold">f/2.8 · ISO 64 · 1/250s</span></div>
              <div className="text-[11px] text-zinc-400 pt-1 border-t border-zinc-800">
                {activePhoto.moodDescription}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="px-4 py-3 bg-zinc-950/95 border-t border-zinc-850 flex items-center justify-center gap-3 overflow-x-auto z-20">
        {photos.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => {
              setCurrentIndex(idx);
              setZoomLevel(1);
            }}
            className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer relative ${
              currentIndex === idx ? 'border-rose-500 scale-105 shadow-md shadow-rose-950' : 'border-zinc-800 opacity-60 hover:opacity-100'
            }`}
          >
            <div
              className="w-full h-full"
              style={{ backgroundColor: p.accentColor }}
            />
            <div className="absolute bottom-0.5 right-1 text-[9px] font-mono text-white/90">
              {idx + 1}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
