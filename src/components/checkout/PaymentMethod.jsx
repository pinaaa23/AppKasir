import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentMethod({ cart = [], customer, onBack, onSelectTransfer }) {

  const navigate = useNavigate();
  const [method, setMethod] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.sell_price * item.quantity,
    0
  );

  const generateInvoice = () => {
    const date = new Date();
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const random = Math.floor(Math.random() * 9000) + 1000;
    return `INV-${y}${m}${d}-${random}`;
  };

  const handleSelectTransfer = () => {
    setMethod("transfer");
    onSelectTransfer?.();
  };

  const handleFinish = async () => {

    if (!method) {
      alert("Pilih metode pembayaran");
      return;
    }

    if (!customer || !customer.phone) {
      alert("Data customer belum lengkap");
      return;
    }

    // QRIS should go to QRIS page (upload bukti), not send WA invoice
    if (method === "qris") {
      navigate("/qris", {
        state: { cart, customer }
      });
      return;
    }

    const invoice = generateInvoice();
    const phone = customer.phone.replace(/^0/, "62");

  const items = cart.map((item) => ({
    product_id: item.id,
    name: item.name,
    quantity: item.quantity,
    sell_price: item.sell_price,
    buy_price: item.buy_price || 0,
    total: (item.sell_price || 0) * (item.quantity || 0)
  }));

  const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const totalBuyCost = cart.reduce(
    (sum, item) => sum + (Number(item.buy_price) || 0) * (item.quantity || 0),
    0
  );

  const avgBuyPrice = totalQuantity > 0 ? totalBuyCost / totalQuantity : 0;
  const avgSellPrice = totalQuantity > 0 ? total / totalQuantity : 0;

  const payload = {
    product_id: cart.length === 1 ? cart[0].id : null,
    product_name: cart.length === 1 ? cart[0].name : '',
    quantity: totalQuantity,
    buy_price_at_sale: avgBuyPrice,
    sell_price_at_sale: avgSellPrice,
    total,
    status: 'completed',
    payment_method: method,
    invoice,
    customer_name: customer.name || '',
    customer_phone: customer.phone || '',
    items
  };

  // Simpan transaksi ke Supabase agar bisa muncul di laporan
  try {
    const { supabase } = await import("../../lib/supabase");
    await supabase.from('transactions').insert([payload]);
  } catch (err) {
    console.warn('Gagal menyimpan transaksi:', err);
  }

  // 👉 selain QRIS langsung WA
  const productList = cart
    .map(
      (item, i) =>
        `${i + 1}. ${item.name} (${item.quantity} Kg) - Rp ${(item.sell_price * item.quantity).toLocaleString("id-ID")}`
    )
    .join("\n");

  const now = new Date().toLocaleString("id-ID");

  const text = `
INVOICE PEMBELIAN

No Invoice : ${invoice}
Tanggal    : ${now}

Halo ${customer.name},

${productList}

Total:
Rp ${total.toLocaleString("id-ID")}

Metode:
${method.toUpperCase()}

Terima kasih
`.trim();

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
    "_blank"
  );
};

  const paymentMethods = [
    {
      id: "qris",
      label: "QRIS",
      icon: "📱",
      description: "Scan QRIS dengan aplikasi mobile"
    },
    {
      id: "transfer",
      label: "Transfer Bank",
      icon: "🏦",
      description: "Transfer ke rekening bank"
    },
    {
      id: "cash",
      label: "Cash",
      icon: "💰",
      description: "Pembayaran tunai"
    }
  ];

  return (
    <div style={{
      maxWidth:"600px",
      margin:"auto",
      background:"#fff",
      padding:"40px",
      borderRadius:"32px",
      boxShadow:"0 20px 50px rgba(0,0,0,0.1)",
      textAlign:"center"
    }}>

      <h2 style={{
        marginBottom:"10px",
        fontSize:"28px",
        fontWeight:"700",
        color:"#1a1a1a"
      }}>
        Pilih Metode Pembayaran
      </h2>
      
      <p style={{
        marginBottom:"35px",
        color:"#666",
        fontSize:"14px"
      }}>
        Total: <strong>Rp {total.toLocaleString("id-ID")}</strong>
      </p>

      <div style={{display:"flex",flexDirection:"column",gap:"12px",marginBottom:"35px"}}>
        {paymentMethods.map((payMethod) => (
          <div
            key={payMethod.id}
            onClick={() => setMethod(payMethod.id)}
            style={{
              padding:"18px",
              borderRadius:"16px",
              border:"2px solid",
              borderColor: method === payMethod.id ? "#6366f1" : "#e5e7eb",
              background: method === payMethod.id ? "#f0f4ff" : "#fafafa",
              cursor:"pointer",
              transition:"all 0.3s ease",
              display:"flex",
              alignItems:"center",
              gap:"16px",
              boxShadow: method === payMethod.id ? "0 8px 20px rgba(99, 102, 241, 0.15)" : "none"
            }}
          >
            <div style={{fontSize:"36px"}}>{payMethod.icon}</div>
            <div style={{flex:1,textAlign:"left"}}>
              <div style={{fontSize:"16px",fontWeight:"600",color:"#1a1a1a"}}>
                {payMethod.label}
              </div>
              <div style={{fontSize:"12px",color:"#999",marginTop:"4px"}}>
                {payMethod.description}
              </div>
            </div>
            <div style={{
              width:"20px",
              height:"20px",
              borderRadius:"50%",
              border:"2px solid",
              borderColor: method === payMethod.id ? "#6366f1" : "#d1d5db",
              background: method === payMethod.id ? "#6366f1" : "#fff",
              display:"flex",
              alignItems:"center",
              justifyContent:"center"
            }}>
              {method === payMethod.id && (
                <div style={{
                  width:"8px",
                  height:"8px",
                  borderRadius:"50%",
                  background:"#fff"
                }} />
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        display:"flex",
        gap:"12px",
        marginTop:"35px"
      }}>

        <button
          onClick={onBack}
          style={{
            flex:1,
            padding:"14px",
            borderRadius:"12px",
            border:"2px solid #ccc",
            background:"transparent",
            color:"#666",
            cursor:"pointer",
            fontSize:"16px",
            fontWeight:"600",
            transition:"all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = "#999";
            e.target.style.color = "#333";
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = "#ccc";
            e.target.style.color = "#666";
          }}
        >
          Kembali
        </button>

        <button
          onClick={method === "transfer" ? handleSelectTransfer : handleFinish}
          style={{
            flex:2,
            padding:"14px",
            borderRadius:"12px",
            border:"none",
            background: method ? "linear-gradient(135deg, #8b5cf6 0%, #0ea5e9 100%)" : "#d1d5db",
            color:"#fff",
            cursor: method ? "pointer" : "not-allowed",
            fontSize:"16px",
            fontWeight:"600",
            transition:"all 0.3s ease"
          }}
          disabled={!method}
          onMouseEnter={(e) => {
            if (method) {
              e.target.style.boxShadow = "0 8px 20px rgba(139, 92, 246, 0.4)";
              e.target.style.transform = "translateY(-2px)";
            }
          }}
          onMouseLeave={(e) => {
            if (method) {
              e.target.style.boxShadow = "none";
              e.target.style.transform = "translateY(0)";
            }
          }}
        >
          {method === "transfer" ? "Lanjut ke Pilihan Bank" : "Proses Pembayaran"}
        </button>

      </div>

    </div>
  );
}
