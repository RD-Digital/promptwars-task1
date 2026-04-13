import { useState } from 'react';
import { Car, Bike, Info, ArrowRight } from 'lucide-react';

export default function ParkingScreen({ onNavigate }) {
  const [vehicle, setVehicle] = useState('4w'); // 4w or 2w

  const stats = {
    '4w': { total: 4500, engaged: 3820, vacant: 450, exiting: 230 },
    '2w': { total: 1200, engaged: 850, vacant: 300, exiting: 50 }
  };

  const currentStats = stats[vehicle];
  const fillPercentage = (currentStats.engaged / currentStats.total) * 100;

  return (
    <div className="flex flex-col gap-4 screen-content animate-fade-in" style={{ paddingBottom: '120px' }}>
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-main)' }}>Smart Parking</h2>
        <Car size={24} color="var(--accent-rm-blue)" />
      </div>

      {/* Vehicle Toggle */}
      <div className="flex" style={{ width: '100%', background: 'white', borderRadius: '16px', padding: '6px', border: '2px solid var(--surface-border)', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
        <button 
          onClick={() => setVehicle('4w')}
          className="flex-1 py-3 flex justify-center items-center gap-2 rounded-xl transition-all"
          style={{ background: vehicle === '4w' ? 'var(--text-main)' : 'transparent', color: vehicle === '4w' ? 'white' : 'var(--text-muted)', fontWeight: 800, border: 'none' }}
        >
          <Car size={20} /> 4-Wheelers
        </button>
        <button 
          onClick={() => setVehicle('2w')}
          className="flex-1 py-3 flex justify-center items-center gap-2 rounded-xl transition-all"
          style={{ background: vehicle === '2w' ? 'var(--text-main)' : 'transparent', color: vehicle === '2w' ? 'white' : 'var(--text-muted)', fontWeight: 800, border: 'none' }}
        >
          <Bike size={20} /> 2-Wheelers
        </button>
      </div>

      {/* Real-time Capacity Gauge */}
      <div className="glass-panel text-center" style={{ padding: '40px 20px', background: 'white' }}>
        <h3 className="text-muted text-sm uppercase tracking-widest mb-6 font-bold" style={{color: 'var(--text-main)'}}>Real-Time Capacity</h3>
        
        <div style={{ position: 'relative', width: '220px', height: '110px', margin: '0 auto', overflow: 'hidden' }}>
          {/* Semi-circle track */}
          <div style={{ width: '220px', height: '220px', borderRadius: '50%', border: '24px solid var(--surface-border)', position: 'absolute', top: 0, boxSizing: 'border-box' }}></div>
          {/* Active fill */}
          <div style={{ width: '220px', height: '220px', borderRadius: '50%', border: '24px solid var(--accent-rm-blue)', borderBottomColor: 'transparent', borderRightColor: 'transparent', position: 'absolute', top: 0, boxSizing: 'border-box', transform: `rotate(${(fillPercentage / 100) * 180 - 135}deg)`, transition: 'transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)' }}></div>
          
          <div style={{ position: 'absolute', bottom: 0, width: '100%', textAlign: 'center' }}>
            <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.05em' }}>{Math.round(fillPercentage)}%</span>
          </div>
        </div>

        <div className="flex justify-between mt-8 px-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex flex-col items-center">
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success-green)' }}>{currentStats.vacant}</span>
            <span className="text-muted text-xs font-bold uppercase tracking-wider">Vacant</span>
          </div>
          <div className="flex flex-col items-center">
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-rm-blue)' }}>{currentStats.engaged}</span>
            <span className="text-muted text-xs font-bold uppercase tracking-wider">Engaged</span>
          </div>
          <div className="flex flex-col items-center">
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--warning-orange)' }}>{currentStats.exiting}</span>
            <span className="text-muted text-xs font-bold uppercase tracking-wider">Exiting</span>
          </div>
        </div>
      </div>

      {/* Zone Routing */}
      <h3 style={{ fontSize: '1.2rem', marginTop: '16px', color: 'var(--text-main)' }}>Recommended Parking</h3>
      <div className="glass-panel flex justify-between items-center bg-white border border-slate-200" style={{ padding: '20px' }}>
          <div className="flex items-center gap-4">
            <div style={{ padding: '14px', background: 'var(--accent-rm-blue-light)', borderRadius: '16px', boxShadow: '0 4px 12px rgba(30,58,138,0.2)' }}>
              <Car size={28} color="white" />
            </div>
            <div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>Sector {vehicle === '4w' ? 'P3 (North)' : 'B1 (West)'}</span>
              <div style={{ fontSize: '0.9rem', color: 'var(--success-green)', fontWeight: 700, marginTop: '2px' }}>Highest vacancy right now</div>
            </div>
          </div>
      </div>

      <button className="btn btn-primary w-full mt-2 py-4 text-lg" onClick={() => onNavigate('map', vehicle === '4w' ? 'parking-p3' : 'parking-b1')} style={{ padding: '16px', borderRadius: '16px', fontSize: '1.1rem' }}>
         Get Route <ArrowRight size={20} />
      </button>

      <div className="flex items-start gap-3 mt-4 text-sm font-medium bg-white p-4 rounded-xl border border-slate-200">
         <Info size={20} color="var(--accent-rm-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
         <p style={{color: 'var(--text-main)', margin: 0}}>Dynamic parking routing ensures you are directed to the sector with the fastest exit time relative to your seat.</p>
      </div>
      
    </div>
  );
}
