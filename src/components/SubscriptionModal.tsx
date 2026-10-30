import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles, AlertCircle, CreditCard, Clock, FileText, Flame } from 'lucide-react';
import { SubscriptionTier, UserSession } from '../types';
import { SUBSCRIPTION_TIERS, INITIAL_INVOICES } from '../data/mockData';

interface SubscriptionModalProps {
  isOpen: boolean;
  userSession: UserSession;
  onClose: () => void;
  onSelectTierToPay: (tier: SubscriptionTier, cycle: 'monthly' | 'annual') => void;
  onCancelSubscription: () => void;
  onPauseSubscription: () => void;
  onResumeSubscription: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  userSession,
  onClose,
  onSelectTierToPay,
  onCancelSubscription,
  onPauseSubscription,
  onResumeSubscription,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [activeTab, setActiveTab] = useState<'plans' | 'manage'>('plans');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  if (!isOpen) return null;

  const currentTierData = SUBSCRIPTION_TIERS.find(t => t.id === userSession.tier);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="w-full max-w-5xl bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden text-zinc-100 my-auto">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-600/15 to-amber-600/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Portal de Membresías & Acceso VIP Fuego Noir</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
              Selecciona tu Nivel de Acceso Privado
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Tab switch between Plans and Manage */}
            {userSession.tier !== 'free_preview' && (
              <div className="hidden sm:flex items-center p-1 bg-zinc-950 rounded-xl border border-zinc-800 text-xs">
                <button
                  onClick={() => setActiveTab('plans')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeTab === 'plans' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Cambiar Plan
                </button>
                <button
                  onClick={() => setActiveTab('manage')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeTab === 'manage' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Gestionar Suscripción
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab 1: Pricing Plans & Tiers Matrix */}
        {activeTab === 'plans' ? (
          <div className="mt-6 space-y-6">
            
            {/* Monthly / Annual Billing Toggle */}
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center p-1 bg-zinc-950 border border-zinc-800 rounded-xl">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    billingCycle === 'monthly' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Facturación Mensual
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                    billingCycle === 'annual' ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span>Pase Anual VIP</span>
                  <span className="text-[10px] font-mono bg-white/20 px-1.5 py-0.2 rounded text-white">Ahorra 25%</span>
                </button>
              </div>
            </div>

            {/* 3 Tier Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {SUBSCRIPTION_TIERS.map(tier => {
                const isCurrent = userSession.tier === tier.id;
                const price = billingCycle === 'monthly' ? tier.priceMonthly : +(tier.priceAnnual / 12).toFixed(2);

                return (
                  <div
                    key={tier.id}
                    className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 ${
                      tier.popular
                        ? 'bg-gradient-to-b from-zinc-800/95 via-zinc-900 to-zinc-950 border-2 border-amber-500 shadow-2xl shadow-orange-950/40'
                        : 'bg-zinc-950/70 border border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {/* Badge */}
                    {tier.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                        {tier.badge}
                      </div>
                    )}

                    <div>
                      {/* Tier Name & Tagline */}
                      <h3 className="text-xl font-bold font-display text-white tracking-tight">
                        {tier.name}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 min-h-[32px] leading-relaxed">
                        {tier.tagline}
                      </p>

                      {/* Pricing */}
                      <div className="my-5 pb-5 border-b border-zinc-800">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                            ${price}
                          </span>
                          <span className="text-xs text-zinc-400">/ mes</span>
                        </div>
                        {billingCycle === 'annual' && (
                          <p className="text-[11px] text-amber-400 font-mono mt-1">
                            Facturado anualmente a ${tier.priceAnnual} / año
                          </p>
                        )}
                      </div>

                      {/* Perk list */}
                      <ul className="space-y-2.5 text-xs text-zinc-300">
                        {tier.perks.map((perk, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <div className="mt-8 pt-4 border-t border-zinc-800/80">
                      {isCurrent ? (
                        <div className="w-full py-2.5 text-center text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded-xl">
                          Plan Activo Actualmente
                        </div>
                      ) : (
                        <button
                          onClick={() => onSelectTierToPay(tier, billingCycle)}
                          className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-lg ${
                            tier.popular
                              ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-orange-950/50 hover:scale-[1.02]'
                              : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                          }`}
                        >
                          {userSession.tier === 'free_preview' ? `Unirme a ${tier.name}` : `Cambiar a ${tier.name}`}
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Discreet Billing Notice */}
            <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Encriptación 256-bit TLS. Facturado discretamente como &ldquo;FN-MEDIA-LUX&rdquo; en estados bancarios.</span>
              </div>
              <div className="text-zinc-500 font-mono text-[11px]">
                Cancela o pausa cuando quieras en 1 clic
              </div>
            </div>

          </div>
        ) : (
          /* Tab 2: Subscription Lifecycle & Billing Management */
          <div className="mt-6 space-y-6">
            
            {/* Active Subscription Summary Card */}
            <div className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white font-display">
                      {currentTierData?.name || 'VIP Oro All-Access'}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium ${
                      userSession.subscriptionStatus === 'active'
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                        : userSession.subscriptionStatus === 'paused'
                        ? 'bg-amber-950/80 text-amber-400 border border-amber-500/30'
                        : 'bg-red-950/80 text-red-400 border border-red-500/30'
                    }`}>
                      {userSession.subscriptionStatus.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    ID de Suscriptor: <span className="font-mono text-zinc-300">{userSession.subscriberId}</span>
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs text-zinc-400">Próxima Renovación</div>
                  <div className="text-sm font-semibold text-white font-mono mt-0.5">
                    {userSession.renewalDate}
                  </div>
                </div>
              </div>

              {/* Payment Method on File */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span>Método de Pago: {userSession.savedPaymentMethod?.brand || 'Visa Signature'} ({userSession.savedPaymentMethod?.label || '•••• 9214'})</span>
                </div>
                <div className="text-zinc-400 font-mono">
                  Ciclo: {userSession.billingCycle.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Actions: Pause or Cancel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-zinc-950/60 rounded-xl border border-zinc-800/80 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    Pausar Membresía
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Congela temporalmente los cobros durante 30 a 90 días sin perder tu historial de favoritos, compras PPV o mensajes con Valentina.
                  </p>
                </div>
                <button
                  onClick={userSession.subscriptionStatus === 'paused' ? onResumeSubscription : onPauseSubscription}
                  className="mt-4 px-4 py-2 text-xs font-medium text-amber-300 bg-amber-950/50 hover:bg-amber-950 border border-amber-500/30 rounded-lg transition-colors cursor-pointer self-start"
                >
                  {userSession.subscriptionStatus === 'paused' ? 'Reanudar Membresía Ahora' : 'Pausar por 30 Días'}
                </button>
              </div>

              <div className="p-5 bg-zinc-950/60 rounded-xl border border-zinc-800/80 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    Cancelar Suscripción
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Puedes cancelar cuando quieras. Mantendrás acceso VIP total hasta el final de tu período actual pagado el {userSession.renewalDate}.
                  </p>
                </div>

                {showCancelConfirm ? (
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => {
                        onCancelSubscription();
                        setShowCancelConfirm(false);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg cursor-pointer"
                    >
                      Confirmar Cancelación
                    </button>
                    <button
                      onClick={() => setShowCancelConfirm(false)}
                      className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white cursor-pointer"
                    >
                      Mantener Plan
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowCancelConfirm(true)}
                    className="mt-4 px-4 py-2 text-xs font-medium text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-950/70 border border-red-500/30 rounded-lg transition-colors cursor-pointer self-start"
                  >
                    Cancelar Suscripción
                  </button>
                )}
              </div>
            </div>

            {/* Invoices and Billing Receipts */}
            <div className="p-5 bg-zinc-950/60 rounded-xl border border-zinc-800/80">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-zinc-400" />
                <span>Historial de Facturas y Comprobantes</span>
              </h4>
              <div className="divide-y divide-zinc-850 text-xs">
                {INITIAL_INVOICES.map(inv => (
                  <div key={inv.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-zinc-200">{inv.description}</div>
                      <div className="text-[11px] text-zinc-500 font-mono">{inv.date} · {inv.gateway}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-semibold text-white">${inv.amount.toFixed(2)}</div>
                      <span className="text-[10px] text-emerald-400 uppercase font-mono">Pagado (Descargar)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
