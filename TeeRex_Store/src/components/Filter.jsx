import React, { useState } from "react";
import axios from "axios";

const Filter = ({ setProducts }) => {
  let [selected, setSelected] = useState(null);

  let handleCheckbox = async (event) => {
    // console.log(event.target.value);
    setSelected(event.target.value);
    let { value } = event.target;

    if (
      value == "Black" ||
      value == "Green" ||
      value == "Blue" ||
      value == "Red" ||
      value == "Pink"
    ) {
      await axios
        .get(`http://localhost:8080/products?color=${value}`)
        .then((res) => {
          // console.log(res.data);
          setProducts(res.data);
        })
        .catch((e) => console.log(e));
    } else {
      await axios
        .get(`http://localhost:8080/products?gender=${value}`)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <div>
      <section>
        <h1>Filter by Color</h1>
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
          value="Red"
          checked={selected === "Red"} // allowing user to select only one checkbox
          onChange={handleCheckbox}
        />
        <label>Red</label>
      </section>
      <section>
        <h1>Filter by Gender</h1>
        <input
          type="checkbox"
          value="Men"
          checked={selected === "Men"} // allowing user to select only one checkbox
          onChange={handleCheckbox}
        />
        <label>Men</label>
        <input
          type="checkbox"
          value="Women"
          checked={selected === "Women"} // allowing user to select only one checkbox
          onChange={handleCheckbox}
        />
        <label>Women</label>
      </section>
    </div>
  );
};

export { Filter };
