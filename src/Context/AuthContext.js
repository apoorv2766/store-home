import { createContext, useContext, useState, useCallback } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("auth_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("auth_token") || null);
  // Callback set by CartContext to merge guest cart after login
  const onLoginRef = { current: null };

  const saveSession = (tok, userData) => {
    localStorage.setItem("auth_token", tok);
    localStorage.setItem("auth_user", JSON.stringify(userData));
    setToken(tok);
    setUser(userData);
  };

  const register = useCallback(async (name, email, password) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Registration failed");

    // fetch user profile with the returned token
    const meRes = await fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });
    const userData = await meRes.json();
    saveSession(data.access_token, userData);
    if (onLoginRef.current) onLoginRef.current(data.access_token);
    return userData;
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Login failed");

    const meRes = await fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });
    const userData = await meRes.json();
    saveSession(data.access_token, userData);
    if (onLoginRef.current) onLoginRef.current(data.access_token);
    return userData;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setToken(null);
    setUser(null);
  }, []);

  const updateUser = useCallback((userData) => {
    localStorage.setItem("auth_user", JSON.stringify(userData));
    setUser(userData);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout, updateUser, isLoggedIn: !!user, onLoginRef }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
