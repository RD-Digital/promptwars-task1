import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import MapScreen from '../screens/MapScreen'

// Mock Google Maps
vi.mock('@vis.gl/react-google-maps', () => ({
  APIProvider: ({ children }) => <div>{children}</div>,
  Map: ({ children }) => <div data-testid="map-mock">{children}</div>,
  AdvancedMarker: ({ children, onClick }) => <div data-testid="marker-mock" onClick={onClick}>{children}</div>,
  Pin: () => null,
  useMap: () => ({}),
  useMapsLibrary: () => ({ 
    Polyline: vi.fn().mockImplementation(() => ({
      setMap: vi.fn()
    }))
  }),
  MapControl: () => null,
}));

vi.mock('../services/firebaseService', () => ({
  logUserEvent: vi.fn(),
  getCrowdData: vi.fn(),
  logAppLoad: vi.fn(),
}));

describe('MapScreen', () => {
    test('renders Stadium name', () => {
        render(<MapScreen onNavigate={vi.fn()} />)
        expect(screen.getAllByText(/Santiago Bernabéu/i)[0]).toBeInTheDocument()
    })

    test('renders map container', () => {
        render(<MapScreen onNavigate={vi.fn()} />)
        expect(screen.getByLabelText(/Interactive Stadium Map/i)).toBeInTheDocument()
    })

    test('shows informational message when no hotspot is active', () => {
        render(<MapScreen onNavigate={vi.fn()} />)
        expect(screen.getByText(/Tap any glowing marker/i)).toBeInTheDocument()
    })

    test('shows hotspot details when marker is clicked and start navigation interaction', () => {
        render(<MapScreen onNavigate={vi.fn()} />)
        
        // Find markers and click the second one (which should be Gate 44 according to initialHotspots)
        const markers = screen.getAllByTestId('marker-mock');
        fireEvent.click(markers[1]);
        
        expect(screen.getByText(/Gate 44/i)).toBeInTheDocument();
        
        // Click Start Navigation
        const startNavBtn = screen.getByRole('button', { name: /Start navigation to Gate 44/i });
        fireEvent.click(startNavBtn);
        
        expect(screen.getByText(/Route Active — Follow Path/i)).toBeInTheDocument();
    })
})
