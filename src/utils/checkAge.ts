export function checkAge(DateBirthday: Date): boolean {
  const validAge = 18;
  const today = new Date();
  let yearDiff = today.getFullYear() - DateBirthday.getFullYear();
  const monthDiff = today.getMonth() - DateBirthday.getMonth();
  const dayDiff = today.getDate() - DateBirthday.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    yearDiff--;
  }

  return yearDiff >= validAge;
}
