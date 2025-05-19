import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OopsBox from './OopsBox';
import { NotFoundConstants } from '../constants';

describe('OopsBox', () => {
  it('Must render Oops box with text error end code of error.', () => {
    render(<OopsBox />);

    expect(screen.getByRole('heading', { name: NotFoundConstants.errorText })).toBeInTheDocument();
    expect(screen.getByAltText(NotFoundConstants.errorText)).toBeInTheDocument();
  });
});
