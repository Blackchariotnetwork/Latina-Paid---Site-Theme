import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Settings,
  Activity,
  X,
  RotateCcw,
  FastForward,
  Lock,
  Sparkles,
  Check,
  Tv,
} from 'lucide-react';
import { MediaItem, UserSession } from '../types';

interface VideoStreamingPlayerProps {
  item: MediaItem;
  userSession: UserSession;
  onClose: () => void;
  onUnlockPPV: (item: MediaItem) => void;
  onSelectAnotherVideo?: (item: MediaItem) => void;
  allVideos?: MediaItem[];
}

export const VideoStreamingPlayer: React.FC<VideoStreamingPlayerProps> = ({
  item,
  userSession,
  onClose,
  onUnlockPPV,
  onSelectAnotherVideo,
  allVideos = [],
}) => {
  const isUnlocked =
    userSession.tier === 'diamond' ||
    userSession.unlockedPPVIds.includes(item.id) ||
    (!item.isPPV && userSession.tier !== 'free_preview');

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(14); // seconds
  const [duration, setDuration] = useState(380); // seconds
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedResolution, setSelectedResolution] = useState<'4K' | '1440p' | '1080p' | '720p' | 'Auto'>('4K');
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [simulatedBitrate, setSimulatedBitrate] = useState(34.8);
  const [bufferHealth, setBufferHealth] = useState(28.4);
  const [activeChapter, setActiveChapter] = useState('01. Velvet Prelude');

  // Floating anti-piracy watermark coordinates to prevent leak rips
  const [watermarkPos, setWatermarkPos] = useState({ top: '15%', left: '20%' });

  useEffect(() => {
    // Periodically shift subtle watermark location to combat screen recorders
    const interval = setInterval(() => {
      const top = `${12 + Math.floor(Math.random() * 65)}%`;
      const left = `${10 + Math.floor(Math.random() * 70)}%`;
      setWatermarkPos({ top, left });

      // Slight natural bitrate fluctuation for realism
      setSimulatedBitrate(prev => +(prev + (Math.random() * 2 - 1)).toFixed(1));
      setBufferHealth(prev => Math.min(35, Math.max(18, +(prev + (Math.random() * 1.5 - 0.7)).toFixed(1))));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Timer loop when playing
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= duration) {
          setIsPlaying(false);
          return duration;
        }
        return prev + 1;
      });
    }, 1000 / playbackSpeed);

    return () => clearInterval(timer);
  }, [isPlaying, duration, playbackSpeed]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const resolutions: Array<'4K' | '1440p' | '1080p' | '720p' | 'Auto'> = [
    '4K',
    '1440p',
    '1080p',
    '720p',
    'Auto',
  ];

  const chapters = [
    { title: '01. Preludio del Atardecer', time: 0 },
    { title: '02. Suite de Seda y Cenote', time: 95 },
    { title: '03. Clímax Bajo la Luna', time: 210 },
    { title: '04. Coda Tropical Privada', time: 310 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto">
      {/* Top Header bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-zinc-800/80 bg-zinc-950/80 z-20">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-500">
            {item.resolution} High-Bitrate Stream
          </span>
          <span className="text-zinc-500">·</span>
          <h2 className="text-sm sm:text-base font-semibold text-white tracking-tight truncate max-w-md">
            {item.title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Toggle Diagnostics */}
          <button
            onClick={() => setShowDiagnostics(!showDiagnostics)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
              showDiagnostics
                ? 'bg-rose-950/90 border border-rose-500/50 text-rose-300'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Stream Telemetry</span>
          </button>

          {/* Close Player */}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Video Viewport & Controls Canvas */}
      <div className={`relative flex-1 flex items-center justify-center p-2 sm:p-6 transition-all ${isTheaterMode ? 'max-w-full' : 'max-w-6xl mx-auto w-full'}`}>
        <div className="relative w-full aspect-video bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800/80 group">
          
          {/* Simulated 4K Content Visual Screen */}
          <div className="absolute inset-0 select-none overflow-hidden bg-black flex items-center justify-center">
            {/* Animated Canvas Gradient Artwork mimicking cinematic video */}
            <div className="w-full h-full relative">
              <svg className="w-full h-full object-cover" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <radialGradient id="playerGrad" cx="50%" cy="45%" r="65%">
                    <stop offset="0%" stopColor="#881337" stopOpacity="0.55" />
                    <stop offset="45%" stopColor="#4c0519" stopOpacity="0.4" />
                    <stop offset="85%" stopColor="#09090b" stopOpacity="0.95" />
                  </radialGradient>
                  <linearGradient id="lightBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#fb7185" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <rect width="1920" height="1080" fill="#050507" />
                <rect width="1920" height="1080" fill="url(#playerGrad)" />
                <path d="M 0,720 Q 640,420 1280,680 T 1920,540 L 1920,1080 L 0,1080 Z" fill="url(#lightBeam)" />
                
                {/* Cinema letterbox bars */}
                <rect width="1920" height="70" fill="#000000" />
                <rect y="1010" width="1920" height="70" fill="#000000" />
              </svg>

              {/* Pulsing subtle ambient lighting to simulate moving video frames */}
              <div
                className={`absolute inset-0 bg-gradient-to-tr from-rose-950/20 via-transparent to-amber-950/20 mix-blend-screen pointer-events-none transition-opacity duration-1000 ${
                  isPlaying ? 'opacity-80 animate-pulse' : 'opacity-40'
                }`}
              />

              {/* Anti-Piracy Watermark with Subscriber ID */}
              <div
                style={{ top: watermarkPos.top, left: watermarkPos.left }}
                className="absolute transition-all duration-1000 select-none pointer-events-none opacity-20 text-[10px] font-mono tracking-widest text-zinc-100 uppercase"
              >
                <span>{userSession.subscriberId}</span> · <span>FUEGO-NOIR-SECURE</span> · <span>TULUM-CDN</span>
              </div>
            </div>
          </div>

          {/* Locked Overlay if user has no tier access */}
          {!isUnlocked && (
            <div className="absolute inset-0 z-30 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-950 to-amber-950 border border-amber-500/40 flex items-center justify-center mb-4 text-amber-400 shadow-2xl">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display mb-2">
                Contenido Restringido en Ultra Alta Definición 4K
              </h3>
              <p className="text-sm text-zinc-300 max-w-md mb-6 leading-relaxed">
                {item.isPPV
                  ? `Este estreno exclusivo es una producción Pay-Per-View disponible por $${item.ppvPrice?.toFixed(2)} USD (o gratuita con el Pase Patrón Diamante).`
                  : `Este estreno en 4K requiere una Membresía activa ${item.tierRequired.toUpperCase()}.`}
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onUnlockPPV(item)}
                  className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 rounded-xl shadow-xl shadow-orange-950/40 cursor-pointer whitespace-nowrap"
                >
                  {item.isPPV ? `Desbloquear PPV por $${item.ppvPrice?.toFixed(2)}` : 'Mejorar a VIP Oro All-Access'}
                </button>
              </div>
            </div>
          )}

          {/* Stream Diagnostics HUD */}
          {showDiagnostics && (
            <div className="absolute top-4 left-4 z-20 bg-black/85 backdrop-blur-md border border-zinc-800 rounded-xl p-3 text-[11px] font-mono text-zinc-300 space-y-1 shadow-2xl">
              <div className="flex items-center justify-between gap-4 text-amber-400 font-bold border-b border-zinc-800 pb-1 mb-1">
                <span>HLS / DASH STREAM TELEMETRY</span>
                <span className="text-emerald-400">ESTADO: ÓPTIMO</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                <div>Codec: <span className="text-white font-semibold">{item.codec}</span></div>
                <div>Bitrate: <span className="text-emerald-400 font-semibold">{simulatedBitrate} Mbps</span></div>
                <div>Resolución: <span className="text-white font-semibold">3840×2160 ({selectedResolution})</span></div>
                <div>Framerate: <span className="text-white font-semibold">{item.fps} FPS</span></div>
                <div>Audio Track: <span className="text-white font-semibold">{item.audioSpec}</span></div>
                <div>Buffer: <span className="text-cyan-400 font-semibold">{bufferHealth}s</span></div>
                <div>Color Profile: <span className="text-white font-semibold">BT.2020 10-bit HDR</span></div>
                <div>Edge CDN: <span className="text-amber-400 font-semibold">Medellín / Miami MIA-02</span></div>
              </div>
            </div>
          )}

          {/* Player Bottom Control Bar */}
          <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 opacity-95 group-hover:opacity-100 transition-opacity">
            
            {/* Scrubber timeline */}
            <div className="relative mb-3 flex items-center group/scrubber cursor-pointer">
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={e => setCurrentTime(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-rose-600 focus:outline-none"
              />
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-between text-white">
              
              {/* Left: Play/Pause, Rewind, Forward, Time, Chapter */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-9 h-9 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 ml-0.5 fill-white" />}
                </button>

                <button
                  onClick={() => setCurrentTime(prev => Math.max(0, prev - 10))}
                  title="Rewind 10s"
                  className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentTime(prev => Math.min(duration, prev + 10))}
                  title="Forward 10s"
                  className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                >
                  <FastForward className="w-4 h-4" />
                </button>

                {/* Volume slider */}
                <div className="flex items-center gap-2 group/vol">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                  >
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={e => {
                      setVolume(Number(e.target.value));
                      setIsMuted(false);
                    }}
                    className="w-16 h-1 bg-zinc-800 rounded appearance-none cursor-pointer accent-rose-500"
                  />
                </div>

                {/* Timestamps */}
                <div className="text-xs font-mono text-zinc-400 ml-2">
                  <span className="text-white">{formatTime(currentTime)}</span> / {formatTime(duration)}
                </div>
              </div>

              {/* Right: Chapter, Resolution Switcher, Speed, Theater Mode, Fullscreen */}
              <div className="flex items-center gap-2.5">
                
                {/* Chapter selector */}
                <select
                  value={activeChapter}
                  onChange={e => {
                    const ch = chapters.find(c => c.title === e.target.value);
                    if (ch) {
                      setActiveChapter(ch.title);
                      setCurrentTime(ch.time);
                    }
                  }}
                  className="hidden md:block bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 rounded-lg px-2.5 py-1 focus:outline-none cursor-pointer"
                >
                  {chapters.map(c => (
                    <option key={c.title} value={c.title}>
                      {c.title} ({formatTime(c.time)})
                    </option>
                  ))}
                </select>

                {/* Resolution selector dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs font-mono font-medium text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                  >
                    <span>{selectedResolution}</span>
                    <Settings className="w-3.5 h-3.5 text-zinc-400" />
                  </button>

                  {/* Settings modal popup */}
                  {showSettingsMenu && (
                    <div className="absolute bottom-10 right-0 w-44 bg-zinc-900 border border-zinc-800 rounded-xl p-2 shadow-2xl z-30 text-xs">
                      <div className="text-[10px] font-mono uppercase text-zinc-500 px-2 py-1">Resolution</div>
                      {resolutions.map(res => (
                        <button
                          key={res}
                          onClick={() => {
                            setSelectedResolution(res);
                            setShowSettingsMenu(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left cursor-pointer transition-colors ${
                            selectedResolution === res ? 'bg-rose-950/80 text-rose-400' : 'text-zinc-300 hover:bg-zinc-800'
                          }`}
                        >
                          <span>{res === '4K' ? '4K Ultra HD (2160p)' : res}</span>
                          {selectedResolution === res && <Check className="w-3.5 h-3.5" />}
                        </button>
                      ))}

                      <div className="border-t border-zinc-800 my-1 pt-1">
                        <div className="text-[10px] font-mono uppercase text-zinc-500 px-2 py-1">Speed</div>
                        <div className="grid grid-cols-4 gap-1 px-1">
                          {[0.75, 1, 1.25, 1.5].map(speed => (
                            <button
                              key={speed}
                              onClick={() => setPlaybackSpeed(speed)}
                              className={`py-1 rounded text-center cursor-pointer ${
                                playbackSpeed === speed ? 'bg-rose-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                              }`}
                            >
                              {speed}x
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Theater Mode toggle */}
                <button
                  onClick={() => setIsTheaterMode(!isTheaterMode)}
                  title={isTheaterMode ? 'Standard View' : 'Theater View'}
                  className="hidden sm:flex p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
                >
                  <Tv className="w-4 h-4" />
                </button>

                {/* Fullscreen */}
                <button
                  onClick={() => {
                    const el = document.documentElement;
                    if (!document.fullscreenElement) {
                      el.requestFullscreen?.();
                    } else {
                      document.exitFullscreen?.();
                    }
                  }}
                  className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Video Details & Recommendations below */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 border-t border-zinc-900">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="text-rose-400 font-semibold">{item.resolution}</span>
              <span>·</span>
              <span>Released {item.releaseDate}</span>
              <span>·</span>
              <span>{item.viewsCount.toLocaleString()} views</span>
              <span>·</span>
              <span>{item.likesCount.toLocaleString()} likes</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>
            <p className="text-sm text-zinc-300 leading-relaxed">{item.description}</p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {item.tags.map(t => (
                <span key={t} className="text-xs text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Right sidebar: More from the Vault */}
          <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-xl p-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
              Up Next in Vault
            </h4>
            <div className="space-y-3">
              {allVideos.filter(v => v.id !== item.id).slice(0, 3).map(rec => (
                <div
                  key={rec.id}
                  onClick={() => onSelectAnotherVideo?.(rec)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800/80 cursor-pointer transition-colors group"
                >
                  <div className="w-20 aspect-video rounded bg-zinc-950 shrink-0 overflow-hidden relative border border-zinc-800">
                    <div className="absolute inset-0 bg-gradient-to-tr from-rose-950 to-zinc-900" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-white/80 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate group-hover:text-rose-400 transition-colors">
                      {rec.title}
                    </p>
                    <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                      {rec.duration || `${rec.photoCount} Photos`} · {rec.resolution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
