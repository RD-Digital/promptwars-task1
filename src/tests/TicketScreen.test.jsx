import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import TicketScreen from '../screens/TicketScreen'

describe('TicketScreen', () => {
    test('renders Digital Pass title', () => {
        render(<TicketScreen onNavigate={vi.fn()} />)
        expect(screen.getByText(/Digital Pass/i)).toBeInTheDocument()
    })

    test('flips card when Details button is clicked', () => {
        render(<TicketScreen onNavigate={vi.fn()} />)
        const detailsButton = screen.getByLabelText(/Show Ticket Details/i)
        
        // QR Code view should be visible initially
        expect(screen.getByLabelText(/Ticket QR Code View/i)).toBeInTheDocument()
        
        fireEvent.click(detailsButton)
        
        // Now it should show Details view
        expect(screen.getByLabelText(/Ticket Details View/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Show QR Code/i)).toBeInTheDocument()
    })

    test('navigates home when back button is clicked', () => {
        const mockNavigate = vi.fn()
        render(<TicketScreen onNavigate={mockNavigate} />)
        
        const backButton = screen.getByLabelText(/Back to Home/i)
        fireEvent.click(backButton)
        
        expect(mockNavigate).toHaveBeenCalledWith('home')
    })
})