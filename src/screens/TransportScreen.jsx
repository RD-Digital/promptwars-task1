/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { Car, Train, Bike, Clock, ArrowLeft, ChevronRight, Zap } from 'lucide-react';

const stadiumLoc = { lat: 40.4530, lng: -3.6883 };

const routes = [
  {
    icon: Train, label: 'Metro Line 10',      sub: 'Santiago Bernabéu Station',
    etaMins: 2, color: '#10b981', status: 'Running', statusColor: 'rgba(16,185,129,0.12)',
    priceText: 'Free', note: 'Night service till 00:30', screen: null,
  },
  {
    icon: Car,   label: 'Uber / Lyft Pickup', sub: 'North Sector Parking P3',
    etaMins: 3, color: '#3b82f6', status: 'Surge 1.2×', statusColor: 'rgba(239,68,68,0.12)',
    priceText: '~€8', note: '2 drivers nearby', screen: 'cabbooking',
  },
  {
    icon: Bike,  label: 'Lime E-Bikes',       sub: '4 bikes near Gate E2',
    etaMins: 1, color: '#f59e0b', status: 'Available', statusColor: 'rgba(245,158,11,0.12)',
    priceText: '€2/30min', note: '4 bikes unlocked', screen: null,
  },
];

export default function TransportScreen({ onNavigate }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const [etas, setEtas] = useState(routes.map(r => r.etaMins));

  // Live ETA countdown simulation
  useEffect(() => {
    const t = setInterval(() => {
      setEtas(prev => prev.map(e => Math.max(1, e + (Math.random() > 0.5 ? 0 : -0))));
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="screen-scroll relative">
      <div className="orb w-[260px] h-[260px] fixed -top-10 -right-20 orb-animate"
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
            <h2 className="text-xl font-bold text-white">Transport Hub</h2>
            <p className="text-[11px] text-white/30 font-semibold">Multimodal travel options</p>
          </div>
        </div>

        {/* Live Map */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-[22px] overflow-hidden"
          style={{ height: '200px', border: '1px solid rgba(59,130,246,0.18)' }}
        >
          <APIProvider apiKey={apiKey}>
            <Map
              defaultCenter={stadiumLoc} defaultZoom={15}
              mapId="transport-map" gestureHandling="greedy"
              disableDefaultUI={true}
              style={{ width: '100%', height: '100%' }}
              colorScheme="DARK"
            >
              <Marker position={stadiumLoc} />
            </Map>
          </APIProvider>
        </motion.div>

        {/* Route Cards */}
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/25">Available Routes</h3>
        <div className="flex flex-col gap-3">
          {routes.map((route, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.09, type: 'spring', stiffness: 220 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => route.screen && onNavigate(route.screen)}
              className="glass rounded-[20px] p-4 flex items-center gap-4"
              style={{ cursor: route.screen ? 'pointer' : 'default' }}
            >
              <div className="p-3 rounded-xl" style={{ background: `${route.color}18`, border: `1px solid ${route.color}30` }}>
                <route.icon size={21} style={{ color: route.color }} />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-[15px] font-bold text-white">{route.label}</h4>
                  {/* Surge badge */}
                  {route.status.includes('Surge') && (
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ color: '#ef4444', background: 'rgba(239,68,68,0.12)' }}>
                      {route.status}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-white/30 mb-2">{route.sub}</p>

                {/* ETA + price row */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: route.color }}>
                    <Clock size={10} />
                    {0}
                  </div>
                  <span className="text-[11px] text-white/20">·</span>
                  <span className="text-[11px] text-white/40">{route.priceText}</span>
                </div>
              </div>

              {route.screen && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <ChevronRight size={14} className="text-white/30" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Book Ride CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onNavigate('cabbooking')}
          className="w-full font-bold py-4 rounded-2xl text-sm border-none cursor-pointer flex items-center justify-center gap-2 btn-shimmer"
          style={{ background: 'white', color: '#060a13' }}
        >
          <Car size={17} /> Book a Ride Now
        </motion.button>
      </div>
    </div>
  );
}
