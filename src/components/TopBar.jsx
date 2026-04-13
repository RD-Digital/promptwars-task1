import { useState } from 'react';
import { Bell, User, X, Ticket, HelpCircle, Activity, Box, Tag, ChevronRight } from 'lucide-react';

export default function TopBar() {
  const [showNotify, setShowNotify] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center" style={{ padding: '20px 20px 10px', position: 'sticky', top: 0, zIndex: 10, background: 'var(--bg-main)' }}>
        <div className="flex items-center gap-3">
          {/* Real Madrid minimal shield concept (Placeholder SVG) */}
          <div style={{ width: '40px', height: '40px', background: 'var(--accent-rm-blue)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(11,30,89,0.2)' }}>
            <span style={{ color: 'white', fontWeight: 800, fontSize: '1.2rem', fontFamily: 'serif' }}>RM</span>
          </div>
          <div>
            <h2 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--accent-rm-blue)' }}>StadiumFlow AI</h2>
            <p className="text-xs" style={{ margin: 0, color: 'var(--accent-rm-gold)', fontWeight: 600 }}>Santiago Bernabéu</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="btn-outline" onClick={() => setShowNotify(true)} style={{ padding: '8px', borderRadius: '50%', background: 'white' }}>
            <Bell size={20} color="var(--accent-rm-blue)" />
            <div style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, background: 'var(--alert-red)', borderRadius: '50%'}}></div>
          </button>
          <button className="btn-outline" onClick={() => setShowProfile(true)} style={{ padding: '8px', borderRadius: '50%', background: 'white' }}>
            <User size={20} color="var(--accent-rm-blue)" />
          </button>
        </div>
      </div>

      {/* Notifications Modal */}
      {showNotify && (
        <div className="modal-overlay" onClick={() => setShowNotify(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Live Updates</h2>
              <button onClick={() => setShowNotify(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { icon: Activity, title: 'Match', text: 'Real Madrid 2 - 0 Barcelona (Live)' },
                { icon: User, title: 'Account', text: 'Membership renewed successfully.' },
                { icon: Ticket, title: 'Ticket', text: 'Section 105, Row 12, Seat 14B verified.' },
                { icon: HelpCircle, title: 'Stadium', text: 'Gate 44 is currently the fast track entry.' },
                { icon: Box, title: 'Match Ball', text: 'Adidas Oceaunz Pro (Official Match Ball) in play.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-center glass-panel" style={{ padding: '12px 16px', background: 'var(--bg-main)' }}>
                  <div style={{ padding: '10px', background: 'rgba(11, 30, 89, 0.05)', borderRadius: '12px' }}><item.icon size={20} color="var(--accent-rm-blue)" /></div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{item.title}</h4>
                    <p className="text-muted text-xs">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <div className="modal-overlay" onClick={() => setShowProfile(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>My Profile</h2>
              <button onClick={() => setShowProfile(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            
            <div className="flex items-center gap-4" style={{ marginBottom: '24px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--surface-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={30} color="var(--text-muted)" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Alex Madridista</h3>
                <p className="text-muted text-sm badge badge-gold" style={{ marginTop: '4px' }}>Premium Member</p>
              </div>
            </div>

            <h4 style={{ marginBottom: '12px' }}>Current Ticket</h4>
            <div className="glass-panel" style={{ padding: '16px', background: 'var(--accent-rm-blue)', color: 'white', marginBottom: '24px' }}>
              <div className="flex justify-between items-center">
                 <div>
                   <h2 style={{ color: 'white', margin: 0, fontSize: '1.2rem' }}>El Clásico</h2>
                   <p style={{ opacity: 0.8, fontSize: '0.8rem', margin: 0 }}>Santiago Bernabéu</p>
                 </div>
                 <div style={{ textAlign: 'right' }}>
                   <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>14B</span>
                   <p style={{ opacity: 0.8, fontSize: '0.8rem', margin: 0 }}>Sec 105</p>
                 </div>
              </div>
              <div style={{ marginTop: '16px', background: 'white', height: '40px', borderRadius: '4px', opacity: 0.9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <span style={{ color: 'black', fontFamily: 'monospace', letterSpacing: '2px' }}>||| || ||| |||| | ||</span>
              </div>
            </div>

            <h4 style={{ marginBottom: '12px' }}>Upcoming Matches</h4>
            <div className="glass-panel" style={{ padding: '16px', border: '1.5px dashed var(--accent-rm-gold)', background: 'rgba(254, 202, 47, 0.05)' }}>
               <div className="flex justify-between items-start">
                 <div>
                   <div className="flex items-center gap-2" style={{ marginBottom: '4px' }}>
                     <Tag size={16} color="var(--warning-orange)" />
                     <span style={{ fontWeight: 700, color: 'var(--warning-orange)' }}>15% OFF</span>
                   </div>
                   <h4 style={{ margin: 0 }}>Real Madrid vs Sevilla</h4>
                   <p className="text-muted text-xs">Unlock your member discount now.</p>
                 </div>
                 <button className="btn btn-primary" style={{ padding: '8px 12px', fontSize: '0.8rem' }}>Book <ChevronRight size={14} /></button>
               </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
