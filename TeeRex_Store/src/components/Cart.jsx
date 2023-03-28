import React, { useEffect, useState } from "react";
import "./Cart.css";
import { Button, message, Space } from "antd";
import axios from "axios";

const Cart = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let [cartItems, setCartItems] = useState(cart);
  console.log(cartItems);
  const [messageApi, contextHolder] = message.useMessage();

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Out of Stock",
    });
  };

  let handleQty = (sign, item) => {
    let qty;
    if (sign == "+") {
      if (item.qty == item.quantity) {
        return warning();
      }
      qty = ++item.qty;
      item = { ...item, qty };
    } else {
      qty = --item.qty;
      item = { ...item, qty };
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setCartItems([...cartItems]);
    // console.log(item);
  };

  let sum = 0;
  for (let x of cartItems) {
    sum += x.qty * x.price;
  }

  // -------- delete ------------
  let handleDelete = (index) => {
    localStorage.removeItem(index);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  return (
    <>
      {contextHolder}

      <h2>Total:-{sum}</h2>
      <div className="main_cart_div">
        {cartItems.map((item, index) => {
          return (
            <div key={index}>
              <img src={item.imageURL} alt="image" />
              <h2>{item.name}</h2>
              <p>₹{item.price}</p>
              <div className="inc_dec_div">
                <Button
                  type="primary"
                  onClick={() => handleQty("-", item)}
                  disabled={item.qty == 1}
                >
                  -
                </Button>
                <p>{item.qty}</p>
                <Button type="primary" onClick={() => handleQty("+", item)}>
                  +
                </Button>
              </div>

              <Button type="primary" danger onClick={() => handleDelete(index)}>
                Delete
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export { Cart };
