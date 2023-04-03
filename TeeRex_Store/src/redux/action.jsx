import * as types from "./actionTypes";
import axios from "axios";

let get_products_request = () => {
  return {
    type: types.Get_Product_Request,
  };
};

let get_products_success = (payload) => {
  return {
    type: types.Get_Product_Success,
    payload,
  };
};
let get_products_failure = () => {
  return {
    type: types.Get_Product_Failure,
  };
};

let getProducts = (queryParams,search) => async (dispatch) => {
  dispatch(get_products_request());
  await axios
    .get(`http://localhost:8080/products?q=${search}`, queryParams)
    .then((res) => {
      console.log(res.data);
      dispatch(get_products_success(res.data));
    //   setProducts(res.data);
    })
    .catch((e) => {
      console.log(e);
      dispatch(get_products_failure(e));
    });
};

export { getProducts };
