import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CreateContextAPI from "./Context/CartContext";

const main = ReactDOM.createRoot(document.getElementById("main"));
main.render(
  <>
    <BrowserRouter>
      <CreateContextAPI>
        <App />
      </CreateContextAPI>
    </BrowserRouter>
  </>
);
