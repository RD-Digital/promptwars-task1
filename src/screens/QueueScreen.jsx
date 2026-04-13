import { useState } from 'react';
import { Coffee, MapPin, Zap, ShoppingBag } from 'lucide-react';

export default function QueueScreen({ onNavigate }) {
  const [filter, setFilter] = useState('all'); // all, food, washroom, merch

  const queues = [
    { id: 1, type: 'food', name: 'Real Madrid Café', wait: 25, status: 'high', distance: '120m' },
    { id: 2, type: 'food', name: 'Tapas Quick', wait: 5, status: 'low', distance: '150m', aiRecommended: true },
    { id: 3, type: 'washroom', name: 'Block C Restrooms', wait: 12, status: 'medium', distance: '50m' },
    { id: 4, type: 'washroom', name: 'Block D Restrooms', wait: 2, status: 'low', distance: '80m', aiRecommended: true },
    { id: 5, type: 'merch', name: 'Main Megastore', wait: 35, status: 'high', distance: '300m' },
  ];

  const filtered = filter === 'all' ? queues : queues.filter(q => q.type === filter);

  const getStatusColor = (status) => {
    if (status === 'low') return 'var(--success-green)';
    if (status === 'medium') return 'var(--warning-orange)';
    return 'var(--alert-red)';
  };

  return (
    <div className="flex flex-col gap-4 screen-content animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Live Queues</h2>
      </div>

      {/* Filters */}
      <div className="flex gap-2" style={{ overflowX: 'auto', paddingBottom: '8px' }}>
        {['all', 'food', 'washroom', 'merch'].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className="btn"
            style={{ 
              background: filter === f ? 'var(--accent-rm-blue)' : 'transparent',
              color: filter === f ? 'white' : 'var(--text-muted)',
              border: filter === f ? 'transparent' : '1px solid var(--surface-border)',
              padding: '8px 16px',
              borderRadius: '999px',
              textTransform: 'capitalize',
              fontWeight: filter === f ? 700 : 600
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {filtered.map(q => (
          <div key={q.id} className="glass-panel" style={{ padding: '16px', position: 'relative', overflow: 'hidden' }}>
            {q.aiRecommended && (
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(to bottom, var(--accent-rm-blue), var(--success-green))' }}></div>
            )}
            
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {q.type === 'food' && <Coffee color="var(--accent-rm-gold)" />}
                  {q.type === 'washroom' && <MapPin color="var(--accent-rm-blue)" />}
                  {q.type === 'merch' && <ShoppingBag color="white" />}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{q.name}</h3>
                  <div className="text-muted text-sm flex gap-2 items-center">
                    <span>{q.distance} away</span>
                    {q.aiRecommended && (
                       <span className="badge badge-green flex items-center gap-1" style={{ fontSize: '0.65rem' }}>
                         <Zap size={10} /> AI Pick
                       </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: getStatusColor(q.status) }}>
                  {q.wait}m
                </div>
                <span className="text-muted" style={{ fontSize: '0.75rem' }}>Wait</span>
              </div>
            </div>

            {q.status === 'high' && (
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--surface-border)' }}>
                 <p className="text-xs text-muted flex gap-2 items-center">
                   <Zap size={14} color="var(--accent-rm-blue)" /> 
                   <span>AI Suggests: <strong style={{color: 'var(--text-main)'}}>Block D Restrooms (2m wait)</strong></span>
                 </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
