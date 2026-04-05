import React from "react";
import { Link } from "react-router-dom";

const STATS = [
  { value: "10K+",  label: "Happy Customers" },
  { value: "5K+",   label: "Products Listed" },
  { value: "99.2%", label: "On-Time Delivery" },
  { value: "24/7",  label: "Customer Support" },
];

const VALUES = [
  { icon: "&#127942;", title: "Quality First",   desc: "Every product is verified for authenticity and quality before listing." },
  { icon: "&#128176;", title: "Best Prices",     desc: "We negotiate directly with brands to pass savings on to you." },
  { icon: "&#128666;", title: "Fast Delivery",   desc: "Same-day and next-day delivery available across Bangalore." },
  { icon: "&#128101;", title: "Customer Focus",  desc: "Our support team is available 24/7 to resolve any issue instantly." },
];

const About = () => (
  <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>

    {/* Hero */}
    <div style={{
      background: "linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%)",
      padding: "72px 24px", textAlign: "center",
    }}>
      <h1 style={{ color: "#ffd200", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", margin: "0 0 14px" }}>
        About Store@Home
      </h1>
      <p style={{ color: "rgba(255,255,255,.7)", fontSize: "clamp(0.95rem,2vw,1.15rem)", maxWidth: "600px", margin: "0 auto 28px" }}>
        Bangalore&#39;s trusted electronics e-commerce platform — bringing the best gadgets and appliances right to your doorstep since 2021.
      </p>
      <Link to="/Product" style={{
        display: "inline-block", padding: "12px 32px", borderRadius: "30px",
        background: "linear-gradient(135deg,#f7971e,#ffd200)",
        color: "#1a1a1a", fontWeight: 700, textDecoration: "none",
        boxShadow: "0 4px 18px rgba(247,151,30,.4)",
      }}>Shop Now &#8594;</Link>
    </div>

    {/* Stats */}
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
      gap: "1px", background: "#e0e4ea", margin: "0",
    }}>
      {STATS.map(({ value, label }) => (
        <div key={label} style={{ background: "#fff", padding: "32px 20px", textAlign: "center" }}>
          <div style={{ fontWeight: 900, fontSize: "2rem", color: "#1a1a2e" }}>{value}</div>
          <div style={{ color: "#888", fontSize: "0.85rem", marginTop: "4px" }}>{label}</div>
        </div>
      ))}
    </div>

    {/* Our Story */}
    <div style={{ maxWidth: "800px", margin: "56px auto", padding: "0 24px", textAlign: "center" }}>
      <h2 style={{ fontWeight: 800, color: "#1a1a2e", fontSize: "1.6rem", marginBottom: "16px" }}>Our Story</h2>
      <p style={{ color: "#555", lineHeight: 1.8, fontSize: "0.98rem" }}>
        Store@Home was founded with a simple mission: make premium electronics accessible to everyone. 
        We started as a small team of tech enthusiasts in Bangalore and have grown into a platform 
        trusted by thousands of customers across Karnataka. From flagship smartphones to home appliances, 
        we curate only the best — with transparent pricing and zero hidden charges.
      </p>
    </div>

    {/* Values */}
    <div style={{ background: "#fff", padding: "52px 24px" }}>
      <h2 style={{ textAlign: "center", fontWeight: 800, color: "#1a1a2e", fontSize: "1.5rem", marginBottom: "36px" }}>What We Stand For</h2>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "24px", maxWidth: "960px", margin: "0 auto",
      }}>
        {VALUES.map(({ icon, title, desc }) => (
          <div key={title} style={{
            background: "#f8f9fa", borderRadius: "16px", padding: "28px 22px", textAlign: "center",
            border: "1px solid #eee",
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "12px" }} dangerouslySetInnerHTML={{ __html: icon }} />
            <h3 style={{ fontWeight: 700, color: "#1a1a2e", margin: "0 0 8px", fontSize: "1rem" }}>{title}</h3>
            <p style={{ color: "#777", fontSize: "0.88rem", margin: 0, lineHeight: 1.65 }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div style={{ textAlign: "center", padding: "52px 24px" }}>
      <h2 style={{ fontWeight: 800, color: "#1a1a2e", fontSize: "1.4rem", marginBottom: "12px" }}>Ready to shop?</h2>
      <p style={{ color: "#777", marginBottom: "24px" }}>Explore thousands of products at the best prices.</p>
      <Link to="/Product" style={{
        display: "inline-block", padding: "13px 40px", borderRadius: "30px",
        background: "linear-gradient(135deg,#f7971e,#ffd200)",
        color: "#1a1a1a", fontWeight: 700, textDecoration: "none",
        boxShadow: "0 4px 18px rgba(247,151,30,.35)", fontSize: "1rem",
      }}>Browse Products &#8594;</Link>
    </div>
  </div>
);

export default About;
