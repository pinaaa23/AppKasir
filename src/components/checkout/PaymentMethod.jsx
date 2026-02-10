import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const cart = state?.cart || [];
  const [method, setMethod] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.sell_price * item.quantity,
    0
  );

  const handleFinish = () => {
    if (!method) {
      alert("Silakan pilih metode pembayaran");
      return;
    }
    alert("Pembayaran diproses");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Pembayaran</h2>

      {/* LIST PRODUK */}
      <div style={styles.card}>
        {cart.map((item) => (
          <div key={item.id} style={styles.itemRow}>
            <span style={styles.itemName}>
              {item.name} ({item.quantity} Kg)
            </span>
            <span style={styles.itemPrice}>
              Rp {(item.sell_price * item.quantity).toLocaleString("id-ID")}
            </span>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div style={styles.totalBox}>
        <span>Total Bayar</span>
        <span>Rp {total.toLocaleString("id-ID")}</span>
      </div>

      {/* METODE */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: 12 }}>Metode Pembayaran</h3>

        {[
          { value: "qris", label: "QRIS" },
          { value: "transfer", label: "Transfer Bank" },
          { value: "cash", label: "Tunai" }
        ].map((m) => (
          <label
            key={m.value}
            style={{
              ...styles.methodItem,
              border:
                method === m.value
                  ? "2px solid #4caf50"
                  : "1px solid #e5e7eb"
            }}
          >
            <input
              type="radio"
              name="payment"
              value={m.value}
              checked={method === m.value}
              onChange={(e) => setMethod(e.target.value)}
            />
            <span>{m.label}</span>
          </label>
        ))}
      </div>

      {/* BUTTON */}
      <button style={styles.button} onClick={handleFinish}>
        Proses Pembayaran
      </button>
    </div>
  );
}

/* ================= STYLE ================= */

const styles = {
  container: {
    maxWidth: "720px",
    margin: "auto",
    padding: "32px",
    fontFamily: "Inter, sans-serif",
    background: "#f8fafc",
    minHeight: "100vh"
  },

  title: {
    marginBottom: "20px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
    marginBottom: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #f1f5f9",
    paddingBottom: "10px"
  },

  itemName: {
    fontWeight: 500
  },

  itemPrice: {
    color: "#111827"
  },

  totalBox: {
    display: "flex",
    justifyContent: "space-between",
    background: "#eef2f7",
    padding: "16px",
    borderRadius: "12px",
    fontWeight: 600,
    marginBottom: "18px"
  },

  methodItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px",
    borderRadius: "12px",
    cursor: "pointer"
  },

  button: {
    width: "100%",
    padding: "16px",
    borderRadius: "14px",
    border: "none",
    background: "#22c55e",
    color: "white",
    fontWeight: 600,
    fontSize: "16px",
    cursor: "pointer"
  }
};
