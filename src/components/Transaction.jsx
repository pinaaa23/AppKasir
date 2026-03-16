import { useState, useRef, useEffect } from "react";

export default function Transaction({ products, transactions, addTransaction, updateTransactionStatus, deleteTransaction }) {
  const [productId, setProductId] = useState("");
  const [weight, setWeight] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendingId, setSendingId] = useState(null);
  const [lastDeleted, setLastDeleted] = useState(null);
  const undoTimerRef = useRef(null);

  const handleUndoDelete = async () => {
    if (!lastDeleted) return;

    const { tx } = lastDeleted;
    try {
      await addTransaction({
        product_id: tx.product_id,
        quantity: tx.quantity,
        buy_price_at_sale: tx.buy_price_at_sale,
        sell_price_at_sale: tx.sell_price_at_sale,
        total: tx.total,
        status: tx.status,
        payment_method: tx.payment_method,
        invoice: tx.invoice,
        customer_name: tx.customer_name,
        customer_phone: tx.customer_phone,
        items: tx.items,
        proof_url: tx.proof_url
      });
      setLastDeleted(null);
      if (undoTimerRef.current) {
        clearTimeout(undoTimerRef.current);
        undoTimerRef.current = null;
      }
    } catch (err) {
      alert('Gagal meng-undo: ' + err.message);
    }
  };

  useEffect(() => {
    return () => {
      if (undoTimerRef.current) {
        clearTimeout(undoTimerRef.current);
      }
    };
  }, []);

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
        product_name: product.name,
        quantity: finalWeight,
        buy_price_at_sale: product.buy_price,
        sell_price_at_sale: product.sell_price,
        total: finalTotal,
        items: [
          {
            name: product.name,
            quantity: finalWeight,
            sell_price: product.sell_price,
            buy_price: product.buy_price,
            total: finalTotal
          }
        ]
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>
                    #{idx + 1} - {(() => {
                      const invoiceLabel = t.invoice || null;
                      const itemProductName = Array.isArray(t.items) && t.items[0]?.name && t.items[0].name !== 'Unknown'
                        ? t.items[0].name
                        : null;
                      const productLabel = (t.product_name && t.product_name !== 'Unknown')
                        ? t.product_name
                        : itemProductName;
                      const headerLabel = [invoiceLabel, productLabel].filter(Boolean).join(' • ') || 'Transaksi';
                      return headerLabel;
                    })()}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: 999,
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      textTransform: 'capitalize',
                      background: t.status === 'waiting_verification' ? '#fef3c7' : '#dcfce7',
                      color: t.status === 'waiting_verification' ? '#92400e' : '#166534',
                      border: t.status === 'waiting_verification' ? '1px solid #fcd34d' : '1px solid #22c55e'
                    }}>
                      {t.status || 'completed'}
                    </span>

                    <button
                      onClick={async () => {
                        if (!window.confirm('Hapus transaksi ini?')) return;

                        try {
                          await deleteTransaction(t.id);
                          setLastDeleted({
                            tx: t,
                            time: Date.now()
                          });

                          if (undoTimerRef.current) {
                            clearTimeout(undoTimerRef.current);
                          }
                          undoTimerRef.current = setTimeout(() => {
                            setLastDeleted(null);
                            undoTimerRef.current = null;
                          }, 5000);
                        } catch (err) {
                          alert('Gagal menghapus transaksi: ' + err.message);
                        }
                      }}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#dc2626',
                        color: '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                </div>

                {((t.customer_name || t.customer_phone) || (t.items?.customer)) && (
                  <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#444' }}>
                    Customer: {t.customer_name || t.items?.customer?.name || ''} {((t.customer_phone || t.items?.customer?.phone) ? `(${t.customer_phone || t.items?.customer?.phone})` : '')}
                  </p>
                )}

                {(() => {
                  const cartItems = t.items?.cart;
                  const transactionItems = Array.isArray(cartItems) && cartItems.length > 0
                    ? cartItems
                    : Array.isArray(t.items) && t.items.length > 0
                      ? t.items
                      : [{
                          name: t.product_name || 'Produk',
                          quantity: t.weight || 0,
                          sell_price: t.price_per_kg || 0
                        }];

                  return (
                    <div style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#666' }}>
                      {transactionItems.map((item, idx) => (
                        <div key={idx}>
                          {idx + 1}. {item.name} ({item.quantity} Kg) - Rp {(item.sell_price * item.quantity).toLocaleString('id-ID')}
                        </div>
                      ))}
                    </div>
                  );
                })()}                <p style={{ margin: "0.25rem 0", fontWeight: "bold", color: "#1e88e5" }}>
                  Total: Rp {t.total.toLocaleString('id-ID')}
                </p>
                <p style={{ margin: "0.25rem 0", fontSize: "0.8rem", color: "#999" }}>
                  {new Date(t.created_at).toLocaleString('id-ID')}
                </p>
                {t.proof_url && (
                  <img
                    src={t.proof_url}
                    alt="Bukti Pembayaran"
                    style={{
                      width: '100%',
                      maxHeight: '220px',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      marginTop: '0.75rem'
                    }}
                  />
                )}

                {t.status === 'waiting_verification' && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                    <button
                      onClick={async () => {
                        const phoneNumber = t.customer_phone || t.items?.customer?.phone;
                        if (!phoneNumber) {
                          alert('Nomor WhatsApp customer tidak tersedia');
                          return;
                        }

                        setSendingId(t.id);

                        const phone = phoneNumber.replace(/^0/, '62');

                        const items = Array.isArray(t.items) ? t.items : (t.items?.cart || []);
                        const productList = (items.length > 0 ? items : [{ name: t.product_name, quantity: t.weight, sell_price: t.price_per_kg }])
                          .map((item, i) =>
                            `${i + 1}. ${item.name} (${item.quantity} Kg) - Rp ${(item.sell_price * item.quantity).toLocaleString('id-ID')}`
                          )
                          .join('\n');

                        const now = new Date().toLocaleString('id-ID');
                        const invoice = t.invoice || `INV-${new Date().toISOString()}`;

                        const text = `\nINVOICE PEMBELIAN\n\nNo Invoice : ${invoice}\nTanggal    : ${now}\n\nHalo ${t.customer_name || ''},\n\n${productList}\n\nTotal:\nRp ${t.total.toLocaleString('id-ID')}\n\nMetode:\n${(t.payment_method || 'QRIS').toUpperCase()}\n\nTerima kasih`.trim();

                        window.open(
                          `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
                          '_blank'
                        );

                        try {
                          await updateTransactionStatus(t.id, 'completed');
                        } catch (err) {
                          alert('Gagal mengubah status: ' + err.message);
                        } finally {
                          setSendingId(null);
                        }
                      }}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#4f46e5',
                        color: '#fff',
                        cursor: sendingId === t.id ? 'not-allowed' : 'pointer',
                        opacity: sendingId === t.id ? 0.7 : 1
                      }}
                      disabled={sendingId === t.id}
                    >
                      {sendingId === t.id ? 'Mengirim...' : 'Kirim Struk'}
                    </button>

                    <button
                      onClick={async () => {
                        if (!window.confirm('Hapus transaksi ini?')) return;
                        try {
                          await deleteTransaction(t.id);
                          setLastDeleted({ tx: t, time: Date.now() });

                          if (undoTimerRef.current) {
                            clearTimeout(undoTimerRef.current);
                          }
                          undoTimerRef.current = setTimeout(() => {
                            setLastDeleted(null);
                            undoTimerRef.current = null;
                          }, 5000);
                        } catch (err) {
                          alert('Gagal menghapus transaksi: ' + err.message);
                        }
                      }}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        background: '#f8fafc',
                        color: '#1f2937',
                        cursor: 'pointer'
                      }}
                    >
                      Hapus
                    </button>
                    {lastDeleted && lastDeleted.tx.id === t.id && (
                      <button
                        onClick={handleUndoDelete}
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: '8px',
                          border: 'none',
                          background: '#f97316',
                          color: '#fff',
                          cursor: 'pointer'
                        }}
                      >
                        Undo
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}