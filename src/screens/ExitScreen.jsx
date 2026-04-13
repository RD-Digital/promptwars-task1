import { LogOut, Car, ArrowRight, Activity, Zap } from 'lucide-react';

export default function ExitScreen({ onNavigate }) {
  return (
    <div className="flex flex-col gap-4 screen-content animate-fade-in">
      <div className="flex justify-between items-center" style={{ marginBottom: '8px' }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Smart Exit</h2>
      </div>

      <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), transparent)', borderTop: '4px solid var(--accent-green)' }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '16px' }}>
          <Zap size={20} color="var(--accent-green)" />
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>AI Recommended Exit</h3>
        </div>

        <div className="flex justify-between items-center bg-black bg-opacity-20 p-4 rounded-lg" style={{ marginBottom: '16px' }}>
          <div className="flex items-center gap-3">
            <LogOut size={28} color="var(--accent-green)" />
            <div>
              <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>Gate 45 (East)</span>
              <p className="text-muted text-sm">Lightest crowd flow right now</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center" style={{ padding: '12px 0 0', borderTop: '1px solid var(--glass-border)' }}>
          <div className="flex flex-col">
            <span className="text-muted text-sm">Estimated Exit Time</span>
            <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>6 mins</span>
          </div>
          <button className="btn btn-primary" onClick={() => onNavigate('map')}>
            Start Route <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <h3 style={{ fontSize: '1.1rem', marginTop: '8px' }}>Post-Event Routing</h3>
      
      <div className="glass-panel p-4 flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%' }}>
            <Car size={24} color="var(--accent-blue)" />
          </div>
          <div style={{ flex: 1 }}>
            <div className="flex justify-between">
              <h4 style={{ margin: 0 }}>Parking P3 Route</h4>
              <span className="badge badge-blue">Ready</span>
            </div>
            <p className="text-muted text-sm" style={{ marginTop: '4px', marginBottom: '8px' }}>
              Follow the blue illuminated pathway outside Gate 45 directly to Parking Sector P3. Traffic on Av. de Concha Espina is currently flowing.
            </p>
          </div>
        </div>
      </div>

      <div className="glass-panel p-4 flex flex-col gap-4">
        <div className="flex items-start gap-4">
           <div style={{ padding: '12px', background: 'rgba(234, 179, 8, 0.1)', borderRadius: '50%' }}>
            <Activity size={24} color="var(--accent-gold)" />
          </div>
          <div style={{ flex: 1 }}>
             <h4 style={{ margin: 0 }}>Crowd Dispersal Info</h4>
            <p className="text-muted text-sm" style={{ marginTop: '4px' }}>
              Metro Line 10 (Santiago Bernabéu) is experiencing 15 min delays due to crowding. Consider alternatives or walk towards Cuzco station.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
