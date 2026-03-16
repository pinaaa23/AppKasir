import { useState } from "react";

export default function PaymentInstruction({ 
  bankType, 
  bankName, 
  total, 
  customer,
  onConfirm,
  onBack 
}) {
  const [copied, setCopied] = useState(false);

  // Data bank/e-wallet untuk tujuan pembayaran
  const paymentData = {
    bca: {
      number: "1234567890",
      accountName: "PT Kasir Indonesia",
      icon: "🔵"
    },
    bri: {
      number: "0987654321",
      accountName: "PT Kasir Indonesia",
      icon: "🔵"
    },
    bni: {
      number: "5555666677",
      accountName: "PT Kasir Indonesia",
      icon: "🔵"
    },
    mandiri: {
      number: "1111222233",
      accountName: "PT Kasir Indonesia",
      icon: "🟠"
    },
    ovo: {
      number: "081234567890",
      accountName: "PT Kasir Indonesia",
      icon: "🟣"
    },
    gopay: {
      number: "081234567890",
      accountName: "PT Kasir Indonesia",
      icon: "🟢"
    },
    dana: {
      number: "081234567890",
      accountName: "PT Kasir Indonesia",
      icon: "🔵"
    },
    shopeepay: {
      number: "081234567890",
      accountName: "PT Kasir Indonesia",
      icon: "🔴"
    }
  };

  const data = paymentData[bankType] || paymentData.bca;
  const isBank = ['bca', 'bri', 'bni', 'mandiri'].includes(bankType);
  const label = isBank ? "Nomor Rekening" : "Nomor Tujuan";

  const handleCopy = () => {
    navigator.clipboard.writeText(data.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = async () => {
    // Process payment confirmation
    onConfirm?.();
  };

  return (
    <div style={{
      maxWidth: "600px",
      margin: "auto",
      background: "#fff",
      padding: "40px",
      borderRadius: "32px",
      boxShadow: "0 20px 50px rgba(0,0,0,0.1)"
    }}>

      <h2 style={{
        marginBottom: "10px",
        fontSize: "28px",
        fontWeight: "700",
        color: "#1a1a1a",
        textAlign: "center"
      }}>
        Instruksi Pembayaran
      </h2>

      <p style={{
        marginBottom: "35px",
        color: "#666",
        fontSize: "14px",
        textAlign: "center"
      }}>
        Lakukan pembayaran sesuai instruksi di bawah
      </p>

      {/* Payment Info Card */}
      <div style={{
        background: "#f9fafb",
        border: "2px solid #e5e7eb",
        borderRadius: "20px",
        padding: "24px",
        marginBottom: "24px"
      }}>

        {/* Payment Method */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "24px",
          paddingBottom: "24px",
          borderBottom: "1px solid #e5e7eb"
        }}>
          <div style={{
            fontSize: "32px",
            width: "56px",
            height: "56px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #8b5cf6 0%, #0ea5e9 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            {isBank ? "🏦" : "📱"}
          </div>
          <div>
            <div style={{
              fontSize: "12px",
              color: "#999",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              Metode Pembayaran
            </div>
            <div style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#1a1a1a"
            }}>
              {bankName}
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{
            fontSize: "12px",
            color: "#999",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: "8px"
          }}>
            {label}
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#fff",
            padding: "12px 14px",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            marginBottom: "8px"
          }}>
            <span style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#1a1a1a",
              fontFamily: "monospace"
            }}>
              {data.number}
            </span>
            <button
              onClick={handleCopy}
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                border: "none",
                background: copied ? "#10b981" : "#f3f4f6",
                color: copied ? "#fff" : "#666",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "600",
                transition: "all 0.3s ease"
              }}
            >
              {copied ? "✓ Tersalin" : "Salin"}
            </button>
          </div>
        </div>

        {/* Account Name */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{
            fontSize: "12px",
            color: "#999",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: "8px"
          }}>
            Nama Penerima
          </div>
          <div style={{
            background: "#fff",
            padding: "12px 14px",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            fontSize: "14px",
            color: "#1a1a1a",
            fontWeight: "500"
          }}>
            {data.accountName}
          </div>
        </div>

        {/* Cara Pembayaran */}
        <div style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          padding: "18px",
          marginBottom: "20px"
        }}>
          <div style={{
            fontSize: "14px",
            fontWeight: "700",
            color: "#1a1a1a",
            marginBottom: "12px"
          }}>
            Cara Pembayaran
          </div>
          <ol style={{
            paddingLeft: "18px",
            margin: 0,
            color: "#4b5563",
            fontSize: "13px",
            lineHeight: "1.6"
          }}>
            <li>Buka aplikasi m-banking / ATM sesuai bank yang dipilih.</li>
            <li>Pilih menu Transfer Bank.</li>
            <li>Masukkan nomor rekening yang tertera di atas.</li>
            <li>Masukkan nominal sesuai total pembayaran.</li>
            <li>Konfirmasi transaksi dan selesaikan pembayaran.</li>
            <li>Setelah selesai, klik tombol "Saya Sudah Bayar".</li>
          </ol>
        </div>

        {/* Total Payment */}
        <div>
          <div style={{
            fontSize: "12px",
            color: "#999",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: "8px"
          }}>
            Total Pembayaran
          </div>
          <div style={{
            background: "linear-gradient(135deg, #8b5cf6 0%, #0ea5e9 100%)",
            padding: "16px 14px",
            borderRadius: "12px",
            fontSize: "18px",
            fontWeight: "700",
            color: "#fff",
            textAlign: "center"
          }}>
            Rp {total.toLocaleString("id-ID")}
          </div>
        </div>

      </div>

      {/* Instructions */}
      <div style={{
        background: "#fef3c7",
        border: "1px solid #fcd34d",
        borderRadius: "12px",
        padding: "14px 16px",
        marginBottom: "30px",
        fontSize: "13px",
        color: "#92400e",
        lineHeight: "1.6"
      }}>
        ⚠️ Pastikan nominal pembayaran <strong>sesuai</strong> dengan total di atas. 
        Pembayaran akan terverifikasi secara otomatis.
      </div>

      {/* Action Buttons */}
      <div style={{
        display: "flex",
        gap: "12px"
      }}>
        <button
          onClick={onBack}
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "12px",
            border: "2px solid #ccc",
            background: "transparent",
            color: "#666",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            transition: "all 0.3s ease"
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
          onClick={handleConfirm}
          style={{
            flex: 2,
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(135deg, #8b5cf6 0%, #0ea5e9 100%)",
            color: "#fff",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = "0 8px 20px rgba(139, 92, 246, 0.4)";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = "none";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Saya Sudah Bayar
        </button>
      </div>

    </div>
  );
}
