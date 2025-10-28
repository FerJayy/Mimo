import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });
  const navigate = useNavigate();

  // Track user login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
        console.log("Logged in user UID:", currentUser.uid);
        subscribeToExpenses(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // ✅ Subscribe to real-time expense updates
  const subscribeToExpenses = (uid) => {
    const q = query(
      collection(db, "expenses"),
      where("userId", "==", uid),
      orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(list);
    });
  };

  // ✅ Add new expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.category || !form.date)
      return alert("Please fill in all fields");

    await addDoc(collection(db, "expenses"), {
      ...form,
      amount: parseFloat(form.amount),
      userId: user.uid,
      createdAt: new Date(),
    });

    setForm({ title: "", amount: "", category: "", date: "" });
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  // ✅ Helper to format date properly
  const formatDate = (dateValue) => {
    try {
      if (dateValue?.seconds) {
        // Firestore Timestamp
        return new Date(dateValue.seconds * 1000).toLocaleDateString("id-ID");
      }
      return new Date(dateValue).toLocaleDateString("id-ID");
    } catch {
      return "-";
    }
  };

  return (
    <div className="dashboard">
      <div className="topbar">
        <h1>Welcome, {user?.displayName || user?.email}</h1>
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <section className="add-expense">
        <h2>Add Expense</h2>
        <form onSubmit={handleSubmit} className="expense-form">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount (Rp)"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <button className="btn" type="submit">
            Add
          </button>
        </form>
      </section>

      <section className="expense-list">
        <h2>Recent Expenses</h2>
        {expenses.length === 0 ? (
          <p>No expenses yet.</p>
        ) : (
          <table className="expense-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id}>
                  <td data-label="Title">{exp.title}</td>
                  <td data-label="Category">{exp.category}</td>
                  <td data-label="Date">{formatDate(exp.date)}</td>
                  <td data-label="Amount">Rp{exp.amount.toLocaleString("id-ID")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
