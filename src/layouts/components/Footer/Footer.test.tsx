import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('<Footer />', () => {
  it('<Footer /> should contain footer element:', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).not.toBeNull();
  });

  it('<Footer /> should render h2 element:', () => {
    render(<Footer />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toContain('FurEver');
  });

  it('<Footer /> should have link to RS School website', () => {
    render(<Footer />);
    const link = screen
      .getAllByRole('link')
      .find(
        (element) => element instanceof HTMLAnchorElement && element.href === 'https://rs.school/',
      );
    expect(link).toBeDefined();
  });
});
