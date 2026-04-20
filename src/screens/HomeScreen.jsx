import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import {
  Zap, Navigation, CalendarClock, QrCode, Car, Train, Bike,
  ChevronRight, Ticket, Shield, Activity, Users,
} from 'lucide-react';

import { useCrowdData } from '../hooks/useCrowdData';
import { useCountdownTimer } from '../hooks/useCountdownTimer';
import heroImg from '../assets/hero.png';
import { logUserEvent } from '../services/firebaseService';

// Lightweight SVG sparkline
function SparkLine({ data, color = '#10b981' }) {
  if (!data || data.length < 2) return null;
  const w = 200, h = 48;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill={`${color}30`} />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }
  })
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

const sparkValues = [22, 35, 48, 42, 61, 55, 72, 68];

export default function HomeScreen({ onNavigate }) {
  const timeLeft = useCountdownTimer({ h: 2, m: 44, s: 46 });
  const { crowdData, loading: crowdLoading } = useCrowdData();
  const [tiltStyle, setTiltStyle] = useState({});
  const heroRef = useRef(null);

  // 3D tilt handler
  const handleMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltStyle({
      transform: `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.01)`,
    });
  };
  const handleMouseLeave = () => setTiltStyle({});

  const pad = (n) => String(n).padStart(2, '0');

  const handleQuickNavigation = (screen, buttonName) => {
    if(buttonName) logUserEvent('user_interaction', { button: buttonName });
    onNavigate(screen);
  };

  const quickActions = [
    { icon: Ticket, label: 'My Ticket', screen: 'ticket', grad: 'rgba(59,130,246,0.2)', glow: '#3b82f6', iColor: '#3b82f6' },
    { icon: Navigation, label: 'Find Seat', screen: 'seatassist', grad: 'rgba(34,211,238,0.2)', glow: '#22d3ee', iColor: '#22d3ee' },
    { icon: Zap, label: 'Fast Track', screen: 'skipqueue', grad: 'rgba(245,158,11,0.2)', glow: '#f59e0b', iColor: '#f59e0b' },
    { icon: Shield, label: 'SOS', screen: 'emergency', grad: 'rgba(239,68,68,0.2)', glow: '#ef4444', iColor: '#ef4444' },
    { icon: Users, label: 'Parking', screen: 'parking', grad: 'rgba(168,85,247,0.2)', glow: '#a855f7', iColor: '#a855f7' },
  ];

  const transportOptions = [
    { icon: Car, label: 'Uber / Cab', sub: 'Nearest: 2 min · 1.2x surge', color: '#3b82f6', screen: 'cabbooking' },
    { icon: Train, label: 'Metro L10', sub: 'Running till 00:30', color: '#10b981', screen: 'transport' },
    { icon: Bike, label: 'Bike Taxi', sub: '4 bikes near Gate E2', color: '#f59e0b', screen: 'transport' },
  ];

  const updates = [
    { tag: 'SQUAD', title: 'Vinícius Jr. Returns to Starting XI', time: '10m ago', image: '/assets/update1.png' },
    { tag: 'TRANSPORT', title: 'Metro Lines Extend to 00:30', time: '1h ago', image: '/assets/update2.png' },
    { tag: 'SECURITY', title: 'Fast-Track Opened at Gate 44', time: '5m ago', image: '/assets/update3.png' },
  ];

  return (
    <main className="screen-scroll relative" id="home-screen">
      {/* Background orbs */}
      <div className="orb w-[320px] h-[320px] bg-blue-500/[0.18] -top-20 -right-20 fixed orb-animate pointer-events-none" aria-hidden="true" />
      <div className="orb w-[220px] h-[220px] bg-yellow-500/[0.1] top-[55%] -left-24 fixed orb-animate-delay pointer-events-none" aria-hidden="true" />

      <div className="px-5 pb-36 pt-3 flex flex-col gap-5">

        {/* ══ HERO MATCH CARD ══ */}
        <section aria-label="Matchday Overview">
          <motion.div
            ref={heroRef}
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="glass relative p-6 rounded-[28px] overflow-hidden tilt-card"
            style={{
              boxShadow: '0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
              transition: 'transform 0.12s ease-out',
              ...tiltStyle,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Mesh background */}
            <div className="absolute inset-0 pointer-events-none transition-transform duration-1000"
              style={{
                backgroundImage: `url(${heroImg}), radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.25) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(245,158,11,0.18) 0%, transparent 60%)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay',
              }}
              aria-hidden="true"
            />

            {/* Live + Match */}
            <div className="relative z-10 flex justify-between items-start mb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 live-dot"
                    style={{ boxShadow: '0 0 8px rgba(239,68,68,0.7)' }} />
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-bold">Live Matchday</span>
                </div>
                <h1 className="text-[clamp(1.5rem,6vw,1.875rem)] font-black tracking-tight leading-none text-white whitespace-nowrap">
                  RMA <span className="text-white/25 mx-1">vs</span> FCB
                </h1>
                <div className="text-neon-gold font-bold text-sm mt-2 flex items-center gap-1.5" aria-label={`Time remaining: ${timeLeft.h} hours, ${timeLeft.m} minutes, ${timeLeft.s} seconds`}>
                  <CalendarClock size={13} aria-hidden="true" />
                  <span className="font-black tabular-nums">
                    {pad(timeLeft.h)}h {pad(timeLeft.m)}m {pad(timeLeft.s)}s
                  </span>
                  &nbsp;to Kickoff
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.08, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuickNavigation('ticket', 'Show Ticket')}
                className="cursor-pointer bg-white p-2.5 rounded-2xl shrink-0 border-none"
                style={{ boxShadow: '0 0 30px rgba(255,255,255,0.2)' }}
                aria-label="Show Digital Ticket QR Code"
              >
                <QrCode size={44} className="text-gray-900" aria-hidden="true" />
              </motion.button>
            </div>

            {/* Seat Details */}
            <div className="relative z-10 rounded-2xl p-4 flex justify-between mb-5"
              style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {[
                { label: 'Gate', value: '44', accent: false },
                { label: 'Block', value: '105', accent: false },
                { label: 'VIP Seat', value: '23H', accent: true },
              ].map((item, i) => (
                <div key={i} className={`text-center flex-1 ${i === 1 ? 'border-x border-white/[0.06]' : ''}`}>
                  <p className={`text-[10px] uppercase tracking-[0.15em] font-bold mb-1 ${item.accent ? 'text-yellow-400/70' : 'text-white/35'}`}>
                    {item.label}
                  </p>
                  <p className={`text-2xl font-black ${item.accent ? 'text-yellow-400' : 'text-white'}`}
                    style={item.accent ? { textShadow: '0 0 20px rgba(245,158,11,0.5)' } : {}}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <nav className="relative z-10 flex gap-3" aria-label="Essential Actions">
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="flex-1 font-bold py-3.5 rounded-2xl text-sm tracking-wide border-none cursor-pointer flex items-center justify-center gap-2"
                style={{ background: 'white', color: '#060a13' }}
                onClick={() => handleQuickNavigation('ticket', 'Show Ticket')}
                aria-label="Go to My Ticket"
              >
                <Ticket size={15} aria-hidden="true" /> View Ticket
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="flex-1 font-bold py-3.5 rounded-2xl text-sm tracking-wide cursor-pointer flex items-center justify-center gap-2 btn-shimmer"
                style={{
                  background: 'rgba(245,158,11,0.15)',
                  color: '#f59e0b',
                  border: '1px solid rgba(245,158,11,0.3)',
                }}
                onClick={() => handleQuickNavigation('skipqueue', 'Fast Track')}
                aria-label="Go to Fast Track Services"
              >
                <Zap size={15} aria-hidden="true" /> Fast Track
              </motion.button>
            </nav>
          </motion.div>
        </section>

        {/* ══ QUICK ACTIONS ══ */}
        <section aria-label="Quick Access">
          <motion.div variants={fadeUp} custom={1} initial="hidden" animate="visible">
            <Swiper modules={[]} spaceBetween={12} slidesPerView="auto" className="!overflow-visible">
              {quickActions.map((action, i) => (
                <SwiperSlide key={i} style={{ width: 'auto' }}>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.94 }}
                    className="glass flex items-center gap-3 px-5 py-3.5 rounded-2xl border-none cursor-pointer"
                    style={{ boxShadow: `0 0 20px ${action.glow}20` }}
                    onClick={() => onNavigate(action.screen)}
                    aria-label={`Navigate to ${action.label}`}
                  >
                    <div className="p-2.5 rounded-xl" style={{ background: action.grad }}>
                      <action.icon size={17} style={{ color: action.iColor }} aria-hidden="true" />
                    </div>
                    <span className="text-white font-semibold text-sm whitespace-nowrap">{action.label}</span>
                  </motion.button>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </section>

        {/* ══ SMART NAV + CROWD GRID ══ */}
        <div className="grid grid-cols-2 gap-4">
          {/* Smart Navigation */}
          <section aria-label="Navigation Guidance">
            <motion.div
              variants={fadeUp} custom={2} initial="hidden" animate="visible"
              whileHover={{ scale: 1.03, y: -4 }} whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('map', 'gate44')}
              className="glass p-4 rounded-[22px] min-h-[160px] flex flex-col justify-between cursor-pointer relative overflow-hidden"
              style={{ background: 'rgba(14,21,38,0.7)' }}
              aria-label={`Current Route: ${crowdData.gate}, ${crowdData.waitTime} walk. Tap to view on Map.`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.18] to-transparent" aria-hidden="true" />
              <svg className="absolute bottom-0 right-0 opacity-10" width="90" height="90" viewBox="0 0 100 100" aria-hidden="true">
                <path d="M90 10 Q60 40 50 60 T10 90" fill="none" stroke="white" strokeWidth="3" strokeDasharray="6,4" />
              </svg>
              <div className="relative z-10 flex justify-between items-start">
                <div className="p-2 rounded-xl" style={{ background: 'rgba(59,130,246,0.2)' }}>
                  <Navigation size={17} style={{ color: '#3b82f6' }} aria-hidden="true" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/30">Route</span>
              </div>
              <div className="relative z-10 mt-auto">
                <h4 className="text-xl font-black text-white leading-tight">{crowdData.gate}</h4>
                <p className="text-xs font-bold mt-1 tracking-wide uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>{crowdData.waitTime} walk</p>
              </div>
            </motion.div>
          </section>

          {/* Crowd Density with sparkline */}
          <section aria-label="Venue Status">
            <motion.div
              variants={fadeUp} custom={3} initial="hidden" animate="visible"
              className="glass p-4 rounded-[22px] min-h-[160px] flex flex-col justify-between relative overflow-hidden"
              aria-label={`Live venue crowd density is ${crowdData.percentage} percent.`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.15] to-transparent" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 right-0 h-16 opacity-30">
                <SparkLine data={sparkValues} color="#10b981" />
              </div>

              <div className="relative z-10 flex justify-between items-start">
                <div className="p-2 rounded-xl" style={{ background: 'rgba(16,185,129,0.2)' }}>
                  <Activity size={17} style={{ color: '#10b981' }} aria-hidden="true" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full live-dot" style={{ background: '#10b981' }} />
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#10b981' }}>Live</span>
                </div>
              </div>

              <div className="absolute top-4 right-5 text-right">
                <span className="text-3xl font-black text-white glow-green" style={{ textShadow: '0 0 20px rgba(16,185,129,0.5)' }}>
                  {crowdLoading ? '--' : crowdData.percentage}%
                </span>
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#10b981] mt-1">Live Venue</p>
              </div>

              <div className="relative z-10 mt-auto">
                <div className="w-full h-1 rounded-full mt-2 overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }}
                    animate={{ width: `${crowdData.percentage}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </motion.div>
          </section>
        </div>

        {/* ══ TRANSPORT HUB ══ */}
        <section aria-label="Transport Hub">
          <motion.div variants={fadeUp} custom={4} initial="hidden" animate="visible">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/25 mb-3 px-1">Transport Hub</h3>
            <div className="glass rounded-[22px] overflow-hidden" style={{ divide: 'rgba(255,255,255,0.06)' }}>
              {transportOptions.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-between p-4 px-5 border-none cursor-pointer text-left"
                  style={{
                    background: 'transparent',
                    borderBottom: i < transportOptions.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}
                  onClick={() => onNavigate(opt.screen)}
                  aria-label={`Select transport option: ${opt.label}. ${opt.sub}.`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl" style={{ background: `${opt.color}18`, border: `1px solid ${opt.color}30` }}>
                      <opt.icon size={19} style={{ color: opt.color }} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="font-bold text-[15px] text-white block">{opt.label}</span>
                      <span className="text-xs text-white/35 mt-0.5 block">{opt.sub}</span>
                    </div>
                  </div>
                  <ChevronRight size={17} className="text-white/20" aria-hidden="true" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ══ MATCHDAY UPDATES ══ */}
        <section aria-label="Matchday Updates">
          <motion.div variants={fadeUp} custom={5} initial="hidden" animate="visible">
            <div className="flex justify-between items-center mb-3 px-1">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/25">Matchday Updates</h3>
              <button
                onClick={() => onNavigate('alerts')}
                className="text-[11px] font-semibold bg-transparent border-none cursor-pointer"
                style={{ color: '#3b82f6' }}
                aria-label="See all alerts and updates"
              >
                See all
              </button>
            </div>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={14}
              slidesPerView={1.15}
              autoplay={{ delay: 4500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="!overflow-visible !pb-8"
            >
              {updates.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className="glass rounded-[20px] min-h-[140px] flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${item.image})` }} aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,10,19,0.95)] via-[rgba(6,10,19,0.6)] to-transparent" aria-hidden="true" />
                    <div className="relative z-10 p-4 pt-4 flex flex-col h-full justify-between">
                      <span className="text-[10px] uppercase font-black tracking-widest bg-blue-500/80 text-white w-max px-2.5 py-0.5 rounded-full backdrop-blur-md">
                        {item.tag}
                      </span>
                      <div className="mt-auto">
                        <h4 className="text-white font-bold text-[15px] leading-snug mb-0.5 line-clamp-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                          {item.title}
                        </h4>
                        <p className="text-[10px] font-semibold text-white/70 shadow-black drop-shadow-md">
                          {item.time} · Matchday
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </section>

      </div>
    </main>
  );
}
