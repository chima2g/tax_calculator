import { getTotalTax } from "./helpers";
import { useState } from "react";

const TaxCalculator = () => {
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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pay-input">Pay:</label>
        <input data-testid={"pay-input"} onChange={handleChange}></input>
        <button data-testid={"submit-btn"}>Submit</button>
        <ul>
          <li data-testid={"income-tax"}>Total Income Tax = {incomeTax}</li>
          <li data-testid={"ni-tax"}>Total NI Tax = {nITax}</li>
          <li data-testid={"net-pay"}>Net Pay = {netPay}</li>
        </ul>
      </form>
    </div>
  );
};

export default TaxCalculator;
