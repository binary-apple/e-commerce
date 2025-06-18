import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import DetailsCard from './DetailsCard';

describe('DetailsCard', () => {
  const mockPropsWithoutBg = {
    title: 'Title',
    imgUrl: './img.png',
    text: 'text',
    isBg: false,
  };
  const mockPropsWithBg = {
    title: 'Title',
    imgUrl: './img.png',
    text: 'text',
    isBg: true,
  };

  it('DetailsCard renders title, text, and image correctly', () => {
    render(<DetailsCard {...mockPropsWithoutBg} />);
    expect(screen.getByText(mockPropsWithoutBg.title)).toBeInTheDocument();
    expect(screen.getByText(mockPropsWithoutBg.text)).toBeInTheDocument();
    const avatar = screen.getByRole('img', { name: /title icon/i });
    expect(avatar).toHaveAttribute('src', mockPropsWithoutBg.imgUrl);
  });

  it('DetailsCard renders background when isBg is true', () => {
    render(<DetailsCard {...mockPropsWithBg} />);
    const divs = screen.getAllByRole('generic');
    expect(divs.some((div) => div.className.includes('card-background'))).toBe(true);
  });

  it('DetailsCard does not render background when isBg is false', () => {
    render(<DetailsCard {...mockPropsWithoutBg} />);
    const divs = screen.getAllByRole('generic');
    expect(divs.some((div) => div.className.includes('card-background'))).toBe(false);
  });
});
