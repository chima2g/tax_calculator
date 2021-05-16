import { render, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";

let getByTestId;

beforeEach(() => {
  const component = render(<App />);
  getByTestId = component.getByTestId;
});

describe("App", () => {
  const validCalculations = {
    pay1: {
      pay: 14000,
      incomeTax: 0,
      nITax: 0,
      netPay: 14000,
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

  it("displays the tax calculations for a given pay", async () => {
    const submitButton = getByTestId("submit-btn");
    const inputField = getByTestId("pay-input");

    await waitFor(() => {
      Object.values(validCalculations).forEach((calculation) => {
        fireEvent.change(inputField, {
          target: {
            value: calculation.pay,
          },
        });

        fireEvent.click(submitButton);

        expect(getByTestId(`income-tax`).textContent).toBe(
          `Total Income Tax = ${calculation.incomeTax}`
        );

        expect(getByTestId(`ni-tax`).textContent).toBe(
          `Total NI Tax = ${calculation.nITax}`
        );

        expect(getByTestId(`net-pay`).textContent).toBe(
          `Net Pay = ${calculation.netPay}`
        );
      });
    });
  });
});
