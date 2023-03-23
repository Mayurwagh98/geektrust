import React, { useState } from "react";
import axios from "axios";

const Filter = ({ setProducts }) => {
  let [selected, setSelected] = useState(null);

  let handleCheckbox = async (event) => {
    // console.log(event.target.value);
    setSelected(event.target.value);
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
      <input
        type="checkbox"
        value="Black"
        checked={selected === "Black"} // allowing user to select only one checkbox
        onChange={handleCheckbox}
      />
      <label>Black</label>
      <input
        type="checkbox"
        value="Pink"
        checked={selected === "Pink"} // allowing user to select only one checkbox
        onChange={handleCheckbox}
      />
      <label>Pink</label>
      <input
        type="checkbox"
        value="Green"
        checked={selected === "Green"} // allowing user to select only one checkbox
        onChange={handleCheckbox}
      />
      <label>Green</label>
      <input
        type="checkbox"
        value="Blue"
        checked={selected === "Blue"} // allowing user to select only one checkbox
        onChange={handleCheckbox}
      />
      <label>Black</label>
      <input
        type="checkbox"
        value="Red"
        checked={selected === "Red"} // allowing user to select only one checkbox
        onChange={handleCheckbox}
      />
      <label>Red</label>
    </div>
  );
};

export { Filter };
