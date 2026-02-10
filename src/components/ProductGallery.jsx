import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductGallery({ products }) {
  const navigate = useNavigate();

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

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Keranjang kosong");
      return;
    }
    navigate("/review", { state: { cart } });
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem",
      paddingRight: showCart ? "420px" : "1rem", transition: "0.3s"
      }}>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
        <h2 style={{ color: "#1e88e5" }}>Katalog Produk</h2>
        <button onClick={() => setShowCart(!showCart)} style={{ background: "#4caf50" }}>
          Keranjang ({totalItems})
        </button>
      </div>

      {/* PRODUK GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "1.5rem" }}>
        {products.map(product => (
          <div
            key={product.id}
            style={{
              background: "white",
              borderRadius: "10px",
              padding: "1rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}
          >
            <div style={{
              width: "100%",
              height: "160px",
              overflow: "hidden",
              borderRadius: "8px",
              marginBottom: "0.5rem",
              background: "#f5f5f5"
            }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <h4 style={{ margin: "0 0 5px" }}>{product.name}</h4>
            <p style={{ margin: "0 0 10px", color: "#666" }}>
              Rp {product.sell_price.toLocaleString('id-ID')}
            </p>

            <button
              onClick={() => addToCart(product)}
              style={{ background: "#4caf50", width: "100%" }}
            >
              + Tambah ke Keranjang
            </button>
          </div>
        ))}
      </div>

      {/* CART SIDEBAR */}
      {showCart && (
        <div style={{
          position: "fixed",
          right: "20px",
          top: "80px",
          width: "360px",
          height: "80vh",
          background: "white",
          padding: "1rem",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          overflowY: "auto",
          zIndex: 10
        }}>

          <h3>Keranjang</h3>
          <div style={{ marginTop: "20px" }}>


          {cart.map(item => (
            <div key={item.id} style={{
              display: "flex",
              gap: "10px",
              marginBottom: "1rem",
              borderBottom: "1px solid #eee",
              paddingBottom: "10px"
            }}>
              <img
                src={item.image}
                style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6 }}
              />

              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 600 }}>{item.name}</p>
                <p style={{ margin: 0, fontSize: 12 }}>
                  Rp {item.sell_price.toLocaleString('id-ID')}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "5px" }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "6px",
                      fontSize: "14px",
                      padding: 0
                    }}
                  >
                    −
                  </button>

                  <span style={{ minWidth: "20px", textAlign: "center" }}>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "6px",
                      fontSize: "14px",
                      padding: 0
                    }}
                  >
                    +
                  </button>
                </div>

                
              </div>

              
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: "#e53935",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: 0,
                  width: "28px",
                  height: "28px",
                }}
              >
                x
              </button>
            </div>
          ))}
          </div>

          <h3>Total Rp {totalPrice.toLocaleString('id-ID')}</h3>

          <button
            onClick={handleCheckout}
            style={{
              width: "100%",
              background: "#4caf50",
              marginTop: "15px"
            }}
          >
            Checkout

          </button>

          <button
            onClick={() => setCart([])}
            style={{
              width: "100%",
              background: "#e53935",
              marginTop: "10px"
            }}
          >

            Kosongkan
          </button>
        </div>
      )}
    </div>
  );
}
