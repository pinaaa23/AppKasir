import React, { useState } from "react";

export default function CheckOutForm({ onSubmit, loading }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

<PaymentMethod
  value={paymentMethod}
  onChange={setPaymentMethod}
/>


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      address,
      paymentMethod,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div>
        <label>Nama:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Alamat:</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Metode Pembayaran:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="credit_card">Kartu Kredit</option>
          <option value="bank_transfer">Transfer Bank</option>
          <option value="cash_on_delivery">Bayar di Tempat</option>
        </select>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Memproses..." : "Bayar"}
      </button>
    </form>
  );
}