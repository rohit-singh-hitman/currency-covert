import React from "react";

const Currency = (props) => {
  const { currencyOptions,onChangeAmount, amount, selectCurrency, changeCurrency } = props;
  return (
    <>
      <input type="number" className='input' value={amount} onChange={onChangeAmount}/>
      <select value={selectCurrency} onChange={changeCurrency}>
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};
export default Currency;
