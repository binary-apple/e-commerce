import { describe, it, expect } from 'vitest';
import { getUserInitials } from '../getUserInitials';

describe('getUserInitials', () => {
  it('getUserInitials should return first letters for name and surname:', () => {
    expect(getUserInitials('Angelina', 'Jolie')).toBe('AJ');
  });

  it('getUserInitials should return first letter for name or surname', () => {
    expect(getUserInitials('Madonna')).toBe('M');
  });
});
