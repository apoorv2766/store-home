import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./AuthContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export let cart = createContext();

// ── Local storage helpers ─────────────────────────────────────────────────────
function loadGuest() {
  try { return JSON.parse(localStorage.getItem("store")) || []; } catch { return []; }
}
function saveGuest(items) {
  localStorage.setItem("store", JSON.stringify(items));
}

// ── Reducer (guest mode only) ─────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case "set":
      return { ...state, cartData: action.payload };
    case "cart": {
      const { id, tittle, img, Price, quantity = 1 } = action.payload;
      const exists = state.cartData.find((e) => e.id === id);
      if (exists) {
        return {
          ...state,
          cartData: state.cartData.map((e) =>
            e.id === id ? { ...e, quantity: (e.quantity || 1) + quantity } : e
          ),
        };
      }
      return { ...state, cartData: [...state.cartData, { id, tittle, img, Price, quantity }] };
    }
    case "removeItem":
      return { ...state, cartData: state.cartData.filter((e) => e.id !== action.payload) };
    case "removeAll":
      return { ...state, cartData: [] };
    default:
      return state;
  }
}

function CreateContextAPI({ children }) {
  const { token, onLoginRef } = useAuth();
  const [state, dispatch] = useReducer(reducer, { cartData: loadGuest() });

  // ── API helpers ───────────────────────────────────────────────────────────
  const authHeaders = useCallback(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }), [token]);

  const fetchCart = useCallback(async () => {
    const res = await fetch(`${API_URL}/api/cart/`, { headers: authHeaders() });
    if (!res.ok) return;
    const items = await res.json();
    // map backend shape → frontend shape
    dispatch({
      type: "set",
      payload: items.map((i) => ({
        id: i.product_id,
        cartItemId: i.id,
        tittle: i.title,
        img: i.image_url,
        Price: i.price,
        quantity: i.quantity,
      })),
    });
  }, [authHeaders]);

  // ── Load cart when auth changes ────────────────────────────────────────────
  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      dispatch({ type: "set", payload: loadGuest() });
    }
  }, [token, fetchCart]);

  // ── Merge guest cart into server cart on login ─────────────────────────────
  useEffect(() => {
    if (!onLoginRef) return;
    onLoginRef.current = async (newToken) => {
      const guestItems = loadGuest();
      if (guestItems.length === 0) { fetchCart(); return; }
      const headers = { "Content-Type": "application/json", Authorization: `Bearer ${newToken}` };
      for (const item of guestItems) {
        await fetch(`${API_URL}/api/cart/`, {
          method: "POST",
          headers,
          body: JSON.stringify({ product_id: item.id, quantity: item.quantity || 1 }),
        });
      }
      localStorage.removeItem("store");
      fetchCart();
    };
    return () => { onLoginRef.current = null; };
  }, [onLoginRef, fetchCart]);

  // ── Persist guest cart ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!token) saveGuest(state.cartData);
  }, [state.cartData, token]);

  // ── Actions ────────────────────────────────────────────────────────────────
  const mapItems = (items) =>
    items.map((i) => ({
      id: i.product_id,
      cartItemId: i.id,
      tittle: i.title,
      img: i.image_url,
      Price: i.price,
      quantity: i.quantity,
    }));

  const addToCart = useCallback(async (product) => {
    const qty = product.quantity || 1;
    if (token) {
      const res = await fetch(`${API_URL}/api/cart/`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ product_id: product.id, quantity: qty }),
      });
      if (res.ok) dispatch({ type: "set", payload: mapItems(await res.json()) });
    } else {
      dispatch({ type: "cart", payload: product });
    }
  }, [token, authHeaders]);

  const removeHandler = useCallback(async (productId) => {
    if (token) {
      const item = state.cartData.find((e) => e.id === productId);
      if (!item?.cartItemId) return;
      const res = await fetch(`${API_URL}/api/cart/${item.cartItemId}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (res.ok) dispatch({ type: "set", payload: mapItems(await res.json()) });
    } else {
      dispatch({ type: "removeItem", payload: productId });
    }
  }, [token, authHeaders, state.cartData]);

  const updateQuantity = useCallback(async (productId, newQty) => {
    if (newQty <= 0) { removeHandler(productId); return; }
    if (token) {
      const item = state.cartData.find((e) => e.id === productId);
      if (!item?.cartItemId) return;
      const res = await fetch(`${API_URL}/api/cart/${item.cartItemId}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ quantity: newQty }),
      });
      if (res.ok) dispatch({ type: "set", payload: mapItems(await res.json()) });
    } else {
      dispatch({
        type: "set",
        payload: state.cartData.map((e) =>
          e.id === productId ? { ...e, quantity: newQty } : e
        ),
      });
    }
  }, [token, authHeaders, state.cartData, removeHandler]);

  const removeAll = useCallback(async () => {
    if (token) {
      await fetch(`${API_URL}/api/cart/`, { method: "DELETE", headers: authHeaders() });
    }
    dispatch({ type: "removeAll" });
  }, [token, authHeaders]);

  return (
    <cart.Provider value={{ ...state, addToCart, removeHandler, updateQuantity, removeAll }}>
      {children}
    </cart.Provider>
  );
}

export default CreateContextAPI;
