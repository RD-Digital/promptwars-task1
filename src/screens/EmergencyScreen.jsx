import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Shield, Navigation, Siren, MapPin, ArrowLeft, Users, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function EmergencyScreen({ onNavigate }) {
  const [sosActive, setSosActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [dispatched, setDispatched] = useState(false);

  useEffect(() => {
    if (!sosActive || dispatched) return;
    if (countdown <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDispatched(true);
      toast.error('🚨 SOS signal sent to Stadium Security!', { duration: 5000 });
      return;
    }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [sosActive, countdown, dispatched]);

  const handleSOS = () => {
    setSosActive(true);
    setCountdown(5);
    setDispatched(false);
  };

  const handleCancel = () => {
    setSosActive(false);
    setCountdown(5);
    toast('SOS cancelled', { icon: '✓' });
  };

  const actions = [
    { icon: Phone,      title: 'Call Emergency',   sub: 'Stadium Security Hotline',        color: '#ef4444', action: () => toast.error('Calling Stadium Security...') },
    { icon: Navigation, title: 'Nearest Exit',     sub: 'Exit E2 · 2 min walk',           color: '#10b981', action: () => onNavigate('map', 'emergency-exit') },
    { icon: Users,      title: 'Medical Aid',      sub: 'Station near Gate 44',            color: '#3b82f6', action: () => toast.success('Medical team alerted · ETA 3 min') },
    { icon: MapPin,     title: 'Share Location',   sub: 'Send to emergency contacts',      color: '#f59e0b', action: () => toast.success('Location shared with 3 contacts') },
  ];

  return (
    <div className="screen-scroll relative">
      <div className="orb w-[320px] h-[320px] fixed -top-20 left-1/2 -translate-x-1/2"
        style={{ background: 'rgba(239,68,68,0.15)', filter: 'blur(90px)' }} />

      <div className="px-5 pb-36 pt-4 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.85 }} onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer border-none"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <ArrowLeft size={16} className="text-white/70" />
          </motion.button>
          <div>
            <h2 className="text-xl font-bold text-white">Emergency</h2>
            <p className="text-[11px] font-semibold" style={{ color: '#ef4444' }}>SOS Safety Center</p>
          </div>
        </div>

        {/* SOS Button with concentric rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center py-8 relative"
        >
          {/* Ring layers */}
          {!dispatched && (
            <>
              <div className="absolute w-40 h-40 rounded-full border border-red-500/20 sos-ring-1" />
              <div className="absolute w-48 h-48 rounded-full border border-red-500/15 sos-ring-2" />
              <div className="absolute w-56 h-56 rounded-full border border-red-500/10 sos-ring-3" />
            </>
          )}

          <AnimatePresence mode="wait">
            {!sosActive && !dispatched ? (
              <motion.button
                key="sos-btn"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleSOS}
                className="relative w-28 h-28 rounded-full flex items-center justify-center border-none cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
                  boxShadow: '0 0 60px rgba(239,68,68,0.45), 0 0 120px rgba(239,68,68,0.2)',
                }}
                animate={{ boxShadow: [
                  '0 0 40px rgba(239,68,68,0.35)',
                  '0 0 80px rgba(239,68,68,0.6)',
                  '0 0 40px rgba(239,68,68,0.35)',
                ]}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Siren size={44} className="text-white" />
              </motion.button>
            ) : sosActive && !dispatched ? (
              <motion.div
                key="countdown"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="relative w-28 h-28">
                  <svg className="absolute inset-0 -rotate-90" viewBox="0 0 112 112">
                    <circle cx="56" cy="56" r="50" fill="none" stroke="rgba(239,68,68,0.15)" strokeWidth="4" />
                    <motion.circle
                      cx="56" cy="56" r="50" fill="none" stroke="#ef4444" strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={314}
                      animate={{ strokeDashoffset: 314 - (314 * (countdown / 5)) }}
                      transition={{ duration: 1, ease: 'linear' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-5xl font-black text-white">{countdown}</span>
                    <span className="text-[10px] text-white/40 font-bold">SENDING</span>
                  </div>
                </div>
                <motion.button whileTap={{ scale: 0.95 }} onClick={handleCancel}
                  className="text-white/40 text-sm font-bold bg-transparent border-none cursor-pointer underline">
                  Cancel SOS
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="dispatched"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(16,185,129,0.2)', border: '2px solid rgba(16,185,129,0.4)' }}>
                  <CheckCircle size={44} style={{ color: '#10b981' }} />
                </div>
                <p className="text-sm font-bold" style={{ color: '#10b981' }}>Security Dispatched!</p>
                <p className="text-xs text-white/30">ETA: ~2 minutes</p>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-sm text-white/30 font-semibold mt-5">
            {!sosActive ? 'Hold to send SOS signal' : dispatched ? '' : 'Sending in...'}
          </p>
        </motion.div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-3">
          {actions.map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, type: 'spring', stiffness: 220 }}
              whileTap={{ scale: 0.97 }}
              onClick={item.action}
              className="glass rounded-[20px] p-4 flex items-center gap-4 border-none cursor-pointer text-left w-full"
              style={{ backdropFilter: 'blur(40px)' }}
            >
              <div className="p-3 rounded-xl"
                style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}>
                <item.icon size={21} style={{ color: item.color }} />
              </div>
              <div className="flex-1">
                <h4 className="text-[15px] font-bold text-white">{item.title}</h4>
                <p className="text-[11px] text-white/30 mt-0.5">{item.sub}</p>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.06)' }}>
                <ArrowLeft size={13} className="text-white/30 rotate-180" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
