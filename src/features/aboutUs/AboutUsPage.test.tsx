import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutUsPage from './AboutUsPage';
import { MemoryRouter } from 'react-router';

describe('<AboutUsPage />', () => {
  it('<AboutUsPage /> should render h2 element:', () => {
    render(
      <MemoryRouter>
        <AboutUsPage />
      </MemoryRouter>,
    );
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toContain('Meet the Pack');
  });

  it('<AboutUsPage /> should have link to RS School website', () => {
    render(
      <MemoryRouter>
        <AboutUsPage />
      </MemoryRouter>,
    );
    const link = screen
      .getAllByRole('link')
      .find(
        (element) => element instanceof HTMLAnchorElement && element.href === 'https://rs.school/',
      );
    expect(link).toBeDefined();
  });

  it('<AboutUsPage /> should have links to github profiles', () => {
    const teamMembersCount = 3;
    render(
      <MemoryRouter>
        <AboutUsPage />
      </MemoryRouter>,
    );
    const githubLinks = screen
      .getAllByRole('link')
      .filter(
        (element) =>
          element instanceof HTMLAnchorElement &&
          (element.href === 'https://github.com/binary-apple' ||
            element.href === 'https://github.com/tanykos' ||
            element.href === 'https://github.com/montaana01'),
      );
    expect(githubLinks.length).toBe(teamMembersCount);
  });
});
