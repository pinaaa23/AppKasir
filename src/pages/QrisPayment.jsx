import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabase";

const generateInvoice = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const suffix = String(Date.now()).slice(-6);
  return `INV-${y}${m}${d}-${suffix}`;
};

export default function QrisPayment() {

  const navigate = useNavigate();
  const { state } = useLocation();
  
  const cart = state?.cart || [];
  const customer = state?.customer || {};

  const [proof, setProof] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + (item.sell_price || 0) * (item.quantity || 0),
    0
  );

  const readFileAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSend = async () => {
    if (!customer?.phone) {
      alert("Nomor customer tidak ada");
      return;
    }

    if (!proof) {
      alert("Upload bukti dulu!");
      return;
    }

    setIsSubmitting(true);

    const proofUrl = await readFileAsDataUrl(proof);
    const invoice = generateInvoice();
    const quantity = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const items = {
      cart: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        sell_price: item.sell_price,
        buy_price: item.buy_price || 0,
        total: (item.sell_price || 0) * (item.quantity || 0)
      })),
      customer: {
        name: customer.name || '',
        phone: customer.phone || ''
      }
    };

    const avgSellPrice = quantity > 0 ? total / quantity : 0;
    const totalBuyCost = cart.reduce(
      (sum, item) => sum + (Number(item.buy_price) || 0) * (item.quantity || 0),
      0
    );
    const avgBuyPrice = quantity > 0 ? totalBuyCost / quantity : 0;

    const insertPayload = {
      product_id: cart.length === 1 ? cart[0].id : null,
      product_name: cart.length === 1 ? cart[0].name : '',
      quantity: quantity || 0,
      buy_price_at_sale: avgBuyPrice,
      sell_price_at_sale: avgSellPrice,
      total,
      status: 'waiting_verification',
      payment_method: 'qris',
      invoice,
      customer_name: customer.name || '',
      customer_phone: customer.phone || '',
      items,
      proof_url: proofUrl
    };

    const tryInsert = async (payload) => {
      const { error } = await supabase.from('transactions').insert([payload]);
      return error;
    };

    // Retry insert while removing any missing columns from the payload.
    // Supabase can throw: "Could not find the 'xyz' column of 'transactions' in the schema cache".
    let error = await tryInsert(insertPayload);
    const missingColumns = new Set();

    while (error) {
      const match = /Could not find the '([^']+)' column/.exec(error.message || '');
      if (!match || !match[1]) break;

      const col = match[1];
      if (!Object.prototype.hasOwnProperty.call(insertPayload, col) || missingColumns.has(col)) break;

      missingColumns.add(col);
      console.warn(`Supabase schema missing column '${col}', removing from insert payload.`);
      delete insertPayload[col];

      error = await tryInsert(insertPayload);
    }

    setIsSubmitting(false);

    if (error) {
      alert('Gagal menyimpan transaksi: ' + error.message);
      return;
    }

    alert('Bukti berhasil dikirim. Transaksi akan menunggu verifikasi oleh admin.');
    navigate('/');
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

      <h2>Pembayaran QRIS</h2>

      {/* QR IMAGE */}
      <img
        src="/qris.png"
        alt="QRIS"
        style={{width:"200px", margin:"20px auto", display:"block"}}
      />

      <p>Total: Rp {total.toLocaleString("id-ID")}</p>

      {/* Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={(e)=>setProof(e.target.files[0])}
      />

      {/* Preview */}
      {proof && (
        <img
          src={URL.createObjectURL(proof)}
          alt="preview"
          style={{width:"100%", marginTop:"10px"}}
        />
      )}

      <p style={{textAlign:"center", fontSize:"14px", color:"#666"}}>
        Scan QR untuk melakukan pembayaran
      </p>

      <button
        onClick={handleSend}
        disabled={!proof || isSubmitting}
        style={{
          marginTop:"20px",
          padding:"12px",
          width:"100%",
          borderRadius:"10px",
          border:"none",
          background: proof ? "#4f46e5" : "#ccc",
          color:"#fff",
          cursor: proof && !isSubmitting ? "pointer" : "not-allowed"
        }}
      >
        {isSubmitting ? "Mengirim..." : "Kirim Bukti & Selesaikan"}
      </button>

    </div>
  );
}