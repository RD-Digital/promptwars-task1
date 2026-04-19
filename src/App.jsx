import { useState, useRef, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';
import './index.css';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import AIAssistant from './components/AIAssistant';
import { ErrorBoundary } from './ErrorBoundary';

// Lazy load screens for better performance
const OnboardingScreen = lazy(() => import('./screens/OnboardingScreen'));
const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const MapScreen = lazy(() => import('./screens/MapScreen'));
const QueueScreen = lazy(() => import('./screens/QueueScreen'));
const ParkingScreen = lazy(() => import('./screens/ParkingScreen'));
const AlertsScreen = lazy(() => import('./screens/AlertsScreen'));
const EmergencyScreen = lazy(() => import('./screens/EmergencyScreen'));
const TicketScreen = lazy(() => import('./screens/TicketScreen'));
const SeatAssistScreen = lazy(() => import('./screens/SeatAssistScreen'));
const SkipQueueScreen = lazy(() => import('./screens/SkipQueueScreen'));
const TransportScreen = lazy(() => import('./screens/TransportScreen'));
const CabBookingScreen = lazy(() => import('./screens/CabBookingScreen'));
const PostEventScreen = lazy(() => import('./screens/PostEventScreen'));

const pageVariants = {
  initial: { opacity: 0, y: 18, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.2, ease: 'easeIn' } },
};

function LoadingFallback() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#060a13]">
      <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}

function App() {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [mapTarget, setMapTarget] = useState(null);
  const prevScreen = useRef('onboarding');

  const navigateTo = (screenId, target = null) => {
    try {
      if (target) setMapTarget(target);
      prevScreen.current = currentScreen;
      setCurrentScreen(screenId);
    } catch (err) {
      console.error("Navigation error:", err);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':  return <OnboardingScreen onEnter={() => navigateTo('home')} />;
      case 'home':        return <HomeScreen onNavigate={navigateTo} />;
      case 'map':         return <MapScreen onNavigate={navigateTo} routeTarget={mapTarget} onRouteClear={() => setMapTarget(null)} />;
      case 'queue':       return <QueueScreen onNavigate={navigateTo} />;
      case 'parking':     return <ParkingScreen onNavigate={navigateTo} />;
      case 'alerts':      return <AlertsScreen onNavigate={navigateTo} />;
      case 'emergency':   return <EmergencyScreen onNavigate={navigateTo} />;
      case 'exit':        return <PostEventScreen onNavigate={navigateTo} />;
      case 'ticket':      return <TicketScreen onNavigate={navigateTo} />;
      case 'seatassist':  return <SeatAssistScreen onNavigate={navigateTo} />;
      case 'skipqueue':   return <SkipQueueScreen onNavigate={navigateTo} />;
      case 'transport':   return <TransportScreen onNavigate={navigateTo} />;
      case 'cabbooking':  return <CabBookingScreen onNavigate={navigateTo} />;
      default:            return <HomeScreen onNavigate={navigateTo} />;
    }
  };

  const showNav = currentScreen !== 'onboarding';

  return (
    <ErrorBoundary>
      <div className="mobile-container">
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: 'rgba(14,21,38,0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              borderRadius: '16px',
              backdropFilter: 'blur(20px)',
              fontSize: '13px',
              fontWeight: '600',
            },
          }}
        />

        {showNav && <TopBar onNavigate={navigateTo} />}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ position: 'relative', width: '100%' }}
          >
            <Suspense fallback={<LoadingFallback />}>
              {renderScreen()}
            </Suspense>
          </motion.div>
        </AnimatePresence>

        {showNav && <AIAssistant onNavigate={navigateTo} />}
        {showNav && <BottomNav current={currentScreen} onNavigate={(id) => navigateTo(id)} />}
      </div>
    </ErrorBoundary>
  );
}

export default App;
