import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { UserAvatar } from './UserAvatar';

vi.mock('../../api/authApi', () => ({
  useLazyGetMeQuery: vi.fn(),
}));

vi.mock('../../utils/getUserInitials', () => ({
  getUserInitials: vi.fn(),
}));

vi.mock('./UserAvatar.module.scss', () => ({
  default: {
    'user-avatar': 'mocked-user-avatar-class',
  },
}));

const { useLazyGetMeQuery } = await import('../../api/authApi');
const { getUserInitials } = await import('../../utils/getUserInitials');

const initialAuthState = { accessToken: '' };

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: (state = initialAuthState) => state,
    },
    preloadedState: {
      auth: { accessToken: '' },
      ...initialState,
    },
  });
};

describe('UserAvatar', () => {
  it('returns null when user data is not available', () => {
    const mockTrigger = vi.fn();
    vi.mocked(useLazyGetMeQuery).mockReturnValue([
      mockTrigger,
      {
        data: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: undefined,
        reset: vi.fn(),
      },
      { lastArg: '' },
    ]);

    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <UserAvatar />
      </Provider>,
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders avatar with user initials when user data is available', () => {
    const mockTrigger = vi.fn();
    const mockUser = {
      firstName: 'John',
      lastName: 'Doe',
    };

    vi.mocked(useLazyGetMeQuery).mockReturnValue([
      mockTrigger,
      {
        data: mockUser,
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: undefined,
        reset: vi.fn(),
      },
      { lastArg: '' },
    ]);

    vi.mocked(getUserInitials).mockReturnValue('JD');

    const store = createMockStore();
    render(
      <Provider store={store}>
        <UserAvatar />
      </Provider>,
    );

    expect(screen.getByText('JD')).toBeDefined();
    expect(getUserInitials).toHaveBeenCalledWith('John', 'Doe');
  });

  it('triggers API call when accessToken is available', () => {
    const mockTrigger = vi.fn();
    const accessToken = 'mock-access-token';

    vi.mocked(useLazyGetMeQuery).mockReturnValue([
      mockTrigger,
      {
        data: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: undefined,
        reset: vi.fn(),
      },
      { lastArg: '' },
    ]);

    const store = createMockStore({
      auth: { accessToken },
    });

    render(
      <Provider store={store}>
        <UserAvatar />
      </Provider>,
    );

    expect(mockTrigger).toHaveBeenCalledWith(accessToken);
  });

  it('does not trigger API call when accessToken is not available', () => {
    const mockTrigger = vi.fn();

    vi.mocked(useLazyGetMeQuery).mockReturnValue([
      mockTrigger,
      {
        data: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: undefined,
        reset: vi.fn(),
      },
      { lastArg: '' },
    ]);

    const store = createMockStore({
      auth: { accessToken: '' },
    });

    render(
      <Provider store={store}>
        <UserAvatar />
      </Provider>,
    );

    expect(mockTrigger).not.toHaveBeenCalled();
  });

  it('renders Avatar with correct CSS class', () => {
    const mockTrigger = vi.fn();
    const mockUser = {
      firstName: 'Jane',
      lastName: 'Smith',
    };

    vi.mocked(useLazyGetMeQuery).mockReturnValue([
      mockTrigger,
      {
        data: mockUser,
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: undefined,
        reset: vi.fn(),
      },
      { lastArg: '' },
    ]);

    vi.mocked(getUserInitials).mockReturnValue('JS');

    const store = createMockStore();
    render(
      <Provider store={store}>
        <UserAvatar />
      </Provider>,
    );

    const avatar = document.querySelector('.mocked-user-avatar-class');
    expect(avatar).toBeDefined();
  });
});
