import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BankTransfer({ cart = [], customer, onBack, onSelectBank }) {
  const navigate = useNavigate();
  const [selectedBank, setSelectedBank] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.sell_price * item.quantity,
    0
  );

  const bankMethods = [
    {
      category: "Transfer Bank",
      items: [
        { id: "bca", label: "BCA", bgColor: "#1F4788", textColor: "#fff" },
        { id: "bri", label: "BRI", bgColor: "#0066CC", textColor: "#fff" },
        { id: "bni", label: "BNI", bgColor: "#003399", textColor: "#fff" },
        { id: "mandiri", label: "Mandiri", bgColor: "#FF6B00", textColor: "#fff" }
      ]
    },
    {
      category: "E-Wallet",
      items: [
        { id: "ovo", label: "OVO", bgColor: "#7B2CBF", textColor: "#fff" },
        { id: "gopay", label: "GoPay", bgColor: "#00A358", textColor: "#fff" },
        { id: "dana", label: "DANA", bgColor: "#3E9CE9", textColor: "#fff" },
        { id: "shopeepay", label: "ShopeePay", bgColor: "#EE4D2D", textColor: "#fff" }
      ]
    }
  ];

  const generateInvoice = () => {
    const date = new Date();
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const random = Math.floor(Math.random() * 9000) + 1000;
    return `INV-${y}${m}${d}-${random}`;
  };

  const handleContinue = () => {
    if (!selectedBank) {
      alert("Pilih metode pembayaran");
      return;
    }

    onSelectBank?.(selectedBank);
  };

  return (
    <div style={{
      maxWidth:"600px",
      margin:"auto",
      background:"#fff",
      padding:"40px",
      borderRadius:"32px",
      boxShadow:"0 20px 50px rgba(0,0,0,0.1)",
      textAlign:"center"
    }}>

      <h2 style={{
        marginBottom:"10px",
        fontSize:"28px",
        fontWeight:"700",
        color:"#1a1a1a"
      }}>
        Pilih Metode Transfer
      </h2>
      
      <p style={{
        marginBottom:"35px",
        color:"#666",
        fontSize:"14px"
      }}>
        Total: <strong>Rp {total.toLocaleString("id-ID")}</strong>
      </p>

      <div style={{display:"flex",flexDirection:"column",gap:"30px",marginBottom:"35px"}}>
        {bankMethods.map((section) => (
          <div key={section.category}>
            <h3 style={{
              fontSize:"14px",
              fontWeight:"600",
              color:"#999",
              textTransform:"uppercase",
              letterSpacing:"1px",
              marginBottom:"15px",
              textAlign:"left"
            }}>
              {section.category}
            </h3>
            
            <div style={{
              display:"grid",
              gridTemplateColumns:"1fr 1fr",
              gap:"12px"
            }}>
              {section.items.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedBank(method.id)}
                  style={{
                    padding:"16px",
                    borderRadius:"16px",
                    border:"2px solid",
                    borderColor: selectedBank === method.id ? "#8b5cf6" : "#e5e7eb",
                    background: selectedBank === method.id ? "#f5f3ff" : "#fafafa",
                    cursor:"pointer",
                    transition:"all 0.3s ease",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    gap:"10px",
                    boxShadow: selectedBank === method.id ? "0 8px 20px rgba(139, 92, 246, 0.15)" : "none"
                  }}
                >
                  <div style={{
                    width:"56px",
                    height:"56px",
                    borderRadius:"12px",
                    background: method.bgColor,
                    color: method.textColor,
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    fontSize:"18px",
                    fontWeight:"700",
                    letterSpacing:"1px"
                  }}>
                    {method.label.substring(0, 3)}
                  </div>
                  <div style={{
                    fontSize:"14px",
                    fontWeight:"600",
                    color:"#1a1a1a"
                  }}>
                    {method.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        display:"flex",
        gap:"12px",
        marginTop:"35px"
      }}>

        <button
          onClick={onBack}
          style={{
            flex:1,
            padding:"14px",
            borderRadius:"12px",
            border:"2px solid #ccc",
            background:"transparent",
            color:"#666",
            cursor:"pointer",
            fontSize:"16px",
            fontWeight:"600",
            transition:"all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = "#999";
            e.target.style.color = "#333";
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = "#ccc";
            e.target.style.color = "#666";
          }}
        >
          Kembali
        </button>

        <button
          onClick={handleContinue}
          style={{
            flex:2,
            padding:"14px",
            borderRadius:"12px",
            border:"none",
            background: selectedBank ? "linear-gradient(135deg, #8b5cf6 0%, #0ea5e9 100%)" : "#d1d5db",
            color:"#fff",
            cursor: selectedBank ? "pointer" : "not-allowed",
            fontSize:"16px",
            fontWeight:"600",
            transition:"all 0.3s ease"
          }}
          disabled={!selectedBank}
          onMouseEnter={(e) => {
            if (selectedBank) {
              e.target.style.boxShadow = "0 8px 20px rgba(139, 92, 246, 0.4)";
              e.target.style.transform = "translateY(-2px)";
            }
          }}
          onMouseLeave={(e) => {
            if (selectedBank) {
              e.target.style.boxShadow = "none";
              e.target.style.transform = "translateY(0)";
            }
          }}
        >
          Lanjutkan Pembayaran
        </button>

      </div>

    </div>
  );
}
