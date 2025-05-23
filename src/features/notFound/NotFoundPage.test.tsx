import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NotFoundPage from './NotFoundPage';
import { NotFoundConstants } from './constants';

describe('NotFoundPage', () => {
  it('Must render NotFound page with OopsBox inside and anchor with link to main page', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    const oopsTitle: HTMLHeadingElement = screen.getByRole('heading', {
      name: NotFoundConstants.errorText,
    });
    expect(oopsTitle).toBeInTheDocument();

    const mainMessage: HTMLHeadingElement = screen.getByRole('heading', {
      name: NotFoundConstants.mainMessage,
    });
    expect(mainMessage).toBeInTheDocument();

    const link: HTMLAnchorElement = screen.getByRole('link', {
      name: NotFoundConstants.linkLabel,
    });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/');
  });
});
