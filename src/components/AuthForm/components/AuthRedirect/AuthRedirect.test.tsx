import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AuthRedirect from './AuthRedirect';
import { redirectionConfig } from './constants';
import { AuthViews } from '../../../../types/authViews';

describe('AuthRedirect tests', () => {
  it.each([AuthViews.LOGIN, AuthViews.REGISTRATION])(
    'Must render AuthRedirect component',
    (view: AuthViews) => {
      const { title, linkLabel, url } = redirectionConfig[view];

      render(
        <MemoryRouter>
          <AuthRedirect view={view} />
        </MemoryRouter>,
      );

      const box = screen.getByText(title).closest('div');
      expect(box).toBeInTheDocument();

      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(linkLabel)).toBeInTheDocument();

      const link = screen.getByRole('link', { name: linkLabel });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', url);
    },
  );
});
