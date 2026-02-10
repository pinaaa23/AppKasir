import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Transaction({ products, transactions, addTransaction }) {
  const [productId, setProductId] = useState("");
  const [weight, setWeight] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTransaction = async () => {
    const product = products.find((p) => p.id == productId);
    if (!product) return;

    // determine final weight and total menggunakan sell_price (harga jual)
    const sellPricePerKg = Number(product.sell_price) || 0;
    let finalWeight = parseFloat(weight);
    let finalTotal = parseFloat(totalPrice);

    if (!finalWeight && finalTotal) {
      finalWeight = sellPricePerKg > 0 ? finalTotal / sellPricePerKg : 0;
    } else if (finalWeight && !finalTotal) {
      finalTotal = finalWeight * sellPricePerKg;
    }

    if (!finalWeight || !finalTotal) {
      alert('Masukkan berat atau total yang valid');
      return;
    }

    try {
      setIsSubmitting(true);
      // Simpan harga beli dan jual yang berlaku saat transaksi (historis)
      await addTransaction({ 
        product_id: product.id, 
        quantity: finalWeight, 
        buy_price_at_sale: product.buy_price,
        sell_price_at_sale: product.sell_price,
        total: finalTotal 
      });
      setWeight("");
      setTotalPrice("");
      setProductId("");
    } catch (err) {
      alert("Gagal menyimpan transaksi: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h3>Transaksi Penjualan</h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <select 
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          disabled={isSubmitting}
        >
          <option value="">Pilih Produk</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} - Rp {p.sell_price.toLocaleString('id-ID')}/Kg
            </option>
          ))}
        </select>

        <input
          type="number"
          step="0.01"
          placeholder="Berat (Kg)"
          value={weight}
          onChange={(e) => {
            const v = e.target.value;
            setWeight(v);
            const product = products.find((p) => p.id == productId);
            const price = product ? Number(product.sell_price) || 0 : 0;
            if (v === "" || !price) {
              setTotalPrice("");
            } else {
              setTotalPrice(Math.round(parseFloat(v) * price).toString());
            }
          }}
          disabled={isSubmitting}
        />
      </div>

      {productId && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
          <div style={{
            background: "#e8f5e9",
            padding: "1rem",
            borderRadius: "6px",
            borderLeft: "4px solid #4caf50"
          }}>
            <p style={{ margin: 0, fontWeight: "bold", color: "#2c3e50" }}>
              Berat: {weight ? parseFloat(weight).toFixed(2) : '-'} Kg
            </p>
          </div>

          <div style={{
            background: "#e8f5e9",
            padding: "1rem",
            borderRadius: "6px",
            borderLeft: "4px solid #4caf50"
          }}>
            <input
              type="text"
              placeholder="Total (Rp)"
              value={totalPrice ? `Rp ${Number(totalPrice).toLocaleString('id-ID')}` : ''}
              onChange={(e) => {
                // Ekstrak hanya angka dari input
                const numericValue = e.target.value.replace(/\D/g, '');
                setTotalPrice(numericValue);
                const product = products.find((p) => p.id == productId);
                const sellPrice = product ? Number(product.sell_price) || 0 : 0;
                if (numericValue === "" || !sellPrice) {
                  setWeight("");
                } else {
                  setWeight((parseFloat(numericValue) / sellPrice).toFixed(2));
                }
              }}
              disabled={isSubmitting}
              style={{ width: '100%', padding: '0.5rem', borderRadius: 4, border: '1px solid #ddd' }}
            />
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#2c3e50' }}>
              Harga per Kg: Rp {products.find(p => p.id == productId).sell_price.toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      )}

      <button 
        onClick={handleAddTransaction}
        disabled={isSubmitting}
        style={{ 
          width: "100%", 
          marginTop: "1rem",
          backgroundColor: "#4caf50",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          opacity: isSubmitting ? 0.7 : 1
        }}
      >
        {isSubmitting ? "Menyimpan..." : "Simpan Transaksi"}
      </button>

      {transactions.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h4 style={{ color: "#1e88e5" }}>Riwayat Transaksi Terbaru</h4>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {transactions.slice(0, 10).map((t, idx) => (
              <div 
                key={t.id}
                style={{
                  background: "#f9f9f9",
                  padding: "1rem",
                  borderRadius: "6px",
                  marginBottom: "0.5rem",
                  borderLeft: "4px solid #1e88e5"
                }}
              >
                <p style={{ margin: "0.25rem 0", fontWeight: "bold" }}>#{idx + 1} - {t.product_name}</p>
                <p style={{ margin: "0.25rem 0", fontSize: "0.9rem", color: "#666" }}>
                  {t.weight} Kg × Rp {t.price_per_kg.toLocaleString('id-ID')}/Kg
                </p>
                <p style={{ margin: "0.25rem 0", fontWeight: "bold", color: "#1e88e5" }}>
                  Total: Rp {t.total.toLocaleString('id-ID')}
                </p>
                <p style={{ margin: "0.25rem 0", fontSize: "0.8rem", color: "#999" }}>
                  {new Date(t.created_at).toLocaleString('id-ID')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}