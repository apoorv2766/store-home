import "./App.css";
import { Toaster } from "react-hot-toast";
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

const NotFound = () => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", minHeight: "70vh",
    backgroundColor: "#f0f2f5", gap: "14px",
  }}>
    <div style={{ fontSize: "5rem", lineHeight: 1 }}>&#128269;</div>
    <h1 style={{ margin: 0, fontWeight: 900, fontSize: "3rem", color: "#1a1a2e" }}>404</h1>
    <p style={{ margin: 0, color: "#888", fontSize: "1.05rem" }}>Oops! The page you're looking for doesn't exist.</p>
    <a href="/" style={{
      marginTop: "8px", padding: "11px 32px", borderRadius: "24px",
      background: "linear-gradient(135deg,#f7971e,#ffd200)",
      color: "#1a1a1a", fontWeight: 700, textDecoration: "none",
      boxShadow: "0 4px 18px rgba(247,151,30,.35)",
    }}>&#8592; Back to Home</a>
  </div>
);

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
      } else if (getValue === e.Category) {
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
        <Toaster
          position="bottom-center"
          gutter={12}
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "14px",
              fontWeight: 700,
              fontSize: "0.95rem",
              padding: "14px 20px",
              maxWidth: "90vw",
              boxShadow: "0 8px 32px rgba(0,0,0,.18)",
            },
            success: {
              style: { background: "#1a1a2e", color: "#ffd200" },
              iconTheme: { primary: "#ffd200", secondary: "#1a1a2e" },
            },
            error: {
              style: { background: "#fff5f5", color: "#e52d27", border: "1.5px solid #ffcccc" },
              iconTheme: { primary: "#e52d27", secondary: "#fff5f5" },
            },
          }}
        />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </ProductContext.Provider>
    </>
  );
}
export default App;
