import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { checkAge } from '../checkAge';

const mockCurrentYear = 2025;
const mockCurrentMonth = 4;
const mockCurrentDay = 22;

describe('checkAge', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    const mockDate = new Date(mockCurrentYear, mockCurrentMonth, mockCurrentDay);
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('checkAge should return true for old dates:', () => {
    const mockYear = 1990;
    const mockMonth = 1;
    const mockDay = 1;
    const birthday = new Date(mockYear, mockMonth, mockDay);
    expect(checkAge(birthday)).toBeTruthy();
  });

  it('checkAge should return false for new dates:', () => {
    const mockYear = 2020;
    const mockMonth = 1;
    const mockDay = 1;
    const birthday = new Date(mockYear, mockMonth, mockDay);
    expect(checkAge(birthday)).toBeFalsy();
  });

  it('checkAge should return true for exactly 18 years:', () => {
    const mockYear = 2007;
    const mockMonth = 4;
    const mockDay = 22;
    const birthday = new Date(mockYear, mockMonth, mockDay);
    expect(checkAge(birthday)).toBeTruthy();
  });

  it('checkAge should return false for day before 18 years:', () => {
    const mockYear = 2007;
    const mockMonth = 4;
    const mockDay = 23;
    const birthday = new Date(mockYear, mockMonth, mockDay);
    expect(checkAge(birthday)).toBeFalsy();
  });
});
