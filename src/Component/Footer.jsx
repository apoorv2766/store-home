import React from "react";
import { Link } from "react-router-dom";

const COL = { display: "flex", flexDirection: "column", gap: "10px" };
const LINK_STYLE = {
  color: "rgba(255,255,255,.6)", textDecoration: "none",
  fontSize: "0.88rem", transition: "color .15s",
};
const HEADING = {
  color: "#ffd200", fontWeight: 700, fontSize: "0.75rem",
  letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px",
};

const SOCIALS = [
  { label: "FB",  href: "https://www.facebook.com/login/",         icon: "f" },
  { label: "TW",  href: "https://twitter.com/",                    icon: "\uD835\uDD4F" },
  { label: "IG",  href: "https://instagram.com/",                  icon: "\uD83D\uDCF7" },
  { label: "LI",  href: "https://linkedin.com/",                   icon: "in" },
  { label: "GH",  href: "https://github.com/",                     icon: "\uD83D\uDC08" },
];

const Footer = () => (
  <footer style={{
    background: "linear-gradient(180deg,#1a1a2e 0%,#0f3460 100%)",
    color: "rgba(255,255,255,.7)", paddingTop: "52px",
  }}>
    <div style={{
      maxWidth: "1200px", margin: "0 auto", padding: "0 24px 40px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "36px",
    }}>

      {/* Brand */}
      <div style={COL}>
        <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#ffd200", marginBottom: "4px" }}>
          &#128722; Store@Home
        </div>
        <p style={{ fontSize: "0.85rem", lineHeight: 1.65, color: "rgba(255,255,255,.55)", margin: 0 }}>
          Your one-stop electronics store. Mobiles, Laptops, Appliances &amp; more â€” delivered to your door.
        </p>
        {/* Social icons */}
        <div style={{ display: "flex", gap: "10px", marginTop: "8px", flexWrap: "wrap" }}>
          {SOCIALS.map(({ label, href, icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
              style={{
                width: "34px", height: "34px", borderRadius: "8px",
                background: "rgba(255,255,255,.1)", display: "flex",
                alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "0.78rem", fontWeight: 700,
                textDecoration: "none", transition: "background .2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(247,151,30,.5)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.1)")}
            >{icon}</a>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div style={COL}>
        <span style={HEADING}>Categories</span>
        {["Mobiles", "Laptops", "Television", "Washing Machine", "Appliances"].map((c) => (
          <Link key={c} to="/Product" style={LINK_STYLE}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffd200")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,.6)")}
          >&#8250; {c}</Link>
        ))}
      </div>

      {/* Quick links */}
      <div style={COL}>
        <span style={HEADING}>Quick Links</span>
        {[
          { to: "/", label: "Home" },
          { to: "/Product", label: "Products" },
          { to: "/Cart", label: "My Cart" },
          { to: "/Wishlist", label: "Wishlist" },
          { to: "/Orders", label: "My Orders" },
          { to: "/Profile", label: "My Account" },
        ].map(({ to, label }) => (
          <Link key={to} to={to} style={LINK_STYLE}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffd200")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,.6)")}
          >&#8250; {label}</Link>
        ))}
      </div>

      {/* Contact */}
      <div style={COL}>
        <span style={HEADING}>Contact Us</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { icon: "&#128205;", text: "2nd Cross, Kundanhalli Colony, Brookfield, Bangalore" },
            { icon: "&#128140;", text: "apoorv2766@outlook.com" },
            { icon: "&#128222;", text: "+91 85745 37246" },
          ].map(({ icon, text }) => (
            <p key={text} style={{ margin: 0, fontSize: "0.85rem", color: "rgba(255,255,255,.6)", display: "flex", gap: "8px" }}>
              <span dangerouslySetInnerHTML={{ __html: icon }} />
              <span>{text}</span>
            </p>
          ))}
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div style={{
      borderTop: "1px solid rgba(255,255,255,.1)",
      padding: "16px 24px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: "8px",
      fontSize: "0.8rem", color: "rgba(255,255,255,.4)",
    }}>
      <span>&#169; {new Date().getFullYear()} Store@Home. All rights reserved.</span>
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/AboutUs"   style={{ color: "rgba(255,255,255,.4)", textDecoration: "none" }}>About</Link>
        <Link to="/ContactUs" style={{ color: "rgba(255,255,255,.4)", textDecoration: "none" }}>Contact</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
