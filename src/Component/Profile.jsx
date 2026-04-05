import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const inputStyle = (focused) => ({
  width: "100%", padding: "11px 14px", borderRadius: "10px",
  border: `1.5px solid ${focused ? "#f7971e" : "#e0e0e0"}`,
  fontSize: "0.93rem", outline: "none", background: "#fafafa",
  color: "#1a1a2e", boxSizing: "border-box", transition: "border-color .2s",
});

const labelStyle = {
  display: "block", marginBottom: "6px",
  fontSize: "0.72rem", fontWeight: 700, color: "#888", letterSpacing: "0.5px",
};

const cardStyle = {
  background: "#fff", borderRadius: "18px",
  boxShadow: "0 4px 24px rgba(0,0,0,.08)", padding: "32px 36px", marginBottom: "24px",
};

const Profile = () => {
  const { user, token, isLoggedIn, updateUser } = useAuth();

  const [profileForm, setProfileForm] = useState({ name: user?.name || "", email: user?.email || "" });
  const [profileLoading, setProfileLoading] = useState(false);
  const [pfocus, setPfocus] = useState("");

  const [pwForm, setPwForm] = useState({ current_password: "", new_password: "", confirm: "" });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwFocus, setPwFocus] = useState("");

  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: "80vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", background: "#f0f2f5",
      }}>
        <div style={{ fontSize: "3rem", marginBottom: "12px" }}>&#128274;</div>
        <h3 style={{ color: "#1a1a2e", marginBottom: "8px" }}>Access restricted</h3>
        <p style={{ color: "#888", marginBottom: "20px" }}>Please log in to view your profile.</p>
        <Link to="/Login" style={{
          padding: "10px 28px", borderRadius: "10px", textDecoration: "none",
          background: "linear-gradient(135deg,#f7971e,#ffd200)",
          color: "#1a1a1a", fontWeight: 700,
        }}>Log In</Link>
      </div>
    );
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: profileForm.name, email: profileForm.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Update failed");
      updateUser(data);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePwSubmit = async (e) => {
    e.preventDefault();
    if (pwForm.new_password !== pwForm.confirm) {
      toast.error("New passwords do not match.");
      return;
    }
    setPwLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/me/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ current_password: pwForm.current_password, new_password: pwForm.new_password }),
      });
      if (res.status === 204) {
        toast.success("Password changed successfully!");
        setPwForm({ current_password: "", new_password: "", confirm: "" });
      } else {
        const data = await res.json();
        throw new Error(data.detail || "Failed to change password");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPwLoading(false);
    }
  };

  const initials = user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* ── Hero banner (full width) ── */}
        <div style={{
          background: "linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%)",
          borderRadius: "20px", padding: "36px 40px",
          display: "flex", alignItems: "center", gap: "28px", marginBottom: "28px",
        }}>
          <div style={{
            width: "80px", height: "80px", borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg,#f7971e,#ffd200)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "2rem", fontWeight: 800, color: "#1a1a2e",
            boxShadow: "0 4px 16px rgba(247,151,30,.4)",
          }}>
            {initials}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: "0 0 4px", color: "#fff", fontWeight: 800, fontSize: "1.5rem" }}>
              {user.name}
            </h2>
            <p style={{ margin: "0 0 12px", color: "rgba(255,255,255,.55)", fontSize: "0.9rem" }}>
              {user.email}
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {[
                { label: "My Orders", to: "/Orders", icon: "&#128230;" },
                { label: "Wishlist",  to: "/Wishlist", icon: "&#10084;&#65039;" },
              ].map(({ label, to, icon }) => (
                <Link key={to} to={to} style={{ textDecoration: "none" }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: "5px",
                    background: "rgba(255,255,255,.1)", borderRadius: "20px",
                    padding: "5px 16px", color: "rgba(255,255,255,.8)", fontSize: "0.82rem", fontWeight: 600,
                    border: "1px solid rgba(255,255,255,.12)",
                  }}>
                    <span dangerouslySetInnerHTML={{ __html: icon }} /> {label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          {/* stats strip */}
          <div style={{ display: "flex", gap: "32px", flexShrink: 0 }}>
            {[
              { icon: "&#128100;", label: "Member" },
              { icon: "&#128274;", label: "Secure" },
              { icon: "&#9989;",   label: "Verified" },
            ].map(({ icon, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.4rem" }} dangerouslySetInnerHTML={{ __html: icon }} />
                <div style={{ color: "rgba(255,255,255,.45)", fontSize: "0.7rem", marginTop: "3px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Two-column grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "start" }}>

          {/* LEFT — Account Details */}
          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "linear-gradient(135deg,#f7971e22,#ffd20022)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem",
              }}>&#128100;</div>
              <h3 style={{ margin: 0, fontWeight: 800, fontSize: "1.05rem", color: "#1a1a2e" }}>
                Account Details
              </h3>
            </div>

            <form onSubmit={handleProfileSubmit}>
              <div style={{ marginBottom: "18px" }}>
                <label style={labelStyle}>FULL NAME</label>
                <input
                  type="text" value={profileForm.name} required
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  onFocus={() => setPfocus("name")} onBlur={() => setPfocus("")}
                  style={inputStyle(pfocus === "name")}
                  placeholder="Your full name"
                />
              </div>
              <div style={{ marginBottom: "28px" }}>
                <label style={labelStyle}>EMAIL ADDRESS</label>
                <input
                  type="email" value={profileForm.email} required
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  onFocus={() => setPfocus("email")} onBlur={() => setPfocus("")}
                  style={inputStyle(pfocus === "email")}
                  placeholder="you@example.com"
                />
              </div>
              <button
                type="submit" disabled={profileLoading}
                style={{
                  width: "100%", padding: "13px", border: "none", borderRadius: "10px",
                  background: profileLoading ? "#ddd" : "linear-gradient(135deg,#f7971e,#ffd200)",
                  color: "#1a1a1a", fontWeight: 700, fontSize: "0.95rem",
                  cursor: profileLoading ? "not-allowed" : "pointer",
                }}
              >
                {profileLoading ? "Saving…" : "Save Changes"}
              </button>
            </form>
          </div>

          {/* RIGHT — Change Password */}
          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "rgba(229,45,39,.08)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem",
              }}>&#128274;</div>
              <h3 style={{ margin: 0, fontWeight: 800, fontSize: "1.05rem", color: "#1a1a2e" }}>
                Change Password
              </h3>
            </div>

            <form onSubmit={handlePwSubmit}>
              {[
                { key: "current_password", label: "CURRENT PASSWORD",      placeholder: "Current password" },
                { key: "new_password",     label: "NEW PASSWORD",           placeholder: "New password (min 6 chars)", min: 6 },
                { key: "confirm",          label: "CONFIRM NEW PASSWORD",   placeholder: "Repeat new password" },
              ].map(({ key, label, placeholder, min }) => (
                <div key={key} style={{ marginBottom: "18px" }}>
                  <label style={labelStyle}>{label}</label>
                  <input
                    type="password" value={pwForm[key]} required
                    minLength={min}
                    placeholder={placeholder}
                    onChange={(e) => setPwForm({ ...pwForm, [key]: e.target.value })}
                    onFocus={() => setPwFocus(key)} onBlur={() => setPwFocus("")}
                    style={inputStyle(pwFocus === key)}
                  />
                </div>
              ))}
              <button
                type="submit" disabled={pwLoading}
                style={{
                  width: "100%", padding: "13px", border: "none", borderRadius: "10px",
                  background: pwLoading ? "#ddd" : "#1a1a2e",
                  color: "#fff", fontWeight: 700, fontSize: "0.95rem",
                  cursor: pwLoading ? "not-allowed" : "pointer",
                }}
              >
                {pwLoading ? "Updating…" : "Change Password"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
