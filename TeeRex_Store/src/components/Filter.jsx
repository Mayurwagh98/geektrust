import React, { useState } from "react";
import axios from "axios";

const Filter = ({ setProducts }) => {
  let handleCheckbox = async (event) => {
    // console.log(event.target.value);
    await axios
      .get(`http://localhost:8080/products?color=${event.target.value}`)
      .then((res) => {
        // console.log(res.data);
        setProducts(res.data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <h1>Filter</h1>
      <input type="checkbox" value="Black" onChange={handleCheckbox} />
      <label>Black</label>
      <input type="checkbox" value="Pink" onChange={handleCheckbox} />
      <label>Pink</label>
      <input type="checkbox" value="Green" onChange={handleCheckbox} />
      <label>Green</label>
      <input type="checkbox" value="Blue" onChange={handleCheckbox} />
      <label>Black</label>
      <input type="checkbox" value="Red" onChange={handleCheckbox} />
      <label>Red</label>
    </div>
  );
};

export { Filter };
