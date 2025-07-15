import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock Firebase modules to avoid initialization errors in tests
jest.mock('./firebase/config', () => ({ auth: {}, db: {} }));
jest.mock('./firebase/auth', () => ({
  login: jest.fn(),
  register: jest.fn(),
  logout: jest.fn(),
}));
jest.mock('stockfish');

import App from './App';

test('renders Endgame Trainer heading', () => {
  // Navigate to the trainer route so the heading is visible
  window.history.pushState({}, 'Trainer page', '/trainer');
  render(<App />);
  const heading = screen.getByRole('heading', { name: /Endgame Trainer/i });
  expect(heading).toBeInTheDocument();
});
