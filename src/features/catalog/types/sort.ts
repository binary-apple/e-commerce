import { SortOptions } from '../components/Sort/constants';

export type SortValues = (typeof SortOptions)[number]['value'];

export function isSortValues(value: unknown): value is SortValues {
  return typeof value === 'string' && SortOptions.some((opt) => opt.value === value);
}
