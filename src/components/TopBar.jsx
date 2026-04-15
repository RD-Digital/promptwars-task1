import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, User, X, Ticket, Activity, HelpCircle, Tag, ChevronRight, Zap } from 'lucide-react';

const SCORE_STATES = [
  { home: 2, away: 0, minute: "67'" },
  { home: 2, away: 1, minute: "78'" },
  { home: 3, away: 1, minute: "82'" },
];

export default function TopBar({ onNavigate }) {
  const [showNotify, setShowNotify] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [scoreIdx, setScoreIdx] = useState(0);
  const [unreadCount, setUnreadCount] = useState(4);

  // Live score ticker
  useEffect(() => {
    const t = setInterval(() => {
      setScoreIdx(i => (i + 1) % SCORE_STATES.length);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  const score = SCORE_STATES[scoreIdx];

  const notifications = [
    { icon: Activity,   title: 'Match Update',  text: 'Real Madrid 2 - 0 Barcelona (Live)', color: 'text-neon-green' },
    { icon: User,       title: 'Account',        text: 'Membership renewed successfully.',   color: 'text-neon-blue' },
    { icon: Ticket,     title: 'Ticket',          text: 'Section 105, Row 12, Seat 23H verified.', color: 'text-neon-gold' },
    { icon: HelpCircle, title: 'Stadium',         text: 'Gate 44 is the fastest entry right now.', color: 'text-neon-cyan' },
  ];

  const handleOpenNotify = () => {
    setShowNotify(true);
    setUnreadCount(0);
  };

  return (
    <>
      <div className="flex justify-between items-center px-5 pt-5 pb-3 sticky top-0 z-30"
        style={{ background: 'rgba(6,10,19,0.85)', backdropFilter: 'blur(24px)' }}
      >
        {/* Logo + Live Score ticker */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg relative"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
              boxShadow: '0 4px 20px rgba(59,130,246,0.4)',
            }}
          >
            <span className="text-white font-black text-sm tracking-tight" style={{ fontFamily: 'serif' }}>SF</span>
            {/* Animated gradient ring */}
            <motion.div
              className="absolute inset-[-3px] rounded-[14px]"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #22d3ee, #a855f7)',
                opacity: 0.5,
                zIndex: -1,
                filter: 'blur(4px)',
              }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          <div>
            <h2 className="text-[15px] font-bold text-white leading-tight">StadiumFlow AI</h2>
            {/* Live score ticker */}
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green live-dot" />
              <AnimatePresence mode="wait">
                <motion.p
                  key={scoreIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                  className="text-[11px] font-bold text-neon-gold leading-tight"
                >
                  RM {score.home} – {score.away} BAR · {score.minute}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpenNotify}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer border-none"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <Bell size={17} className="text-white/70" />
            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-black text-white"
                  style={{ background: '#ef4444', boxShadow: '0 0 10px rgba(239,68,68,0.6)' }}
                >
                  {unreadCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowProfile(true)}
            className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer border-none"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <User size={17} className="text-white/70" />
          </motion.button>
        </div>
      </div>

      {/* Notifications Modal */}
      <AnimatePresence>
        {showNotify && (
          <motion.div
            key="notify-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowNotify(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="modal-content"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Notifications</h2>
                  <p className="text-xs text-white/30 mt-0.5">All caught up!</p>
                </div>
                <motion.button whileTap={{ scale: 0.85 }} onClick={() => setShowNotify(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border-none cursor-pointer">
                  <X size={16} className="text-white/60" />
                </motion.button>
              </div>
              <div className="flex flex-col gap-3">
                {notifications.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="glass rounded-xl p-4 flex items-center gap-3 glass-hover"
                  >
                    <div className="p-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <item.icon size={18} className={item.color} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white mb-0.5">{item.title}</h4>
                      <p className="text-xs text-white/40">{item.text}</p>
                    </div>
                    <Zap size={14} className="text-white/20" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfile && (
          <motion.div
            key="profile-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowProfile(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="modal-content"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">My Profile</h2>
                <motion.button whileTap={{ scale: 0.85 }} onClick={() => setShowProfile(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border-none cursor-pointer">
                  <X size={16} className="text-white/60" />
                </motion.button>
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #22d3ee)' }}>
                    <User size={28} className="text-white" />
                  </div>
                  <motion.div
                    className="absolute inset-[-3px] rounded-[18px]"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #22d3ee, #a855f7)', opacity: 0.5, zIndex: -1, filter: 'blur(6px)' }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Alex Madridista</h3>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neon-gold bg-neon-gold/[0.12] px-3 py-1 rounded-full mt-1 inline-block">
                    Premium Member
                  </span>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'Games', value: '42' },
                  { label: 'Points', value: '1,840' },
                  { label: 'Tier', value: 'Gold' },
                ].map((s, i) => (
                  <div key={i} className="glass rounded-xl p-3 text-center">
                    <p className="text-base font-black text-white">{s.value}</p>
                    <p className="text-[10px] text-white/30 font-semibold mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-white/30 mb-3">Current Ticket</h4>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => { setShowProfile(false); onNavigate('ticket'); }}
                className="w-full glass rounded-2xl p-5 text-left cursor-pointer border-none mb-6 relative overflow-hidden btn-shimmer"
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(14,21,38,0.8))' }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-white">El Clásico</h3>
                    <p className="text-xs text-white/50 mt-1">Santiago Bernabéu · Apr 19</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-white">23H</span>
                    <p className="text-xs text-white/50">Sec 105 · Row 12</p>
                  </div>
                </div>
              </motion.button>

              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-white/30 mb-3">Upcoming Offer</h4>
              <div className="glass rounded-2xl p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Tag size={14} className="text-neon-gold" />
                      <span className="text-neon-gold font-bold text-sm">15% OFF</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">Real Madrid vs Sevilla</h4>
                    <p className="text-[11px] text-white/30">Member discount available</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="bg-white text-bg-base font-bold text-xs py-2 px-3 rounded-xl border-none cursor-pointer flex items-center gap-1"
                    style={{ color: '#060a13' }}
                  >
                    Book <ChevronRight size={12} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
