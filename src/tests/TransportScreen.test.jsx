import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import TransportScreen from '../screens/TransportScreen'

// Mock Google Maps
vi.mock('@vis.gl/react-google-maps', () => ({
  APIProvider: ({ children }) => <div>{children}</div>,
  Map: ({ children }) => <div data-testid="map-mock">{children}</div>,
  AdvancedMarker: ({ children }) => <div data-testid="marker-mock">{children}</div>,
  Pin: () => null,
}));

describe('TransportScreen', () => {
    test('renders Transport Hub title', () => {
        render(<TransportScreen onNavigate={vi.fn()} />)
        expect(screen.getByText(/Transport Hub/i)).toBeInTheDocument()
    })

    test('renders available routes', () => {
        render(<TransportScreen onNavigate={vi.fn()} />)
        expect(screen.getByText(/Metro Line 10/i)).toBeInTheDocument()
        expect(screen.getByText(/Uber \/ Lyft Pickup/i)).toBeInTheDocument()
    })

    test('calls onNavigate when Book a Ride button is clicked', () => {
        const mockNavigate = vi.fn()
        render(<TransportScreen onNavigate={mockNavigate} />)
        
        const bookButton = screen.getByLabelText(/Book a Ride Now/i)
        fireEvent.click(bookButton)
        
        expect(mockNavigate).toHaveBeenCalledWith('cabbooking')
    })
})