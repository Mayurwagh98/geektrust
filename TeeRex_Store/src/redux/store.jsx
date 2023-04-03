import thunk from "redux-thunk";
import { reducer } from "./reducer";
import { legacy_createStore, applyMiddleware } from "redux";

let store = legacy_createStore(reducer, applyMiddleware(thunk));

export { store };
