//TODO: Ensure both deal with invalid & negatuive number arguments, etc
import {
  getBracketTax,
  getTotalTax,
  taxBrackets,
  errorObject,
} from "./helpers";

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

  it("returns an error object when given an invalid pay", () => {
    expect(getBracketTax("invalid number", taxBrackets.taxBracket1)).toEqual(
      errorObject
    );
  });

  it("returns an error object when given an invalid tax bracket value", () => {
    expect(
      getBracketTax(1000, {
        ...taxBrackets.taxBracket1,
        lowerBracket: "invalid number",
      })
    ).toEqual(errorObject);

    expect(
      getBracketTax(1000, {
        ...taxBrackets.taxBracket1,
        incomeTaxRate: "invalid number",
      })
    ).toEqual(errorObject);

    expect(
      getBracketTax(1000, {
        ...taxBrackets.taxBracket1,
        nITaxRate: "invalid number",
      })
    ).toEqual(errorObject);
  });
});

describe("getTotalTax", () => {
  const validCalculations = {
    pay1: {
      pay: 14000,
      incomeTax: 0,
      nITax: 0,
      netPay: 1400,
    },
    pay2: {
      pay: 20000,
      incomeTax: 1000,
      nITax: 600,
      netPay: 18400,
    },
    pay3: {
      pay: 55000,
      incomeTax: 9000,
      nITax: 4300,
      netPay: 41700,
    },
  };

  it("returns the correct total tax", () => {
    Object.values(validCalculations).forEach((calculation) => {
      expect(getTotalTax(calculation.pay)).toEqual({
        totalNITax: calculation.nITax,
        totalIncomeTax: calculation.incomeTax,
      });
    });
  });

  it("returns an error object given an invalid pay", () => {
    expect(getTotalTax("invalid number")).toEqual(errorObject);
  });
});
