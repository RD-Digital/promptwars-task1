import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Bot } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

const quickReplies = [
  { label: '🧭 Find my seat', route: 'seatassist' },
  { label: '🚗 Book a cab',   route: 'cabbooking' },
  { label: '⚡ Skip queue',   route: 'skipqueue' },
  { label: '🗺️ Stadium map',  route: 'map' },
  { label: '🎫 My ticket',    route: 'ticket' },
];

const AI_RESPONSES = {
  default: (text) => `I found the perfect option for "${text.substring(0, 30)}" — let me pull that up for you now!`,
  seat: 'Your seat is in Section 105, Row 12. Head through Gate B and take the escalator up 2 levels. Should take about 4 minutes!',
  cab: 'I\'ve found 3 cabs nearby. Nearest is 2 min away. Current surge: 1.2x. Shall I book the fastest one?',
  queue: 'Gate 7 has the shortest queue right now (3 min wait). Gate 12 is busy. I recommend Gate 7!',
  map: 'Opening the stadium map for you. Your marked hotspots are highlighted in blue!',
};

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1 p-3.5 max-w-[80px]"
      style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '16px 16px 16px 4px' }}>
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: 'rgba(255,255,255,0.4)' }}
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function AIMessage({ text, timestamp }) {
  return (
    <div className="self-start flex gap-2 items-end max-w-[88%]">
      <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mb-1"
        style={{ background: 'linear-gradient(135deg, #3b82f6, #22d3ee)' }}>
        <Bot size={12} className="text-white" />
      </div>
      <div>
        <div className="p-3.5 text-sm leading-relaxed text-white/85"
          style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '16px 16px 16px 4px' }}>
          {text}
        </div>
        {timestamp && <p className="text-[9px] text-white/20 mt-1 ml-1">{timestamp}</p>}
      </div>
    </div>
  );
}

function UserMessage({ text, timestamp }) {
  return (
    <div className="self-end max-w-[85%]">
      <div className="p-3.5 rounded-[16px_16px_4px_16px] text-sm leading-relaxed text-white"
        style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
        {text}
      </div>
      {timestamp && <p className="text-[9px] text-white/20 mt-1 mr-1 text-right">{timestamp}</p>}
    </div>
  );
}

const getTime = () => {
  const d = new Date();
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}`;
};

export default function AIAssistant({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'ai', text: "Hey! I'm your StadiumFlow AI. I know everything about today's match — seats, queues, transport, food. What do you need? 🏟️", ts: getTime() }
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  const handleSend = (text) => {
    if (!text.trim()) return;
    const ts = getTime();
    setMessages(prev => [...prev, { from: 'user', text, ts }]);
    setInput('');
    setThinking(true);
    const delay = 900 + Math.random() * 600;
    setTimeout(() => {
      setThinking(false);
      const lower = text.toLowerCase();
      const reply = lower.includes('seat') ? AI_RESPONSES.seat
        : lower.includes('cab') || lower.includes('taxi') ? AI_RESPONSES.cab
        : lower.includes('queue') || lower.includes('wait') ? AI_RESPONSES.queue
        : lower.includes('map') ? AI_RESPONSES.map
        : AI_RESPONSES.default(text);
      setMessages(prev => [...prev, { from: 'ai', text: reply, ts: getTime() }]);
    }, delay);
  };

  const handleQuickReply = (reply) => {
    const ts = getTime();
    setMessages(prev => [...prev, { from: 'user', text: reply.label, ts }]);
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages(prev => [...prev, {
        from: 'ai',
        text: `On it! Taking you to ${reply.label.slice(2)} now... 🚀`,
        ts: getTime(),
      }]);
      setTimeout(() => {
        setIsOpen(false);
        onNavigate(reply.route);
      }, 700);
    }, 500);
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="absolute right-5 z-40 border-none cursor-pointer"
        style={{ bottom: '92px' }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative">
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ background: 'rgba(59,130,246,0.4)' }}
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              boxShadow: '0 0 30px rgba(59,130,246,0.5), 0 8px 20px rgba(0,0,0,0.4)',
            }}>
            <Sparkles size={20} className="text-white" />
          </div>
        </div>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="ai-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 max-w-[430px] mx-auto h-[78vh] rounded-t-[28px] overflow-hidden flex flex-col"
              style={{
                background: 'rgba(10,14,26,0.97)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderBottom: 'none',
                boxShadow: '0 -24px 80px rgba(0,0,0,0.9)',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-5 pb-4"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-3">
                  <motion.div
                    className="relative w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #22d3ee)' }}
                    animate={{ boxShadow: ['0 0 15px rgba(59,130,246,0.4)', '0 0 30px rgba(59,130,246,0.7)', '0 0 15px rgba(59,130,246,0.4)'] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <Bot size={18} className="text-white" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[rgba(10,14,26,0.97)]"
                      style={{ background: '#10b981' }} />
                  </motion.div>
                  <div>
                    <h3 className="text-[15px] font-bold text-white leading-tight">Stadium AI</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-green live-dot" />
                      <p className="text-[10px] font-semibold" style={{ color: '#10b981' }}>Online · Powered by Gemini</p>
                    </div>
                  </div>
                </div>
                <motion.button whileTap={{ scale: 0.85 }} onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border-none cursor-pointer">
                  <X size={16} className="text-white/60" />
                </motion.button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 flex flex-col gap-3 screen-scroll">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  >
                    {msg.from === 'ai'
                      ? <AIMessage text={msg.text} timestamp={msg.ts} />
                      : <UserMessage text={msg.text} timestamp={msg.ts} />
                    }
                  </motion.div>
                ))}
                {thinking && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ThinkingDots />
                  </motion.div>
                )}
              </div>

              {/* Quick Replies */}
              <div className="flex gap-2 px-5 py-3 overflow-x-auto screen-scroll"
                style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                {quickReplies.map((reply, i) => (
                  <motion.button
                    key={i}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => handleQuickReply(reply)}
                    className="shrink-0 text-white text-xs font-semibold py-2 px-3.5 rounded-full cursor-pointer whitespace-nowrap border-none"
                    style={{
                      background: 'rgba(59,130,246,0.12)',
                      border: '1px solid rgba(59,130,246,0.3)',
                      color: '#93c5fd',
                    }}
                  >
                    {reply.label}
                  </motion.button>
                ))}
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 p-4 pt-2"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend(input)}
                  placeholder="Ask anything about the stadium..."
                  className="flex-1 rounded-2xl py-3 px-4 text-sm text-white outline-none transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onFocus={e => e.target.style.border = '1px solid rgba(59,130,246,0.5)'}
                  onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.08)'}
                />
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => handleSend(input)}
                  className="w-11 h-11 rounded-xl flex items-center justify-center border-none cursor-pointer shrink-0"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}
                >
                  <Send size={16} className="text-white" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
