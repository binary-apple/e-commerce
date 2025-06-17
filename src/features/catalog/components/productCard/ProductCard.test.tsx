import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from './ProductCard';
import type { ProductCardConfig } from '../../../../types/preparedProductData';
import type { Discount } from '../../../../types/productsApi';

vi.mock('../../../../components/StickerCreator/ShelterSticker', () => ({
  default: () => <svg data-testid="shelter-sticker" />,
}));

const renderWithRouter = (ui: React.ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('ProductCard tests', () => {
  const baseProduct: ProductCardConfig = {
    id: '1',
    key: 'test-1',
    name: 'Test Product',
    price: '10000',
    image: 'img.jpg',
    description: 'This is a test product',
    place: 'Berlin',
    color: 'color-cheap',
    currencyCode: 'EUR',
  };

  it('Renders product details without discount.', () => {
    const mockHandleAddToCart = vi.fn();
    renderWithRouter(
      <ProductCard
        product={baseProduct}
        isButtonDisabled={false}
        handleAddToCart={mockHandleAddToCart}
      />,
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/product/test-1');
    expect(screen.getByText('Berlin')).toBeInTheDocument();
    expect(screen.getByText('This is a test product')).toBeInTheDocument();
    expect(screen.getByText('10000')).toBeInTheDocument();
    expect(screen.getByText('EUR')).toBeInTheDocument();
    expect(screen.queryByText('Urgent!')).not.toBeInTheDocument();
    expect(screen.getByTestId('shelter-sticker')).toBeInTheDocument();

    const button = screen.getByLabelText('add to cart');
    expect(button).toBeEnabled();
    fireEvent.click(button);
    expect(mockHandleAddToCart).toHaveBeenCalledOnce();
  });

  it('Renders product with discount.', () => {
    const mockHandleAddToCart = vi.fn();
    const discountObject: Discount = {
      discount: { id: 'd1', typeId: 'discount' },
      value: {
        centAmount: 8000,
        currencyCode: 'EUR',
        fractionDigits: 2,
        type: 'centPrecision',
      },
    };
    const discountedProduct = { ...baseProduct, discount: discountObject };

    renderWithRouter(
      <ProductCard
        product={discountedProduct}
        isButtonDisabled={true}
        handleAddToCart={mockHandleAddToCart}
      />,
    );

    expect(screen.getByText('Urgent!')).toBeInTheDocument();
    expect(screen.getByText('80.00')).toBeInTheDocument();

    const originalPrice = screen.getByText('10000');
    expect(originalPrice).toHaveStyle('text-decoration: line-through');

    const button = screen.getByLabelText('add to cart');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(mockHandleAddToCart).not.toHaveBeenCalled();
  });
});
