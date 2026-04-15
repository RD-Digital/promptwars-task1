import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';
import './index.css';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import AIAssistant from './components/AIAssistant';

import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import QueueScreen from './screens/QueueScreen';
import ParkingScreen from './screens/ParkingScreen';
import AlertsScreen from './screens/AlertsScreen';
import EmergencyScreen from './screens/EmergencyScreen';

// V4 Extensions
import TicketScreen from './screens/TicketScreen';
import SeatAssistScreen from './screens/SeatAssistScreen';
import SkipQueueScreen from './screens/SkipQueueScreen';
import TransportScreen from './screens/TransportScreen';
import CabBookingScreen from './screens/CabBookingScreen';
import PostEventScreen from './screens/PostEventScreen';

const NAV_ORDER = ['home','map','transport','queue','emergency'];

const pageVariants = {
  initial: { opacity: 0, y: 18, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.2, ease: 'easeIn' } },
};

function App() {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [mapTarget, setMapTarget] = useState(null);
  const prevScreen = useRef('onboarding');

  const navigateTo = (screenId, target = null) => {
    if (target) setMapTarget(target);
    prevScreen.current = currentScreen;
    setCurrentScreen(screenId);
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
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {showNav && <AIAssistant onNavigate={navigateTo} />}
      {showNav && <BottomNav current={currentScreen} onNavigate={(id) => navigateTo(id)} />}
    </div>
  );
}

export default App;
