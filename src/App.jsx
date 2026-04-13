import { useState } from 'react';
import './index.css';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';

import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import QueueScreen from './screens/QueueScreen';
import ParkingScreen from './screens/ParkingScreen';
import AlertsScreen from './screens/AlertsScreen';
import EmergencyScreen from './screens/EmergencyScreen';
import ExitScreen from './screens/ExitScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [mapTarget, setMapTarget] = useState(null); // Used to pass route targets to the map

  const navigateTo = (screenId, target = null) => {
    if (target) setMapTarget(target);
    setCurrentScreen(screenId);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onEnter={() => setCurrentScreen('home')} />;
      case 'home':
        return <HomeScreen onNavigate={navigateTo} />;
      case 'map':
        return <MapScreen onNavigate={navigateTo} routeTarget={mapTarget} onRouteClear={() => setMapTarget(null)} />;
      case 'queue':
        return <QueueScreen onNavigate={navigateTo} />;
      case 'parking':
        return <ParkingScreen onNavigate={navigateTo} />;
      case 'alerts':
        return <AlertsScreen onNavigate={navigateTo} />;
      case 'emergency':
        return <EmergencyScreen onNavigate={navigateTo} />;
      case 'exit':
        return <ExitScreen onNavigate={navigateTo} />;
      default:
        return <HomeScreen onNavigate={navigateTo} />;
    }
  };

  const showNav = currentScreen !== 'onboarding';

  return (
    <div className="mobile-container">
      {showNav && <TopBar />}
      {renderScreen()}
      {showNav && <BottomNav current={currentScreen} onNavigate={setCurrentScreen} />}
    </div>
  );
}

export default App;
