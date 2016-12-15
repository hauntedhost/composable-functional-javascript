const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`,
});

const moneyToFloat = str =>
  Box(str)
  .map(s => s.replace(/\$/g, ''))
  .map(r => parseFloat(r));

const percentToFloat = str =>
  Box(str)
  .map(s => s.replace(/\%/g, ''))
  .map(s => parseFloat(s))
  .map(n => n * 0.01);

console.log(moneyToFloat('$10.50'));
console.log(percentToFloat('12.25%'));

const applyDiscount = (priceStr, discountStr) =>
  moneyToFloat(priceStr)
  .fold(price =>
    percentToFloat(discountStr)
    .fold(discount =>
      price - price * discount));

console.log(applyDiscount('$20', '10%'));
