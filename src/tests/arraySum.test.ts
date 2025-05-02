import { expect, test } from 'vitest';
import arraySum from '../service/arraySum.ts';

const ZERO: number = 0;
const ONE: number = 1;
const TWO: number = 2;
const TEN: number = 10;
const EXPECTED_SUM: number = 13;

const array: Array<number> = [ZERO, ONE, TWO, ZERO, TEN];

test('Sum of array [0, 1, 2, 0, 10] to equal 13', () => {
  expect(arraySum(array)).toBe(EXPECTED_SUM);
});
