//import "./styles.css";
import Currency from "./Currency";
import React, { useEffect, useState } from "react";
const BASE_URL = "https://api.exchangeratesapi.io/latest";
export default function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setTOCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [amountFromIncurrency, setAmountFromIncurrency] = useState(true);
  const [exchangeRates, setexchangeRates] = useState();

  let toamount, fromAmount;
  if (amountFromIncurrency) {
    fromAmount = amount;
    toamount = amount * exchangeRates;
  } else {
    toamount = amount;
    fromAmount = amount / exchangeRates;
  }
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setTOCurrency(firstCurrency);
        setexchangeRates(data.rates[firstCurrency]);
      });
  }, []);

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountFromIncurrency(true);
  };
  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountFromIncurrency(false);
  };
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbol=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setexchangeRates(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);
  return (
    <div className="App" className="AppBar">
      
        <h1>currency converter </h1>
        <Currency
          currencyOptions={currencyOptions}
          selectCurrency={fromCurrency}
          amount={fromAmount}
          onChangeAmount={handleFromAmountChange}
          changeCurrency={(e) => setFromCurrency(e.target.value)}
        />
        <div className="equals">=</div>
        <Currency
          currencyOptions={currencyOptions}
          selectCurrency={toCurrency}
          amount={toamount}
          onChangeAmount={handleToAmountChange}
          changeCurrency={(e) => setTOCurrency(e.target.value)}
        />
      
    </div>
  );
}