import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import MapScreen from '../screens/MapScreen'

// Mock Google Maps
vi.mock('@vis.gl/react-google-maps', () => ({
  APIProvider: ({ children }) => <div>{children}</div>,
  Map: ({ children }) => <div data-testid="map-mock">{children}</div>,
  AdvancedMarker: ({ children }) => <div data-testid="marker-mock">{children}</div>,
  Pin: () => null,
  useMap: () => ({}),
  MapControl: () => null,
}));

describe('MapScreen', () => {
    test('renders Stadium name', () => {
        render(<MapScreen onNavigate={vi.fn()} />)
        expect(screen.getByText(/Santiago Bernabéu/i)).toBeInTheDocument()
    })

    test('renders map container', () => {
        render(<MapScreen onNavigate={vi.fn()} />)
        expect(screen.getByLabelText(/Interactive Stadium Map/i)).toBeInTheDocument()
    })

    test('shows informational message when no hotspot is active', () => {
        render(<MapScreen onNavigate={vi.fn()} />)
        expect(screen.getByText(/Tap any glowing marker/i)).toBeInTheDocument()
    })
})
