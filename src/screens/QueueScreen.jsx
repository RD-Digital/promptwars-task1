import { motion } from 'framer-motion';
import { Clock, Users, ArrowLeft, Zap, TrendingDown } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip,
} from 'recharts';
import { toast } from 'sonner';

const queues = [
  { name: 'Security Gate 44', wait: 3,  people: 24, status: 'low',    recommended: true },
  { name: 'Food Court A',      wait: 8,  people: 56, status: 'medium', recommended: false },
  { name: 'Merch Store',       wait: 12, people: 78, status: 'high',   recommended: false },
  { name: 'Restroom Block C',  wait: 2,  people: 8,  status: 'low',    recommended: false },
];

const chartData = queues.map(q => ({ name: q.name.split(' ').slice(-1)[0], wait: q.wait }));

const STATUS = {
  low:    { text: '#10b981', bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.25)',  label: 'Short',    barColor: '#10b981' },
  medium: { text: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)',  label: 'Moderate', barColor: '#f59e0b' },
  high:   { text: '#ef4444', bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.25)',   label: 'Long',     barColor: '#ef4444' },
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="px-3 py-2 rounded-xl text-xs font-bold text-white"
        style={{ background: 'rgba(14,21,38,0.95)', border: '1px solid rgba(255,255,255,0.1)' }}>
        {payload[0].value} min wait
      </div>
    );
  }
  return null;
};

export default function QueueScreen({ onNavigate }) {
  return (
    <main className="screen-scroll relative" id="queue-screen">
      <div className="orb w-[220px] h-[220px] fixed top-20 -right-10 orb-animate pointer-events-none"
        style={{ background: 'rgba(245,158,11,0.12)', filter: 'blur(80px)' }} aria-hidden="true" />

      <div className="px-5 pb-36 pt-4 flex flex-col gap-5">
        {/* Header */}
        <header className="flex items-center gap-3">
          <motion.button 
            whileTap={{ scale: 0.85 }} 
            onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer border-none"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
            aria-label="Back to Home"
          >
            <ArrowLeft size={16} className="text-white/70" aria-hidden="true" />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold text-white">Live Queues</h1>
            <p className="text-[11px] text-white/30 font-semibold" aria-hidden="true">Real-time wait estimates</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="ml-auto flex items-center gap-1.5 text-[11px] font-bold border-none cursor-pointer px-3 py-1.5 rounded-full"
            style={{ color: '#f59e0b', background: 'rgba(245,158,11,0.1)' }}
            onClick={() => toast.success('Queue data refreshed!')}
            aria-label="Refresh queue data"
          >
            <TrendingDown size={12} aria-hidden="true" /> Refresh
          </motion.button>
        </header>

        {/* Bar Chart */}
        <section 
          className="glass rounded-[22px] p-5"
          aria-label="Queue wait time comparison chart"
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/30 mb-4" aria-hidden="true">Wait Time Comparison</p>
          <div className="h-[120px] w-full" aria-hidden="true">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barCategoryGap="30%">
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700 }} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                <Bar dataKey="wait" radius={[6, 6, 0, 0]}>
                  {queues.map((q, i) => (
                    <Cell key={i} fill={STATUS[q.status].barColor} opacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Accessible chart description */}
          <div className="sr-only">
            This chart shows wait times for different stadium locations. 
            {queues.map(q => `${q.name}: ${q.wait} minutes.`).join(' ')}
          </div>
        </section>

        {/* Queue Cards */}
        <section aria-label="Status of individual queues">
          <div className="flex flex-col gap-3">
            {queues.map((q, i) => {
              const sc = STATUS[q.status];
              const barWidth = `${(q.wait / 15) * 100}%`;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -22 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, type: 'spring', stiffness: 220 }}
                  className="glass rounded-[20px] p-4 relative overflow-hidden"
                  style={q.recommended ? { border: `1px solid ${sc.border}`, boxShadow: `0 0 20px ${sc.bg}` } : {}}
                  aria-label={`${q.name}: ${q.wait} minute wait, ${q.people} people in line. Status: ${sc.label}.${q.recommended ? ' Recommended for shortest wait.' : ''}`}
                >
                  {q.recommended && (
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/[0.08] to-transparent" aria-hidden="true" />
                  )}
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="p-3 rounded-xl" style={{ background: sc.bg, border: `1px solid ${sc.border}` }}>
                      <Clock size={20} style={{ color: sc.text }} aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-[15px] font-bold text-white">{q.name}</h3>
                        {q.recommended && (
                          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{ color: '#10b981', background: 'rgba(16,185,129,0.15)' }}>
                            Best
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mb-2" aria-hidden="true">
                        <span className="text-[11px] text-white/30 flex items-center gap-1">
                          <Clock size={9} /> ~{q.wait} min
                        </span>
                        <span className="text-[11px] text-white/30 flex items-center gap-1">
                          <Users size={9} /> {q.people} in line
                        </span>
                      </div>
                      {/* Animated progress bar */}
                      <div className="progress-track" aria-hidden="true">
                        <motion.div
                          className="progress-fill"
                          initial={{ width: 0 }}
                          animate={{ width: barWidth }}
                          transition={{ duration: 1.2, ease: 'easeOut', delay: i * 0.1 }}
                          style={{ background: sc.text, boxShadow: `0 0 8px ${sc.text}60` }}
                        />
                      </div>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0"
                      style={{ color: sc.text, background: sc.bg, border: `1px solid ${sc.border}` }}
                      aria-hidden="true"
                    >
                      {sc.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Fast Track CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onNavigate('skipqueue')}
          className="w-full font-bold py-4 rounded-2xl text-sm border-none cursor-pointer flex items-center justify-center gap-2 btn-shimmer"
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#0a0e1a',
            boxShadow: '0 0 30px rgba(245,158,11,0.3)',
          }}
          aria-label="Access Fast Track Entry services to skip the queue"
        >
          <Zap size={16} aria-hidden="true" /> Skip the Queue · Fast Track Entry
        </motion.button>
      </div>
    </main>
  );
}
