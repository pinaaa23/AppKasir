import { useState, useEffect } from "react";

export default function ProductForm({ products, addProduct, updateProduct, editingId, onEditComplete }) {
  const [name, setName] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editing = editingId !== null;
  const editingProduct = editing ? products.find(p => p.id === editingId) : null;

  useEffect(() => {
    if (editing && editingProduct) {
      setName(editingProduct.name);
      setBuyPrice(editingProduct.buy_price || "");
      setSellPrice(editingProduct.sell_price || "");
      setStock(editingProduct.stock || "");
      setImage(editingProduct.image || "");
    }
  }, [editing, editingProduct]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageLoading(true);
      setImageError("");
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setImageLoading(false);
      };
      reader.onerror = () => {
        setImageError("Gagal membaca file");
        setImageLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrl = (url) => {
    setImage(url);
    setImageError("");
    if (url) {
      setImageLoading(true);
      const img = new Image();
      img.onload = () => setImageLoading(false);
      img.onerror = () => {
        setImageError("URL gambar tidak valid atau tidak dapat diakses");
        setImageLoading(false);
      };
      img.src = url;
    }
  };

  const handleSubmit = async () => {
    if (!name || !buyPrice || !sellPrice || !stock) {
      alert("Nama, harga beli, harga jual, dan stok harus diisi");
      return;
    }

    try {
      setIsSubmitting(true);
      const productData = { 
        name, 
        buy_price: parseFloat(buyPrice), 
        sell_price: parseFloat(sellPrice),
        stock: parseFloat(stock),
        image 
      };

      if (editing && editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await addProduct(productData);
      }

      setName("");
      setBuyPrice("");
      setSellPrice("");
      setStock("");
      setImage("");
      setImageError("");
      onEditComplete();
    } catch (err) {
      setImageError("Gagal menyimpan produk: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setName("");
    setBuyPrice("");
    setSellPrice("");
    setStock("");
    setImage("");
    setImageError("");
    onEditComplete();
  };

  return (
    <div className="card">
      <h3>{editing ? "Edit Produk" : "Tambah Produk"}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <input
          placeholder="Nama Produk"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Harga Beli (Rp)"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
        <input
          type="number"
          step="0.01"
          placeholder="Harga Jual (Rp/Kg)"
          value={sellPrice}
          onChange={(e) => setSellPrice(e.target.value)}
          disabled={isSubmitting}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Stok (Kg)"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      
      <div style={{ marginTop: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#333" }}>
          Gambar Produk
        </label>
        
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
              Upload File:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isSubmitting}
              style={{
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
                width: "100%",
                cursor: isSubmitting ? "not-allowed" : "pointer"
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
              Atau Paste URL:
            </label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={image}
              onChange={(e) => handleImageUrl(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </div>

        {imageError && (
          <p style={{ color: "#db1e1b", fontSize: "0.9rem", marginTop: "0.5rem" }}>
            ⚠️ {imageError}
          </p>
        )}

        {image && !imageError && (
          <div style={{ marginTop: "1rem" }}>
            <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.5rem" }}>
              {imageLoading ? "⏳ Memuat gambar..." : "✅ Preview Gambar:"}
            </p>
            <div style={{
              position: "relative",
              width: "150px",
              height: "150px",
              borderRadius: "6px",
              overflow: "hidden",
              background: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {imageLoading ? (
                <div style={{ textAlign: "center" }}>
                  <p style={{ margin: 0 }}>⏳</p>
                </div>
              ) : (
                <img
                  src={image}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                  onError={() => setImageError("Gambar tidak dapat ditampilkan")}
                />
              )}
            </div>
              <button
                onClick={() => {
                  setImage("");
                  setImageError("");
                }}
                disabled={isSubmitting}
                style={{
                  marginTop: "0.5rem",
                  backgroundColor: "#9e9e9e",
                  padding: "0.5rem 1rem",
                  fontSize: "0.9rem",
                  cursor: isSubmitting ? "not-allowed" : "pointer"
                }}
              >
                Hapus Gambar
              </button>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{ 
            flex: 1, 
            backgroundColor: "#4caf50",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            opacity: isSubmitting ? 0.7 : 1
          }}
        >
          {isSubmitting ? "⏳ Menyimpan..." : (editing ? "💾 Simpan Perubahan" : "✨ Tambah Produk")}
        </button>
        {editing && (
          <button
            onClick={handleCancel}
            disabled={isSubmitting}
            style={{ 
              flex: 1, 
              backgroundColor: "#9e9e9e",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              opacity: isSubmitting ? 0.7 : 1
            }}
          >
            ❌ Batal
          </button>
        )}
      </div>
    </div>
  );
}
