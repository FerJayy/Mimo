import React, { useEffect, useMemo, useState } from "react";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  Timestamp,
} from "firebase/firestore";

// ---------- Fixed lists ----------
const CATEGORIES = ["Salary", "Freelance", "Investments", "Others"];
const PAYMENT_METHODS = ["Cash", "Bank Transfer", "Check"];

// ---------- Helpers ----------
const rp = (n) =>
  typeof n === "number"
    ? `Rp${n.toLocaleString("id-ID")}`
    : n
    ? `Rp${Number(n).toLocaleString("id-ID")}`
    : "Rp0";

const toDateInput = (tsOrStr) => {
  try {
    const d =
      tsOrStr instanceof Timestamp
        ? tsOrStr.toDate()
        : new Date(tsOrStr || Date.now());
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
  } catch {
    return "";
  }
};

const fromDateInput = (value) => {
  if (!value) return null;
  return Timestamp.fromDate(new Date(value + "T00:00:00"));
};

// ---------- UI Components ----------
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

function Toast({ open, message }) {
  return <div className={`toast ${open ? "show" : ""}`}>{message}</div>;
}

export default function Income() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [pmFilter, setPmFilter] = useState("all");

  // modal / form state
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    category: "",
    amount: "",
    paymentMethod: "",
    date: toDateInput(new Date()),
  });

  const [toast, setToast] = useState({ show: false, msg: "" });

  // ---------- Firebase listener ----------
  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((u) => {
      if (!u) return;
      const q = query(
        collection(db, "incomes"),
        where("userId", "==", u.uid),
        orderBy("date", "desc"),
        orderBy("createdAt", "desc")
      );
      const unsub = onSnapshot(q, (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setItems(list);
        setLoading(false);
      });
      return () => unsub();
    });
    return () => unsubAuth();
  }, []);

  // ---------- Form & actions ----------
  const resetForm = () =>
    setForm({
      title: "",
      category: "",
      amount: "",
      paymentMethod: "",
      date: toDateInput(new Date()),
    });

  const openAdd = () => {
    resetForm();
    setEditingId(null);
    setOpenModal(true);
  };

  const openEdit = (row) => {
    setEditingId(row.id);
    setForm({
      title: row.title || "",
      category: row.category || "",
      amount: row.amount?.toString() || "",
      paymentMethod: row.paymentMethod || "",
      date: toDateInput(row.date || row.createdAt),
    });
    setOpenModal(true);
  };

  const closeModal = () => setOpenModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.amount || !form.paymentMethod || !form.date)
      return alert("Please fill all fields");

    const u = auth.currentUser;
    if (!u) return;

    const payload = {
      userId: u.uid,
      title: form.title,
      category: form.category,
      amount: Number(form.amount),
      paymentMethod: form.paymentMethod,
      date: fromDateInput(form.date),
      createdAt: serverTimestamp(),
    };

    try {
      if (editingId) await updateDoc(doc(db, "incomes", editingId), payload);
      else await addDoc(collection(db, "incomes"), payload);

      setToast({ show: true, msg: editingId ? "Updated ✅" : "Added ✅" });
      setTimeout(() => setToast({ show: false, msg: "" }), 1500);
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Error saving income");
    }
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Delete "${row.title}"?`)) return;
    await deleteDoc(doc(db, "incomes", row.id));
  };

  // ---------- Filtered list ----------
  const filtered = useMemo(() => {
    const txt = search.toLowerCase();
    return items.filter((it) => {
      const matchText =
        !txt ||
        it.title?.toLowerCase().includes(txt) ||
        it.category?.toLowerCase().includes(txt);
      const matchCat = catFilter === "all" || it.category === catFilter;
      const matchPm = pmFilter === "all" || it.paymentMethod === pmFilter;
      return matchText && matchCat && matchPm;
    });
  }, [items, search, catFilter, pmFilter]);

  // ---------- Render ----------
  return (
    <>
      {/* Summary Cards */}
      <div className="summary-row">
        <div className="summary-card income">
          <h4>Income</h4>
          <p>{rp(items.reduce((sum, x) => sum + (Number(x.amount) || 0), 0))}</p>
        </div>
        <div className="summary-card saved">
          <h4>Average Income</h4>
          <p>
            {rp(
              items.length
                ? Math.round(
                    items.reduce((s, x) => s + (Number(x.amount) || 0), 0) /
                      items.length
                  )
                : 0
            )}
          </p>
        </div>
        <div className="summary-card">
          <h4>Total Transactions</h4>
          <p style={{ color: "green" }}>{items.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="controls-row">
        <div className="input-group search">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search income…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="input-group">
          <span>📂</span>
          <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
            <option value="all">Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <span>💳</span>
          <select value={pmFilter} onChange={(e) => setPmFilter(e.target.value)}>
            <option value="all">Payment Methods</option>
            {PAYMENT_METHODS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        <button className="btn" onClick={openAdd}>
          ＋ Add Income
        </button>
      </div>

      {/* Table */}
      <section className="expense-list">
        <h3>List of Income</h3>
        {loading ? (
          <p>Loading…</p>
        ) : filtered.length === 0 ? (
          <p>No income yet.</p>
        ) : (
          <table className="expense-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Category</th>
                <th>Payment Method</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id}>
                  <td>{new Date(row.date?.toDate?.() || row.date).toLocaleDateString()}</td>
                  <td>{row.title}</td>
                  <td>{row.category}</td>
                  <td>{row.paymentMethod}</td>
                  <td>{rp(row.amount)}</td>
                  <td>
                    <button onClick={() => openEdit(row)}>✏️</button>
                    <button onClick={() => handleDelete(row)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Modal */}
      <Modal open={openModal} onClose={closeModal}>
        <form className="modal-form" onSubmit={handleSubmit}>
          <h3>{editingId ? "Edit Income" : "Add Income"}</h3>

          <label>
            Title
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </label>

          <label>
            Category
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select category</option>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>

          <label>
            Amount (Rp)
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </label>

          <label>
            Payment Method
            <select
              value={form.paymentMethod}
              onChange={(e) =>
                setForm({ ...form, paymentMethod: e.target.value })
              }
            >
              <option value="">Select method</option>
              {PAYMENT_METHODS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>

          <label>
            Date
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </label>

          <div className="modal-actions">
            <button type="button" className="btn-outline" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn" type="submit">
              {editingId ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </Modal>

      <Toast open={toast.show} message={toast.msg} />
    </>
  );
}
