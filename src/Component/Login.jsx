import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";

const inputStyle = {
  width: "100%", padding: "12px 16px", borderRadius: "10px",
  border: "1.5px solid #e0e0e0", fontSize: "0.92rem",
  outline: "none", transition: "border-color .2s",
  background: "#fafafa", color: "#1a1a2e", boxSizing: "border-box",
};

const FEATURES = [
  { icon: "&#9889;", text: "Flash deals every day" },
  { icon: "&#128666;", text: "Free delivery on orders" },
  { icon: "&#128274;", text: "100% secure checkout" },
  { icon: "&#10084;", text: "Wishlist your favourites" },
];

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate("/Product");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      background: "linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",
    }}>
      {/* ── Left branding panel ── */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "60px 40px",
      }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "#ffd200", marginBottom: "8px" }}>
            &#128722; Store@Home
          </div>
        </Link>
        <p style={{ color: "rgba(255,255,255,.5)", fontSize: "0.95rem", marginBottom: "40px", textAlign: "center" }}>
          Your one-stop electronics destination
        </p>

        {FEATURES.map(({ icon, text }) => (
          <div key={text} style={{
            display: "flex", alignItems: "center", gap: "14px",
            marginBottom: "18px", width: "100%", maxWidth: "300px",
          }}>
            <div style={{
              width: "42px", height: "42px", borderRadius: "12px", flexShrink: 0,
              background: "rgba(255,210,0,.12)", border: "1px solid rgba(255,210,0,.25)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem",
            }} dangerouslySetInnerHTML={{ __html: icon }} />
            <span style={{ color: "rgba(255,255,255,.75)", fontSize: "0.88rem" }}>{text}</span>
          </div>
        ))}
      </div>

      {/* ── Right form panel ── */}
      <div style={{
        width: "460px", flexShrink: 0, background: "#fff",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "60px 48px",
      }}>
        <h2 style={{ margin: "0 0 4px", fontWeight: 800, fontSize: "1.8rem", color: "#1a1a2e" }}>
          Welcome back
        </h2>
        <p style={{ margin: "0 0 28px", color: "#aaa", fontSize: "0.88rem" }}>
          Log in to your account to continue
        </p>

        {error && (
          <div style={{
            background: "#fff5f5", border: "1.5px solid #ffcccc", borderRadius: "10px",
            padding: "12px 16px", marginBottom: "20px", color: "#e52d27", fontSize: "0.88rem",
          }}>
            &#9888; {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "0.75rem", fontWeight: 700, color: "#888", letterSpacing: "0.5px" }}>
              EMAIL ADDRESS
            </label>
            <input
              type="email" name="email" value={form.email}
              onChange={handleChange} required placeholder="you@example.com"
              onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
              style={{ ...inputStyle, borderColor: focused === "email" ? "#f7971e" : "#e0e0e0" }}
            />
          </div>

          <div style={{ marginBottom: "28px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "0.75rem", fontWeight: 700, color: "#888", letterSpacing: "0.5px" }}>
              PASSWORD
            </label>
            <input
              type="password" name="password" value={form.password}
              onChange={handleChange} required placeholder="Your password"
              onFocus={() => setFocused("password")} onBlur={() => setFocused("")}
              style={{ ...inputStyle, borderColor: focused === "password" ? "#f7971e" : "#e0e0e0" }}
            />
          </div>

          <button
            type="submit" disabled={loading}
            style={{
              width: "100%", padding: "14px", border: "none", borderRadius: "10px",
              background: loading ? "#ddd" : "linear-gradient(135deg,#f7971e,#ffd200)",
              color: "#1a1a1a", fontWeight: 700, fontSize: "1rem",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Logging in..." : "Log In \u2192"}
          </button>
        </form>

        <div style={{ margin: "24px 0", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ flex: 1, height: "1px", background: "#f0f0f0" }} />
          <span style={{ color: "#ccc", fontSize: "0.78rem" }}>OR</span>
          <div style={{ flex: 1, height: "1px", background: "#f0f0f0" }} />
        </div>

        <p style={{ textAlign: "center", margin: 0, fontSize: "0.88rem", color: "#888" }}>
          Don't have an account?{" "}
          <Link to="/SignUp" style={{ color: "#e52d27", fontWeight: 700, textDecoration: "none" }}>
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
