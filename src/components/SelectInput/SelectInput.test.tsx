import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SelectInput } from './SelectInput';
import userEvent from '@testing-library/user-event';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const defaultProps = {
  id: 'test-select',
  label: 'Test Label',
  options: mockOptions,
  value: '',
  onChange: vi.fn(),
};

describe('SelectInput', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    defaultProps.onChange = vi.fn();
  });

  const renderSelectInput = (props = {}) => {
    return render(<SelectInput {...defaultProps} {...props} />);
  };

  it('renders with required props', () => {
    renderSelectInput();
    expect(screen.getByLabelText(/Test Label/)).toBeInTheDocument();
  });

  it('displays all options when opened', async () => {
    renderSelectInput();
    const select = screen.getByLabelText(/Test Label/);
    await user.click(select);

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('calls onChange when option is selected', async () => {
    renderSelectInput();
    const select = screen.getByLabelText(/Test Label/);
    await user.click(select);

    const option = screen.getByText('Option 2');
    await user.click(option);

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });
});
