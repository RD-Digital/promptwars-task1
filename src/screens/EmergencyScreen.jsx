import { useState } from 'react';
import { ShieldAlert, Phone, HeartPulse, Search, HelpCircle, MapPin, AlertCircle, X, CheckSquare, List } from 'lucide-react';

export default function EmergencyScreen({ onNavigate }) {
  const [sosActive, setSosActive] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'medical', 'security', 'lost_child', 'lost_item'

  const ModalShell = ({ title, icon: Icon, color, children }) => (
    <div className="modal-overlay" onClick={() => setActiveModal(null)}>
       <div className="modal-content" onClick={e => e.stopPropagation()}>
         <div className="flex justify-between items-center" style={{ marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--surface-border)' }}>
            <div className="flex items-center gap-3">
               <div style={{ padding: '8px', background: `${color}20`, borderRadius: '50%' }}><Icon size={24} color={color} /></div>
               <h2 style={{ fontSize: '1.4rem', margin: 0, color: 'var(--text-main)' }}>{title}</h2>
            </div>
            <button onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
         </div>
         {children}
       </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 screen-content animate-fade-in" style={{ paddingBottom: '120px' }}>
      <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200">
        <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--alert-red)' }}>Emergency SOS</h2>
      </div>

      {/* Main SOS Toggle */}
      <div className="flex flex-col items-center justify-center p-8 glass-panel text-center" style={{ border: sosActive ? '2px solid var(--alert-red)' : 'none' }}>
        <button 
          onClick={() => setSosActive(!sosActive)}
          className={sosActive ? "pulse-live" : ""}
          style={{ 
            width: '140px', height: '140px', borderRadius: '50%', 
            background: sosActive ? 'var(--alert-red)' : 'var(--bg-main)', 
            border: `4px solid ${sosActive ? 'transparent' : 'var(--alert-red)'}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: sosActive ? 'white' : 'var(--alert-red)',
            cursor: 'pointer', transition: 'all 0.3s ease',
            boxShadow: sosActive ? '0 10px 40px rgba(239, 68, 68, 0.4)' : 'none'
          }}
        >
          <ShieldAlert size={54} strokeWidth={sosActive ? 2.5 : 2} />
          <span style={{ fontWeight: 800, fontSize: '1.4rem', marginTop: '8px', letterSpacing: '2px' }}>SOS</span>
        </button>
        <p className="text-muted text-sm font-medium" style={{ marginTop: '24px', maxWidth: '80%' }}>
          {sosActive ? "Emergency Services Notified. Stay where you are." : "Hold to instantly alert stadium security to your exact location."}
        </p>
      </div>

      {/* Nearest Help Desk */}
      <div className="glass-panel" style={{ padding: '20px', borderLeft: '5px solid var(--accent-rm-blue)' }}>
         <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Nearest Help Desk</h3>
         <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="flex gap-3 items-center">
              <div style={{ padding: '10px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                 <MapPin size={24} color="var(--accent-rm-blue)" />
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: 'var(--text-main)' }}>Level 1, Concourse B</p>
                <p className="text-muted text-xs font-semibold mt-1">Approx 1 min walk (80m)</p>
              </div>
            </div>
            <button className="btn btn-outline border-slate-300" style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => onNavigate('map')}>
               Route
            </button>
         </div>
      </div>

      {/* Quick Actions */}
      <h3 style={{ fontSize: '1.1rem', marginTop: '12px' }}>Specific Assistance</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <button onClick={() => setActiveModal('medical')} className="glass-panel flex flex-col items-center justify-center gap-3" style={{ padding: '20px', cursor: 'pointer', border: 'none', background: 'white' }}>
          <HeartPulse size={32} color="var(--alert-red)" />
          <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>Medical</span>
        </button>
        <button onClick={() => setActiveModal('security')} className="glass-panel flex flex-col items-center justify-center gap-3" style={{ padding: '20px', cursor: 'pointer', border: 'none', background: 'white' }}>
          <AlertCircle size={32} color="var(--warning-orange)" />
          <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>Security</span>
        </button>
        <button onClick={() => setActiveModal('lost_child')} className="glass-panel flex flex-col items-center justify-center gap-3" style={{ padding: '20px', cursor: 'pointer', border: 'none', background: 'white' }}>
          <Search size={32} color="var(--accent-rm-blue)" />
          <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>Lost Child</span>
        </button>
        <button onClick={() => setActiveModal('lost_item')} className="glass-panel flex flex-col items-center justify-center gap-3" style={{ padding: '20px', cursor: 'pointer', border: 'none', background: 'white' }}>
          <HelpCircle size={32} color="var(--text-muted)" />
          <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>Lost Item</span>
        </button>
      </div>

      <div className="flex justify-center" style={{ marginTop: '16px' }}>
        <button className="btn" style={{ background: 'transparent', color: 'var(--accent-rm-blue)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
          <Phone size={18} fill="currentColor" /> Call Venue Operations Next
        </button>
      </div>

      {/* Dynamic Modals */}
      {activeModal === 'medical' && (
        <ModalShell title="Medical Emergency" icon={HeartPulse} color="var(--alert-red)">
           <div className="flex flex-col gap-4">
              <button className="btn" style={{ background: 'var(--alert-red)', color: 'white', padding: '16px', fontSize: '1.1rem' }}><Phone size={20} /> Request Ambulance Location</button>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-2">
                 <h4 className="flex items-center gap-2 mb-2"><CheckSquare size={18} color="var(--success-green)"/> First Aid Checklist</h4>
                 <ul className="text-sm text-muted pl-5" style={{lineHeight: 1.6}}>
                    <li>Ensure the area is safe.</li>
                    <li>Do not move the person if suspected spinal injury.</li>
                    <li>A medical team from Concourse B is on standby once you call.</li>
                 </ul>
              </div>
           </div>
        </ModalShell>
      )}

      {activeModal === 'lost_child' && (
        <ModalShell title="Report Lost Child" icon={Search} color="var(--accent-rm-blue)">
           <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold">Please provide details immediately. A "Code Blue" will be initiated for all gates.</p>
              <input type="text" placeholder="Child's Name & Age" className="w-full p-3 rounded-lg border border-slate-300" style={{fontFamily: 'inherit', fontSize: '1rem'}} />
              <input type="text" placeholder="Clothing Description (e.g., White RM Jersey)" className="w-full p-3 rounded-lg border border-slate-300" style={{fontFamily: 'inherit', fontSize: '1rem'}} />
              <button className="btn btn-primary mt-2 flex items-center justify-center gap-2"><Search size={18}/> Initiate Search Protocol</button>
              <div className="mt-4 pt-4 border-t border-slate-200">
                 <h4 className="flex items-center gap-2"><List size={18}/> Active Search Tracker</h4>
                 <div className="text-xs text-muted mt-2">No active cases reported from your device.</div>
              </div>
           </div>
        </ModalShell>
      )}

      {activeModal === 'lost_item' && (
        <ModalShell title="Lost & Found" icon={HelpCircle} color="var(--text-muted)">
           <div className="flex flex-col gap-4">
              <p className="text-sm text-muted">Register your lost item. Staff will keep an eye out for it during post-match cleaning.</p>
              <input type="text" placeholder="Item Type (e.g., Wallet, Keys)" className="w-full p-3 rounded-lg border border-slate-300" style={{fontFamily: 'inherit', fontSize: '1rem'}} />
              <button className="btn btn-primary" style={{ background: 'var(--text-main)' }}>Submit Claim</button>
           </div>
        </ModalShell>
      )}
      
      {activeModal === 'security' && (
         <ModalShell title="Security Assistance" icon={AlertCircle} color="var(--warning-orange)">
            <div className="flex flex-col gap-4">
               <button className="btn btn-primary" style={{ background: 'var(--warning-orange)' }}><Phone size={20}/> Call Security Dispatch</button>
               <button className="btn btn-outline bg-slate-50"><AlertCircle size={20}/> Report Suspicious Activity</button>
            </div>
         </ModalShell>
      )}

    </div>
  );
}
