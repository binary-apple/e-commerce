import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Should create App component with text!', () => {
  test('renders', () => {
    render(<Button />);
    expect(screen.getByText('Click')).toBeDefined();
  });
});
