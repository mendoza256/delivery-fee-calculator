export function toEuros(cents: number) {
  return (cents / 100).toFixed(2);
}

export function toCents(euros: number) {
  return euros * 100;
}
