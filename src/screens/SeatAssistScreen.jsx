 
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, MapPin, ChevronUp, ArrowLeft, Navigation } from 'lucide-react';

const steps = [
  { dir: 'Straight', dist: '60m', landmark: 'Past the food kiosks' },
  { dir: 'Turn Left', dist: '20m', landmark: 'At Concourse B junction' },
  { dir: 'Go Upstairs', dist: 'Level 2', landmark: 'Escalator on your right' },
  { dir: 'Turn Right', dist: '15m', landmark: 'Section 105 entrance' },
];

export default function SeatAssistScreen({ onNavigate }) {
  const [distance, setDistance] = useState(145);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDistance(d => {
        if (d > 12) {
          const next = d - 1;
          const progress = ((145 - next) / 145) * 100;
          const newStep = Math.min(steps.length - 1, Math.floor(progress / 25));
          setStep(newStep);
          return next;
        }
        return d;
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const progress = Math.max(4, ((145 - distance) / 145) * 100);

  return (
    <div className="screen-scroll relative">
      <div className="orb w-[260px] h-[260px] fixed top-20 -right-20 orb-animate"
        style={{ background: 'rgba(59,130,246,0.18)', filter: 'blur(80px)' }} />

      <div className="px-5 pb-36 pt-4 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.85 }} onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer border-none"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <ArrowLeft size={16} className="text-white/70" />
          </motion.button>
          <div>
            <h2 className="text-xl font-bold text-white">Seat Navigator</h2>
            <p className="text-[11px] font-semibold" style={{ color: '#3b82f6' }}>TARGET: SEAT 23H · Block 105</p>
          </div>
        </div>

        {/* AR HUD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-[24px] overflow-hidden"
          style={{
            height: '360px',
            background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.18) 0%, rgba(6,10,19,1) 80%)',
            boxShadow: 'inset 0 0 60px rgba(59,130,246,0.12), 0 20px 60px rgba(0,0,0,0.5)',
            border: '1px solid rgba(59,130,246,0.2)',
          }}
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundSize: '32px 32px',
              backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            }}
          />

          {/* Compass */}
          <div className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Navigation size={18} style={{ color: '#3b82f6' }} />
            </motion.div>
          </div>

          {/* Animated chevrons */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-0 -mt-4">
            {[{ size: 88, opacity: [0.9, 1, 0.9], delay: 0 }, { size: 64, opacity: [0.4, 0.7, 0.4], delay: 0.14, mt: -14 }, { size: 44, opacity: [0.15, 0.3, 0.15], delay: 0.28, mt: -11 }].map((c, i) => (
              <motion.div
                key={i}
                style={{ marginTop: c.mt || 0 }}
                animate={{ y: [0, -8 - i * 2, 0], opacity: c.opacity }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut', delay: c.delay }}
              >
                <ChevronUp size={c.size} style={{ color: '#3b82f6' }} strokeWidth={2 - i * 0.3} />
              </motion.div>
            ))}
          </div>

          {/* Current step indicator */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-[11px] font-bold"
              style={{ background: 'rgba(59,130,246,0.2)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.3)' }}
            >
              {steps[step]?.dir}
            </motion.div>
          </AnimatePresence>

          {/* Bottom overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 pt-20 text-center z-20"
            style={{ background: 'linear-gradient(to top, rgba(6,10,19,0.98) 30%, transparent)' }}>
            <p className="text-[11px] uppercase tracking-[0.2em] font-bold mb-2" style={{ color: '#3b82f6' }}>
              {steps[step]?.landmark}
            </p>
            <div className="flex items-end justify-center gap-2">
              <span className="text-6xl font-black text-white tracking-tighter leading-none tabular-nums"
                style={{ textShadow: '0 0 30px rgba(59,130,246,0.5)' }}>
                {0}
              </span>
              <span className="text-lg font-bold text-white/40 pb-1">m</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 rounded-full mt-4 overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                className="h-full rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ background: 'linear-gradient(90deg, #3b82f6, #22d3ee)', boxShadow: '0 0 12px rgba(59,130,246,0.6)' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Step-by-step */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/25 mb-3">Turn-by-Turn</h3>
          <div className="flex flex-col">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-3 py-3"
                style={{ borderBottom: i < steps.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black"
                    style={{
                      background: i === step ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.06)',
                      color: i === step ? '#3b82f6' : 'rgba(255,255,255,0.3)',
                      border: i === step ? '1px solid rgba(59,130,246,0.5)' : '1px solid rgba(255,255,255,0.08)',
                    }}>
                    {i + 1}
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: 'rgba(255,255,255,0.06)' }} />}
                </div>
                <div className="pb-3">
                  <p className="text-sm font-bold text-white">{s.dir} <span className="text-white/30 font-normal">· {s.dist}</span></p>
                  <p className="text-[11px] text-white/30 mt-0.5">{s.landmark}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pitstops */}
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/25">On Your Route</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Coffee, label: 'Tapas Stand', sub: '2m detour', badge: 'Order Ahead', color: '#f59e0b', screen: 'queue' },
            { icon: MapPin, label: 'Restrooms (C)', sub: '4m detour', badge: 'No Queue', color: '#10b981', screen: null },
          ].map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03, y: -2 }}
              className="glass rounded-[20px] p-4 cursor-pointer"
              onClick={() => p.screen && onNavigate(p.screen)}
            >
              <p.icon size={21} style={{ color: p.color }} className="mb-3" />
              <h4 className="text-sm font-bold text-white mb-0.5">{p.label}</h4>
              <p className="text-[11px] text-white/30 font-medium mb-3">{p.sub}</p>
              <span className="text-[9px] font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-full"
                style={{ color: p.color, background: `${p.color}18`, border: `1px solid ${p.color}30` }}>
                {p.badge}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
