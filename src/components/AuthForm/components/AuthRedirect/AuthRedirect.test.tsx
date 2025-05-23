import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AuthRedirect from './AuthRedirect';
import { redirectionConfig } from './constants';
import { AuthViews } from '../../../../types/authViews';

describe('AuthRedirect tests', () => {
  it.each([
    [AuthViews.LOGIN, AuthViews.REGISTRATION],
    [AuthViews.REGISTRATION, AuthViews.LOGIN],
  ])(
    'Each form must render its own AuthRedirect component with own configuration data',
    (firstView: AuthViews, secondView) => {
      const { title, linkLabel, url } = redirectionConfig[firstView];
      const {
        title: secondTitle,
        linkLabel: secondLinkLabel,
        url: secondUrl,
      } = redirectionConfig[secondView];

      render(
        <MemoryRouter>
          <AuthRedirect view={firstView} />
        </MemoryRouter>,
      );

      const box = screen.getByText(title).closest('div');
      expect(box).toBeInTheDocument();

      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.queryByText(secondTitle)).not.toBeInTheDocument();
      expect(screen.getByText(linkLabel)).toBeInTheDocument();
      expect(screen.queryByText(secondLinkLabel)).not.toBeInTheDocument();

      const link = screen.getByRole('link', { name: linkLabel });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', url);
      expect(link.getAttribute('href')).not.toContain(secondUrl);
    },
  );
});
