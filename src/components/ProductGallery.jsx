import { useState } from "react";

export default function ProductGallery({ products }) {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.sell_price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h2 style={{ color: "#1e88e5" }}>Katalog Produk</h2>
        <button 
          onClick={() => setShowCart(!showCart)}
          style={{ backgroundColor: "#4caf50", position: "relative" }}
        >
          Keranjang {totalItems > 0 && `(${totalItems})`}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "2rem" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "white",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              display: "flex",
              flexDirection: "column"
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)"}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)"}
          >
            {product.image ? (
              <div style={{
                width: "100%",
                height: "200px",
                background: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden"
              }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%); font-size: 3rem;">□</div>';
                  }}
                />
              </div>
            ) : (
              <div style={{
                width: "100%",
                height: "200px",
                background: "linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3rem"
              }}>
                □
              </div>
            )}
            
            <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
              <h3 style={{ color: "#2c3e50", marginBottom: "0.5rem" }}>{product.name}</h3>
              <p style={{ color: "#999", marginBottom: "1rem", fontSize: "0.9rem" }}>
                Per Kg
              </p>
              <p style={{ color: "#1e88e5", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "auto" }}>
                Rp {product.sell_price.toLocaleString('id-ID')}
              </p>
              <button
                onClick={() => addToCart(product)}
                style={{ backgroundColor: "#4caf50", width: "100%", marginTop: "1rem" }}
              >
                + Tambah ke Keranjang
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div style={{
          textAlign: "center",
          padding: "3rem",
          color: "#999"
        }}>
          <p style={{ fontSize: "1.2rem" }}>📭 Belum ada produk tersedia</p>
        </div>
      )}

      {showCart && (
        <div style={{
          position: "fixed",
          right: 0,
          top: 0,
          width: "100%",
          maxWidth: "400px",
          height: "100vh",
          background: "white",
          boxShadow: "-2px 0 8px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          zIndex: 1000,
          animation: "slideIn 0.3s ease"
        }}>
          <style>{`
            @keyframes slideIn {
              from {
                transform: translateX(100%);
              }
              to {
                transform: translateX(0);
              }
            }
          `}</style>
          
          <div style={{
            padding: "1.5rem",
            borderBottom: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <h3 style={{ color: "#1e88e5", margin: 0 }}>Keranjang Belanja</h3>
            <button
              onClick={() => setShowCart(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer"
              }}
            >
              ×
            </button>
          </div>

          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "1.5rem"
          }}>
            {cart.length === 0 ? (
              <p style={{ textAlign: "center", color: "#999" }}>Keranjang kosong</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: "#f9f9f9",
                    padding: "1rem",
                    borderRadius: "6px",
                    marginBottom: "1rem",
                    borderLeft: "4px solid #1e88e5"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.5rem" }}>
                    <h4 style={{ margin: 0, color: "#2c3e50" }}>{item.name}</h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#e53935",
                        cursor: "pointer",
                        fontSize: "1rem"
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <p style={{ margin: "0.5rem 0", color: "#666", fontSize: "0.9rem" }}>
                    Rp {item.sell_price.toLocaleString('id-ID')}/Kg
                  </p>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "0.5rem"
                  }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        width: "30px",
                        height: "30px",
                        border: "none",
                        background: "#e0e0e0",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      style={{
                        width: "50px",
                        textAlign: "center",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        padding: "0.25rem"
                      }}
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        width: "30px",
                        height: "30px",
                        border: "none",
                        background: "#e0e0e0",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      +
                    </button>
                  </div>
                  <p style={{
                    textAlign: "right",
                    color: "#1e88e5",
                    fontWeight: "bold",
                    marginTop: "0.5rem",
                    margin: "0.5rem 0 0 0"
                  }}>
                    Rp {(item.sell_price * item.quantity).toLocaleString('id-ID')}
                  </p>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div style={{
              padding: "1.5rem",
              borderTop: "2px solid #e0e0e0",
              background: "#f9f9f9"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#2c3e50"
              }}>
                <span>Total:</span>
                <span style={{ color: "#1e88e5" }}>
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
              <button style={{
                width: "100%",
                backgroundColor: "#4caf50",
                marginBottom: "0.5rem"
              }}>
                Checkout
              </button>
              <button
                onClick={() => setCart([])}
                style={{
                  width: "100%",
                  backgroundColor: "#e53935"
                }}
              >
                Kosongkan Keranjang
              </button>
            </div>
          )}
        </div>
      )}

      {showCart && (
        <div
          onClick={() => setShowCart(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            zIndex: 999
          }}
        />
      )}
    </div>
  );
}
