import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Filter } from "./Filter";
import { Button } from "antd";
import { useLocation, useSearchParams } from "react-router-dom";

const Home = () => {
  let [products, setProducts] = useState([]);

  let [search, setSearch] = useState("");
  let [searchParams] = useSearchParams();
  let location = useLocation();

  let getData = async (queryParams) => {
    await axios
      .get(`http://localhost:8080/products?q=${search}`, queryParams)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (location || products.length === 0) {
      let color = searchParams.getAll("color");
      let queryParams = {
        params: {
          color: color,
        },
      };
      getData(queryParams);
    }
  }, [search, location.search]);

  // ----------- add to cart ---------------
  let handleCart = (item) => {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    for (let x of cartItems) {
      if (x.id == item.id) {
        return alert("Item already in the cart");
      }
    }
    let qty = 1;
    item = { ...item, qty };
    cartItems.push(item);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

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
                <p>₹{item.price}</p>
                <Button type="primary" onClick={() => handleCart(item)}>
                  Add to Cart
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export { Home };
