import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import HomeScreen from '../screens/HomeScreen'

// Mock Swiper
vi.mock('swiper/react', () => ({
  Swiper: ({ children }) => <div data-testid="swiper-mock">{children}</div>,
  SwiperSlide: ({ children }) => <div data-testid="swiper-slide-mock">{children}</div>,
}));

vi.mock('swiper/modules', () => ({
  Pagination: () => null,
  Autoplay: () => null,
}));

// Mock hooks
vi.mock('../hooks/useCrowdData', () => ({
  useCrowdData: () => ({
    crowdData: { percentage: 75, gate: "Gate 44", waitTime: "12 mins" },
    loading: false
  })
}));

vi.mock('../hooks/useCountdownTimer', () => ({
  useCountdownTimer: () => ({ h: 1, m: 30, s: 0 })
}));

describe('HomeScreen', () => {
    test('renders RMA vs FCB match text', () => {
        render(<HomeScreen onNavigate={vi.fn()} />)
        expect(screen.getByText(/RMA/i)).toBeInTheDocument()
        expect(screen.getByText(/FCB/i)).toBeInTheDocument()
    })

    test('calls onNavigate when Ticket button is clicked', () => {
        const mockNavigate = vi.fn()
        render(<HomeScreen onNavigate={mockNavigate} />)
        
        const ticketButton = screen.getByLabelText(/Go to My Ticket/i)
        fireEvent.click(ticketButton)
        
        expect(mockNavigate).toHaveBeenCalledWith('ticket')
    })

    test('renders live crowd data from hook', () => {
        render(<HomeScreen onNavigate={vi.fn()} />)
        expect(screen.getByText('75%')).toBeInTheDocument()
        expect(screen.getByText('Gate 44')).toBeInTheDocument()
    })
})