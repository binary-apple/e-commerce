import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Breadcrumbs from './Breadcrumbs';
import { useCategory } from '../../../../contexts/CategoryContext';

vi.mock('../../../../contexts/CategoryContext', () => ({
  useCategory: vi.fn(),
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
  };
});

describe('Breadcrumbs', () => {
  const mockedUseCategory = vi.mocked(useCategory);

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('Renders nothing when isLoading is true.', () => {
    mockedUseCategory.mockReturnValue({
      selectedIndex: 0,
      selectedCategory: null,
      categories: [],
      isLoading: true,
      isError: false,
      currentCategoryChain: [],
    });

    const { container } = render(<Breadcrumbs />);
    expect(container.childElementCount).toBe(0);
  });

  it('Renders nothing when isError is true.', () => {
    mockedUseCategory.mockReturnValue({
      selectedIndex: 0,
      selectedCategory: null,
      categories: [],
      isLoading: false,
      isError: true,
      currentCategoryChain: [],
    });

    const { container } = render(<Breadcrumbs />);
    expect(container.childElementCount).toBe(0);
  });

  it('Renders breadcrumb items correctly', () => {
    const country = { id: 'CL-01', categoryName: 'Germany', key: 'country', nestingLevel: 1 };
    const cat = { id: 'SL-02', categoryName: 'Cat', key: 'Cat-1', nestingLevel: 2 };

    mockedUseCategory.mockReturnValue({
      selectedIndex: 0,
      selectedCategory: null,
      categories: [country, cat],
      isLoading: false,
      isError: false,
      currentCategoryChain: [country, cat],
    });

    render(<Breadcrumbs />);

    const firstElement = screen.getByText('Germany');
    expect(firstElement.tagName.toLowerCase()).toBe('a');

    const lastElement = screen.getByText('Cat');
    expect(lastElement.tagName.toLowerCase()).not.toBe('a');
  });
});
