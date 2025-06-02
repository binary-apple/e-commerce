export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return Number.isNaN(date.getTime()) ? isoDate : date.toLocaleDateString('ru-RU');
};
