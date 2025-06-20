import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CategoryList from './CategoryList';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import { useCategory } from '../../../../contexts/CategoryContext';

vi.mock('../../../../contexts/CategoryContext', () => ({
  useCategory: vi.fn(),
}));

describe('CategoryList', () => {
  const mockedUseCategory = vi.mocked(useCategory);
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Should render categories', async () => {
    mockedUseCategory.mockReturnValue({
      selectedIndex: 0,
      selectedCategory: null,
      categories: [
        { key: '', categoryName: 'All products', nestingLevel: 0, id: '1' },
        { key: 'de', categoryName: 'Germany', nestingLevel: 1, id: '2' },
      ],
      isLoading: false,
      isError: false,
      currentCategoryChain: [],
    });
    render(
      <MemoryRouter>
        <CategoryList />
      </MemoryRouter>,
    );

    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('All products')).toBeInTheDocument();
    expect(screen.getByText('Germany')).toBeInTheDocument();
  });

  it('Should not render anything on error', async () => {
    mockedUseCategory.mockReturnValue({
      selectedIndex: 0,
      selectedCategory: null,
      categories: [],
      isLoading: false,
      isError: true,
      currentCategoryChain: [],
    });
    const { container } = render(
      <MemoryRouter>
        <CategoryList />
      </MemoryRouter>,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
