import * as types from "./actionTypes";

let initialState = {
  products: [],
};

let reducer = (oldState = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case types.Get_Product_Request:
      return {
        ...oldState,
      };
    case types.Get_Product_Success:
      return {
        ...oldState,
        products: payload,
      };
    case types.Get_Product_Failure:
      return {
        ...oldState,
      };
    default:
      return oldState;
  }
};

export { reducer };
