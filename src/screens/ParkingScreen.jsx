 
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Clock, ArrowLeft, Navigation, Check } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

const spots = [
  { id: 'P3-A1', section: 'P3 North', distance: 3, available: true },
  { id: 'P3-A2', section: 'P3 North', distance: 3, available: true },
  { id: 'P3-B1', section: 'P3 North', distance: 4, available: false },
  { id: 'B1-A1', section: 'B1 West',  distance: 6, available: true },
  { id: 'B1-A2', section: 'B1 West',  distance: 6, available: false },
  { id: 'B1-B1', section: 'B1 West',  distance: 7, available: true },
];

const available = spots.filter(s => s.available).length;
const occupied  = spots.filter(s => !s.available).length;
const total     = spots.length;

const PIE_DATA = [
  { name: 'Available', value: available, color: '#10b981' },
  { name: 'Occupied',  value: occupied,  color: '#ef4444' },
];

export default function ParkingScreen({ onNavigate }) {
  const [reserved, setReserved] = useState(null);

  const handleReserve = (spot) => {
    setReserved(spot.id);
    toast.success(`🅿️ Reserved ${spot.id} — navigating to spot!`);
  };

  return (
    <div className="screen-scroll relative">
      <div className="orb w-[240px] h-[240px] fixed top-14 -right-10 orb-animate"
        style={{ background: 'rgba(59,130,246,0.14)', filter: 'blur(80px)' }} />

      <div className="px-5 pb-36 pt-4 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.85 }} onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer border-none"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <ArrowLeft size={16} className="text-white/70" />
          </motion.button>
          <div>
            <h2 className="text-xl font-bold text-white">Parking</h2>
            <p className="text-[11px] text-white/30 font-semibold">Real-time availability</p>
          </div>
        </div>

        {/* Donut Chart Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-[24px] p-6 flex items-center gap-6"
        >
          <div style={{ width: 110, height: 110, flexShrink: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%" cy="50%"
                  innerRadius={32} outerRadius={50}
                  startAngle={90} endAngle={-270}
                  dataKey="value"
                  strokeWidth={0}
                  animationBegin={200}
                  animationDuration={1200}
                >
                  {PIE_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1">
            <div className="mb-3">
              <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-white/30 mb-1">Available Spots</p>
              <p className="text-4xl font-black" style={{ color: '#10b981', textShadow: '0 0 20px rgba(16,185,129,0.3)' }}>
                {0}
                <span className="text-white/25 text-xl ml-1">/ {total}</span>
              </p>
            </div>
            <div className="flex gap-3">
              {PIE_DATA.map((d, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-[11px] text-white/40 font-semibold">{d.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sections */}
        {['P3 North', 'B1 West'].map((section, sIdx) => {
          const sectionSpots = spots.filter(s => s.section === section);
          return (
            <div key={sIdx}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/25 mb-3">{section}</h3>
              <div className="grid grid-cols-2 gap-3">
                {sectionSpots.map((spot, i) => (
                  <motion.div
                    key={spot.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (sIdx * 3 + i) * 0.06 }}
                    className="glass rounded-[18px] p-4"
                    style={{
                      opacity: spot.available ? 1 : 0.4,
                      border: reserved === spot.id ? '1px solid rgba(16,185,129,0.5)' : spot.available ? '1px solid rgba(16,185,129,0.15)' : 'auto',
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-black text-white">{spot.id}</h4>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: spot.available ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)' }}>
                        <div className="w-2 h-2 rounded-full" style={{ background: spot.available ? '#10b981' : '#ef4444' }} />
                      </div>
                    </div>
                    <p className="text-[10px] text-white/20 mb-3 flex items-center gap-1">
                      <Clock size={9} /> {spot.distance} min walk
                    </p>
                    {spot.available && reserved !== spot.id && (
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        onClick={() => handleReserve(spot)}
                        className="w-full flex items-center justify-center gap-1 text-[10px] font-bold py-1.5 rounded-xl border-none cursor-pointer"
                        style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}
                      >
                        <Navigation size={10} /> Navigate
                      </motion.button>
                    )}
                    {reserved === spot.id && (
                      <div className="flex items-center justify-center gap-1 text-[10px] font-bold"
                        style={{ color: '#10b981' }}>
                        <Check size={11} /> Reserved!
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
