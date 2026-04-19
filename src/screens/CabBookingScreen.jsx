import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Clock, Check, ArrowLeft, Star, User, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

const rides = [
  { type: 'UberX',        time: 3, price: 8.5,  seats: 4, rating: 4.9,  surge: false },
  { type: 'Uber Comfort', time: 5, price: 12.0, seats: 4, rating: 4.95, surge: true },
  { type: 'Uber XL',      time: 7, price: 18.5, seats: 6, rating: 4.8,  surge: false },
];

export default function CabBookingScreen({ onNavigate }) {
  const [selected, setSelected]   = useState(0);
  const [booked, setBooked]       = useState(false);
  const [driverEta, setDriverEta] = useState(rides[0].time);

  // Countdown after booking
  useEffect(() => {
    if (!booked) return;
    const t = setInterval(() => setDriverEta(e => Math.max(1, e - 0.1)), 6000);
    return () => clearInterval(t);
  }, [booked]);

  const handleBook = () => {
    setBooked(true);
    setDriverEta(rides[selected].time);
    toast.success(`🚗 ${rides[selected].type} confirmed! Driver en route.`);
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#3b82f6', '#22d3ee', '#10b981', '#ffffff'],
      });
    }, 300);
  };

  return (
    <main className="screen-scroll relative" id="cab-booking-screen">
      <div className="orb w-[260px] h-[260px] fixed top-20 -right-20 orb-animate pointer-events-none"
        style={{ background: 'rgba(59,130,246,0.14)', filter: 'blur(80px)' }} aria-hidden="true" />

      <div className="px-5 pb-36 pt-4 flex flex-col gap-5">
        {/* Header */}
        <header className="flex items-center gap-3">
          <motion.button 
            whileTap={{ scale: 0.85 }} 
            onClick={() => onNavigate('transport')}
            className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer border-none"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
            aria-label="Back to Transport Hub"
          >
            <ArrowLeft size={16} className="text-white/70" aria-hidden="true" />
          </motion.button>
          <h1 className="text-xl font-bold text-white">Book a Ride</h1>
        </header>

        {/* Route Summary */}
        <section className="glass rounded-[22px] p-5" aria-label="Route summary">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex flex-col items-center gap-1" aria-hidden="true">
              <div className="w-3 h-3 rounded-full border-2" style={{ background: '#10b981', borderColor: '#10b98160' }} />
              <motion.div
                className="w-[2px] h-8"
                style={{ background: 'linear-gradient(to bottom, #10b981, #3b82f6)' }}
                animate={{ scaleY: [0.8, 1, 0.8] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <div className="w-3 h-3 rounded-full border-2" style={{ background: '#3b82f6', borderColor: '#3b82f660' }} />
            </div>
            <div className="flex-1 flex flex-col justify-between" style={{ height: 60 }}>
              <div>
                <p className="text-sm font-bold text-white">Santiago Bernabéu</p>
                <p className="text-[11px] text-white/30">North Sector Pickup · P3</p>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Your Destination</p>
                <p className="text-[11px] text-white/30">Set after match</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ride Options */}
        <section aria-label="Choose ride type">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/25 mb-3">Choose Ride</h2>
          <div className="flex flex-col gap-3">
            {rides.map((ride, i) => {
              const isSelected = selected === i && !booked;
              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, type: 'spring', stiffness: 220 }}
                  whileTap={!booked ? { scale: 0.97 } : {}}
                  onClick={() => !booked && (setSelected(i))}
                  disabled={booked}
                  className={`glass rounded-[20px] p-4 flex items-center gap-4 border-none cursor-pointer text-left w-full transition-all duration-200 ${isSelected ? 'ring-2 ring-blue-500/50' : ''}`}
                  style={{
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: isSelected ? '0 0 30px rgba(59,130,246,0.15)' : 'none',
                  }}
                  aria-label={`${ride.type}. Price: ${ride.price.toFixed(2)} Euro. ETA: ${ride.time} minutes. Rating: ${ride.rating}. ${ride.surge ? 'Surge pricing active.' : ''}`}
                  aria-pressed={isSelected}
                >
                  <div className="p-3 rounded-xl relative"
                    style={{ background: isSelected ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.06)' }}>
                    <Car size={21} style={{ color: isSelected ? '#3b82f6' : 'rgba(255,255,255,0.4)' }} aria-hidden="true" />
                    {ride.surge && (
                      <span className="absolute -top-1 -right-1 text-[7px] font-black px-1 rounded-full"
                        style={{ background: '#ef4444', color: 'white' }}>
                        1.2×
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[15px] font-bold text-white">{ride.type}</h3>
                    <div className="flex items-center gap-2 mt-0.5" aria-hidden="true">
                      <span className="text-[11px] text-white/30 flex items-center gap-1">
                        <Clock size={9} /> {ride.time} min
                      </span>
                      <span className="text-white/20 text-[11px]">·</span>
                      <span className="text-[11px] text-white/30 flex items-center gap-0.5">
                        <Star size={9} style={{ fill: 'rgba(245,158,11,0.7)', color: '#f59e0b' }} /> {ride.rating}
                      </span>
                      <span className="text-white/20 text-[11px]">·</span>
                      <span className="text-[11px] text-white/30">{ride.seats} seats</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-white">€{ride.price.toFixed(2)}</span>
                    {ride.surge && <p className="text-[10px] text-[#ef4444]" aria-hidden="true">Surge</p>}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* CTA / Driver Card */}
        <section aria-live="polite">
          <AnimatePresence mode="wait">
            {!booked ? (
              <motion.button
                key="book"
                whileTap={{ scale: 0.97 }}
                onClick={handleBook}
                className="w-full font-bold py-4 rounded-2xl text-sm border-none cursor-pointer flex items-center justify-center gap-2 btn-shimmer"
                style={{ background: 'white', color: '#060a13' }}
                aria-label={`Confirm booking of ${rides[selected].type} for ${rides[selected].price.toFixed(2)} Euro`}
              >
                <Car size={17} aria-hidden="true" /> Confirm {rides[selected].type} · €{rides[selected].price.toFixed(2)}
              </motion.button>
            ) : (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col gap-3"
              >
                {/* Driver Card */}
                <div className="glass rounded-[22px] p-5"
                  style={{ border: '1px solid rgba(16,185,129,0.3)', boxShadow: '0 0 30px rgba(16,185,129,0.12)' }}
                  aria-label="Driver details"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #3b82f6, #22d3ee)' }}>
                      <User size={24} className="text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-black text-white">Carlos R.</h3>
                      <div className="flex items-center gap-1" aria-label="Driver rating 5 out of 5 stars">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} size={11} style={{ fill: '#f59e0b', color: '#f59e0b' }} aria-hidden="true" />
                        ))}
                        <span className="text-[10px] text-white/40 ml-1">4.97</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-white/30 font-semibold" aria-hidden="true">ETA</p>
                      <p className="text-2xl font-black text-white" aria-label={`Estimated arrival in ${Math.ceil(driverEta)} minutes`}>{Math.ceil(driverEta)}<span className="text-sm text-white/40"> min</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <Car size={14} className="text-white/30" aria-hidden="true" />
                    <span className="text-xs text-white/50">Toyota Prius · <span className="text-white font-bold">4MPZ 198</span></span>
                    <span className="ml-auto text-[10px] font-bold text-[#10b981]" role="status">• En Route</span>
                  </div>

                  {/* Animated progress bar */}
                  <div className="progress-track mt-3" aria-hidden="true">
                    <motion.div
                      className="progress-fill"
                      animate={{ width: `${Math.max(10, 100 - (driverEta / rides[selected].time) * 100)}%` }}
                      transition={{ duration: 0.8 }}
                      style={{ background: '#10b981' }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#10b981]">
                  <Check size={16} aria-hidden="true" /> Ride Confirmed · Head to Pickup Zone P3
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
