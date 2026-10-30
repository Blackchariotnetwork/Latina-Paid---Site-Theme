import React, { useState } from 'react';
import {
  X,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Copy,
  Check,
  QrCode,
  DollarSign,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Flame,
} from 'lucide-react';
import { SubscriptionTier, MediaItem, PaymentGatewayType } from '../types';

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  tierItem?: SubscriptionTier;
  billingCycle?: 'monthly' | 'annual';
  ppvItem?: MediaItem;
  isTipJar?: boolean;
  onPaymentSuccess: (details: {
    gateway: string;
    amount: number;
    description: string;
    tierId?: string;
    ppvId?: string;
  }) => void;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  isOpen,
  onClose,
  tierItem,
  billingCycle = 'monthly',
  ppvItem,
  isTipJar = false,
  onPaymentSuccess,
}) => {
  const [selectedGateway, setSelectedGateway] = useState<PaymentGatewayType>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedCrypto, setCopiedCrypto] = useState(false);
  const [cryptoCurrency, setCryptoCurrency] = useState<'BTC' | 'ETH' | 'USDT'>('USDT');

  // Tip jar state
  const [tipAmount, setTipAmount] = useState<number>(25);
  const [tipMessage, setTipMessage] = useState<string>('¡Increíble estreno en Tulum, Valentina! Sigue con este arte tan bello.');

  // Form states
  const [cardNumber, setCardNumber] = useState('4532 8920 1928 9214');
  const [cardExp, setCardExp] = useState('09/28');
  const [cardCvv, setCardCvv] = useState('841');
  const [cardName, setCardName] = useState('Carlos Mendoza');

  if (!isOpen) return null;

  // Calculate pricing
  const calculateTotal = () => {
    if (isTipJar) return tipAmount;
    if (ppvItem) return ppvItem.ppvPrice || 19.99;
    if (tierItem) {
      return billingCycle === 'annual' ? tierItem.priceAnnual : tierItem.priceMonthly;
    }
    return 29.99;
  };

  const totalAmount = calculateTotal();

  const handleCopyCrypto = () => {
    setCopiedCrypto(true);
    setTimeout(() => setCopiedCrypto(false), 2000);
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onPaymentSuccess({
          gateway:
            selectedGateway === 'card'
              ? 'Tarjeta de Crédito (Visa •••• 9214)'
              : selectedGateway === 'crypto'
              ? `Cripto (${cryptoCurrency} Web3)`
              : selectedGateway.toUpperCase(),
          amount: totalAmount,
          description: isTipJar
            ? `Propina VIP a Valentina ($${totalAmount})`
            : ppvItem
            ? `Desbloqueo PPV: ${ppvItem.title}`
            : `${tierItem?.name || 'VIP Oro'} (${billingCycle})`,
          tierId: tierItem?.id,
          ppvId: ppvItem?.id,
        });
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-zinc-100 my-auto">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-r from-orange-600/15 to-amber-600/15 rounded-full blur-[80px] pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-950 to-amber-950 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                Pasarela de Pago Encriptada 256-bit
              </span>
              <h3 className="text-lg font-bold font-display text-white">
                {isTipJar
                  ? 'Enviar Propina VIP a Valentina'
                  : ppvItem
                  ? 'Desbloquear Estreno Pay-Per-View'
                  : `Suscripción a ${tierItem?.name || 'VIP Oro'}`}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          /* Payment Successful View */
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold font-display text-white">
              ¡Pago Confirmado y Acceso Desbloqueado!
            </h4>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Tu transacción ha sido procesada de manera segura. Tus permisos y streamings en 4K se han activado de inmediato.
            </p>
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300 max-w-xs mx-auto">
              <div>Total: <span className="text-white font-bold">${totalAmount.toFixed(2)} USD</span></div>
              <div className="text-emerald-400 mt-1">Comprobante ID: #FN-TX-2026-7841</div>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div className="mt-5 space-y-5">
            
            {/* Order Summary Strip */}
            <div className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-800/80 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">
                  {isTipJar
                    ? 'Propina de Admiración a Valentina Sol'
                    : ppvItem
                    ? ppvItem.title
                    : `${tierItem?.name} (${billingCycle.toUpperCase()})`}
                </div>
                <div className="text-[11px] text-zinc-400 mt-0.5">
                  Acceso Inmediato · Pipeline 4K UHD 60fps Activado
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-bold font-mono text-white">
                  ${totalAmount.toFixed(2)}
                </div>
                <div className="text-[10px] text-zinc-500">Impuestos Incluidos</div>
              </div>
            </div>

            {/* If Tip Jar: Custom Amount Selection */}
            {isTipJar && (
              <div className="space-y-3">
                <label className="text-xs font-medium text-zinc-300">Seleccionar Monto de Propina</label>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 25, 50, 100].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTipAmount(amt)}
                      className={`py-2 rounded-xl text-xs font-mono font-semibold transition-colors cursor-pointer ${
                        tipAmount === amt
                          ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md'
                          : 'bg-zinc-950 text-zinc-300 border border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      ${amt} USD
                    </button>
                  ))}
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-300 block mb-1">Mensaje Privado para Valentina</label>
                  <input
                    type="text"
                    value={tipMessage}
                    onChange={e => setTipMessage(e.target.value)}
                    placeholder="Escribe una dedicatoria personal..."
                    className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            )}

            {/* Gateway Selector Tabs */}
            <div>
              <label className="text-xs font-medium text-zinc-300 block mb-2">
                Selecciona la Pasarela de Pago
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'card' as PaymentGatewayType, label: 'Tarjeta Crédito/Débito', icon: CreditCard },
                  { id: 'crypto' as PaymentGatewayType, label: 'Cripto (Web3)', icon: QrCode },
                  { id: 'ccbill' as PaymentGatewayType, label: 'CCBill Direct', icon: ShieldCheck },
                ].map(gw => {
                  const Icon = gw.icon;
                  return (
                    <button
                      key={gw.id}
                      type="button"
                      onClick={() => setSelectedGateway(gw.id)}
                      className={`p-2.5 rounded-xl flex flex-col items-center gap-1.5 text-xs font-medium transition-all cursor-pointer border ${
                        selectedGateway === gw.id
                          ? 'bg-amber-950/40 border-amber-500/80 text-amber-300 shadow-sm'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{gw.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Gateway Specific Inputs */}
            {selectedGateway === 'card' && (
              <div className="space-y-3 p-4 bg-zinc-950/70 rounded-2xl border border-zinc-800/80">
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 uppercase">Nombre en la Tarjeta</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={e => setCardName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-zinc-400 uppercase">Número de Tarjeta</label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-mono text-zinc-400">
                      <span>VISA / MASTERCARD</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase">Expiración (MM/AA)</label>
                    <input
                      type="text"
                      value={cardExp}
                      onChange={e => setCardExp(e.target.value)}
                      className="w-full mt-1 px-3 py-2 text-xs font-mono bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase">CVV / Código de Seguridad</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={e => setCardCvv(e.target.value)}
                      className="w-full mt-1 px-3 py-2 text-xs font-mono bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Discreet statement descriptor note */}
                <div className="text-[11px] text-zinc-400 pt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Concepto en tu extracto: <strong className="text-zinc-200">FN-MEDIA-LUX</strong> (total confidencialidad)</span>
                </div>
              </div>
            )}

            {selectedGateway === 'crypto' && (
              <div className="p-4 bg-zinc-950/70 rounded-2xl border border-zinc-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-300">Moneda Cripto:</span>
                  <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800 text-[11px] font-mono">
                    {(['USDT', 'BTC', 'ETH'] as const).map(coin => (
                      <button
                        key={coin}
                        type="button"
                        onClick={() => setCryptoCurrency(coin)}
                        className={`px-2.5 py-1 rounded cursor-pointer ${
                          cryptoCurrency === coin ? 'bg-amber-600 text-white font-bold' : 'text-zinc-400'
                        }`}
                      >
                        {coin}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mock QR and deposit address */}
                <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">
                      Billetera {cryptoCurrency} (Red TRC20 / Polygon)
                    </div>
                    <div className="text-xs font-mono text-amber-200 truncate mt-0.5">
                      0x9F4a...72E81c0B
                    </div>
                  </div>
                  <button
                    onClick={handleCopyCrypto}
                    className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    {copiedCrypto ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCrypto ? 'Copiada' : 'Copiar'}</span>
                  </button>
                </div>

                <div className="text-[11px] text-zinc-400 flex items-center justify-between">
                  <span>Confirmación en Blockchain:</span>
                  <span className="text-emerald-400 font-mono">Detección instantánea 0-conf</span>
                </div>
              </div>
            )}

            {selectedGateway === 'ccbill' && (
              <div className="p-4 bg-zinc-950/70 rounded-2xl border border-zinc-800/80 text-xs text-zinc-300 space-y-2">
                <div className="font-semibold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Procesador Seguro Internacional CCBill</span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Completarás esta transacción mediante la pasarela segura PCI-DSS Nivel 1 de CCBill. Tus datos bancarios no se almacenan en servidores locales.
                </p>
                <div className="text-[11px] font-mono text-zinc-500 pt-1">
                  Acepta: Visa, Mastercard, JCB, Tarjetas Internacionales de América Latina
                </div>
              </div>
            )}

            {/* Submit button */}
            <button
              onClick={handleProcessPayment}
              disabled={isProcessing}
              className="w-full py-3 px-5 text-sm font-semibold text-white bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 hover:from-orange-500 hover:to-amber-500 rounded-xl shadow-xl shadow-orange-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Procesando Transacción Encriptada...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Autorizar y Pagar ${totalAmount.toFixed(2)} USD</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>

            {/* Trust footer */}
            <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-500 font-mono">
              <span>PCI-DSS NIVEL 1</span>
              <span>·</span>
              <span>ENCRIPTACIÓN 256-BIT</span>
              <span>·</span>
              <span>EXTRACTO DISCRETO</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
