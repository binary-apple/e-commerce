import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';
import { MemoryRouter } from 'react-router';

describe('Search', () => {
  it('Renders an input and shows the provided value.', () => {
    const mockOnChange = vi.fn();
    render(
      <MemoryRouter>
        <Search searchValue="FurEver" onChange={mockOnChange} />
      </MemoryRouter>,
    );

    const input: HTMLInputElement = screen.getByRole<HTMLInputElement>('textbox');
    expect(input).not.toBeNull();
    expect(input.value).not.toBe('test');
    expect(input.value).toBe('FurEver');
  });

  it('When typing into the input calls onChange.', () => {
    const mockOnChange = vi.fn();
    render(
      <MemoryRouter>
        <Search searchValue="" onChange={mockOnChange} />
      </MemoryRouter>,
    );

    const input: HTMLInputElement = screen.getByRole<HTMLInputElement>('textbox');
    fireEvent.change(input, { target: { value: 'Cat' } });
    expect(mockOnChange).toHaveBeenCalledWith('Cat');
  });

  it('Created clear button and clears the input value when clicked.', () => {
    const mockOnChange = vi.fn();
    render(
      <MemoryRouter>
        <Search searchValue="something" onChange={mockOnChange} />
      </MemoryRouter>,
    );

    const icon = screen.getByTestId('CloseRoundedIcon');
    expect(icon).not.toBeNull();

    const clearButton = icon.parentElement;
    expect(clearButton).toBeInstanceOf(HTMLButtonElement);

    fireEvent.click(clearButton!);
    expect(mockOnChange).toHaveBeenCalledWith('');
  });

  it('When searchValue is empty - clear button is not render', () => {
    const mockOnChange = vi.fn();
    render(
      <MemoryRouter>
        <Search searchValue="" onChange={mockOnChange} />
      </MemoryRouter>,
    );

    const iconQuery = screen.queryByTestId('CloseRoundedIcon');
    expect(iconQuery).toBeNull();
  });
});
