export function formatNumber(value) {
  return new Intl.NumberFormat('en-IN').format(value)
}
