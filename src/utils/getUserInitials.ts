export const getUserInitials = (firstName?: string, lastName?: string): string => {
  const first = firstName?.[0] ?? '';
  const last = lastName?.[0] ?? '';
  return (first + last).toUpperCase();
};
