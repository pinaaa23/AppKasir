<h1>INI FILE ASLI</h1>

import React from "react";

export default function CheckoutSummary({ cartItems = [] }) {
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.total || 0),
    0
  );

  return (
    <div className="checkout-summary">
      <h3>Ringkasan Pembayaran</h3>

      {cartItems.length === 0 ? (
        <p>Belum ada transaksi</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={item.product_id || index}>
              {item.product_name} - {item.weight} kg x Rp{" "}
              {Number(item.price_per_kg).toLocaleString("id-ID")} = Rp{" "}
              {Number(item.total).toLocaleString("id-ID")}
            </li>
          ))}
        </ul>
      )}

      <h4>Total: Rp {totalAmount.toLocaleString("id-ID")}</h4>
    </div>
  );
}
