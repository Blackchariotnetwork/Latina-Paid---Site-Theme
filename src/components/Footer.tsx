import React from 'react';
import { Shield, Lock, Flame } from 'lucide-react';

interface FooterProps {
  onOpenSubscribe: () => void;
  onOpenAgeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSubscribe, onOpenAgeModal }) => {
  return (
    <footer className="mt-20 border-t border-zinc-900 bg-zinc-950 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Top footer row: Brand & links */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-amber-600 to-orange-600 flex items-center justify-center text-white">
                <Flame className="w-3.5 h-3.5 fill-white" />
              </div>
              <span className="text-lg font-bold font-display text-white tracking-wider">
                FUEGO NOIR PRIVÉ
              </span>
            </div>
            <p className="text-zinc-500 text-xs mt-1.5 max-w-md">
              Plataforma y tema exclusivo de paysite para creadoras latinas de alta gama. Streaming 4K Ultra HD sin compresión y total discreción bancaria.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400">
            <button onClick={onOpenSubscribe} className="hover:text-amber-400 transition-colors cursor-pointer">
              Membresías VIP
            </button>
            <button onClick={onOpenAgeModal} className="hover:text-amber-400 transition-colors cursor-pointer">
              Verificación 18+
            </button>
            <span className="text-zinc-700">|</span>
            <span className="text-zinc-500 font-mono">Concepto en Tarjeta: FN-MEDIA-LUX</span>
          </div>
        </div>

        {/* 18 U.S.C. 2257 Compliance Statement (Mandatory legal compliance for adult platforms) */}
        <div className="p-4 bg-zinc-900/40 rounded-xl border border-zinc-800/80 text-[11px] leading-relaxed text-zinc-500 space-y-1.5">
          <div className="flex items-center gap-2 text-zinc-400 font-mono font-semibold uppercase">
            <Shield className="w-3.5 h-3.5 text-amber-500" />
            <span>18 U.S.C. § 2257 Record-Keeping Compliance Statement / Declaración de Cumplimiento</span>
          </div>
          <p>
            All models, actors, and other persons depicted on this website were at least 18 years of age at the time of creation. Records required pursuant to 18 U.S.C. 2257 and 28 C.F.R. Part 75 are maintained by the custodian of records for this domain.
          </p>
          <p className="text-zinc-600">
            Todos los modelos y creadores participantes en estas producciones contaban con mayoría de edad legal comprobada al momento de la filmación.
          </p>
        </div>

        {/* Quiet copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 pt-2">
          <div>
            © {new Date().getFullYear()} Fuego Noir Media Group S.A. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400">
              <Lock className="w-3 h-3" /> Pasarela Encriptada 256-Bit TLS PCI-DSS
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
