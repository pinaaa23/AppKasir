import { useState } from "react";

export default function PaymentMethod({ cart, customer }) {

  const [method, setMethod] = useState("");
  const [proof, setProof] = useState(null);

  const total = cart.reduce(
    (sum, item) => sum + item.sell_price * item.quantity,
    0
  );

  const handleFinish = () => {

    if (!method) {
      alert("Pilih metode pembayaran");
      return;
    }

    if (method === "qris" && !proof) {
      alert("Upload bukti pembayaran dulu");
      return;
    }

    // simulasi kirim WA
    const text = `Halo ${customer?.name || "-"}, pembayaran sebesar Rp ${total.toLocaleString("id-ID")} sudah diterima`;


   const phone = customer.phone
  .replace(/\D/g,"") // hapus selain angka
  .replace(/^0/,"62"); // ganti 0 depan jadi 62

window.open(
  `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
);


  };

  return (
    <div>

      <h3>Pembayaran</h3>

      {["qris","transfer","cash"].map(m=>(
        <label key={m}>
          <input
            type="radio"
            value={m}
            checked={method===m}
            onChange={(e)=>setMethod(e.target.value)}
          />
          {m}
        </label>
      ))}

      {/* QRIS */}
      {method==="qris" && (
        <div>

          <h4>Scan QRIS</h4>

          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PEMBAYARAN"
          />

          <p>Total: Rp {total.toLocaleString("id-ID")}</p>

          <input
            type="file"
            onChange={(e)=>setProof(e.target.files[0])}
          />

        </div>
      )}

      <button onClick={handleFinish}>
        Proses Pembayaran
      </button>

    </div>
  );
}
