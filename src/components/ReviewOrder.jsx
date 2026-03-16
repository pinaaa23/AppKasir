export default function ReviewOrder({ cart, onNext }) {

  const total = cart.reduce(
    (sum, item) => sum + item.sell_price * item.quantity,
    0
  );

  return (
    <div className="container" style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem" }}>
      <div className="card" style={{ maxWidth: "720px", margin: "0 auto" }}>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px"
        }}>
          <div style={{
            fontSize: "24px",
            fontWeight: "800"
          }}>
            Checkout
          </div>

          <div style={{
            background: "linear-gradient(130deg, #e0e7ff, #c7d2fe)",
            padding: "10px 18px",
            borderRadius: "999px",
            fontWeight: "700",
            color: "#1e40af"
          }}>
            Step 1 - Review
          </div>
        </div>

        <h3 style={{
          marginBottom: "18px",
          fontWeight: "800",
          color: "#1e293b"
        }}>
          Review Pesanan
        </h3>

        <div style={{ display: "grid", gap: "14px" }}>
          {cart.map((item, i) => (
            <div key={i} className="list">
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "16px",
                    objectFit: "cover",
                    background: "#fff"
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "17px", fontWeight: "800", color: "#0f172a" }}>
                    {item.name}
                  </div>
                  <div style={{ marginTop: "4px", color: "#64748b", fontSize: "14px" }}>
                    {item.quantity} Kg
                  </div>
                </div>
              </div>

              <div style={{ fontWeight: "800", fontSize: "18px", color: "#1e40af" }}>
                Rp {(item.sell_price * item.quantity).toLocaleString("id-ID")}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: "30px",
          paddingTop: "24px",
          borderTop: "1px solid rgba(148, 163, 184, 0.35)"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end"
          }}>
            <div style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "#334155"
            }}>
              Total Pembayaran
            </div>
            <div style={{
              fontSize: "28px",
              fontWeight: "900",
              color: "#0b1220"
            }}>
              Rp {total.toLocaleString("id-ID")}
            </div>
          </div>
        </div>

        <button
          onClick={onNext}
          className="btn btn-primary"
          style={{ width: "100%", marginTop: "28px" }}
        >
          Lanjut ke Data Customer →
        </button>

      </div>
    </div>
  );
}
