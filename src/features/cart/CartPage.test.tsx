import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router';
import CartPage from './CartPage';

vi.mock('../../components/Title/Title', () => ({
  default: ({ title }: { title: string }) => <h1>{title}</h1>,
}));

vi.mock('./components/CartItem/CartItem', () => ({
  default: ({ item }: { item: { id: string; name: string } }) => (
    <div data-testid={`cart-item-${item.id}`}>{item.name}</div>
  ),
}));

vi.mock('./components/CartSummary/CartSummary', () => ({
  CartSummary: ({ cart }: { cart: { id: string } }) => (
    <div data-testid="cart-summary">Summary for {cart.id}</div>
  ),
}));

type ClearCartDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
};

vi.mock('./components/ClearCartDialog/ClearCartDialog', () => ({
  default: ({ open, onClose, onConfirm, isLoading }: ClearCartDialogProps) =>
    open ? (
      <div data-testid="clear-cart-dialog">
        <button onClick={onClose} data-testid="cancel-button">
          Cancel
        </button>
        <button onClick={onConfirm} data-testid="confirm-button" disabled={isLoading}>
          {isLoading ? 'Clearing...' : 'Confirm'}
        </button>
      </div>
    ) : null,
}));

vi.mock('../../api/cartApi', () => ({
  useGetMyActiveCartQuery: vi.fn(),
  useClearCartMutation: vi.fn(),
}));

vi.mock('notistack', () => ({
  enqueueSnackbar: vi.fn(),
}));

vi.mock('./CartPage.module.scss', () => ({
  default: {
    container: 'mocked-container',
    cart: 'mocked-cart',
    'cart-wrapper': 'mocked-cart-wrapper',
    'cart-header': 'mocked-cart-header',
    summary: 'mocked-summary',
    image: 'mocked-image',
  },
}));

vi.mock('/bowl.png', () => ({
  default: 'mocked-bowl-image.png',
}));

vi.mock('../../types/paths', () => ({
  Paths: {
    CATALOG: '/catalog',
  },
}));

const { useGetMyActiveCartQuery, useClearCartMutation } = await import('../../api/cartApi');

const createMockStore = () => {
  return configureStore({
    reducer: {
      auth: (state = {}) => state,
    },
  });
};

type MockQueryResult = ReturnType<typeof useGetMyActiveCartQuery>;
type MockMutationResult = ReturnType<typeof useClearCartMutation>;

const createMockQueryResult = (overrides: Partial<MockQueryResult> = {}): MockQueryResult => {
  const baseResult: MockQueryResult = {
    data: undefined,
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: undefined,
    refetch: vi.fn(),
    isFetching: false,
    isUninitialized: false,
    currentData: undefined,
    endpointName: 'getMyActiveCart',
    originalArgs: undefined,
    requestId: 'test-request-id',
    startedTimeStamp: Date.now(),
    fulfilledTimeStamp: undefined,
    status: 'fulfilled' as const,
  };

  return { ...baseResult, ...overrides };
};

const createMockMutationResult = (
  mutationOverrides: Partial<MockMutationResult[1]> = {},
): MockMutationResult => {
  const mockTrigger = vi.fn();
  const baseResult = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: undefined,
    reset: vi.fn(),
    data: undefined,
    isUninitialized: true,
    originalArgs: undefined,
    requestId: undefined,
    endpointName: 'clearCart',
    startedTimeStamp: undefined,
    fulfilledTimeStamp: undefined,
    status: 'uninitialized' as const,
  };

  return [mockTrigger, { ...baseResult, ...mutationOverrides }];
};

const mockCart = {
  id: 'cart-123',
  version: 1,
  lineItems: [
    { id: 'item-1', name: 'Product 1' },
    { id: 'item-2', name: 'Product 2' },
  ],
};

const mockEmptyCart = {
  id: 'cart-456',
  version: 1,
  lineItems: [],
};

describe('CartPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading spinner when cart is loading', () => {
    vi.mocked(useGetMyActiveCartQuery).mockReturnValue(createMockQueryResult({ isLoading: true }));
    vi.mocked(useClearCartMutation).mockReturnValue(createMockMutationResult());

    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(document.querySelector('.MuiCircularProgress-root')).toBeDefined();
  });

  it('shows empty cart message when cart is empty', () => {
    vi.mocked(useGetMyActiveCartQuery).mockReturnValue(
      createMockQueryResult({ data: mockEmptyCart }),
    );
    vi.mocked(useClearCartMutation).mockReturnValue(createMockMutationResult());

    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Empty cart = sad shelter animals!')).toBeDefined();
    expect(screen.getByText('Fill your cart to fill their bowls.')).toBeDefined();
    expect(screen.getByText('Go to Catalog')).toBeDefined();
  });

  it('shows empty cart message when cart is null', () => {
    vi.mocked(useGetMyActiveCartQuery).mockReturnValue(createMockQueryResult({ data: null }));
    vi.mocked(useClearCartMutation).mockReturnValue(createMockMutationResult());

    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Empty cart = sad shelter animals!')).toBeDefined();
  });

  it('renders cart with items', () => {
    vi.mocked(useGetMyActiveCartQuery).mockReturnValue(createMockQueryResult({ data: mockCart }));
    vi.mocked(useClearCartMutation).mockReturnValue(createMockMutationResult());

    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Your Cart')).toBeDefined();
    expect(screen.getByText('Clear Cart')).toBeDefined();
    expect(screen.getByTestId('cart-item-item-1')).toBeDefined();
    expect(screen.getByTestId('cart-item-item-2')).toBeDefined();
    expect(screen.getByTestId('cart-summary')).toBeDefined();
  });

  it('opens clear cart dialog when clear button is clicked', async () => {
    const user = userEvent.setup();
    vi.mocked(useGetMyActiveCartQuery).mockReturnValue(createMockQueryResult({ data: mockCart }));
    vi.mocked(useClearCartMutation).mockReturnValue(createMockMutationResult());

    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </Provider>,
    );

    const clearButton = screen.getByText('Clear Cart');
    await user.click(clearButton);

    expect(screen.getByTestId('clear-cart-dialog')).toBeDefined();
  });

  it('closes dialog when cancel is clicked', async () => {
    const user = userEvent.setup();
    vi.mocked(useGetMyActiveCartQuery).mockReturnValue(createMockQueryResult({ data: mockCart }));
    vi.mocked(useClearCartMutation).mockReturnValue(createMockMutationResult());

    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </Provider>,
    );

    const clearButton = screen.getByText('Clear Cart');
    await user.click(clearButton);

    const cancelButton = screen.getByTestId('cancel-button');
    await user.click(cancelButton);

    expect(screen.queryByTestId('clear-cart-dialog')).toBeNull();
  });
});
