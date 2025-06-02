import { parse } from 'date-fns';

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return Number.isNaN(date.getTime()) ? isoDate : date.toLocaleDateString('ru-RU');
};

export const toUtcIsoString = (date: Date): string => {
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return utcDate.toISOString();
};

export const normalizeDate = (value: string): string => {
  const parsed = parse(value, 'dd.MM.yyyy', new Date());

  if (!Number.isNaN(parsed.getTime())) {
    return toUtcIsoString(parsed).split('T')[0];
  }

  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.split('T')[0];
  }

  return '';
};
