import { useState, useEffect } from 'react';
import { Coffee, MapPin, Navigation, Info, Car } from 'lucide-react';

export default function MapScreen({ routeTarget, onRouteClear }) {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isRouting, setIsRouting] = useState(false);

  useEffect(() => {
    if (routeTarget) {
      const target = hotspots.find(h => h.id === routeTarget);
      if (target) {
        setActiveHotspot(target);
        setIsRouting(true);
      }
    }
  }, [routeTarget]);

  const hotspots = [
    { id: 'gate44', top: '20', left: '15', type: 'gate', name: 'Gate 44', crowd: 'low', eta: '4 min' },
    { id: 'food2', top: '45', left: '80', type: 'food', name: 'Tapas & Drinks', crowd: 'high', eta: '15 min' },
    { id: 'washroom', top: '70', left: '30', type: 'restroom', name: 'Restroom Block C', crowd: 'medium', eta: '8 min' },
    { id: 'parking-p3', top: '10', left: '90', type: 'parking', name: 'Sector P3 (North)', crowd: 'low', eta: '6 min'},
    { id: 'parking-b1', top: '50', left: '10', type: 'parking', name: 'Sector B1 (West)', crowd: 'medium', eta: '9 min'},
    { id: 'alt-exit', top: '80', left: '80', type: 'gate', name: 'Gate 45 (East)', crowd: 'low', eta: '5 min' }
  ];

  const handleNavigateHere = () => {
    setIsRouting(true);
    if (onRouteClear) onRouteClear();
  };

  return (
    <div className="flex flex-col gap-4 screen-content animate-fade-in" style={{ paddingBottom: '140px' }}>
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Interactive Pitch Map</h2>
        <span className="badge badge-blue">Section 105</span>
      </div>

      {/* Map visualizer container */}
      <div className="glass-panel" style={{ height: '420px', position: 'relative', overflow: 'hidden', background: '#e2e8f0', border: '2px solid var(--surface-border)' }}>
        
        {/* Pitch Outline */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '55%', height: '85%', border: '3px solid rgba(255,255,255,0.9)', borderRadius: '16px',
          background: '#10b981', boxShadow: 'inset 0 0 40px rgba(0,0,0,0.1)'
        }}>
          {/* Center line */}
          <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.9)', position: 'absolute', top: '50%'}}></div>
          {/* Center circle */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px', border: '3px solid rgba(255,255,255,0.9)', borderRadius: '50%'}}></div>
        </div>

        {/* Heatmap zones */}
        <div className="pulse-live" style={{ position: 'absolute', top: '35%', left: '70%', width: '140px', height: '140px', background: 'radial-gradient(circle, var(--alert-red) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(12px)', opacity: 0.5, pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '160px', height: '160px', background: 'radial-gradient(circle, var(--success-green) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(12px)', opacity: 0.5, pointerEvents: 'none' }}></div>

        {/* Dynamic Route Guidance using percentages */}
        {isRouting && activeHotspot && (
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 10 }}>
             <path 
               d={`M 15 85 Q 50 50 ${activeHotspot.left} ${activeHotspot.top}`} 
               fill="none" stroke="var(--accent-rm-blue)" strokeWidth="1.5" strokeDasharray="1000" strokeDashoffset="1000"
               className="animate-route"
               vectorEffect="non-scaling-stroke"
               style={{ filter: 'drop-shadow(0 4px 6px rgba(11,30,89,0.3))' }}
             />
          </svg>
        )}

        {/* Interactive Hotspots */}
        {hotspots.map((spot) => (
          <button
            key={spot.id}
            onClick={() => { setActiveHotspot(spot); setIsRouting(false); }}
            style={{
              position: 'absolute', top: `${spot.top}%`, left: `${spot.left}%`,
              background: spot.crowd === 'low' ? 'var(--success-green)' : spot.crowd === 'high' ? 'var(--alert-red)' : 'var(--warning-orange)',
              width: '32px', height: '32px', borderRadius: '50%', border: '3px solid white',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              transform: activeHotspot?.id === spot.id ? 'translate(-50%, -50%) scale(1.4)' : 'translate(-50%, -50%) scale(1)',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              boxShadow: '0 6px 12px rgba(0,0,0,0.2)', zIndex: activeHotspot?.id === spot.id ? 20 : 5
            }}
          >
            {spot.type === 'food' && <Coffee size={16} color="white" />}
            {spot.type === 'gate' && <Navigation size={16} color="white" />}
            {spot.type === 'restroom' && <MapPin size={16} color="white" />}
            {spot.type === 'parking' && <Car size={16} color="white" />}
          </button>
        ))}

        {/* User Location marker */}
        <div style={{ position: 'absolute', top: '85%', left: '15%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 15 }}>
          <div className="pulse-live" style={{ width: '20px', height: '20px', background: 'var(--accent-rm-blue)', borderRadius: '50%', border: '4px solid white', boxShadow: '0 0 15px rgba(11,30,89,0.6)' }}></div>
          {isRouting && <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--text-main)', textShadow: '0 0 8px white, 0 0 8px white', marginTop: '6px', letterSpacing: '0.05em' }}>YOU</span>}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 justify-center bg-white p-3 rounded-xl shadow-sm border border-slate-200" style={{ fontSize: '0.85rem', fontWeight: 700 }}>
        <div className="flex items-center gap-2"><div style={{ width: '12px', height: '12px', background: 'var(--success-green)', borderRadius: '50%' }}></div> Fast</div>
        <div className="flex items-center gap-2"><div style={{ width: '12px', height: '12px', background: 'var(--warning-orange)', borderRadius: '50%' }}></div> Mod</div>
        <div className="flex items-center gap-2"><div style={{ width: '12px', height: '12px', background: 'var(--alert-red)', borderRadius: '50%' }}></div> High</div>
      </div>

      {/* Interactive Hotspot Card */}
      {activeHotspot && (
        <div className="glass-panel animate-fade-in bg-white" style={{ padding: '24px', borderLeft: `6px solid ${activeHotspot.crowd === 'low' ? 'var(--success-green)' : activeHotspot.crowd === 'high' ? 'var(--alert-red)' : 'var(--warning-orange)'}` }}>
          <div className="flex justify-between items-start">
            <div>
              <h3 style={{ margin: 0, fontSize: '1.6rem' }}>{activeHotspot.name}</h3>
              <p className="text-muted text-sm capitalize font-bold mt-2 tracking-wide uppercase">{activeHotspot.type}</p>
            </div>
            <span className="badge" style={{ background: 'var(--bg-main)', border: '2px solid var(--surface-border)', color: 'var(--text-main)', fontSize: '0.85rem' }}>ETA: {activeHotspot.eta}</span>
          </div>
          {!isRouting ? (
            <button className="btn btn-primary" onClick={handleNavigateHere} style={{ width: '100%', marginTop: '20px', padding: '16px', borderRadius: '12px', fontSize: '1.1rem' }}>
              <Navigation size={20} /> Build Route
            </button>
          ) : (
            <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-green)', borderRadius: '12px', fontWeight: 800, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', border: '2px solid rgba(16, 185, 129, 0.3)' }}>
              <Navigation size={20} /> Active Route Drawn
            </div>
          )}
        </div>
      )}
      
      {!activeHotspot && (
        <div className="glass-panel flex gap-4 items-center bg-white border border-slate-200" style={{ padding: '20px' }}>
          <div style={{ background: 'rgba(11,30,89,0.1)', padding: '12px', borderRadius: '50%', flexShrink: 0 }}><Info size={24} color="var(--accent-rm-blue)" /></div>
          <span className="text-sm font-bold text-slate-700" style={{lineHeight: 1.5}}>Tap any colored point on the pitch to build an active navigation route.</span>
        </div>
      )}
    </div>
  );
}
