import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]); // full item objects from API
  const wishlist = wishlistItems.map((i) => i.product_id); // array of product_ids for quick lookup

  const authHeaders = useCallback(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }), [token]);

  const fetchWishlist = useCallback(async () => {
    if (!token) { setWishlistItems([]); return; }
    const res = await fetch(`${API_URL}/api/wishlist/`, { headers: authHeaders() });
    if (res.ok) setWishlistItems(await res.json());
  }, [token, authHeaders]);

  useEffect(() => { fetchWishlist(); }, [fetchWishlist]);

  const toggleWishlist = useCallback(async (productId) => {
    if (!token) return; // must be logged in
    const inList = wishlist.includes(productId);
    const method = inList ? "DELETE" : "POST";
    const res = await fetch(`${API_URL}/api/wishlist/${productId}`, {
      method,
      headers: authHeaders(),
    });
    if (res.ok) setWishlistItems(await res.json());
  }, [token, authHeaders, wishlist]);

  const isWishlisted = useCallback((productId) => wishlist.includes(productId), [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, wishlistItems, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
