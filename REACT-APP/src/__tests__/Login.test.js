import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login.js';

jest.mock('../components/UserContext', () => ({
  useUser: () => ({
    setUser: jest.fn()
  })
}));

const renderLogin = (onLogin = jest.fn(), onClose = jest.fn()) =>
  render(
    <BrowserRouter>
      <Login onLogin={onLogin} onClose={onClose} />
    </BrowserRouter>
  );

describe('Login Component', () => {
  test('renders Login component', () => {
    renderLogin();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
  });


});

