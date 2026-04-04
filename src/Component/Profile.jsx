import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const Profile = () => {
  const { user, token, isLoggedIn, updateUser } = useAuth();

  const [profileForm, setProfileForm] = useState({ name: user?.name || "", email: user?.email || "" });
  const [profileMsg, setProfileMsg] = useState({ text: "", ok: true });
  const [profileLoading, setProfileLoading] = useState(false);

  const [pwForm, setPwForm] = useState({ current_password: "", new_password: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState({ text: "", ok: true });
  const [pwLoading, setPwLoading] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="container mt-5 text-center" style={{ minHeight: "70vh" }}>
        <h3>Please <Link to="/Login">login</Link> to view your profile.</h3>
      </div>
    );
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMsg({ text: "", ok: true });
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: profileForm.name, email: profileForm.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Update failed");
      updateUser(data);
      setProfileMsg({ text: "Profile updated successfully.", ok: true });
    } catch (err) {
      setProfileMsg({ text: err.message, ok: false });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePwSubmit = async (e) => {
    e.preventDefault();
    if (pwForm.new_password !== pwForm.confirm) {
      setPwMsg({ text: "New passwords do not match.", ok: false });
      return;
    }
    setPwLoading(true);
    setPwMsg({ text: "", ok: true });
    try {
      const res = await fetch(`${API_URL}/api/auth/me/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ current_password: pwForm.current_password, new_password: pwForm.new_password }),
      });
      if (res.status === 204) {
        setPwMsg({ text: "Password changed successfully.", ok: true });
        setPwForm({ current_password: "", new_password: "", confirm: "" });
      } else {
        const data = await res.json();
        throw new Error(data.detail || "Failed to change password");
      }
    } catch (err) {
      setPwMsg({ text: err.message, ok: false });
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ minHeight: "80vh", maxWidth: "560px" }}>
      <h2 className="mb-4">My Profile</h2>

      {/* ── Profile info ── */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5 className="mb-3">Account Details</h5>
        <form onSubmit={handleProfileSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={profileForm.name}
              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={profileForm.email}
              onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
              required
            />
          </div>
          {profileMsg.text && (
            <div className={`alert ${profileMsg.ok ? "alert-success" : "alert-danger"} py-2`}>
              {profileMsg.text}
            </div>
          )}
          <button className="btn btn-primary w-100" disabled={profileLoading}>
            {profileLoading ? "Saving…" : "Save Changes"}
          </button>
        </form>
      </div>

      {/* ── Change password ── */}
      <div className="card p-4 shadow-sm">
        <h5 className="mb-3">Change Password</h5>
        <form onSubmit={handlePwSubmit}>
          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              className="form-control"
              value={pwForm.current_password}
              onChange={(e) => setPwForm({ ...pwForm, current_password: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={pwForm.new_password}
              onChange={(e) => setPwForm({ ...pwForm, new_password: e.target.value })}
              minLength={6}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              value={pwForm.confirm}
              onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })}
              required
            />
          </div>
          {pwMsg.text && (
            <div className={`alert ${pwMsg.ok ? "alert-success" : "alert-danger"} py-2`}>
              {pwMsg.text}
            </div>
          )}
          <button className="btn btn-warning w-100" disabled={pwLoading}>
            {pwLoading ? "Updating…" : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
