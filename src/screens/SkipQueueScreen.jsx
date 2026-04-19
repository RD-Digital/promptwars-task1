import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, Check, Shield, ArrowLeft, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

const slots = [
  { time: '20:15', wait: 2,  popular: 85, available: true },
  { time: '20:30', wait: 1,  popular: 62, available: true },
  { time: '20:45', wait: 4,  popular: 44, available: true },
  { time: '21:00', wait: 99, popular: 98, available: false },
];

export default function SkipQueueScreen({ onNavigate }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (confirmed && countdown === null) {
      setCountdown(15 * 60); // 15 min in seconds
    }
  }, [confirmed, countdown]);

  useEffect(() => {
    if (countdown === null || countdown <= 0) return;
    timerRef.current = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [countdown]);

  const formatCountdown = (s) => {
    if (!s) return '00:00';
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  };

  const handleConfirm = () => {
    setConfirmed(true);
    toast.success('⚡ Fast Track Reserved!', { description: `Slot ${slots[selectedSlot].time} · Gate 44` });
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#f59e0b', '#3b82f6', '#10b981', '#ffffff'],
        scalar: 1.1,
      });
    }, 200);
  };

  return (
    <main className="screen-scroll relative" id="skip-queue-screen">
      <div className="orb w-[260px] h-[260px] fixed top-10 -right-20 orb-animate pointer-events-none"
        style={{ background: 'rgba(245,158,11,0.15)', filter: 'blur(80px)' }} aria-hidden="true" />

      <div className="px-5 pb-36 pt-4 flex flex-col gap-5">
        {/* Header */}
        <header className="flex items-center gap-3">
          <motion.button 
            whileTap={{ scale: 0.85 }} 
            onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer border-none"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
            aria-label="Back to Home"
          >
            <ArrowLeft size={16} className="text-white/70" aria-hidden="true" />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold text-white">Fast Track Entry</h1>
            <p className="text-[11px] font-semibold text-[#f59e0b]" aria-hidden="true">Skip the queue · VIP Access</p>
          </div>
        </header>

        {/* Info Banner */}
        <section 
          className="relative rounded-[22px] p-5 overflow-hidden" 
          style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(14,21,38,0.8))', border: '1px solid rgba(245,158,11,0.2)' }}
          aria-label="Service Information"
        >
          <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full opacity-30"
            style={{ background: 'rgba(245,158,11,0.4)', filter: 'blur(40px)' }} aria-hidden="true" />
          <div className="relative z-10 flex items-start gap-4">
            <div className="p-3 rounded-xl" style={{ background: 'rgba(245,158,11,0.2)' }}>
              <Shield size={22} style={{ color: '#f59e0b' }} aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white mb-1">Priority Entry Pass</h2>
              <p className="text-xs text-white/40 leading-relaxed">
                Reserve a timeslot for express security screening. Walk past normal queues with your digital pass.
              </p>
              <p className="text-xs font-bold mt-2" style={{ color: '#f59e0b' }}>⏱ Saves up to 18 minutes</p>
            </div>
          </div>
        </section>

        {/* Time Slots */}
        <section aria-label="Available Time Slots">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/25 mb-3">Available Slots</h2>
          <div className="grid grid-cols-2 gap-3" role="group">
            {slots.map((slot, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                whileTap={slot.available && !confirmed ? { scale: 0.94 } : {}}
                onClick={() => slot.available && !confirmed && setSelectedSlot(i)}
                disabled={!slot.available || confirmed}
                className={`glass rounded-[18px] p-4 text-left border-none relative overflow-hidden transition-all duration-200 ${selectedSlot === i ? 'ring-2 ring-[#f59e0b]/60' : ''}`}
                style={{
                  opacity: !slot.available ? 0.35 : 1,
                  cursor: slot.available && !confirmed ? 'pointer' : 'default',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: selectedSlot === i ? '0 0 30px rgba(245,158,11,0.2)' : 'none',
                }}
                aria-label={`${slot.time}. ${slot.available ? `Estimated ${slot.wait} minute wait.` : 'Full'}`}
                aria-pressed={selectedSlot === i}
              >
                {selectedSlot === i && (
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/[0.12] to-transparent" aria-hidden="true" />
                )}
                <div className="relative z-10">
                  <span className="text-2xl font-black text-white mb-1 block">{slot.time}</span>
                  <div className="flex items-center gap-1.5 mb-3" aria-hidden="true">
                    <Clock size={11} className="text-white/30" />
                    <span className="text-[11px] text-white/40 font-medium">
                      {slot.available ? `~${slot.wait} min wait` : 'Full'}
                    </span>
                  </div>
                  {/* Popularity bar */}
                  {slot.available && (
                    <div aria-hidden="true">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] text-white/25 font-semibold uppercase tracking-wider">Demand</span>
                        <span className="text-[9px] font-bold" style={{ color: slot.popular > 70 ? '#ef4444' : '#10b981' }}>
                          {slot.popular}%
                        </span>
                      </div>
                      <div className="progress-track">
                        <motion.div
                          className="progress-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${slot.popular}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          style={{ background: slot.popular > 70 ? '#ef4444' : '#f59e0b' }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                {selectedSlot === i && (
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: '#f59e0b' }}>
                    <Check size={13} style={{ color: '#0a0e1a' }} aria-hidden="true" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </section>

        {/* Confirm / Success State */}
        <section aria-live="polite" aria-relevant="all">
          <AnimatePresence mode="wait">
            {selectedSlot !== null && !confirmed && (
              <motion.button
                key="confirm"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleConfirm}
                className="w-full font-bold py-4 rounded-2xl text-sm border-none cursor-pointer flex items-center justify-center gap-2 btn-shimmer"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: '#0a0e1a',
                  boxShadow: '0 0 30px rgba(245,158,11,0.35)',
                }}
                aria-label={`Confirm reservation for ${slots[selectedSlot].time}`}
              >
                <Zap size={17} aria-hidden="true" /> Confirm {slots[selectedSlot].time} — Fast Track
              </motion.button>
            )}

            {confirmed && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-full rounded-2xl py-4 px-5 flex items-center justify-between"
                  style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', boxShadow: '0 0 30px rgba(16,185,129,0.12)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.2)' }}>
                      <Check size={16} style={{ color: '#10b981' }} aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="text-sm font-black text-white">Fast Track Confirmed!</h2>
                      <p className="text-[11px]" style={{ color: '#10b981' }}>Slot {slots[selectedSlot]?.time} · Gate 44</p>
                    </div>
                  </div>
                  <Sparkles size={18} style={{ color: '#f59e0b' }} aria-hidden="true" />
                </div>

                {/* Live countdown till slot */}
                <div className="glass rounded-2xl w-full p-5 text-center" role="timer" aria-label={`Slot opens in ${formatCountdown(countdown)}`}>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-2">Your slot opens in</p>
                  <p className="text-5xl font-black text-white tabular-nums" style={{ textShadow: '0 0 24px rgba(59,130,246,0.4)' }}>
                    {formatCountdown(countdown)}
                  </p>
                  <p className="text-xs text-white/25 mt-2">Head to Gate 44 · North Sector</p>
                </div>

                <div className="w-full rounded-[18px] py-3 px-5 flex items-center justify-between"
                  style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)' }}>
                  <span className="text-sm font-bold text-white/60">Time saved vs normal queue</span>
                  <span className="text-xl font-black" style={{ color: '#f59e0b' }}>18 min</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
