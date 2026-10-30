import React, { useState } from 'react';
import { ShieldAlert, Check, Flame } from 'lucide-react';

interface AgeVerificationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

export const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({
  isOpen,
  onConfirm,
}) => {
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  const handleExit = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-xl animate-fade-in">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-zinc-100">
        {/* Glow accent in top corner */}
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-gradient-to-tr from-orange-600/25 to-amber-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-950 to-amber-950 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-lg">
            <Flame className="w-6 h-6 fill-amber-400" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-semibold">
              Acceso Restringido 18+
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
              Fuego Noir · Verificación de Edad
            </h2>
          </div>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed mb-4">
          Este sitio exclusivo de membresía para adultos contiene fotografía boudoir de alta costura, producciones de cine sensual en 4K UHD y material multimedia reservado estrictamente para adultos con mayoría de edad legal.
        </p>

        <div className="p-3.5 bg-zinc-950/70 border border-zinc-800/80 rounded-xl text-xs text-zinc-400 space-y-1.5 mb-6">
          <p>• Debes tener al menos 18 años de edad (o la edad legal de tu país/jurisdicción).</p>
          <p>• La redistribución no autorizada o captura de pantalla está prohibida y protegida por marcas de agua forenses digitales.</p>
        </div>

        <label className="flex items-center gap-2.5 text-xs text-zinc-300 cursor-pointer mb-6 select-none">
          <div
            onClick={() => setRememberMe(!rememberMe)}
            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
              rememberMe ? 'bg-gradient-to-r from-orange-600 to-amber-600 border-amber-500 text-white' : 'border-zinc-700 bg-zinc-800'
            }`}
          >
            {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
          <span>Recordar mi verificación en este navegador</span>
        </label>

        <div className="flex flex-col-reverse sm:flex-row items-center gap-3">
          <button
            onClick={handleExit}
            className="w-full sm:w-1/3 py-2.5 px-4 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 rounded-xl border border-zinc-700/60 transition-colors whitespace-nowrap"
          >
            Salir (Soy Menor)
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:w-2/3 py-2.5 px-5 text-xs font-semibold text-white bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 hover:from-orange-500 hover:to-amber-500 rounded-xl transition-all shadow-lg shadow-orange-950/40 hover:shadow-orange-950/60 whitespace-nowrap"
          >
            Soy Mayor de 18 — Entrar a Fuego Noir
          </button>
        </div>
      </div>
    </div>
  );
};
