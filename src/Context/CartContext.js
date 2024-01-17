import { useEffect, useReducer } from "react";
import reducer from "../Reducer/card";
import { createContext } from "react";

export let cart = createContext();
function CreateContextAPI({ children }) {
  let [state, dispatch] = useReducer(reducer, {
    cartData: getData(),
    totalCount: "",
  });
  function getData() {
    return localStorage.getItem("store")
      ? JSON.parse(localStorage.getItem("store"))
      : [];
  }
  function setData() {
    localStorage.setItem("store", JSON.stringify(state.cartData));
  }
  useEffect(() => {
    setData();
    dispatch({ type: "itemCount" });
  }, [state.cartData]);

  function removeHandler(id) {
    dispatch({ type: "removeItem", payload: id });
  }

  function addToCart(arrfil) {
    dispatch({ type: "cart", payload: arrfil });
  }
  function removeAll() {
    dispatch({ type: "removeAll" });
  }
  return (
    <cart.Provider value={{ ...state, addToCart, removeHandler, removeAll }}>
      {children}
    </cart.Provider>
  );
}

export default CreateContextAPI;
