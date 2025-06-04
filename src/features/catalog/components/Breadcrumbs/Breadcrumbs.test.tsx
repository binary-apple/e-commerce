import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import Breadcrumbs from './Breadcrumbs';
import { useCategory } from '../../../../contexts/CategoryContext';

vi.mock('../../../../contexts/CategoryContext', () => ({
  useCategory: vi.fn(),
}));

describe('Breadcrumbs', () => {
  const mockedUseCategory = vi.mocked(useCategory);

  it('Renders nothing when isLoading is true.', () => {
    mockedUseCategory.mockReturnValue({
      selectedIndex: 0,
      setselectedIndex: vi.fn(),
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
      setselectedIndex: vi.fn(),
      selectedCategory: null,
      categories: [],
      isLoading: false,
      isError: true,
      currentCategoryChain: [],
    });

    const { container } = render(<Breadcrumbs />);
    expect(container.childElementCount).toBe(0);
  });
});
