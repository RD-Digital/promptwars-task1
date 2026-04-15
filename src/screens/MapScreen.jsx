import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, MapPin, Navigation, Info, Car, Bus, Siren, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { TransformWrapper, TransformComponent, useControls } from 'react-zoom-pan-pinch';

const getColor = (crowd) => {
  if (crowd === 'low') return '#10b981';
  if (crowd === 'medium') return '#f59e0b';
  return '#ef4444';
};

const getGlow = (crowd) => {
  if (crowd === 'low') return '0 0 20px rgba(16,185,129,0.7), 0 0 40px rgba(16,185,129,0.3)';
  if (crowd === 'medium') return '0 0 20px rgba(245,158,11,0.7), 0 0 40px rgba(245,158,11,0.3)';
  return '0 0 20px rgba(239,68,68,0.7), 0 0 40px rgba(239,68,68,0.3)';
};

const iconMap = {
  food: Coffee, gate: Navigation, restroom: MapPin,
  parking: Car, transport: Bus, emergency: Siren
};

// Hotspot config tailored to the new stadium SVG bounds
const initialHotspots = [
  { id: 'gate44', x: 70, y: 70, type: 'gate', name: 'Gate 44', crowd: 'low', eta: '4 min' },
  { id: 'food2', x: 260, y: 90, type: 'food', name: 'Tapas & Drinks', crowd: 'high', eta: '15 min' },
  { id: 'washroom', x: 80, y: 190, type: 'restroom', name: 'Restroom C', crowd: 'medium', eta: '8 min' },
  { id: 'parking-p3', x: 210, y: 220, type: 'parking', name: 'Sector P3', crowd: 'low', eta: '6 min' },
  { id: 'taxi-pickup', x: 160, y: 20, type: 'transport', name: 'Uber Pickup', crowd: 'high', eta: '7 min' },
  { id: 'emergency-exit', x: 40, y: 40, type: 'emergency', name: 'Exit E2', crowd: 'low', eta: '2 min' },
];

const MapControls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 z-50">
      <button onClick={() => zoomIn()} className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white cursor-pointer hover:bg-white/20">
        <ZoomIn size={18} />
      </button>
      <button onClick={() => zoomOut()} className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white cursor-pointer hover:bg-white/20">
        <ZoomOut size={18} />
      </button>
      <button onClick={() => resetTransform()} className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white cursor-pointer hover:bg-white/20">
        <Maximize size={18} />
      </button>
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
export default function MapScreen({ routeTarget, onRouteClear, onNavigate }) {
  const [hotspots, setHotspots] = useState(initialHotspots);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isRouting, setIsRouting] = useState(false);

  useEffect(() => {
    if (routeTarget) {
      const target = hotspots.find(h => h.id === routeTarget);
       
      if (target) { setActiveHotspot(target); setIsRouting(true); }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeTarget]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHotspots(prev => prev.map(spot => {
        if (Math.random() > 0.6 && spot.type !== 'emergency') {
          const levels = ['low', 'medium', 'high'];
          return { ...spot, crowd: levels[Math.floor(Math.random() * levels.length)] };
        }
        return spot;
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="screen-scroll relative">
      <div className="orb w-[250px] h-[250px] bg-neon-blue/15 -top-10 right-0 fixed" />

      <div className="px-5 pb-32 pt-4 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Santiago Bernabéu</h2>
            <p className="text-xs text-white/30 font-semibold mt-0.5">Interactive Topography</p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neon-blue bg-neon-blue/15 px-3 py-1.5 rounded-full border border-neon-blue/30">
            SEC 105
          </span>
        </div>

        {/* 3D SVG Map wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[400px] rounded-[28px] overflow-hidden border border-white/[0.08] bg-black/40 backdrop-blur-3xl"
        >
          <TransformWrapper initialScale={1} minScale={0.8} maxScale={3}>
            <MapControls />
            <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
              <div className="relative w-[340px] h-[340px] mx-auto mt-6">
                {/* Isometric SVG Map of Bernabeu */}
                <svg viewBox="0 0 340 340" className="w-full h-full absolute inset-0" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))' }}>
                  <defs>
                    <linearGradient id="pitchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#065f46" />
                      <stop offset="50%" stopColor="#047857" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="standsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>

                  {/* Outer structure bowl */}
                  <path d="M40 170 C40 70 120 40 170 40 C220 40 300 70 300 170 C300 270 220 300 170 300 C120 300 40 270 40 170 Z" fill="url(#standsGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
                  
                  {/* Inner roof overhang */}
                  <path d="M60 170 C60 90 120 60 170 60 C220 60 280 90 280 170 C280 250 220 280 170 280 C120 280 60 250 60 170 Z" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />

                  {/* Pitch */}
                  <path d="M90 170 C90 120 130 100 170 100 C210 100 250 120 250 170 C250 220 210 240 170 240 C130 240 90 220 90 170 Z" fill="url(#pitchGrad)" stroke="#34d399" strokeWidth="1.5" />
                  
                  {/* Pitch Markings */}
                  <line x1="170" y1="100" x2="170" y2="240" stroke="#6ee7b7" strokeWidth="1.5" opacity="0.6" />
                  <circle cx="170" cy="170" r="25" fill="none" stroke="#6ee7b7" strokeWidth="1.5" opacity="0.6" />
                  <path d="M130 100 L130 130 L210 130 L210 100" fill="none" stroke="#6ee7b7" strokeWidth="1" opacity="0.6" />
                  <path d="M130 240 L130 210 L210 210 L210 240" fill="none" stroke="#6ee7b7" strokeWidth="1" opacity="0.6" />

                  {/* Animated Route Line */}
                  <AnimatePresence>
                    {isRouting && activeHotspot && (
                      <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                        d={`M170 295 C140 280, 100 230, ${activeHotspot.x} ${activeHotspot.y}`}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="8 6"
                        style={{ filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.8))' }}
                      />
                    )}
                  </AnimatePresence>

                  {/* User Entry Pin */}
                  {isRouting && (
                    <circle cx="170" cy="295" r="6" fill="#3b82f6" stroke="#fff" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 10px #3b82f6)' }} />
                  )}
                </svg>

                {/* HTML overlay pins for proper lucide-icons rendering */}
                {hotspots.map((spot) => {
                  const Icon = iconMap[spot.type] || MapPin;
                  const isActive = activeHotspot?.id === spot.id;
                  return (
                    <motion.button
                      key={spot.id}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      animate={{
                        backgroundColor: getColor(spot.crowd),
                        boxShadow: getGlow(spot.crowd),
                        scale: isActive ? 1.4 : 1,
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      onClick={() => { setActiveHotspot(spot); setIsRouting(false); }}
                      className="absolute rounded-full border-[2.5px] border-white flex items-center justify-center cursor-pointer z-10"
                      style={{ top: spot.y - 14, left: spot.x - 14, width: 28, height: 28 }}
                    >
                      <Icon size={13} color="white" />
                    </motion.button>
                  );
                })}
              </div>
            </TransformComponent>
          </TransformWrapper>
        </motion.div>

        {/* Legend */}
        <div className="flex gap-4 justify-center">
          {[
            { label: 'Clear', color: 'bg-neon-green' },
            { label: 'Moderate', color: 'bg-neon-gold' },
            { label: 'Congested', color: 'bg-neon-red' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
              <span className="text-[11px] text-white/40 font-semibold">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Hotspot Detail Card */}
        <AnimatePresence mode="wait">
          {activeHotspot ? (
            <motion.div
              key={activeHotspot.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="glass rounded-[22px] p-5 relative overflow-hidden"
              style={{ borderLeft: `4px solid ${getColor(activeHotspot.crowd)}` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{activeHotspot.name}</h3>
                  <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/30 mt-1">{activeHotspot.type}</p>
                </div>
                <span className="text-xs font-bold text-white bg-white/10 px-3 py-1.5 rounded-full">
                  ETA {activeHotspot.eta}
                </span>
              </div>

              {!isRouting ? (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 rounded-2xl font-bold text-sm text-white border-none cursor-pointer flex items-center justify-center gap-2"
                  style={{ backgroundColor: getColor(activeHotspot.crowd), boxShadow: getGlow(activeHotspot.crowd) }}
                  onClick={() => { setIsRouting(true); if (onRouteClear) onRouteClear(); }}
                >
                  <Navigation size={16} /> Start Navigation
                </motion.button>
              ) : (
                <div className="w-full py-3 rounded-2xl font-bold text-sm text-center border-2 border-neon-blue/50 text-neon-blue bg-neon-blue/10"
                     style={{ boxShadow: '0 0 20px rgba(59,130,246,0.2)' }}>
                  Route Active — Follow Path
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-[22px] p-5 flex items-center gap-4"
            >
              <div className="bg-neon-blue/15 p-3 rounded-xl">
                <Info size={20} className="text-neon-blue" />
              </div>
              <p className="text-sm text-white/50 font-medium leading-relaxed">
                Tap any glowing marker on the Santiago Bernabéu map to explore zones and start live routing.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
