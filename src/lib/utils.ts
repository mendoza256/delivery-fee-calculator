export function toEuros(cents: number) {
  return (cents / 100).toFixed(2);
}
