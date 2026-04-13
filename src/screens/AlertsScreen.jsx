import { Bell, AlertTriangle, Clock, MapPin, CheckCircle2 } from 'lucide-react';

export default function AlertsScreen({ onNavigate }) {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Gate 44 Congestion Warning',
      message: 'Crowds are building up at your recommended entry gate. Consider using Gate 45 instead (5 min walk).',
      time: 'Just now',
      icon: AlertTriangle,
      color: 'var(--warning-orange)',
      action: { label: 'View alternative path', target: 'alt-exit' }
    },
    {
      id: 2,
      type: 'info',
      title: 'Halftime Approaching',
      message: 'Halftime begins in approximately 10 minutes. Washroom queues at Block C are currently low (2m wait).',
      time: '5 mins ago',
      icon: Clock,
      color: 'var(--accent-rm-blue)',
      action: { label: 'Route to Block C', target: 'washroom' }
    },
    {
      id: 3,
      type: 'success',
      title: 'Facility Update',
      message: 'New Tapas Quick stall opened near Section 105. 0 wait time.',
      time: '15 mins ago',
      icon: CheckCircle2,
      color: 'var(--success-green)'
    },
    {
      id: 4,
      type: 'general',
      title: 'Welcome to Santiago Bernabéu',
      message: 'Your ticket is verified. Enjoy El Clásico!',
      time: '1 hour ago',
      icon: Bell,
      color: 'var(--text-muted)'
    }
  ];

  return (
    <div className="flex flex-col gap-4 screen-content animate-fade-in" style={{ paddingBottom: '120px' }}>
      <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200">
        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Live Alerts</h2>
        <span className="badge badge-red pulse-live">2 Actionable</span>
      </div>

      <div className="flex flex-col gap-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="glass-panel" style={{ padding: '20px', borderLeft: `5px solid ${alert.color}` }}>
            <div className="flex gap-4 items-start">
              <div style={{ marginTop: '2px', background: `${alert.color}20`, padding: '10px', borderRadius: '50%' }}>
                <alert.icon size={24} color={alert.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="flex justify-between items-end" style={{ marginBottom: '6px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)' }}>{alert.title}</h3>
                  <span className="text-muted text-xs font-bold whitespace-nowrap ml-2">{alert.time}</span>
                </div>
                <p className="text-muted text-sm font-medium" style={{ lineHeight: 1.5, marginBottom: alert.action ? '12px' : '0' }}>{alert.message}</p>
                
                {alert.action && (
                  <button className="btn btn-primary" onClick={() => onNavigate('map', alert.action.target)} style={{ width: '100%', fontSize: '0.9rem', padding: '10px', background: alert.color, boxShadow: `0 4px 12px ${alert.color}40` }}>
                    {alert.action.label}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
