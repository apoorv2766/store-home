import "./App.css";
import Home from "./Component/Home";
import Product from "./Component/Product";
import { Route, Routes } from "react-router-dom";
import Footer from "./Component/Footer";
import SignUp from "./Component/SignUp";
import ContactUs from "./Component/ContactUs";
import About from "./Component/About";
import { mymobiles } from "./Component/Product_Array";
import { createContext, useState } from "react";
import Cart from "./Component/Cart";
import SinglePage from "./Component/SinglePage";
import Header from "./Component/Header";
export const ProductContext = createContext();

function App() {
  const product_spread = [...mymobiles];
  const [item, setitem] = useState(product_spread);
  // console.log(item);
  const [sortlist, setsortlist] = useState();
  console.log(sortlist);
  function sortCategory(getValue) {
    const filterCat = product_spread.filter((e) => {
      if (getValue === "All") {
        return e;
      } else if (getValue == e.Category) {
        return e;
      }
    });
    setsortlist();
    setitem(filterCat);
  }

  function sortHandlerLH() {
    let newitem = item.sort((start, end) => {
      let item1 = start.Price;
      let item2 = end.Price;
      return item1 - item2;
    });
    setsortlist(newitem);
  }
  function sortHandlerHL() {
    let newitem = item.sort((start, end) => {
      let item1 = end.Price;
      let item2 = start.Price;
      return item1 - item2;
    });
    setsortlist(newitem);
  }

  function sortHandlerAZ() {
    let newitem = item.sort((a, b) => {
      return a.P_name.toLowerCase().localeCompare(b.P_name.toLowerCase());
    });
    setsortlist(newitem);
  }

  function sortHandlerZA() {
    let newitem = item.sort((a, b) => {
      return b.P_name.toLowerCase().localeCompare(a.P_name.toLowerCase());
    });
    setsortlist(newitem);
  }
  function searchHandler(e) {
    let inputValue = e.target.value;
    let searchFilter = product_spread.filter((e) => {
      let inputLower = e.P_name.trim().toLowerCase();
      let inputLower1 = inputValue.trim().toLowerCase();
      let inputLower2 = e.tittle.trim().toLowerCase();
      if (
        inputLower.indexOf(inputLower1) > -1 ||
        inputLower2.indexOf(inputLower1) > -1
      ) {
        return e;
      }
    });
    let setArray = searchFilter.length !== 0 ? searchFilter : [];
    setitem(setArray);
  }
  let arrResult = sortlist === undefined ? item : sortlist;
  return (
    <>
      <ProductContext.Provider
        value={{
          item,
          sortHandlerAZ,
          sortCategory,
          sortHandlerZA,
          sortHandlerLH,
          sortHandlerHL,
          searchHandler,
          product_spread,
          arrResult,
        }}
      >
        <Header />
        <Routes>
          <Route path="/Product" element={<Product />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/AboutUs" element={<About />} />
          <Route path="/singlepage/:id" element={<SinglePage />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
        <Footer />
      </ProductContext.Provider>
    </>
  );
}
export default App;
