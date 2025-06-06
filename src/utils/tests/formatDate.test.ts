import { describe, it, expect } from 'vitest';
import { formatDate, normalizeDate, toUtcIsoString } from '../formatDate';

describe('formatDate', () => {
  it('formatDate should not format date with time:', () => {
    expect(formatDate('2025-01-01 00-00-00')).toBe('2025-01-01 00-00-00');
  });

  it('formatDate should format date:', () => {
    expect(formatDate('2025-01-01')).toBe('01.01.2025');
  });
});

describe('toUtcIsoString', () => {
  it('toUtcIsoString should convert date to ISO string:', () => {
    expect(toUtcIsoString(new Date('01-01-2025'))).toBe('2025-01-01T00:00:00.000Z');
  });
});

describe('normalizeDate', () => {
  it('normalizeDate should normalize date:', () => {
    expect(normalizeDate('01.10.2025')).toBe('2025-10-01');
  });

  it('normalizeDate should retutn empty string for invalid input:', () => {
    expect(normalizeDate('cat')).toBe('');
  });

  it('normalizeDate should normalize date with time:', () => {
    expect(normalizeDate('2025-10-01T00:00:00.000Z')).toBe('2025-10-01');
  });
});
