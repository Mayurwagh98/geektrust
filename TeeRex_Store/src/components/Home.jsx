import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Filter } from "./Filter";

const Home = () => {
  let [products, setProducts] = useState([]);

  let [search, setSearch] = useState("");

  let getData = async () => {
    await axios
      .get(`http://localhost:8080/products?q=${search}`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getData();
  }, [search]);

  return (
    <>
      <div>
        {/* ------------ filter --------------- */}
        <Filter setProducts={setProducts} />

        {/*---------------- search -------------- */}
        <input
          type="text"
          placeholder="Search by name or type or color"
          className="search"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/*-------------------- data mapped --------------- */}
        <div className="main_products_div">
          {products?.map((item, index) => {
            return (
              <div key={index}>
                <img src={item.imageURL} alt="image" />
                <h2>{item.name}</h2>
                <p>{item.price}</p>
                <button>Add to Cart</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export { Home };
