import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CreateContextAPI from "./Context/CartContext";
import { AuthProvider } from "./Context/AuthContext";
import { WishlistProvider } from "./Context/WishlistContext";

const main = ReactDOM.createRoot(document.getElementById("main"));
main.render(
  <>
    <BrowserRouter>
      <AuthProvider>
        <CreateContextAPI>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CreateContextAPI>
      </AuthProvider>
    </BrowserRouter>
  </>
);
