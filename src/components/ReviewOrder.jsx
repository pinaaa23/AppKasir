import { useLocation, useNavigate } from "react-router-dom";

export default function ReviewOrder() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const cart = state?.cart || [];

  const total = cart.reduce(
    (sum, item) => sum + item.sell_price * item.quantity,
    0
  );

  return (
    <div
      style={{
        maxWidth: "850px",
        margin: "auto",
        padding: "2rem",
        fontFamily: "sans-serif"
      }}
    >
      {/* HEADER */}
      <h2 style={{ marginBottom: "1.5rem" }}>Review Pesanan</h2>

      {/* LIST PRODUK */}
      <div
        style={{
          background: "white",
          borderRadius: "14px",
          padding: "1.5rem",
          boxShadow: "0 6px 20px rgba(0,0,0,0.06)"
        }}
      >
        {cart.map(item => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "12px 0",
              borderBottom: "1px solid #f0f0f0"
            }}
          >
            <img
              src={item.image}
              style={{
                width: 70,
                height: 70,
                objectFit: "cover",
                borderRadius: 10
              }}
            />

            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 600 }}>{item.name}</p>
              <p style={{ margin: "4px 0", color: "#777" }}>
                {item.quantity} Kg
              </p>
            </div>

            <p style={{ margin: 0, fontWeight: 600, color: "#1e88e5" }}>
              Rp {(item.sell_price * item.quantity).toLocaleString("id-ID")}
            </p>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div
        style={{
          marginTop: "1.5rem",
          background: "#f8fafc",
          padding: "1.2rem",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "18px",
          fontWeight: "600"
        }}
      >
        <span>Total</span>
        <span>Rp {total.toLocaleString("id-ID")}</span>
      </div>

      {/* BUTTON */}
      <button
        onClick={() => navigate("/payment", { state: { cart } })}
        style={{
          marginTop: "1.2rem",
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          background: "#4caf50",
          color: "white",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer"
        }}
      >
        Lanjut Pembayaran →
      </button>
    </div>
  );
}
