 
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  Sparkles, ChevronRight, Map, Zap, Shield,
  Navigation, Bell, Ticket
} from 'lucide-react';

const slides = [
  {
    icon: Ticket,
    iconGradient: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
    iconGlow: 'rgba(59,130,246,0.5)',
    tag: 'DIGITAL TICKETS',
    title: 'Your Matchday\nPassport',
    desc: 'QR-powered entry, seat finder, and live match updates — all in one tap.',
    orb1: 'rgba(59,130,246,0.25)',
    orb2: 'rgba(34,211,238,0.15)',
  },
  {
    icon: Map,
    iconGradient: 'linear-gradient(135deg, #10b981, #22d3ee)',
    iconGlow: 'rgba(16,185,129,0.5)',
    tag: 'SMART NAVIGATION',
    title: 'Find Anything\nInstantly',
    desc: 'Real-time crowd heatmaps, AI-optimized routes, and gate-by-gate guidance.',
    orb1: 'rgba(16,185,129,0.2)',
    orb2: 'rgba(34,211,238,0.12)',
  },
  {
    icon: Zap,
    iconGradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    iconGlow: 'rgba(245,158,11,0.5)',
    tag: 'EXCLUSIVE PERKS',
    title: 'Skip Lines,\nNot the Fun',
    desc: 'Fast-track entry, priority cab booking, and emergency SOS at your fingertips.',
    orb1: 'rgba(245,158,11,0.2)',
    orb2: 'rgba(239,68,68,0.12)',
  },
];

export default function OnboardingScreen({ onEnter }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const swiperRef = useRef(null);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'var(--color-bg-base)' }}>

      {/* Animated background */}
      <motion.div
        className="orb w-[350px] h-[350px] absolute -top-32 -right-32 orb-animate"
        style={{ background: slides[activeIdx].orb1, transition: 'background 0.8s ease' }}
      />
      <motion.div
        className="orb w-[250px] h-[250px] absolute bottom-32 -left-24 orb-animate-delay"
        style={{ background: slides[activeIdx].orb2, transition: 'background 0.8s ease' }}
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2.5 px-8 pt-14"
      >
        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #22d3ee)' }}>
          <span className="text-white font-black text-xs" style={{ fontFamily: 'serif' }}>SF</span>
        </div>
        <span className="text-white font-bold text-sm tracking-tight">StadiumFlow AI</span>
        <span className="ml-auto text-[10px] font-bold text-neon-gold/80 bg-neon-gold/10 px-2.5 py-1 rounded-full">
          El Clásico
        </span>
      </motion.div>

      {/* Swiper Slides */}
      <div className="flex-1 flex flex-col justify-center">
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          onSwiper={s => { swiperRef.current = s; }}
          onSlideChange={s => setActiveIdx(s.activeIndex)}
          pagination={false}
          className="w-full"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col items-center px-8 pt-8 pb-4">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  className="relative mb-10"
                >
                  {/* Outer ring */}
                  <div className="absolute inset-[-20px] rounded-full opacity-20 float"
                    style={{ background: `radial-gradient(circle, ${slide.iconGlow}, transparent)` }} />
                  <div className="w-24 h-24 rounded-3xl flex items-center justify-center float"
                    style={{
                      background: slide.iconGradient,
                      boxShadow: `0 20px 60px ${slide.iconGlow}`,
                    }}>
                    <slide.icon size={44} className="text-white" strokeWidth={1.5} />
                  </div>
                </motion.div>

                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {slide.tag}
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                  className="text-fluid-xl text-white text-center mb-4"
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                  className="text-sm text-white/40 text-center leading-relaxed max-w-[280px]"
                >
                  {slide.desc}
                </motion.p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {slides.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => swiperRef.current?.slideTo(i)}
              className="border-none cursor-pointer p-0"
              animate={{
                width: i === activeIdx ? 24 : 6,
                background: i === activeIdx ? '#3b82f6' : 'rgba(255,255,255,0.2)',
              }}
              style={{ height: 6, borderRadius: 3 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="px-8 pb-14 flex flex-col gap-3"
      >
        {activeIdx < slides.length - 1 ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => swiperRef.current?.slideNext()}
            className="w-full font-bold py-4.5 rounded-2xl text-sm border-none cursor-pointer flex items-center justify-center gap-2 tracking-wide btn-shimmer"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              boxShadow: '0 10px 40px rgba(59,130,246,0.4)',
              color: 'white',
              paddingTop: '1.125rem',
              paddingBottom: '1.125rem',
            }}
          >
            Next <ChevronRight size={16} />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onEnter}
            className="w-full font-bold py-4.5 rounded-2xl text-sm border-none cursor-pointer flex items-center justify-center gap-2 tracking-wide btn-shimmer"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              boxShadow: '0 10px 40px rgba(59,130,246,0.4)',
              color: 'white',
              paddingTop: '1.125rem',
              paddingBottom: '1.125rem',
            }}
          >
            <Sparkles size={16} /> Enter StadiumFlow
          </motion.button>
        )}

        <button
          onClick={onEnter}
          className="text-white/30 text-xs font-semibold text-center bg-transparent border-none cursor-pointer"
        >
          Skip intro
        </button>
      </motion.div>
    </div>
  );
}
