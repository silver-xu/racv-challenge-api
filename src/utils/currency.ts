const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  useGrouping: true,
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

/**
 * Format Currency
 *
 * Note: Usually we would use cents rather than dollars,
 * but for simplicity of this exercise I chose to use
 * dollars
 */
export const formatCurrency = (dollars: number): string => formatter.format(dollars);
