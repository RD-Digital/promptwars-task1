import { CheckCircle2, Ticket } from 'lucide-react';

export default function OnboardingScreen({ onEnter }) {
  return (
    <div className="flex flex-col items-center justify-center screen-content animate-fade-in" style={{ paddingBottom: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', color: 'var(--accent-blue)', textShadow: '0 0 20px var(--accent-blue-glow)' }}>StadiumFlow AI</h1>
        <p className="text-muted">Real-time venue intelligence.</p>
      </div>

      <div className="glass-panel" style={{ padding: '24px', width: '100%', marginBottom: '40px' }}>
        <div className="flex flex-col items-center gap-4">
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '16px', borderRadius: '50%' }}>
            <CheckCircle2 size={48} color="var(--accent-green)" />
          </div>
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Ticket Synced Successfully</h2>
          
          <div style={{ borderTop: '1px solid var(--glass-border)', width: '100%', margin: '12px 0' }} />
          
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="flex justify-between">
              <span className="text-muted">Event</span>
              <span style={{ fontWeight: 600 }}>El Clásico</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Venue</span>
              <span style={{ fontWeight: 600 }}>Santiago Bernabéu</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Section / Seat</span>
              <span style={{ fontWeight: 600, color: 'var(--accent-gold)' }}>105 / 14B</span>
            </div>
          </div>
        </div>
      </div>

      <button className="btn btn-primary" onClick={onEnter} style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}>
        <Ticket size={24} />
        Enter Stadium
      </button>
    </div>
  );
}
