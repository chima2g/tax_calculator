import { getBracketTax, taxBrackets } from "./helpers";

describe("getBracketTax", () => {
  const validCalculations = {
    pay1: {
      pay: 14000,
      bracket1Tax: { incomeTax: 0, nITax: 0 },
      bracket2Tax: { incomeTax: 0, nITax: 0 },
      bracket3Tax: { incomeTax: 0, nITax: 0 },
    },
    pay2: {
      pay: 20000,
      bracket1Tax: { incomeTax: 0, nITax: 0 },
      bracket2Tax: { incomeTax: 1000, nITax: 600 },
      bracket3Tax: { incomeTax: 0, nITax: 0 },
    },
    pay3: {
      pay: 55000,
      bracket1Tax: { incomeTax: 0, nITax: 0 },
      bracket2Tax: { incomeTax: 7000, nITax: 4200 },
      bracket3Tax: { incomeTax: 2000, nITax: 100 },
    },
  };

  it("returns the correct tax in a given tax bracket", () => {
    Object.values(validCalculations).forEach((calculation) => {
      expect(getBracketTax(calculation.pay, taxBrackets.taxBracket1)).toEqual(
        calculation.bracket1Tax
      );
      expect(getBracketTax(calculation.pay, taxBrackets.taxBracket2)).toEqual(
        calculation.bracket2Tax
      );
      expect(getBracketTax(calculation.pay, taxBrackets.taxBracket3)).toEqual(
        calculation.bracket3Tax
      );
    });
  });
});
