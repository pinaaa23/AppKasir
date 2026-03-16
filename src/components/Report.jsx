import { useState, useRef, useEffect } from 'react';

export default function Report({ transactions, deleteTransaction, addTransaction }) {
  const [lastDeleted, setLastDeleted] = useState(null);
  const undoTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (undoTimerRef.current) {
        clearTimeout(undoTimerRef.current);
      }
    };
  }, []);

  const handleUndo = async () => {
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
      alert('Gagal mengembalikan transaksi: ' + err.message);
    }
  };

  const totalIncome = transactions.reduce((sum, t) => sum + (t.total || 0), 0);
  const calculateTransactionProfit = (t) => {
    console.log('Calculating profit for transaction:', t.id, 'payment_method:', t.payment_method, 'items:', t.items, 'buy_price_at_sale:', t.buy_price_at_sale, 'product_buy_price:', t.product_buy_price);

    // Prefer item-level buy/sell data if available (e.g., QRIS transactions)
    if (t.items && t.items.cart && Array.isArray(t.items.cart) && t.items.cart.length > 0) {
      const sellPriceFromItem = (item) => Number(item.sell_price) || 0;
      const buyPriceFromItem = (item) => {
        const itemBuy = Number(item.buy_price) || 0;
        // If item doesn't include buy_price, fallback to transaction-level / product-level buy price
        return itemBuy || Number(t.buy_price_at_sale) || Number(t.product_buy_price) || 0;
      };

      const totalSell = t.items.cart.reduce(
        (sum, item) => sum + sellPriceFromItem(item) * (Number(item.quantity) || 0),
        0
      );
      const totalBuy = t.items.cart.reduce(
        (sum, item) => sum + buyPriceFromItem(item) * (Number(item.quantity) || 0),
        0
      );

      console.log('QRIS transaction - totalSell:', totalSell, 'totalBuy:', totalBuy, 'profit:', totalSell - totalBuy);

      // If we have any buy cost data, use it for profit calculation.
      if (totalBuy > 0) {
        return totalSell - totalBuy;
      }
    }

    const sellPrice = Number(t.sell_price_at_sale) || 0;
    const buyPrice = Number(t.buy_price_at_sale) || Number(t.product_buy_price) || 0;
    const quantity = Number(t.quantity) || 0;
    const profit = (sellPrice - buyPrice) * quantity;

    console.log('Regular transaction - sellPrice:', sellPrice, 'buyPrice:', buyPrice, 'quantity:', quantity, 'profit:', profit);

    return profit;
  };

  const totalProfit = transactions.reduce((sum, t) => sum + calculateTransactionProfit(t), 0);
  const avgTransaction = transactions.length > 0 ? (totalIncome / transactions.length).toFixed(2) : 0;

  // Group by product (support item list for QRIS transactions)
  const productSales = {};
  transactions.forEach((t) => {
    const fallbackName = t.invoice || t.customer_name || 'Transaksi';
    const itemProductName = Array.isArray(t.items) && t.items[0]?.name && t.items[0].name !== 'Unknown'
      ? t.items[0].name
      : null;
    const defaultProductName = (t.product_name && t.product_name !== 'Unknown')
      ? t.product_name
      : itemProductName || fallbackName;

    const items = Array.isArray(t.items) ? t.items : [{
      name: defaultProductName,
      quantity: t.weight || 0,
      sell_price: t.price_per_kg || 0,
      total: t.total || 0
    }];

    items.forEach((item) => {
      const name = (item.name && item.name !== 'Unknown')
        ? item.name
        : (t.product_name && t.product_name !== 'Unknown')
          ? t.product_name
          : fallbackName;
      const qty = parseFloat(item.quantity) || 0;
      const total = item.total != null ? parseFloat(item.total) : qty * (parseFloat(item.sell_price) || 0);

      if (!productSales[name]) {
        productSales[name] = {
          name,
          quantity: 0,
          total: 0
        };
      }
      productSales[name].quantity += qty;
      productSales[name].total += total;
    });
  });

  return (
    <div className="card">
      <h3 style={{ color: '#000000' }}>Laporan Keuangan</h3>
      <div className="stats" style={{ color: '#ffffff' }}>
        <div className="stat-box">
          <p style={{ color: '#ffffff' }}>Total Transaksi</p>
          <div className="value" style={{ color: '#ffffff' }}>{transactions.length}</div>
        </div>
        <div className="stat-box">
          <p style={{ color: '#ffffff' }}>Total Penjualan</p>
          <div className="value" style={{ color: '#ffffff' }}>Rp {totalIncome.toLocaleString('id-ID')}</div>
        </div>
        <div className="stat-box">
          <p style={{ color: '#ffffff' }}>Keuntungan Bersih</p>
          <div className="value" style={{ color: '#ffffff' }}>Rp {totalProfit.toLocaleString('id-ID')}</div>
        </div>
        <div className="stat-box">
          <p style={{ color: '#ffffff' }}>Rata-rata Per Transaksi</p>
          <div className="value" style={{ color: '#ffffff' }}>Rp {Number(avgTransaction).toLocaleString('id-ID')}</div>
        </div>
      </div>

      {Object.keys(productSales).length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h4 style={{ color: "#1e88e5", borderBottom: "2px solid #1e88e5", paddingBottom: "0.5rem" }}>
            Penjualan per Produk
          </h4>
          {Object.values(productSales).map((item) => (
            <div 
              key={item.name}
              className="list" 
              style={{ 
                display: "flex", 
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <div style={{ fontWeight: "bold" }}>{item.name}</div>
                <div style={{ fontSize: "0.9rem", color: "#666" }}>
                  {item.quantity.toFixed(2)} Kg terjual
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: "bold", color: "#1e88e5" }}>
                  Rp {item.total.toLocaleString('id-ID')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {transactions.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h4 style={{ color: "#1e88e5", borderBottom: "2px solid #1e88e5", paddingBottom: "0.5rem" }}>
            Riwayat Transaksi
          </h4>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            {transactions.map((t, idx) => {
              const invoiceLabel = t.invoice ? t.invoice : null;
              const itemProductName = Array.isArray(t.items) && t.items[0]?.name && t.items[0].name !== 'Unknown'
                ? t.items[0].name
                : null;
              const productLabel = (t.product_name && t.product_name !== 'Unknown')
                ? t.product_name
                : itemProductName;
              const headerLabel = [invoiceLabel, productLabel].filter(Boolean).join(' • ') || 'Transaksi';

              const cartItems = t.items?.cart;
              const transactionItems = Array.isArray(cartItems) && cartItems.length > 0
                ? cartItems
                : Array.isArray(t.items) && t.items.length > 0
                  ? t.items
                  : [{
                      name: productLabel || 'Unknown',
                      quantity: t.weight || 0,
                      sell_price: t.price_per_kg || 0
                    }];

              return (
                <div 
                  key={t.id}
                  className="list"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem"
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "bold" }}>#{idx + 1} - {headerLabel}</div>
                    {t.customer_name && (
                      <div style={{ fontSize: "0.9rem", color: "#666" }}>
                        Customer: {t.customer_name}
                      </div>
                    )}

                    <div style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.5rem" }}>
                      <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>Pembelian:</div>
                      {transactionItems.map((item, i) => (
                        <div key={i}>
                          {i + 1}. {item.name} ({item.quantity} Kg) - Rp {(item.sell_price * item.quantity).toLocaleString('id-ID')}
                        </div>
                      ))}
                    </div>

                    <div style={{ fontSize: "0.8rem", color: "#999", marginTop: "0.5rem" }}>
                      {new Date(t.created_at).toLocaleString('id-ID')}
                    </div>
                  </div>

                <div style={{ textAlign: "right", fontWeight: "bold", color: "#1e88e5" }}>
                  Rp {t.total.toLocaleString('id-ID')}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-end' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: 999,
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                    background: t.status === 'waiting_verification' ? '#fef3c7' : '#dcfce7',
                    color: t.status === 'waiting_verification' ? '#92400e' : '#166534',
                    border: t.status === 'waiting_verification' ? '1px solid #fcd34d' : '1px solid #22c55e'
                  }}>
                    {t.status || 'completed'}
                  </span>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
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
                        padding: '6px 10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(16,24,40,0.12)',
                        background: '#f8fafc',
                        color: '#1f2937',
                        cursor: 'pointer'
                      }}
                    >
                      Hapus
                    </button>
                    {lastDeleted && lastDeleted.tx.id === t.id && (
                      <button
                        onClick={handleUndo}
                        style={{
                          padding: '6px 10px',
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
                </div>
              </div>
            );
          })}
          </div>
        </div>
      )}

      {transactions.length === 0 && (
        <p style={{ textAlign: "center", color: "#999", padding: "2rem" }}>
          Belum ada transaksi
        </p>
      )}
    </div>
  );
}