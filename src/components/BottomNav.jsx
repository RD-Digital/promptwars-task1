import { Home, Map as MapIcon, Clock, Car, ShieldAlert } from 'lucide-react';

export default function BottomNav({ current, onNavigate }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'map', icon: MapIcon, label: 'Map' },
    { id: 'parking', icon: Car, label: 'Parking' },
    { id: 'queue', icon: Clock, label: 'Queues' },
    { id: 'emergency', icon: ShieldAlert, label: 'SOS', isAlert: true }
  ];

  return (
    <div style={{
      position: 'absolute',
      bottom: '24px', 
      left: '20px', 
      right: '20px',
      background: 'var(--text-main)', /* Dark sleek floating pill */
      borderRadius: '99px',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '12px 16px',
      zIndex: 50,
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
    }}>
      {tabs.map(tab => (
        <button 
          key={tab.id}
          onClick={() => onNavigate(tab.id)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            color: tab.isAlert ? 'var(--alert-red)' : current === tab.id ? 'var(--bg-surface)' : 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transform: current === tab.id ? 'translateY(-4px)' : 'translateY(0)'
          }}
        >
          <div style={{
             position: 'relative',
             padding: '8px',
             borderRadius: '50%',
             background: current === tab.id 
                ? (tab.isAlert ? 'var(--alert-red)' : 'var(--accent-rm-blue-light)') 
                : 'transparent',
             color: current === tab.id || tab.isAlert ? 'white' : 'inherit',
             boxShadow: current === tab.id ? `0 4px 12px ${tab.isAlert ? 'rgba(225,29,72,0.4)' : 'rgba(30,58,138,0.4)'}` : 'none'
          }}>
            <tab.icon size={22} strokeWidth={current === tab.id ? 2.5 : 2} />
          </div>
          {current === tab.id && (
            <span style={{ fontSize: '0.65rem', fontWeight: 800, opacity: 1, position: 'absolute', bottom: '-14px', color: tab.isAlert ? 'var(--alert-red)' : 'var(--accent-rm-gold)' }}>
              {tab.label}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
