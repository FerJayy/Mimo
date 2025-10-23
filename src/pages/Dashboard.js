// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  async function handleLogout() {
    await signOut(auth);
    navigate("/");
  }

  if (!user) return null; // avoid flicker while checking auth

  return (
    <div style={{ padding: "80px", textAlign: "center" }}>
      <h1>Welcome to Mimo Dashboard</h1>
      <p>Logged in as <strong>{user.displayName || user.email}</strong></p>
      <button className="btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}