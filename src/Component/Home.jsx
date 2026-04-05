import React, { useContext, useState, useEffect } from "react";
import amazon from "../Component/assets/amazon.jpg";
import amazon1 from "./assets/amazon_1.gif";
import amazon2 from "./assets/amazon_2.jpg";
import amazon3 from "./assets/amazon_3.jpg";
import { Link } from "react-router-dom";
import { ProductContext } from "../App";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { hov } from "../utils/hov";

/* ── Countdown to midnight ── */
function useCountdown() {
  const getSeconds = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    return Math.floor((midnight - now) / 1000);
  };
  const [timeLeft, setTimeLeft] = useState(getSeconds);
  useEffect(() => {
    const id = setInterval(() => setTimeLeft((p) => (p > 0 ? p - 1 : getSeconds())), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const m = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const s = String(timeLeft % 60).padStart(2, "0");
  return { h, m, s };
}

/* ── Star rating ── */
const Stars = ({ rating }) => (
  <span style={{ display: "inline-flex", gap: "1px" }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} style={{ color: i <= Math.round(rating) ? "#f5a623" : "#ddd", fontSize: "11px" }}>
        &#9733;
      </span>
    ))}
  </span>
);

/* ── Category tile data ── */
const CATS = [
  { label: "Mobiles",    img: "https://m.media-amazon.com/images/I/3150P3KQFlL._MCnd_AC_.jpg",              grad: "linear-gradient(135deg,#667eea,#764ba2)" },
  { label: "Laptops",    img: "https://m.media-amazon.com/images/I/51xKHE2Sc7L._MCnd_AC_.jpg",              grad: "linear-gradient(135deg,#f093fb,#f5576c)" },
  { label: "Appliances", img: "https://m.media-amazon.com/images/I/71ZMYMhP5TL._AC_UL480_FMwebp_QL65_.jpg", grad: "linear-gradient(135deg,#4facfe,#00f2fe)" },
  { label: "Television", img: "https://m.media-amazon.com/images/I/71kuqRw8L5L._AC_UY327_FMwebp_QL65_.jpg", grad: "linear-gradient(135deg,#43e97b,#38f9d7)" },
];

const SLIDES = [
  { src: amazon,  text: "Mega Electronics Sale",  sub: "Up to 80% off on all products" },
  { src: amazon1, text: "Today's Best Deals",     sub: "Flash prices — limited time only" },
  { src: amazon2, text: "Top Mobile Brands",      sub: "Samsung, OnePlus, Apple & more" },
  { src: amazon3, text: "Home Appliances",        sub: "Upgrade your home today" },
];

const Home = () => {
  const { product_spread } = useContext(ProductContext);
  const { h, m, s } = useCountdown();
  const [slideIdx, setSlideIdx] = useState(0);
  const w = useWindowWidth();
  const isMobile = w < 600;
  const isTablet = w >= 600 && w < 960;

  /* Auto-advance every 3.5 s */
  useEffect(() => {
    const id = setInterval(() => setSlideIdx((p) => (p + 1) % SLIDES.length), 3500);
    return () => clearInterval(id);
  }, []);

  const goTo   = (i) => setSlideIdx(i);
  const goPrev = () => setSlideIdx((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  const goNext = () => setSlideIdx((p) => (p + 1) % SLIDES.length);

  const featured   = product_spread[0];
  const smallDeals = product_spread.slice(1, 4);
  const rowDeals   = product_spread.slice(4, 8);

  const carouselH = isMobile ? "42vw" : isTablet ? "50vw" : "58vh";

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>

      {/* ══ 1. Hero Carousel (pure React — no Bootstrap JS needed) ══ */}
      <div style={{ position: "relative", overflow: "hidden", height: carouselH }}>

        {/* Slides */}
        {SLIDES.map((slide, i) => (
          <div key={i} style={{
            position: "absolute", inset: 0,
            opacity: i === slideIdx ? 1 : 0,
            transition: "opacity 0.7s ease",
            pointerEvents: i === slideIdx ? "auto" : "none",
          }}>
            <img
              src={slide.src}
              alt={slide.text}
              style={{ width: "100%", height: carouselH, objectFit: "cover", display: "block" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(90deg,rgba(0,0,0,.68) 0%,rgba(0,0,0,.08) 100%)",
              display: "flex", flexDirection: "column", justifyContent: "center",
              paddingLeft: isMobile ? "5%" : "8%",
            }}>
              <h1 style={{
                color: "#fff", fontWeight: 800,
                fontSize: isMobile ? "1.2rem" : isTablet ? "1.8rem" : "2.5rem",
                margin: 0, textShadow: "0 2px 10px rgba(0,0,0,.5)",
              }}>
                {slide.text}
              </h1>
              <p style={{
                color: "#ffe082",
                fontSize: isMobile ? "0.78rem" : isTablet ? "0.95rem" : "1.1rem",
                margin: "8px 0 16px",
              }}>
                {slide.sub}
              </p>
              <Link to="/Product" style={{
                display: "inline-block", width: "fit-content",
                padding: isMobile ? "8px 18px" : "11px 30px",
                background: "linear-gradient(135deg,#f7971e,#ffd200)",
                color: "#1a1a1a", borderRadius: "30px", fontWeight: 700,
                textDecoration: "none", fontSize: isMobile ? "0.8rem" : "0.95rem",
                boxShadow: "0 4px 18px rgba(247,151,30,.45)",
              }}>
                Shop Now &rarr;
              </Link>
            </div>
          </div>
        ))}

        {/* Prev / Next arrows */}
        <button onClick={goPrev} style={{
          position: "absolute", top: "50%", left: "16px", transform: "translateY(-50%)",
          background: "rgba(0,0,0,.35)", border: "none", borderRadius: "50%",
          width: "42px", height: "42px", color: "#fff", fontSize: "1.1rem",
          cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center",
        }}>&#10094;</button>
        <button onClick={goNext} style={{
          position: "absolute", top: "50%", right: "16px", transform: "translateY(-50%)",
          background: "rgba(0,0,0,.35)", border: "none", borderRadius: "50%",
          width: "42px", height: "42px", color: "#fff", fontSize: "1.1rem",
          cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center",
        }}>&#10095;</button>

        {/* Dot indicators */}
        <div style={{
          position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: "8px", zIndex: 10,
        }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i === slideIdx ? "24px" : "8px", height: "8px",
              borderRadius: "4px", border: "none", cursor: "pointer",
              background: i === slideIdx ? "#ffd200" : "rgba(255,255,255,.5)",
              transition: "width .3s, background .3s", padding: 0,
            }} />
          ))}
        </div>
      </div>

      {/* ══ 2. Flash Sale Strip ══ */}
      <div style={{
        background: "linear-gradient(90deg,#b31217,#e52d27)",
        color: "#fff", display: "flex", alignItems: "center",
        justifyContent: "center", gap: isMobile ? "10px" : "20px",
        padding: isMobile ? "10px 14px" : "14px 20px", flexWrap: "wrap",
      }}>
        <span style={{ fontSize: isMobile ? "0.95rem" : "1.25rem", fontWeight: 800, letterSpacing: "1px" }}>&#9889; FLASH SALE</span>
        {!isMobile && <span style={{ opacity: 0.85, fontSize: "0.95rem" }}>Ends at midnight &mdash;</span>}
        <div style={{ display: "flex", gap: "6px" }}>
          {[{ label: "HRS", val: h }, { label: "MIN", val: m }, { label: "SEC", val: s }].map(({ label, val }) => (
            <div key={label} style={{
              background: "rgba(255,255,255,.15)", borderRadius: "8px",
              padding: isMobile ? "4px 10px" : "6px 14px", textAlign: "center",
              minWidth: isMobile ? "42px" : "54px",
            }}>
              <div style={{ fontSize: isMobile ? "1.1rem" : "1.5rem", fontWeight: 700, lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: "0.6rem", opacity: 0.75, letterSpacing: "1px" }}>{label}</div>
            </div>
          ))}
        </div>
        <Link to="/Product" style={{
          background: "#fff", color: "#e52d27", borderRadius: "20px",
          padding: isMobile ? "5px 14px" : "7px 22px",
          fontWeight: 700, textDecoration: "none", fontSize: isMobile ? "0.78rem" : "0.9rem",
        }}>
          View All Deals
        </Link>
      </div>

      {/* ══ 3. Magazine Product Grid ══ */}
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: isMobile ? "20px 12px 0" : "32px 20px 0" }}>

        {/* Section header */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: isMobile ? "1.15rem" : "1.5rem", color: "#1a1a2e" }}>
            Today's Top Deals
          </h2>
          <div style={{ flex: 1, height: "2px", background: "linear-gradient(90deg,#f7971e,transparent)" }} />
          <Link to="/Product" style={{
            color: "#e52d27", fontWeight: 600, textDecoration: "none",
            fontSize: "0.9rem", whiteSpace: "nowrap",
          }}>
            See all &rarr;
          </Link>
        </div>

        {/* Row 1: featured + small deals */}
        {product_spread.length > 0 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "16px", marginBottom: "16px",
          }}>

            {/* Large featured card */}
            {featured && (
              <Link to={`/singlepage/${featured.id}`} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "#fff", borderRadius: "16px", overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(0,0,0,.08)", height: "100%",
                  display: "flex", flexDirection: "column", transition: "transform .2s,box-shadow .2s",
                }}
                  {...hov(
                    { transform: "translateY(-4px)", boxShadow: "0 10px 28px rgba(0,0,0,.15)" },
                    { transform: "translateY(0)",    boxShadow: "0 2px 12px rgba(0,0,0,.08)" }
                  )}
                >
                  <div style={{ position: "relative" }}>
                    <span style={{
                      position: "absolute", top: "12px", left: "12px",
                      background: "#e52d27", color: "#fff", borderRadius: "6px",
                      padding: "3px 10px", fontSize: "0.72rem", fontWeight: 700, zIndex: 1,
                    }}>FEATURED</span>
                    <img src={featured.img} alt={featured.tittle} loading="lazy" style={{
                      width: "100%", height: isMobile ? "200px" : "280px",
                      objectFit: "contain", background: "#f8f9fa", padding: "16px",
                    }} />
                  </div>
                  <div style={{ padding: "16px 20px 20px" }}>
                    <p style={{ margin: "0 0 4px", color: "#888", fontSize: "0.78rem", fontWeight: 600 }}>
                      {featured.P_name}
                    </p>
                    <h3 style={{ margin: "0 0 8px", fontSize: "1.05rem", fontWeight: 700, color: "#1a1a2e", lineHeight: 1.35 }}>
                      {featured.tittle?.length > 65 ? featured.tittle.slice(0, 65) + "…" : featured.tittle}
                    </h3>
                    <Stars rating={featured.Rating} />
                    <div style={{ marginTop: "12px" }}>
                      <span style={{ fontSize: "1.45rem", fontWeight: 800, color: "#e52d27" }}>
                        &#8377;{featured.Price?.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div style={{
                      marginTop: "14px", background: "linear-gradient(135deg,#f7971e,#ffd200)",
                      borderRadius: "8px", padding: "10px", textAlign: "center",
                      color: "#1a1a1a", fontWeight: 700, fontSize: "0.9rem",
                    }}>
                      View Deal &rarr;
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* 3 small horizontal cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {smallDeals.map((p) => (
                <Link key={p.id} to={`/singlepage/${p.id}`} style={{ textDecoration: "none", flex: 1 }}>
                  <div style={{
                    background: "#fff", borderRadius: "12px", display: "flex",
                    gap: "14px", padding: "14px", alignItems: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,.07)", transition: "transform .2s,box-shadow .2s",
                  }}
                    {...hov(
                      { transform: "translateY(-2px)", boxShadow: "0 6px 20px rgba(0,0,0,.13)" },
                      { transform: "translateY(0)",    boxShadow: "0 2px 8px rgba(0,0,0,.07)" }
                    )}
                  >
                    <img src={p.img} alt={p.tittle} loading="lazy" style={{
                      width: "82px", height: "82px", objectFit: "contain",
                      background: "#f8f9fa", borderRadius: "8px", padding: "6px", flexShrink: 0,
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: "0 0 2px", color: "#aaa", fontSize: "0.7rem", fontWeight: 600 }}>{p.P_name}</p>
                      <p style={{
                        margin: "0 0 5px", fontWeight: 700, fontSize: "0.88rem", color: "#1a1a2e",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}>{p.tittle}</p>
                      <Stars rating={p.Rating} />
                      <p style={{ margin: "6px 0 0", fontWeight: 800, color: "#e52d27", fontSize: "1rem" }}>
                        &#8377;{p.Price?.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <span style={{ color: "#f7971e", fontSize: "1.4rem", flexShrink: 0 }}>&#8250;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Row 2: 4 equal cards */}
        {rowDeals.length > 0 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2,1fr)" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)",
            gap: "16px", marginBottom: "36px",
          }}>
            {rowDeals.map((p) => (
              <Link key={p.id} to={`/singlepage/${p.id}`} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "#fff", borderRadius: "14px", overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,.07)", height: "100%",
                  display: "flex", flexDirection: "column", transition: "transform .2s,box-shadow .2s",
                }}
                  {...hov(
                    { transform: "translateY(-4px)", boxShadow: "0 8px 22px rgba(0,0,0,.14)" },
                    { transform: "translateY(0)",    boxShadow: "0 2px 8px rgba(0,0,0,.07)" }
                  )}
                >
                  <img src={p.img} alt={p.tittle} loading="lazy" style={{
                    width: "100%", height: "155px", objectFit: "contain",
                    background: "#f8f9fa", padding: "12px",
                  }} />
                  <div style={{ padding: "12px 14px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <p style={{ margin: "0 0 2px", color: "#aaa", fontSize: "0.68rem", fontWeight: 600 }}>{p.P_name}</p>
                    <p style={{
                      margin: "0 0 6px", fontWeight: 700, fontSize: "0.84rem", color: "#1a1a2e", flex: 1,
                      overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                    }}>{p.tittle}</p>
                    <Stars rating={p.Rating} />
                    <p style={{ margin: "8px 0 0", fontWeight: 800, color: "#e52d27", fontSize: "1rem" }}>
                      &#8377;{p.Price?.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ══ 4. Category Tiles ══ */}
      <div style={{ background: "#fff", padding: isMobile ? "24px 12px 32px" : "32px 20px 40px" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
            <h2 style={{ margin: 0, fontWeight: 800, fontSize: isMobile ? "1.15rem" : "1.5rem", color: "#1a1a2e" }}>Shop by Category</h2>
            <div style={{ flex: 1, height: "2px", background: "linear-gradient(90deg,#667eea,transparent)" }} />
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
            gap: isMobile ? "12px" : "16px",
          }}>
            {CATS.map((cat) => (
              <Link key={cat.label} to="/Product" style={{ textDecoration: "none" }}>
                <div style={{
                  borderRadius: "16px", height: isMobile ? "130px" : "180px", background: cat.grad,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 15px rgba(0,0,0,.1)", transition: "transform .2s,box-shadow .2s",
                }}
                  {...hov(
                    { transform: "translateY(-5px) scale(1.03)", boxShadow: "0 14px 32px rgba(0,0,0,.2)" },
                    { transform: "translateY(0) scale(1)",       boxShadow: "0 4px 15px rgba(0,0,0,.1)" }
                  )}
                >
                  <img src={cat.img} alt={cat.label} loading="lazy" style={{
                    width: isMobile ? "58px" : "88px", height: isMobile ? "58px" : "88px",
                    objectFit: "contain", borderRadius: "12px",
                    background: "rgba(255,255,255,.2)", padding: "8px",
                    marginBottom: isMobile ? "8px" : "12px",
                  }} />
                  <span style={{
                    color: "#fff", fontWeight: 800,
                    fontSize: isMobile ? "0.82rem" : "1rem",
                    textShadow: "0 2px 6px rgba(0,0,0,.3)",
                  }}>
                    {cat.label}
                  </span>
                  {!isMobile && (
                    <span style={{ color: "rgba(255,255,255,.8)", fontSize: "0.73rem", marginTop: "4px" }}>
                      Shop Now &rarr;
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
