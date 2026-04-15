import { motion, AnimatePresence } from 'framer-motion';
import { Home, Map as MapIcon, Clock, Car, ShieldAlert } from 'lucide-react';

export default function BottomNav({ current, onNavigate }) {
  const tabs = [
    { id: 'home',      icon: Home,       label: 'Home' },
    { id: 'map',       icon: MapIcon,    label: 'Map' },
    { id: 'transport', icon: Car,        label: 'Travel' },
    { id: 'queue',     icon: Clock,      label: 'Queues' },
    { id: 'emergency', icon: ShieldAlert,label: 'SOS', isAlert: true },
  ];

  return (
    <div className="absolute bottom-5 left-4 right-4 z-50">
      <div
        className="rounded-[28px] flex justify-around items-center px-2 py-2"
        style={{
          background: 'rgba(10, 14, 26, 0.90)',
          backdropFilter: 'blur(40px) saturate(200%)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {tabs.map(tab => {
          const isActive = current === tab.id;
          const color = tab.isAlert ? '#ef4444' : '#3b82f6';
          const glowColor = tab.isAlert
            ? 'rgba(239,68,68,0.25)'
            : 'rgba(59,130,246,0.25)';

          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.82 }}
              onClick={() => onNavigate(tab.id)}
              className="relative flex flex-col items-center gap-0.5 bg-transparent border-none cursor-pointer py-1.5 px-3"
            >
              {/* Morphing blob indicator */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key="blob"
                    layoutId="nav-blob"
                    className="absolute inset-0 rounded-[18px]"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    style={{
                      background: tab.isAlert
                        ? 'rgba(239,68,68,0.15)'
                        : 'rgba(59,130,246,0.15)',
                      boxShadow: `0 0 20px ${glowColor}`,
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Notification badge dot — alerts & queue tabs */}
              {(tab.id === 'queue') && (
                <span
                  className="absolute top-1 right-2.5 w-2 h-2 rounded-full"
                  style={{ background: '#f59e0b', boxShadow: '0 0 6px rgba(245,158,11,0.7)' }}
                />
              )}
              {tab.isAlert && (
                <span
                  className="absolute top-1 right-2.5 w-2 h-2 rounded-full"
                  style={{ background: '#ef4444', boxShadow: '0 0 6px rgba(239,68,68,0.7)' }}
                />
              )}

              <motion.div
                animate={{
                  scale: isActive ? 1.08 : 1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="p-2 rounded-2xl flex items-center justify-center relative z-10"
              >
                <tab.icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  style={{ color: isActive ? color : 'rgba(255,255,255,0.3)' }}
                />
              </motion.div>

              <motion.span
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 5,
                  scale: isActive ? 1 : 0.8,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="text-[9px] font-bold tracking-wider relative z-10"
                style={{ color }}
              >
                {tab.label}
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
