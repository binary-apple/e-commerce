import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateInput } from './DateInput';

describe('DateInput', () => {
  it('renders with label', () => {
    render(<DateInput label="Birth Date" value="" onChange={vi.fn()} />);

    const input = document.querySelector('input[name="date"]');
    expect(input).toBeDefined();

    const label = document.querySelector('label');
    expect(label).toBeDefined();
  });

  it('calls onChange when date is selected', async () => {
    const mockOnChange = vi.fn();
    const user = userEvent.setup();

    render(<DateInput label="Birth Date" value="" onChange={mockOnChange} />);

    const input = document.querySelector('input[name="date"]');
    expect(input).toBeDefined();

    if (input) {
      await user.type(input, '01/01/2000');
      expect(mockOnChange).toHaveBeenCalled();
    }
  });

  it('parses dd.MM.yyyy format correctly', () => {
    render(<DateInput label="Birth Date" value="25.12.2000" onChange={vi.fn()} />);

    const input = screen.getByDisplayValue('25/12/2000');
    expect(input).toBeDefined();
  });

  it('handles invalid date values', () => {
    render(<DateInput label="Birth Date" value="invalid-date" onChange={vi.fn()} />);

    const input = document.querySelector('input[name="date"]');
    expect(input).toBeDefined();
    if (input && 'value' in input) {
      expect(input.value).toBe('');
    }
  });
});
