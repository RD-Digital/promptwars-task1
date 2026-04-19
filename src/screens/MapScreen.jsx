import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, MapPin, Navigation, Info, Car, Bus, Siren, Loader2 } from 'lucide-react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin, 
  useMap,
  MapControl,
  ControlPosition
} from '@vis.gl/react-google-maps';

const STADIUM_COORDS = { lat: 40.453053, lng: -3.688331 };

const getColor = (crowd) => {
  if (crowd === 'low') return '#10b981';
  if (crowd === 'medium') return '#f59e0b';
  return '#ef4444';
};

const iconMap = {
  food: Coffee, gate: Navigation, restroom: MapPin,
  parking: Car, transport: Bus, emergency: Siren
};

// Hotspots with real lat/lng offsets from stadium center
const initialHotspots = [
  { id: 'gate44', lat: 40.4535, lng: -3.6875, type: 'gate', name: 'Gate 44', crowd: 'low', eta: '4 min' },
  { id: 'food2', lat: 40.4525, lng: -3.6890, type: 'food', name: 'Tapas & Drinks', crowd: 'high', eta: '15 min' },
  { id: 'washroom', lat: 40.4540, lng: -3.6885, type: 'restroom', name: 'Restroom C', crowd: 'medium', eta: '8 min' },
  { id: 'parking-p3', lat: 40.4520, lng: -3.6870, type: 'parking', name: 'Sector P3', crowd: 'low', eta: '6 min' },
  { id: 'taxi-pickup', lat: 40.4550, lng: -3.6880, type: 'transport', name: 'Uber Pickup', crowd: 'high', eta: '7 min' },
  { id: 'emergency-exit', lat: 40.4528, lng: -3.6865, type: 'emergency', name: 'Exit E2', crowd: 'low', eta: '2 min' },
];

function RoutePolyline({ origin, destination, visible }) {
  const map = useMap();
  useEffect(() => {
    if (!map || !visible || !origin || !destination) return;

    // Mock polyline implementation using Google Maps Polyline
    const path = [origin, destination];
    const polyline = new window.google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: "#3b82f6",
      strokeOpacity: 0.8,
      strokeWeight: 4,
      map: map,
    });

    return () => polyline.setMap(null);
  }, [map, origin, destination, visible]);

  return null;
}

export default function MapScreen({ routeTarget, onRouteClear, onNavigate }) {
  const [hotspots, setHotspots] = useState(initialHotspots);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isRouting, setIsRouting] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (routeTarget) {
      const target = hotspots.find(h => h.id === routeTarget);
      if (target) { 
        setActiveHotspot(target); 
        setIsRouting(true); 
      }
    }
  }, [routeTarget, hotspots]);

  // Simulate crowd changes
  useEffect(() => {
    const interval = setInterval(() => {
      setHotspots(prev => prev.map(spot => {
        if (Math.random() > 0.7 && spot.type !== 'emergency') {
          const levels = ['low', 'medium', 'high'];
          return { ...spot, crowd: levels[Math.floor(Math.random() * levels.length)] };
        }
        return spot;
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="screen-scroll relative px-5 pb-32 pt-4 flex flex-col gap-5">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Santiago Bernabéu</h2>
          <p className="text-xs text-white/30 font-semibold mt-0.5" aria-hidden="true">Live Venue Map</p>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neon-blue bg-neon-blue/15 px-3 py-1.5 rounded-full border border-neon-blue/30" aria-label="Section 105">
          SEC 105
        </span>
      </header>

      {/* Google Maps Wrapper */}
      <section 
        className="relative w-full h-[400px] rounded-[28px] overflow-hidden border border-white/[0.08] bg-black/40 backdrop-blur-3xl"
        aria-label="Interactive Stadium Map"
      >
        {!apiKey ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center gap-4">
            <Info className="text-neon-red" size={32} />
            <p className="text-white/60 text-sm font-medium">Google Maps API Key not found. Please check your .env file.</p>
          </div>
        ) : (
          <APIProvider apiKey={apiKey} onLoad={() => setMapLoaded(true)}>
            {!mapLoaded && (
               <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-md">
                 <Loader2 size={32} className="text-neon-blue animate-spin" />
               </div>
            )}
            <Map
              defaultCenter={STADIUM_COORDS}
              defaultZoom={17}
              mapId="bf50a87347970c92" // Use a valid mapId or null for basic styles
              disableDefaultUI={true}
              gestureHandling={'greedy'}
              className="w-full h-full"
              styles={[
                { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
                { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
                { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
                { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
                { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
                { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#263c3f' }] },
                { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9a76' }] },
                { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
                { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
                { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
                { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
              ]}
            >
              {/* Stadium Marker */}
              <AdvancedMarker position={STADIUM_COORDS}>
                <Pin background={'#3b82f6'} borderColor={'#fff'} glyphColor={'#fff'} />
              </AdvancedMarker>

              {/* Hotspots */}
              {hotspots.map((spot) => {
                const Icon = iconMap[spot.type] || MapPin;
                const isActive = activeHotspot?.id === spot.id;
                return (
                  <AdvancedMarker
                    key={spot.id}
                    position={{ lat: spot.lat, lng: spot.lng }}
                    onClick={() => { setActiveHotspot(spot); setIsRouting(false); }}
                  >
                    <div 
                       className={`flex items-center justify-center rounded-full border-2 border-white transition-all duration-300 ${isActive ? 'scale-125' : 'scale-100'}`}
                       style={{ 
                         width: 32, 
                         height: 32, 
                         backgroundColor: getColor(spot.crowd),
                         boxShadow: `0 0 15px ${getColor(spot.crowd)}80`
                       }}
                    >
                      <Icon size={16} color="white" />
                    </div>
                  </AdvancedMarker>
                );
              })}

              {/* Mock Route */}
              {isRouting && activeHotspot && (
                <RoutePolyline 
                  origin={STADIUM_COORDS} 
                  destination={{ lat: activeHotspot.lat, lng: activeHotspot.lng }} 
                  visible={isRouting} 
                />
              )}
            </Map>
          </APIProvider>
        )}
      </section>

      {/* Legend */}
      <footer className="flex gap-4 justify-center" aria-label="Map Legend">
        {[
          { label: 'Clear', color: 'bg-[#10b981]' },
          { label: 'Moderate', color: 'bg-[#f59e0b]' },
          { label: 'Congested', color: 'bg-[#ef4444]' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} aria-hidden="true" />
            <span className="text-[11px] text-white/40 font-semibold">{item.label}</span>
          </div>
        ))}
      </footer>

      {/* Hotspot Detail Card */}
      <section aria-live="polite">
        <AnimatePresence mode="wait">
          {activeHotspot ? (
            <motion.div
              key={activeHotspot.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="glass rounded-[22px] p-5 relative overflow-hidden"
              style={{ borderLeft: `4px solid ${getColor(activeHotspot.crowd)}` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{activeHotspot.name}</h3>
                  <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/30 mt-1">{activeHotspot.type}</p>
                </div>
                <span className="text-xs font-bold text-white bg-white/10 px-3 py-1.5 rounded-full">
                  ETA {activeHotspot.eta}
                </span>
              </div>

              {!isRouting ? (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 rounded-2xl font-bold text-sm text-white border-none cursor-pointer flex items-center justify-center gap-2"
                  style={{ backgroundColor: getColor(activeHotspot.crowd) }}
                  onClick={() => { setIsRouting(true); if (onRouteClear) onRouteClear(); }}
                  aria-label={`Start navigation to ${activeHotspot.name}`}
                >
                  <Navigation size={16} aria-hidden="true" /> Start Navigation
                </motion.button>
              ) : (
                <div className="w-full py-3 rounded-2xl font-bold text-sm text-center border-2 border-neon-blue/50 text-neon-blue bg-neon-blue/10">
                  Route Active — Follow Path
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-[22px] p-5 flex items-center gap-4"
            >
              <div className="bg-neon-blue/15 p-3 rounded-xl">
                <Info size={20} className="text-neon-blue" aria-hidden="true" />
              </div>
              <p className="text-sm text-white/50 font-medium leading-relaxed">
                Tap any glowing marker on the Santiago Bernabéu map to explore zones and start live routing.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
