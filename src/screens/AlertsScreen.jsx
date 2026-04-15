import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Bell, Shield, Activity, Navigation, ArrowLeft, Clock, CheckCheck, X } from 'lucide-react';
import { toast } from 'sonner';

const TABS = ['All', 'Urgent', 'Info', 'Transport'];

const alerts = [
  { icon: AlertTriangle, title: 'Gate 12 Congested', text: 'High crowd density detected. Use Gate 44 instead for 3× faster entry.', time: '2 min ago', color: '#ef4444', type: 'Urgent', urgent: true },
  { icon: Activity,      title: 'Match Starting Soon', text: 'Kickoff in under 3 hours. Head to your seat via Concourse B for best view.', time: '5 min ago', color: '#f59e0b', type: 'Info', urgent: false },
  { icon: Navigation,    title: 'Route Updated', text: 'Your fastest route now goes through Concourse B — saves 4 minutes.', time: '8 min ago', color: '#3b82f6', type: 'Transport', urgent: false },
  { icon: Shield,        title: 'Security Check Open', text: 'Fast-track lane at Gate 44 is now fully operational. No wait time.', time: '15 min ago', color: '#10b981', type: 'Info', urgent: false },
  { icon: Bell,          title: 'Food Stand Offer', text: 'Complimentary matchday snack pack at Stand C2 for Premium members.', time: '22 min ago', color: '#a855f7', type: 'Info', urgent: false },
];

export default function AlertsScreen({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('All');
  const [dismissed, setDismissed] = useState([]);

  const filtered = alerts.filter((a, i) =>
    !dismissed.includes(i) && (activeTab === 'All' || a.type === activeTab)
  );

  const handleMarkAllRead = () => {
    toast.success('All alerts marked as read', { icon: '✓' });
  };

  const handleDismiss = (idx) => {
    setDismissed(prev => [...prev, idx]);
    toast('Alert dismissed', { icon: '🗑️' });
  };

  return (
    <div className="screen-scroll relative">
      <div className="orb w-[220px] h-[220px] fixed top-10 -right-10 orb-animate"
        style={{ background: 'rgba(239,68,68,0.12)', filter: 'blur(80px)' }} />

      <div className="px-5 pb-36 pt-4 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button whileTap={{ scale: 0.85 }} onClick={() => onNavigate('home')}
              className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer border-none"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <ArrowLeft size={16} className="text-white/70" />
            </motion.button>
            <div>
              <h2 className="text-xl font-bold text-white">Live Alerts</h2>
              <p className="text-[11px] text-white/30 font-semibold">AI-powered safety updates</p>
            </div>
          </div>
          <motion.button whileTap={{ scale: 0.9 }} onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 text-[11px] font-bold border-none cursor-pointer px-3 py-1.5 rounded-full"
            style={{ color: '#3b82f6', background: 'rgba(59,130,246,0.1)' }}>
            <CheckCheck size={13} /> Mark read
          </motion.button>
        </div>

        {/* Filter Tabs */}
        <div className="relative flex gap-1 p-1 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
          {TABS.map(tab => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 relative z-10 py-2 text-[12px] font-bold rounded-xl border-none cursor-pointer transition-colors duration-200"
              style={{
                background: activeTab === tab ? 'rgba(59,130,246,0.2)' : 'transparent',
                color: activeTab === tab ? '#3b82f6' : 'rgba(255,255,255,0.35)',
              }}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {/* Alert List */}
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-white/20 text-sm font-semibold">
                No alerts in this category
              </motion.div>
            )}
            {alerts.map((alert, i) => {
              if (dismissed.includes(i)) return null;
              if (activeTab !== 'All' && alert.type !== activeTab) return null;
              return (
                <motion.div
                  key={i}
                  layout
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 80, transition: { duration: 0.25 } }}
                  transition={{ delay: filtered.indexOf(alert) * 0.06, type: 'spring', stiffness: 220 }}
                  className="glass rounded-[20px] p-4 flex items-start gap-4 relative overflow-hidden"
                  style={alert.urgent ? { boxShadow: '0 0 30px rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.2)' } : {}}
                >
                  {/* Urgent glow */}
                  {alert.urgent && (
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/[0.1] to-transparent" />
                  )}

                  {/* Icon with urgent pulse */}
                  <div className="relative shrink-0">
                    <div className="p-2.5 rounded-xl relative z-10"
                      style={{ background: `${alert.color}18`, border: `1px solid ${alert.color}30` }}>
                      <alert.icon size={19} style={{ color: alert.color }} />
                    </div>
                    {alert.urgent && (
                      <div className="absolute inset-0 rounded-xl z-0"
                        style={{
                          background: alert.color,
                          animation: 'pulse-ring 2s infinite',
                          '--pulse-color': `${alert.color}60`,
                        }} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="text-sm font-bold text-white">{alert.title}</h4>
                      {alert.urgent && (
                        <span className="shrink-0 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{ color: '#ef4444', background: 'rgba(239,68,68,0.15)' }}>
                          URGENT
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed">{alert.text}</p>
                    <p className="text-[10px] text-white/20 mt-2 flex items-center gap-1">
                      <Clock size={9} /> {alert.time}
                    </p>
                  </div>

                  {/* Dismiss */}
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => handleDismiss(i)}
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-none cursor-pointer"
                    style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <X size={12} className="text-white/30" />
                  </motion.button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
