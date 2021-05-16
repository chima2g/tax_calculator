const errorObject = {
  incomeTax: Number.NaN,
  nITax: Number.NaN,
};

const taxBrackets = {
  taxBracket1: {
    lowerBracket: 0,
    upperBracket: 15000,
    incomeTaxRate: 0.0,
    nITaxRate: 0.0,
  },
  taxBracket2: {
    lowerBracket: 15000,
    upperBracket: 50000,
    incomeTaxRate: 0.2,
    nITaxRate: 0.12,
  },
  taxBracket3: {
    lowerBracket: 50000,
    upperBracket: Number.NaN,
    incomeTaxRate: 0.4,
    nITaxRate: 0.02,
  },
};

const getBracketTax = (
  pay,
  { lowerBracket, upperBracket, nITaxRate, incomeTaxRate }
) => {
  let amountToTax;
  let isHighestTaxBracket = Number.isNaN(upperBracket);
  let isPayUnderLowerTaxBracket = pay < lowerBracket;
  let isPayOverUpperTaxBracket = pay > upperBracket;

  if (isPayUnderLowerTaxBracket) {
    amountToTax = 0;
  } else if (isHighestTaxBracket) {
    amountToTax = pay - lowerBracket;
  } else if (isPayOverUpperTaxBracket) {
    amountToTax = upperBracket - lowerBracket;
  } else {
    amountToTax = pay - lowerBracket;
  }

  let incomeTax = incomeTaxRate * amountToTax;
  let nITax = nITaxRate * amountToTax;

  return { incomeTax, nITax };
};

export { taxBrackets, getBracketTax, errorObject };
