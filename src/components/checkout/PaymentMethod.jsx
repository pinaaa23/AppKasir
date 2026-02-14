import { useState } from "react";

export default function PaymentMethod({ cart = [], customer, onBack }) {

  const [method, setMethod] = useState("");
  const [proof, setProof] = useState(null);

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

  const handleFinish = () => {

    if (!method) {
      alert("Pilih metode pembayaran");
      return;
    }

    const invoice = generateInvoice();
    const phone = customer.phone.replace(/^0/, "62");

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
`.trim();

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <div style={{
      maxWidth:"600px",
      margin:"auto",
      background:"#fff",
      padding:"30px",
      borderRadius:"20px",
      boxShadow:"0 10px 30px rgba(0,0,0,0.05)"
    }}>

      <h2 style={{marginBottom:"25px"}}>Pembayaran</h2>

      <div style={{display:"flex",flexDirection:"column",gap:"15px"}}>

        <label style={{display:"flex",justifyContent:"space-between"}}>
          QRIS
          <input type="radio" name="payment" value="qris"
            onChange={(e)=>setMethod(e.target.value)} />
        </label>

        <label style={{display:"flex",justifyContent:"space-between"}}>
          Transfer Bank
          <input type="radio" name="payment" value="transfer"
            onChange={(e)=>setMethod(e.target.value)} />
        </label>

        <label style={{display:"flex",justifyContent:"space-between"}}>
          Cash
          <input type="radio" name="payment" value="cash"
            onChange={(e)=>setMethod(e.target.value)} />
        </label>

      </div>

      <div style={{
        display:"flex",
        gap:"10px",
        marginTop:"30px"
      }}>

        <button
          onClick={onBack}
          style={{
            flex:1,
            padding:"12px",
            borderRadius:"10px",
            border:"none",
            background:"#e5e7eb",
            cursor:"pointer"
          }}
        >
          Kembali
        </button>

        <button
          onClick={handleFinish}
          style={{
            flex:2,
            padding:"12px",
            borderRadius:"10px",
            border:"none",
            background:"#4f46e5",
            color:"#fff",
            cursor:"pointer"
          }}
        >
          Proses Pembayaran
        </button>

      </div>

    </div>
  );
}
