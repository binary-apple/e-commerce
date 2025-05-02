export default function arraySum(array: number[]): number {
  return array.reduce((sum: number, current: number) => sum + current, 0);
}
