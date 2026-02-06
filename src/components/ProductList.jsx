export default function ProductList({ products, deleteProduct, onEdit }) {
  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      try {
        await deleteProduct(id);
      } catch (err) {
        alert('Gagal menghapus produk: ' + err.message);
      }
    }
  };

  return (
    <div className="card">
      <h3>Daftar Produk</h3>
      {products.length === 0 && (
        <p style={{ textAlign: "center", color: "#999", padding: "2rem" }}>
          Belum ada produk
        </p>
      )}
      {products.map((p) => (
        <div className="list" key={p.id}>
          <div style={{ display: "flex", alignItems: "center", flex: 1, gap: "1rem" }}>
            {p.image ? (
              <div style={{
                width: "50px",
                height: "50px",
                borderRadius: "4px",
                overflow: "hidden",
                background: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <img
                  src={p.image}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; background: #e0e0e0; font-size: 1.5rem;">□</div>';
                  }}
                />
              </div>
            ) : (
              <div style={{
                width: "50px",
                height: "50px",
                borderRadius: "4px",
                background: "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                flexShrink: 0,
                opacity: 0.5
              }}>
                □
              </div>
            )}
            <div>
              <div style={{ fontWeight: "bold", color: "#2c3e50" }}>{p.name}</div>
              <div style={{ fontSize: "0.9rem", color: "#666" }}>Beli: Rp {p.buy_price.toLocaleString('id-ID')} | Jual: Rp {p.sell_price.toLocaleString('id-ID')}/Kg</div>
              <div style={{ fontSize: "0.9rem", color: "#999" }}>Stok: {p.stock} Kg</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button 
              onClick={() => onEdit(p.id)}
              style={{
                backgroundColor: "#2196f3",
                padding: "0.5rem 1rem",
                fontSize: "0.9rem"
              }}
            >
              ✏️ Edit
            </button>
            <button 
              onClick={() => handleDelete(p.id)}
              style={{
                backgroundColor: "#e53935",
                padding: "0.5rem 1rem",
                fontSize: "0.9rem"
              }}
            >
              🗑️ Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}