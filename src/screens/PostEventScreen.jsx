 
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { Car, Train, ArrowLeft, Check, Users, Trophy, Star } from 'lucide-react';
import { toast } from 'sonner';

const stadiumLoc = { lat: 40.4530, lng: -3.6883 };

const waves = [
  { time: '22:45', label: 'Wave 1 · Express', crowd: 'Low',      status: 'active',   crowdPct: 22, color: '#10b981' },
  { time: '23:00', label: 'Wave 2 · Standard', crowd: 'Moderate', status: 'upcoming', crowdPct: 55, color: '#f59e0b' },
  { time: '23:15', label: 'Wave 3 · Delayed',  crowd: 'High',     status: 'upcoming', crowdPct: 80, color: '#ef4444' },
];

const matchStats = [
  { label: 'Goals', value: 3 },
  { label: 'Shots', value: 18 },
  { label: 'Passes', value: 643 },
  { label: 'Km Run', value: 107 },
];

export default function PostEventScreen({ onNavigate }) {
  const apiKey   = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const [selectedWave, setSelectedWave] = useState(null);

  const handleSelectWave = (i) => {
    setSelectedWave(i);
    toast.success(`✅ Wave ${i + 1} selected — head to exit now!`, {
      description: `Estimated crowd: ${waves[i].crowd}`,
    });
  };

  return (
    <div className="screen-scroll relative">
      <div className="orb w-[240px] h-[240px] fixed top-20 -right-10 orb-animate"
        style={{ background: 'rgba(16,185,129,0.12)', filter: 'blur(80px)' }} />

      <div className="px-5 pb-36 pt-4 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.85 }} onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer border-none"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <ArrowLeft size={16} className="text-white/70" />
          </motion.button>
          <div>
            <h2 className="text-xl font-bold text-white">Post-Match Exit</h2>
            <p className="text-[11px] text-white/30 font-semibold">Staggered exit concierge</p>
          </div>
        </div>

        {/* Match Summary Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="glass rounded-[24px] p-5 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(14,21,38,0.9) 100%)' }}
        >
          <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full opacity-30"
            style={{ background: 'rgba(59,130,246,0.4)', filter: 'blur(40px)' }} />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={14} style={{ color: '#f59e0b' }} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#f59e0b' }}>
                Final Score
              </span>
            </div>
            <div className="flex items-center justify-between mb-5">
              <span className="text-2xl font-black text-white">Real Madrid</span>
              <span className="text-4xl font-black text-white">3 — 1</span>
              <span className="text-2xl font-black text-white">Barcelona</span>
            </div>

            {/* Match stats */}
            <div className="grid grid-cols-4 gap-2">
              {matchStats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-lg font-black text-white">
                    {0}
                  </p>
                  <p className="text-[9px] text-white/30 font-semibold uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Fan rating */}
            <div className="flex items-center gap-2 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-xs text-white/30 font-semibold">Rate the match:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <motion.button key={s} whileTap={{ scale: 0.85 }} className="border-none cursor-pointer bg-transparent p-0">
                    <Star size={18} style={{ fill: '#f59e0b', color: '#f59e0b' }} />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mini Map */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-[22px] overflow-hidden"
          style={{ height: '175px', border: '1px solid rgba(16,185,129,0.2)' }}
        >
          <APIProvider apiKey={apiKey}>
            <Map
              defaultCenter={stadiumLoc} defaultZoom={15}
              disableDefaultUI={true}
              style={{ width: '100%', height: '100%' }}
              colorScheme="DARK"
            >
              <Marker position={stadiumLoc} />
            </Map>
          </APIProvider>
        </motion.div>

        {/* Crowd flow visualization */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/25 mb-3">Live Crowd Flow</h3>
          <div className="glass rounded-[18px] p-4 flex items-end gap-2" style={{ height: 80 }}>
            {['N', 'E', 'W', 'SE', 'NW'].map((gate, i) => {
              const h = [60, 85, 40, 70, 30][i];
              const color = h > 70 ? '#ef4444' : h > 50 ? '#f59e0b' : '#10b981';
              return (
                <div key={gate} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    className="w-full rounded-t-md"
                    style={{ background: color, opacity: 0.8 }}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1.2, delay: i * 0.1, ease: 'easeOut' }}
                  />
                  <span className="text-[8px] text-white/25 font-bold">Gate {gate}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Departure Waves */}
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/25">Departure Waves</h3>
        <div className="flex flex-col gap-3">
          {waves.map((wave, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.09, type: 'spring', stiffness: 220 }}
              onClick={() => handleSelectWave(i)}
              className="glass rounded-[20px] p-4 flex items-center gap-4 cursor-pointer"
              style={{
                border: selectedWave === i ? `1px solid ${wave.color}50` : wave.status === 'active' ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.06)',
                boxShadow: wave.status === 'active' ? '0 0 20px rgba(16,185,129,0.1)' : 'none',
              }}
            >
              <div className="text-center min-w-[56px]">
                <p className="text-xl font-black text-white">{wave.time}</p>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-bold text-white">{wave.label}</h4>
                  {wave.status === 'active' && (
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ color: '#10b981', background: 'rgba(16,185,129,0.12)' }}>
                      Now
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={10} style={{ color: wave.color }} />
                  <span className="text-[11px] font-medium" style={{ color: wave.color }}>{wave.crowd} crowd</span>
                </div>
                {/* Crowd bar */}
                <div className="progress-track mt-2">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${wave.crowdPct}%` }}
                    transition={{ duration: 1.2, delay: i * 0.12 }}
                    style={{ background: wave.color }}
                  />
                </div>
              </div>

              {selectedWave === i ? (
                <div className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(16,185,129,0.2)' }}>
                  <Check size={14} style={{ color: '#10b981' }} />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: wave.color, opacity: 0.7 }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onNavigate('transport')}
          className="w-full font-bold py-4 rounded-2xl text-sm border-none cursor-pointer flex items-center justify-center gap-2 btn-shimmer"
          style={{ background: 'white', color: '#060a13' }}
        >
          <Car size={17} /> Book Exit Transport
        </motion.button>
      </div>
    </div>
  );
}
