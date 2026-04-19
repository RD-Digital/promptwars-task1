import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  Sparkles, ChevronRight, Map, Zap, Ticket
} from 'lucide-react';

const slides = [
  {
    image: '/assets/update1.png',
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
    image: '/assets/update2.png',
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
    image: '/assets/update3.png',
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
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-[#060a13]" id="onboarding-screen">
      {/* Animated background shadows */}
      <motion.div
        className="orb w-[350px] h-[350px] absolute -top-32 -right-32 orb-animate pointer-events-none"
        style={{ background: slides[activeIdx].orb1, transition: 'background 0.8s ease' }}
        aria-hidden="true"
      />
      <motion.div
        className="orb w-[250px] h-[250px] absolute bottom-32 -left-24 orb-animate-delay pointer-events-none"
        style={{ background: slides[activeIdx].orb2, transition: 'background 0.8s ease' }}
        aria-hidden="true"
      />

      {/* App Header / Logo */}
      <header className="flex items-center gap-2.5 px-8 pt-14 relative z-10">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #22d3ee)' }}>
          <span className="text-white font-black text-xs" style={{ fontFamily: 'serif' }}>SF</span>
        </div>
        <span className="text-white font-bold text-sm tracking-tight">StadiumFlow AI</span>
        <span className="ml-auto text-[10px] font-bold text-neon-gold/80 bg-neon-gold/10 px-2.5 py-1 rounded-full">
          El Clásico
        </span>
      </header>

      {/* Swiper Content */}
      <section className="flex-1 flex flex-col justify-center relative z-10" aria-label="Welcome Slides">
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
                {/* Visual Icon */}
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  className="relative mb-10 group"
                >
                  <div className="absolute inset-[-40px] rounded-full opacity-40 blur-3xl pointer-events-none transition-transform duration-1000 group-hover:scale-110"
                    style={{ background: `radial-gradient(circle, ${slide.iconGlow}, transparent)` }} aria-hidden="true" />
                  
                  {/* Background Image Layer */}
                  <div className="absolute inset-[-10px] rounded-3xl overflow-hidden opacity-30 group-hover:opacity-50 transition-opacity duration-500" aria-hidden="true">
                    <img src={slide.image} alt="" className="w-full h-full object-cover" />
                  </div>

                  <div className="w-24 h-24 rounded-3xl flex items-center justify-center float relative z-10"
                    style={{
                      background: slide.iconGradient,
                      boxShadow: `0 20px 60px ${slide.iconGlow}`,
                    }}>
                    <slide.icon size={44} className="text-white" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                </motion.div>

                <span className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4 text-white/40">
                  {slide.tag}
                </span>

                <h1 className="text-fluid-xl text-white text-center mb-4 leading-tight">
                  {slide.title}
                </h1>

                <p className="text-sm text-white/40 text-center leading-relaxed max-w-[280px]">
                  {slide.desc}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-6" role="tablist" aria-label="Slide Selection">
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
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === activeIdx}
              role="tab"
            />
          ))}
        </div>
      </section>

      {/* Footer Actions */}
      <footer className="px-8 pb-14 flex flex-col gap-3 relative z-50">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5, type: 'spring' }}
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
              }}
              aria-label="Next slide"
            >
              Next <ChevronRight size={16} aria-hidden="true" />
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
              }}
              aria-label="Enter StadiumFlow application"
            >
              <Sparkles size={16} aria-hidden="true" /> Enter StadiumFlow
            </motion.button>
          )}
        </motion.div>

        <button
          onClick={onEnter}
          className="text-white/30 text-xs font-semibold text-center bg-transparent border-none cursor-pointer p-2"
          aria-label="Skip onboarding intro"
        >
          Skip intro
        </button>
      </footer>
    </main>
  );
}
