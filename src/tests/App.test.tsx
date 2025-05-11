import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Should create App component with text!', () => {
  test.skip('renders', () => {
    render(<App />);
    expect(screen.getByText('React + TypeScript + Eslint installed! 🚀')).toBeDefined();
  });
});
