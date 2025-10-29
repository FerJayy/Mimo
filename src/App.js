import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function Placeholder({ title }) {
  return (
    <div style={{ padding: 40 }}>
      <h1>{title}</h1>
      <p>We’ll build this next.</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}