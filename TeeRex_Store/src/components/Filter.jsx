import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Filter = ({ setProducts }) => {
  let [selected, setSelected] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();
  let [category, setCategory] = useState(searchParams.getAll("color") || []);

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

  let handleFilter = (event) => {
    let option = event.target.value;
    //logic --> if the option is present in the category array, remove it,
    //else add it to the category array

    let newCategory = [...category]; //making the copy of the category
    if (newCategory.includes(option)) {
      //remove it
      newCategory.splice(newCategory.indexOf(option), 1);
    } else {
      // add it
      newCategory.push(option);
    }
    setCategory(newCategory);
  };
  console.log(category);

  useEffect(() => {
    //used useEffect because every time user clicks on filter, search param should change and DOM should re-render
    let params = {};
    category && (params.color = category);
    setSearchParams(params);
  }, [category, setSearchParams]);

  return (
    <div>
      <section>
        <h1>Filter by Color</h1>
        <input
          type="checkbox"
          value="Black"
          // checked={selected === "Black"}
          defaultChecked={category.includes("Black")} // allowing user to select only one checkbox
          onChange={handleFilter}
        />
        <label>Black</label>
        <input
          type="checkbox"
          value="Pink"
          // checked={selected === "Pink"} // allowing user to select only one checkbox
          defaultChecked={category.includes("Pink")}
          onChange={handleFilter}
        />
        <label>Pink</label>
        <input
          type="checkbox"
          value="Green"
          // checked={selected === "Green"} // allowing user to select only one checkbox
          defaultChecked={category.includes("Green")}
          onChange={handleFilter}
        />
        <label>Green</label>

        <input
          type="checkbox"
          value="Red"
          // checked={selected === "Red"} // allowing user to select only one checkbox
          defaultChecked={category.includes("Red")}
          onChange={handleFilter}
        />
        <label>Red</label>
      </section>
      <section>
        <h1>Filter by Gender</h1>
        <input
          type="checkbox"
          value="Men"
          checked={selected === "Men"} // allowing user to select only one checkbox
          onChange={handleFilter}
        />
        <label>Men</label>
        <input
          type="checkbox"
          value="Women"
          checked={selected === "Women"} // allowing user to select only one checkbox
          onChange={handleFilter}
        />
        <label>Women</label>
      </section>
    </div>
  );
};

export { Filter };
