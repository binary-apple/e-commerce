import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OopsBox from './OopsBox';
import { NotFoundConstants } from '../constants';

describe('OopsBox', () => {
  it('Must render ', () => {
    render(<OopsBox />);

    expect(screen.getByRole('heading', { name: NotFoundConstants.errorText })).toBeInTheDocument();
    expect(screen.getByAltText(NotFoundConstants.errorText)).toBeInTheDocument();
  });
});
