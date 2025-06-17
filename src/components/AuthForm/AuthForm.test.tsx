import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthForm } from './AuthForm';
import type { AuthFormData } from './types';
import { AuthViews } from '../../types/authViews';

vi.mock('../Title/Title', () => ({
  default: ({ title }: { title: string }) => <h1>{title}</h1>,
}));

vi.mock('./components/AuthRedirect/AuthRedirect.tsx', () => ({
  default: ({ view }: { view: AuthViews }) => <div data-testid="auth-redirect">{view}</div>,
}));

vi.mock('../../assets/images/ArrowCurly.svg', () => ({
  default: 'mocked-arrow-curly.svg',
}));

const mockAuthFormData: AuthFormData = {
  titleForm: 'Sign In',
  titleButton: 'Sign In',
};

const defaultProps = {
  data: mockAuthFormData,
  children: <div data-testid="form-children">Form content</div>,
  onSubmit: vi.fn(),
  disableButton: false,
  view: AuthViews.LOGIN,
};

describe('AuthForm', () => {
  it('renders with all required elements', () => {
    render(<AuthForm {...defaultProps} />);

    expect(screen.getByTestId('form-children')).toBeDefined();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDefined();
    expect(screen.getByTestId('auth-redirect')).toBeDefined();
  });

  it('displays the correct title from data prop', () => {
    const customData: AuthFormData = {
      titleForm: 'Register Account',
      titleButton: 'Create Account',
    };

    render(<AuthForm {...defaultProps} data={customData} />);

    expect(screen.getByText('Register Account')).toBeDefined();
    expect(screen.getByRole('button', { name: /create account/i })).toBeDefined();
  });

  it('calls onSubmit when form is submitted', async () => {
    const mockOnSubmit = vi.fn((event) => event.preventDefault());
    userEvent.setup();

    render(<AuthForm {...defaultProps} onSubmit={mockOnSubmit} />);

    const form = screen.getByRole('button', { name: /sign in/i }).closest('form');
    expect(form).toBeDefined();

    if (form) {
      fireEvent.submit(form);
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    }
  });
});
