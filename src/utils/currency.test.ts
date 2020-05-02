import { formatCurrency } from './currency';

describe('formatCurrency tests', () => {
  it('100 should be formatted to $100', () => {
    expect(formatCurrency(100)).toEqual('$100');
  });

  it('1000 should be formatted to $100', () => {
    expect(formatCurrency(1000)).toEqual('$1,000');
  });

  it('0 should be formatted to $0', () => {
    expect(formatCurrency(0)).toEqual('$0');
  });

  it('0.3 should be formatted to $0', () => {
    expect(formatCurrency(0.3)).toEqual('$0');
  });
});
