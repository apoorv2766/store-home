import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { cart } from "../Context/CartContext";
import toast from "react-hot-toast";
import { useWindowWidth } from "../hooks/useWindowWidth";

const NAV_LINKS = [
  { to: "/",          label: "Home" },
  { to: "/Product",   label: "Products" },
  { to: "/AboutUs",   label: "About" },
  { to: "/ContactUs", label: "Contact" },
];

const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const { cartData } = useContext(cart);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const w = useWindowWidth();
  const isMobile = w < 900;

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const cartCount = cartData.reduce((sum, e) => sum + (e.quantity || 1), 0);

  const handleLogout = () => {
    logout();
    toast("Logged out. See you soon!", { icon: "\uD83D\uDC4B" });
    navigate("/");
    setMenuOpen(false);
  };

  const isActive = (to) =>
    to === "/" ? pathname === "/" || pathname === "/Home" : pathname.startsWith(to);

  const linkStyle = (to) => ({
    textDecoration: "none",
    color: isActive(to) ? "#ffd200" : "rgba(255,255,255,0.75)",
    fontWeight: isActive(to) ? 700 : 500,
    fontSize: "0.92rem",
    padding: "6px 2px",
    borderBottom: isActive(to) ? "2px solid #ffd200" : "2px solid transparent",
    transition: "color .15s, border-color .15s",
    whiteSpace: "nowrap",
  });

  const mobileLinkStyle = (to) => ({
    textDecoration: "none",
    color: isActive(to) ? "#ffd200" : "rgba(255,255,255,.85)",
    fontWeight: isActive(to) ? 700 : 500,
    fontSize: "1rem",
    padding: "13px 20px",
    display: "block",
    borderLeft: isActive(to) ? "3px solid #ffd200" : "3px solid transparent",
    background: isActive(to) ? "rgba(255,210,0,.07)" : "transparent",
  });

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 300,
        background: "linear-gradient(90deg,#1a1a2e 0%,#16213e 100%)",
        boxShadow: "0 2px 16px rgba(0,0,0,.35)",
        height: "64px", display: "flex", alignItems: "center",
      }}>
        <div style={{
          width: "100%", maxWidth: "1400px", margin: "0 auto",
          padding: "0 20px", display: "flex", alignItems: "center", gap: "24px",
        }}>

          {/* â”€â”€ Brand â”€â”€ */}
          <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <span style={{ fontSize: isMobile ? "1.05rem" : "1.25rem", fontWeight: 800, color: "#ffd200", letterSpacing: "-0.3px" }}>
              &#128722; Store@Home
            </span>
          </Link>

          {/* â”€â”€ Desktop nav links â”€â”€ */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "28px", flex: 1 }}>
              {NAV_LINKS.map(({ to, label }) => (
                <Link key={to} to={to} style={linkStyle(to)}
                  onMouseEnter={(e) => { if (!isActive(to)) e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { if (!isActive(to)) e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}

          {/* spacer on mobile */}
          {isMobile && <div style={{ flex: 1 }} />}

          {/* â”€â”€ Cart icon (always visible) â”€â”€ */}
          <Link to="/Cart" style={{ textDecoration: "none", position: "relative", display: "flex", flexShrink: 0 }}>
            <div style={{
              width: "42px", height: "42px", borderRadius: "12px",
              background: "rgba(255,255,255,.1)", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: "1.35rem", color: "#fff", transition: "background .15s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,.18)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,.1)"}
            >
              &#128722;
            </div>
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: "-5px", right: "-5px",
                background: "#e52d27", color: "#fff", borderRadius: "50%",
                width: "20px", height: "20px", fontSize: "0.72rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, border: "2px solid #1a1a2e",
              }}>
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {/* â”€â”€ Desktop right section â”€â”€ */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "14px", flexShrink: 0 }}>
              {isLoggedIn ? (
                <>
                  <Link to="/Profile" style={{ textDecoration: "none" }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      background: "rgba(255,255,255,.08)", borderRadius: "24px",
                      padding: "5px 14px 5px 5px",
                    }}>
                      <div style={{
                        width: "30px", height: "30px", borderRadius: "50%",
                        background: "linear-gradient(135deg,#f7971e,#ffd200)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 800, fontSize: "0.85rem", color: "#1a1a2e",
                      }}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.88rem" }}>
                        {user.name.split(" ")[0]}
                      </span>
                    </div>
                  </Link>
                  <Link to="/Wishlist" style={{ textDecoration: "none", color: "rgba(255,255,255,.75)", fontSize: "0.88rem", fontWeight: 500 }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,.75)"}
                  >&#10084;&#65039; Wishlist</Link>
                  <Link to="/Orders" style={{ textDecoration: "none", color: "rgba(255,255,255,.75)", fontSize: "0.88rem", fontWeight: 500 }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,.75)"}
                  >&#128230; Orders</Link>
                  <button onClick={handleLogout} style={{
                    padding: "7px 16px", borderRadius: "8px",
                    border: "1.5px solid rgba(229,45,39,.6)", background: "transparent",
                    color: "#ff6b6b", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#e52d27"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#e52d27"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#ff6b6b"; e.currentTarget.style.borderColor = "rgba(229,45,39,.6)"; }}
                  >Logout</button>
                </>
              ) : (
                <>
                  <Link to="/Login" style={{ textDecoration: "none" }}>
                    <button style={{
                      padding: "7px 18px", borderRadius: "8px",
                      border: "1.5px solid rgba(255,255,255,.3)", background: "transparent",
                      color: "rgba(255,255,255,.85)", fontWeight: 600, fontSize: "0.88rem", cursor: "pointer",
                    }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.3)"; e.currentTarget.style.color = "rgba(255,255,255,.85)"; }}
                    >Log in</button>
                  </Link>
                  <Link to="/SignUp" style={{ textDecoration: "none" }}>
                    <button style={{
                      padding: "7px 18px", borderRadius: "8px", border: "none",
                      background: "linear-gradient(135deg,#f7971e,#ffd200)",
                      color: "#1a1a1a", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer",
                    }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = "0.88"}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                    >Sign up free</button>
                  </Link>
                </>
              )}
            </div>
          )}

          {/* â”€â”€ Hamburger (mobile only) â”€â”€ */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                flexShrink: 0, background: "rgba(255,255,255,.1)", border: "none",
                borderRadius: "8px", width: "42px", height: "42px",
                cursor: "pointer", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: "5px",
              }}
            >
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  display: "block", width: menuOpen && i === 1 ? "0" : "20px",
                  height: "2px", background: "#fff", borderRadius: "2px",
                  transition: "all .2s",
                  transform: menuOpen && i === 0 ? "translateY(7px) rotate(45deg)"
                    : menuOpen && i === 2 ? "translateY(-7px) rotate(-45deg)" : "none",
                }} />
              ))}
            </button>
          )}

        </div>
      </nav>

      {/* â”€â”€ Mobile drawer â”€â”€ */}
      {isMobile && menuOpen && (
        <div style={{
          position: "fixed", top: "64px", left: 0, right: 0, bottom: 0,
          background: "linear-gradient(180deg,#1a1a2e 0%,#0f3460 100%)",
          zIndex: 299, overflowY: "auto",
        }}
          onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}
        >
          {/* Nav section */}
          <div style={{ borderBottom: "1px solid rgba(255,255,255,.08)", paddingBottom: "8px", paddingTop: "8px" }}>
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} style={mobileLinkStyle(to)} onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
          </div>

          {/* Auth section */}
          <div style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
            {isLoggedIn ? (
              <>
                {/* Profile row */}
                <Link to="/Profile" style={{ textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 20px" }}>
                    <div style={{
                      width: "38px", height: "38px", borderRadius: "50%", flexShrink: 0,
                      background: "linear-gradient(135deg,#f7971e,#ffd200)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 800, fontSize: "1rem", color: "#1a1a2e",
                    }}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>{user.name}</div>
                      <div style={{ color: "rgba(255,255,255,.45)", fontSize: "0.75rem" }}>{user.email}</div>
                    </div>
                  </div>
                </Link>
                <Link to="/Wishlist" style={mobileLinkStyle("/Wishlist")} onClick={() => setMenuOpen(false)}>&#10084; Wishlist</Link>
                <Link to="/Orders"   style={mobileLinkStyle("/Orders")}   onClick={() => setMenuOpen(false)}>&#128230; Orders</Link>
              </>
            ) : (
              <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <Link to="/Login" style={{ textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
                  <button style={{
                    width: "100%", padding: "12px", borderRadius: "10px",
                    border: "1.5px solid rgba(255,255,255,.3)", background: "transparent",
                    color: "#fff", fontWeight: 600, fontSize: "0.95rem", cursor: "pointer",
                  }}>Log In</button>
                </Link>
                <Link to="/SignUp" style={{ textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
                  <button style={{
                    width: "100%", padding: "12px", borderRadius: "10px", border: "none",
                    background: "linear-gradient(135deg,#f7971e,#ffd200)",
                    color: "#1a1a1a", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer",
                  }}>Sign Up Free</button>
                </Link>
              </div>
            )}
          </div>

          {isLoggedIn && (
            <div style={{ padding: "16px 20px" }}>
              <button onClick={handleLogout} style={{
                width: "100%", padding: "12px", borderRadius: "10px",
                border: "1.5px solid rgba(229,45,39,.5)", background: "transparent",
                color: "#ff6b6b", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer",
              }}>Logout</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
