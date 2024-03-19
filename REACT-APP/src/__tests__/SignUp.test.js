import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../components/SignUp.js';

jest.mock('../components/UserContext', () => ({
    useUser: () => ({
        setUser: jest.fn()
    })
}));

const renderSignup = (onSignup = jest.fn(), onClose = jest.fn()) =>
    render(
        <BrowserRouter>
            <SignUp onSignup={onSignup} onClose={onClose} />
        </BrowserRouter>
    );

describe('Signup Component', () => {
    test('renders Signup component', () => {
        renderSignup();
        expect(screen.getByText(/First Name/i)).toBeInTheDocument();
        expect(screen.getByText(/Last Name/i)).toBeInTheDocument();
        expect(screen.getByText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Confirm Password$/i)).toBeInTheDocument();
    });

    test('Trying to sign up with empty fields', async () => {
        renderSignup();
        const signUpButton = screen.getByText(/Signup/i);
        fireEvent.click(signUpButton);

        const toastMessage = await screen.findByText(/All fields are required/i);
        expect(toastMessage).toBeInTheDocument();
    });

    test('Trying to sign up with invalid email', async () => {
        renderSignup();
        const signUpButton = screen.getByText(/Signup/i);

        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe' } });
        fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/^Confirm Password$/i), { target: { value: 'password123' } });
        fireEvent.click(signUpButton);

        const toastMessage = await screen.findByText(/Invalid email format/i);
        expect(toastMessage).toBeInTheDocument();
    });

    test('Trying to sign up with non-matching passwords', async () => {
        renderSignup();
        const signUpButton = screen.getByText(/Signup/i);

        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/^Confirm Password$/i), { target: { value: 'password' } });
        fireEvent.click(signUpButton);

        const toastMessage = await screen.findByText(/Passwords must match/i);
        expect(toastMessage).toBeInTheDocument();
    });
    
    test('Closes the component after successful sign up', async () => {
        const mockOnClose = jest.fn();
        renderSignup(jest.fn(), mockOnClose);
    
        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/^Confirm Password$/i), { target: { value: 'password123' } });
    
        fireEvent.click(screen.getByText(/Signup/i));
    
        await waitFor(() => expect(mockOnClose).toHaveBeenCalled());
    });
    

});
