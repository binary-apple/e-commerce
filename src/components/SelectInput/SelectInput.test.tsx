import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SelectInput } from './SelectInput';
import userEvent from '@testing-library/user-event';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('SelectInput', () => {
  it('renders with required props', () => {
    render(
      <SelectInput
        id="test-select"
        label="Test Label"
        options={mockOptions}
        value=""
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByLabelText(/Test Label/)).toBeInTheDocument();
  });

  it('displays all options when opened', async () => {
    const user = userEvent.setup();

    render(
      <SelectInput
        id="test-select"
        label="Test Label"
        options={mockOptions}
        value=""
        onChange={vi.fn()}
      />,
    );

    const select = screen.getByLabelText(/Test Label/);
    await user.click(select);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('calls onChange when option is selected', async () => {
    const mockOnChange = vi.fn();
    const user = userEvent.setup();

    render(
      <SelectInput
        id="test-select"
        label="Test Label"
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />,
    );

    const select = screen.getByLabelText(/Test Label/);
    await user.click(select);

    const option = screen.getByText('Option 2');
    await user.click(option);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
