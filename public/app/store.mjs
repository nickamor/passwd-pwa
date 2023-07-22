// import { createStore, applyMiddleware } from "https://esm.sh/redux";
import { rootReducer } from "./reducer.mjs";

export const initialState = {
  passwdField: "",
  showOptions: false,
  options: {
    passwdLength: 24,
    nUpper: 1,
    nLower: 1,
    nNumeric: 1,
    nSpecial: 1,
    specialCharset: "!@#$%^*()-_=+",
  },
};

const logger =
  ({ getState }) =>
  (next) =>
  (action) => {
    console.log(action);
    const e = next(action);
    console.log(getState());
    return e;
  };

// const store = createStore(rootReducer, initialState, applyMiddleware(logger));
