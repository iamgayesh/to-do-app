import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('increments count when button is clicked', () => {
    render(<App />)

    const button = screen.getByRole('button', { name: /count is 0/i })
    fireEvent.click(button)

    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()
  })
})
