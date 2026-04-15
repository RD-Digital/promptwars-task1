 
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, MapPin, Clock, ChevronRight, Sparkles, ArrowLeft, RotateCcw, Info } from 'lucide-react';

export default function TicketScreen({ onNavigate }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="screen-scroll relative">
      <div className="orb w-[300px] h-[300px] fixed -top-20 -right-20 orb-animate"
        style={{ background: 'rgba(59,130,246,0.15)', filter: 'blur(80px)' }} />
      <div className="orb w-[200px] h-[200px] fixed bottom-40 -left-20 orb-animate-delay"
        style={{ background: 'rgba(245,158,11,0.1)', filter: 'blur(80px)' }} />

      <div className="px-5 pb-36 pt-4 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <motion.button whileTap={{ scale: 0.85 }} onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer border-none"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <ArrowLeft size={16} className="text-white/70" />
          </motion.button>
          <h2 className="text-xl font-bold text-white">Digital Pass</h2>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setFlipped(f => !f)}
            className="ml-auto flex items-center gap-1.5 text-[11px] font-bold border-none cursor-pointer px-3 py-1.5 rounded-full"
            style={{ color: '#3b82f6', background: 'rgba(59,130,246,0.1)' }}
          >
            <RotateCcw size={12} /> {flipped ? 'Show QR' : 'Details'}
          </motion.button>
        </div>

        {/* 3D Flip Card */}
        <div style={{ perspective: '1200px', height: '520px' }}>
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformStyle: 'preserve-3d', position: 'relative', height: '100%' }}
          >
            {/* FRONT — QR Side */}
            <div
              style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}
              className="glass rounded-[28px] overflow-hidden"
            >
              {/* Holographic shimmer overlay */}
              <div className="absolute inset-0 holo-shimmer z-20 pointer-events-none rounded-[28px]" />

              {/* Header gradient */}
              <div className="relative p-6 pb-8"
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.5) 0%, rgba(34,211,238,0.2) 50%, transparent 100%)' }}>
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-40"
                  style={{ background: 'rgba(59,130,246,0.4)', filter: 'blur(40px)' }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={13} style={{ color: '#f59e0b' }} />
                    <span className="text-[10px] uppercase tracking-[0.22em] font-black" style={{ color: '#f59e0b' }}>
                      VIP Matchday Pass
                    </span>
                  </div>
                  <h3 className="text-3xl font-black text-white tracking-tight leading-none">
                    Real Madrid <span className="text-white/35">vs</span> Barcelona
                  </h3>
                  <p className="text-sm text-white/45 mt-2 font-medium">Santiago Bernabéu · La Liga 24/25</p>
                </div>
              </div>

              {/* Perforated divider */}
              <div className="relative h-px mx-4">
                <div className="h-px border-t border-dashed border-white/10" />
                <div className="absolute -left-9 -top-4 w-8 h-8 rounded-full" style={{ background: 'var(--color-bg-base)' }} />
                <div className="absolute -right-9 -top-4 w-8 h-8 rounded-full" style={{ background: 'var(--color-bg-base)' }} />
              </div>

              <div className="p-6 pt-5">
                {/* Seat grid */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: 'Gate', value: '44' },
                    { label: 'Block', value: '105' },
                    { label: 'Seat', value: '23H', accent: true },
                  ].map((item, i) => (
                    <div key={i} className="text-center py-3.5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/25 mb-1">{item.label}</p>
                      <p className={`text-2xl font-black ${item.accent ? '' : 'text-white'}`}
                        style={item.accent ? { color: '#f59e0b', textShadow: '0 0 20px rgba(245,158,11,0.4)' } : {}}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Meta */}
                <div className="flex gap-3 mb-6">
                  <div className="flex-1 flex items-center gap-2 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <Clock size={13} className="text-white/35" />
                    <span className="text-xs text-white/55 font-medium">21:00 CET · Apr 19</span>
                  </div>
                  <div className="flex-1 flex items-center gap-2 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <MapPin size={13} className="text-white/35" />
                    <span className="text-xs text-white/55 font-medium">Row 12 · Upper Tier</span>
                  </div>
                </div>

                {/* QR with scan line */}
                <div className="bg-white rounded-2xl p-5 flex flex-col items-center gap-3 relative overflow-hidden">
                  <div className="scan-line" />
                  <QrCode size={140} className="text-gray-900" />
                  <p className="text-xs text-gray-900/40 font-bold tracking-wide uppercase">Scan at Entry · Gate 44</p>
                </div>
              </div>
            </div>

            {/* BACK — Details Side */}
            <div
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: 'absolute', inset: 0 }}
              className="glass rounded-[28px] overflow-hidden p-6 flex flex-col gap-5"
            >
              <div className="absolute inset-0 holo-shimmer z-0 pointer-events-none rounded-[28px]" />
              <div className="relative z-10">
                <h3 className="text-lg font-black text-white mb-5">Ticket Details</h3>

                {[
                  { label: 'Event', value: 'El Clásico — La Liga 24/25' },
                  { label: 'Date & Time', value: 'Saturday, April 19 · 21:00 CET' },
                  { label: 'Venue', value: 'Santiago Bernabéu Stadium' },
                  { label: 'Section', value: 'Block 105 · Upper Tier' },
                  { label: 'Row / Seat', value: 'Row 12 / Seat 23H' },
                  { label: 'Gate Entry', value: 'Gate 44 (North)' },
                  { label: 'Ticket Holder', value: 'Alex Madridista' },
                  { label: 'Ticket Type', value: 'VIP Premium · Member Rate' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-white/[0.05]">
                    <span className="text-xs text-white/30 font-semibold">{item.label}</span>
                    <span className="text-xs text-white font-bold text-right max-w-[55%]">{item.value}</span>
                  </div>
                ))}

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate('seatassist')}
                  className="w-full mt-5 flex items-center gap-3 p-4 rounded-2xl border-none cursor-pointer"
                  style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}
                >
                  <div className="p-2 rounded-xl" style={{ background: 'rgba(34,211,238,0.15)' }}>
                    <MapPin size={17} style={{ color: '#22d3ee' }} />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-bold text-white block">Find My Seat</span>
                    <span className="text-[11px] text-white/30">AR Navigation</span>
                  </div>
                  <ChevronRight size={16} className="text-white/20 ml-auto" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
