import { useState } from 'react';
import { ArrowRight, Navigation, Zap, Map as MapIcon, Car, ShieldAlert, LogOut } from 'lucide-react';

export default function HomeScreen({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('match'); // match, facts, highlights

  return (
    <div className="flex flex-col gap-4 screen-content animate-fade-in" style={{ paddingBottom: '120px' }}>
      
      {/* Stadium Density Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div>
          <div className="flex items-center gap-2" style={{ marginBottom: '4px' }}>
            <div className="pulse-live" style={{ width: '8px', height: '8px', background: 'var(--success-green)', borderRadius: '50%' }}></div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Capacity</span>
          </div>
          <h3 style={{ fontSize: '1.2rem', margin: 0 }}>42% Full</h3>
        </div>
        <div style={{ textAlign: 'right' }}>
           <span className="badge badge-green" style={{ fontSize: '0.8rem' }}>Flow: Fast</span>
        </div>
      </div>

      {/* Match Hub Section */}
      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ background: 'var(--accent-rm-blue)', padding: '24px 20px', color: 'white', position: 'relative' }}>
          {/* Subtle background crest or pattern */}
          <div style={{ position: 'absolute', top: '-10%', right: '-10%', opacity: 0.1, fontSize: '120px', fontFamily: 'serif', fontWeight: 900 }}>RM</div>
          
          <div className="flex justify-between items-center" style={{ marginBottom: '16px', position: 'relative' }}>
             <div className="flex flex-col items-center">
                 <div style={{ width: '48px', height: '48px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-rm-blue)', fontWeight: 800 }}>RM</div>
                 <span style={{ fontSize: '0.9rem', marginTop: '8px', fontWeight: 600 }}>Real Madrid</span>
             </div>
             
             <div className="flex flex-col items-center">
                <span className="badge badge-gold" style={{ background: 'var(--accent-rm-gold)', color: 'var(--accent-rm-blue)', marginBottom: '8px' }}>62' LIVE</span>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '4px' }}>2 - 0</div>
             </div>

             <div className="flex flex-col items-center">
                 <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, border: '2px solid white' }}>FCB</div>
                 <span style={{ fontSize: '0.9rem', marginTop: '8px', fontWeight: 600 }}>Barcelona</span>
             </div>
          </div>
          
          <div className="flex flex-col gap-1 items-center" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
             <p style={{ margin: 0 }}>⚽ Vinícius Jr. (24')</p>
             <p style={{ margin: 0 }}>⚽ Bellingham (56')</p>
          </div>
        </div>

        <div className="flex" style={{ borderBottom: '1px solid var(--surface-border)', background: 'white' }}>
           <button onClick={() => setActiveTab('match')} style={{ flex: 1, padding: '12px 0', border: 'none', background: 'none', fontWeight: 600, borderBottom: activeTab === 'match' ? '3px solid var(--accent-rm-blue)' : '3px solid transparent', color: activeTab === 'match' ? 'var(--accent-rm-blue)' : 'var(--text-muted)' }}>Live Stats</button>
           <button onClick={() => setActiveTab('facts')} style={{ flex: 1, padding: '12px 0', border: 'none', background: 'none', fontWeight: 600, borderBottom: activeTab === 'facts' ? '3px solid var(--accent-rm-blue)' : '3px solid transparent', color: activeTab === 'facts' ? 'var(--accent-rm-blue)' : 'var(--text-muted)' }}>Match Facts</button>
           <button onClick={() => setActiveTab('highlights')} style={{ flex: 1, padding: '12px 0', border: 'none', background: 'none', fontWeight: 600, borderBottom: activeTab === 'highlights' ? '3px solid var(--accent-rm-blue)' : '3px solid transparent', color: activeTab === 'highlights' ? 'var(--accent-rm-blue)' : 'var(--text-muted)' }}>Highlights</button>
        </div>

        <div style={{ padding: '16px', background: 'white' }}>
           {activeTab === 'match' && (
             <div className="flex flex-col gap-3">
                <div className="flex justify-between text-sm"><span style={{width:'30%', textAlign:'center'}}>58%</span><span className="text-muted font-bold">Possession</span><span style={{width:'30%', textAlign:'center'}}>42%</span></div>
                <div style={{ width: '100%', height: '6px', background: 'var(--surface-border)', borderRadius: '4px', display: 'flex' }}>
                   <div style={{ width: '58%', background: 'var(--accent-rm-blue)', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px' }}></div>
                   <div style={{ width: '42%', background: '#b91c1c', borderTopRightRadius: '4px', borderBottomRightRadius: '4px' }}></div>
                </div>
                <div className="flex justify-between text-sm mt-2"><span style={{width:'30%', textAlign:'center'}}>12</span><span className="text-muted font-bold">Total Shots</span><span style={{width:'30%', textAlign:'center'}}>5</span></div>
             </div>
           )}
           {activeTab === 'facts' && (
             <div className="text-sm">
                <p><strong>Referee:</strong> Alejandro Hernández</p>
                <p><strong>Venue:</strong> Santiago Bernabéu (Capacity: 81,044)</p>
                <p><strong>Last Meeting:</strong> FCB 1 - 2 RM</p>
             </div>
           )}
           {activeTab === 'highlights' && (
             <div className="flex flex-col gap-2">
                <div className="bg-slate-50 p-2 rounded flex justify-between items-center border border-slate-100">
                  <span className="text-sm"><strong>56'</strong> Bellingham Goal</span>
                  <span className="badge badge-blue" style={{fontSize: '10px'}}>WATCH</span>
                </div>
                <div className="bg-slate-50 p-2 rounded flex justify-between items-center border border-slate-100">
                  <span className="text-sm"><strong>24'</strong> Vinícius Jr. Goal</span>
                  <span className="badge badge-blue" style={{fontSize: '10px'}}>WATCH</span>
                </div>
             </div>
           )}
        </div>
      </div>

      {/* Recommended Entry / Map Route Link */}
      <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid var(--accent-rm-gold)' }}>
        <div className="flex justify-between items-start" style={{ marginBottom: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Smart Navigation</h3>
            <p className="text-muted text-sm">Best entry to Section 105</p>
          </div>
          <div className="flex flex-col items-end">
             <span className="badge badge-gold" style={{ marginBottom: '4px' }}><Zap size={10} style={{display:'inline'}}/> AI Suggested</span>
          </div>
        </div>
        <div className="flex justify-between items-center bg-slate-50 border border-slate-200" style={{ padding: '12px', borderRadius: 'var(--br-sm)' }}>
          <div className="flex items-center gap-3">
            <div style={{ padding: '8px', background: 'rgba(254, 202, 47, 0.2)', borderRadius: '50%' }}>
              <Navigation size={20} color="var(--accent-rm-blue)" />
            </div>
            <div>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-rm-blue)' }}>Gate 44</span>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ETA 4 mins walk</div>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => onNavigate('map', 'gate44')} style={{ padding: '8px 16px' }}>
            Start Route <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Latest Club News / SEO Blogs */}
      <div className="flex justify-between items-end" style={{ marginTop: '16px', marginBottom: '8px' }}>
        <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-main)' }}>Latest Club News</h3>
        <span className="text-sm font-bold text-muted" style={{ cursor: 'pointer' }}>See all</span>
      </div>
      
      <div className="flex gap-4" style={{ overflowX: 'auto', paddingBottom: '16px', margin: '0 -16px', paddingLeft: '16px', paddingRight: '16px' }}>
         {/* News Card 1 */}
         <div className="glass-panel" style={{ minWidth: '220px', borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ height: '110px', background: 'linear-gradient(135deg, var(--accent-rm-blue), var(--accent-rm-blue-light))', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <span style={{ fontSize: '3rem', opacity: 0.1, color: 'white', fontWeight: 900, fontFamily: 'serif' }}>RM</span>
               <div className="badge badge-gold" style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '0.65rem' }}>Transfer News</div>
            </div>
            <div style={{ padding: '12px', background: 'white', height: '100%' }}>
               <h4 style={{ fontSize: '0.9rem', marginBottom: '6px', lineHeight: 1.3 }}>Jude Bellingham shines as Real Madrid dominate El Clásico</h4>
               <p className="text-muted text-xs" style={{ margin: 0, fontWeight: 600 }}>2 hours ago • By AS Sports</p>
            </div>
         </div>
         
         {/* News Card 2 */}
         <div className="glass-panel" style={{ minWidth: '220px', borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ height: '110px', background: 'var(--success-green)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div className="badge" style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--success-green)', position: 'absolute', top: '10px', left: '10px', fontSize: '0.65rem' }}>Match Preview</div>
               <span style={{ fontWeight: 800, color: 'white', letterSpacing: '2px', fontSize: '1.1rem' }}>CHAMPIONS LEAGUE</span>
            </div>
            <div style={{ padding: '12px', background: 'white', height: '100%' }}>
               <h4 style={{ fontSize: '0.9rem', marginBottom: '6px', lineHeight: 1.3 }}>Ancelotti's tactical masterclass expected against Bayern</h4>
               <p className="text-muted text-xs" style={{ margin: 0, fontWeight: 600 }}>5 hours ago • By Marca Football</p>
            </div>
         </div>
      </div>
      
    </div>
  );
}
