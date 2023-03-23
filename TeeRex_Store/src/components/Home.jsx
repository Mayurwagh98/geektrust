import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  let [products, setProducts] = useState([]);

  let getData = async () => {
    await axios
      .get("http://localhost:8080/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
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
  );
};

export { Home };
