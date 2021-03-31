
import React from 'react'
const BASE_URL = "https://api.exchangeratesapi.io/latest";
const Apifetch = () => {
    fetch(BASE_URL)
      .then((res) =>{ return res.json()}).catch(e=>console.log(e));
}

export default Apifetch;
