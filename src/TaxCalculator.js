import { getTotalTax } from "./helpers";
import { useState } from "react";

const TaxCalculator = () => {
  const formatter = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  });

  const [pay, setPay] = useState(0);
  const [nITax, setNITax] = useState(0);
  const [incomeTax, setIncomeTax] = useState(0);
  const [netPay, setNetPay] = useState(0);

  const handleChange = (e) => {
    setPay(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { totalNITax, totalIncomeTax } = getTotalTax(pay);
    setNITax(totalNITax);
    setIncomeTax(totalIncomeTax);
    setNetPay(pay - totalNITax - totalIncomeTax);
  };

  return (
    <main>
      <h2>Tax Calculator</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pay-input">Pay:</label>
        <input
          placeholder="enter your pay"
          type="number"
          step="any"
          data-testid={"pay-input"}
          onChange={handleChange}
          required={true}
        ></input>
        <button data-testid={"submit-btn"}>Submit</button>
      </form>
      <ul>
        <li data-testid={"income-tax"}>
          Total Income Tax = {formatter.format(incomeTax)}
        </li>
        <li data-testid={"ni-tax"}>Total NI Tax = {formatter.format(nITax)}</li>
        <li data-testid={"net-pay"}>Net Pay = {formatter.format(netPay)}</li>
      </ul>
    </main>
  );
};

export default TaxCalculator;
