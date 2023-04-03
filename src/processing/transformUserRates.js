export function transformUserRates(ratesObj) {
  const transformed = [];

  Object.entries(ratesObj).forEach(([from, toCurrencies]) => {
    Object.entries(toCurrencies).forEach(([to, value]) => {
      transformed.push({ from, to, value });
    });
  });

  return transformed;
}
