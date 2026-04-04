import "./App.css";
import Home from "./Component/Home";
import Product from "./Component/Product";
import { Route, Routes } from "react-router-dom";
import Footer from "./Component/Footer";
import SignUp from "./Component/SignUp";
import ContactUs from "./Component/ContactUs";
import About from "./Component/About";
import { createContext, useState, useEffect } from "react";
import Cart from "./Component/Cart";
import SinglePage from "./Component/SinglePage";
import Header from "./Component/Header";
import Login from "./Component/Login";
import Wishlist from "./Component/Wishlist";
import Checkout from "./Component/Checkout";
import Orders from "./Component/Orders";
import Profile from "./Component/Profile";
export const ProductContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

function App() {
  const [product_spread, setProductSpread] = useState([]);
  const [item, setitem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortlist, setsortlist] = useState();

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((r) => r.json())
      .then((data) => {
        const mapped = data.products.map((p) => ({
          id: p.id,
          tittle: p.title,
          P_name: p.brand,
          img: p.image_url,
          Price: p.price,
          Rating: p.rating_avg,
          Category: p.category,
        }));
        setProductSpread(mapped);
        setitem(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
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
    let newitem = [...item].sort((start, end) => start.Price - end.Price);
    setsortlist(newitem);
  }
  function sortHandlerHL() {
    let newitem = [...item].sort((start, end) => end.Price - start.Price);
    setsortlist(newitem);
  }

  function sortHandlerAZ() {
    let newitem = [...item].sort((a, b) =>
      a.P_name.toLowerCase().localeCompare(b.P_name.toLowerCase())
    );
    setsortlist(newitem);
  }

  function sortHandlerZA() {
    let newitem = [...item].sort((a, b) =>
      b.P_name.toLowerCase().localeCompare(a.P_name.toLowerCase())
    );
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
          loading,
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
          <Route path="/Login" element={<Login />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/AboutUs" element={<About />} />
          <Route path="/singlepage/:id" element={<SinglePage />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Orders/:orderId" element={<Orders />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
        <Footer />
      </ProductContext.Provider>
    </>
  );
}
export default App;
