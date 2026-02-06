export default function Report({ transactions }) {
  const totalIncome = transactions.reduce((sum, t) => sum + (t.total || 0), 0);
  const totalProfit = transactions.reduce((sum, t) => {
    const sellPrice = Number(t.sell_price_at_sale) || 0;
    const buyPrice = Number(t.buy_price_at_sale) || 0;
    const profitPerKg = sellPrice - buyPrice;
    const quantity = Number(t.quantity) || 0;
    return sum + (profitPerKg * quantity);
  }, 0);
  const avgTransaction = transactions.length > 0 ? (totalIncome / transactions.length).toFixed(2) : 0;

  // Group by product
  const productSales = {};
  transactions.forEach(t => {
    if (!productSales[t.product_name]) {
      productSales[t.product_name] = {
        name: t.product_name,
        quantity: 0,
        total: 0
      };
    }
    productSales[t.product_name].quantity += parseFloat(t.weight);
    productSales[t.product_name].total += parseFloat(t.total);
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
            {transactions.map((t, idx) => (
              <div 
                key={t.id}
                className="list"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <div style={{ fontWeight: "bold" }}>#{idx + 1} - {t.product_name}</div>
                  <div style={{ fontSize: "0.9rem", color: "#666" }}>
                    {t.weight} Kg × Rp {t.price_per_kg.toLocaleString('id-ID')}/Kg
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#999" }}>
                    {new Date(t.created_at).toLocaleString('id-ID')}
                  </div>
                </div>
                <div style={{ textAlign: "right", fontWeight: "bold", color: "#1e88e5" }}>
                  Rp {t.total.toLocaleString('id-ID')}
                </div>
              </div>
            ))}
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