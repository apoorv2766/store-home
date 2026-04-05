import React, { useState } from "react";

const FIELD = {
  width: "100%", padding: "11px 14px", borderRadius: "10px",
  border: "1.5px solid #e0e4ea", fontSize: "0.92rem",
  outline: "none", background: "#fff", color: "#1a1a2e",
  fontFamily: "inherit",
};

const INFO = [
  { icon: "&#128205;", label: "Address",   value: "2nd Cross, Kundanhalli Colony, Brookfield, Bangalore" },
  { icon: "&#128140;", label: "Email",     value: "apoorv2766@outlook.com" },
  { icon: "&#128222;", label: "Phone",     value: "+91 85745 37246" },
  { icon: "&#128336;", label: "Hours",     value: "Mon – Sat, 9 AM – 8 PM IST" },
];

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg,#1a1a2e 0%,#0f3460 100%)",
        padding: "60px 24px", textAlign: "center",
      }}>
        <h1 style={{ color: "#ffd200", fontWeight: 800, fontSize: "clamp(1.6rem,4vw,2.6rem)", margin: "0 0 12px" }}>
          Get In Touch
        </h1>
        <p style={{ color: "rgba(255,255,255,.65)", fontSize: "1rem", margin: 0 }}>
          We'd love to hear from you. Send us a message and we'll respond within 24 hours.
        </p>
      </div>

      <div style={{ maxWidth: "980px", margin: "40px auto", padding: "0 24px 56px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "28px", alignItems: "start" }}>

        {/* Contact form */}
        <div style={{ background: "#fff", borderRadius: "18px", padding: "32px", boxShadow: "0 2px 16px rgba(0,0,0,.08)" }}>
          <h2 style={{ fontWeight: 800, color: "#1a1a2e", margin: "0 0 24px", fontSize: "1.2rem" }}>Send a Message</h2>

          {sent && (
            <div style={{
              background: "#f0fff4", border: "1.5px solid #b7f5c8",
              borderRadius: "10px", padding: "12px 16px", color: "#1a8b3c",
              fontWeight: 600, marginBottom: "20px", fontSize: "0.9rem",
            }}>
              &#10003; Message sent! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <input required name="name"    value={form.name}    onChange={handleChange} placeholder="Your name"  style={FIELD} />
              <input required name="email"   value={form.email}   onChange={handleChange} placeholder="Email"       style={FIELD} type="email" />
            </div>
            <input   required name="subject" value={form.subject} onChange={handleChange} placeholder="Subject"     style={FIELD} />
            <textarea required name="message" value={form.message} onChange={handleChange} placeholder="Your message…" rows={5}
              style={{ ...FIELD, resize: "vertical" }} />
            <button type="submit" style={{
              padding: "12px", borderRadius: "10px", border: "none",
              background: "linear-gradient(135deg,#f7971e,#ffd200)",
              color: "#1a1a1a", fontWeight: 700, fontSize: "0.95rem",
              cursor: "pointer", boxShadow: "0 4px 16px rgba(247,151,30,.35)",
            }}>Send Message &#10148;</button>
          </form>
        </div>

        {/* Contact info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {INFO.map(({ icon, label, value }) => (
            <div key={label} style={{
              background: "#fff", borderRadius: "14px", padding: "20px",
              display: "flex", gap: "16px", alignItems: "flex-start",
              boxShadow: "0 2px 10px rgba(0,0,0,.07)",
            }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "12px", flexShrink: 0,
                background: "linear-gradient(135deg,#1a1a2e,#0f3460)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.3rem",
              }} dangerouslySetInnerHTML={{ __html: icon }} />
              <div>
                <p style={{ margin: "0 0 3px", fontSize: "0.72rem", color: "#aaa", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>{label}</p>
                <p style={{ margin: 0, color: "#1a1a2e", fontSize: "0.9rem", fontWeight: 500 }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
