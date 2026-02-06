export default function RoleSelection({ setRole }) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Animated background blobs */}
      <div style={{
        position: "absolute",
        width: "400px",
        height: "400px",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "50%",
        top: "-100px",
        left: "-100px",
        animation: "float 8s ease-in-out infinite"
      }} />
      <div style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        background: "rgba(255, 255, 255, 0.08)",
        borderRadius: "50%",
        bottom: "-50px",
        right: "-50px",
        animation: "float 10s ease-in-out infinite reverse"
      }} />
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <div style={{
        textAlign: "center",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        padding: "4rem 3.5rem",
        borderRadius: "25px",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.25)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        position: "relative",
        zIndex: 1,
        maxWidth: "900px",
        animation: "fadeInUp 0.8s ease forwards"
      }}>

        
        <h1 style={{
          fontSize: "2.8rem",
          fontWeight: "800",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "0.5rem",
          letterSpacing: "-0.5px"
        }}>
          KasirKu
        </h1>
        
        <p style={{
          color: "#6b7280",
          fontSize: "1.1rem",
          marginBottom: "0.3rem",
          fontWeight: "500"
        }}>
          Sistem Penjualan Modern & Efisien
        </p>
        <p style={{
          color: "#9ca3af",
          fontSize: "0.95rem",
          marginBottom: "3.5rem"
        }}>
          Pilih peran Anda untuk melanjutkan
        </p>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr", 
          gap: "2.5rem",
          marginTop: "2.5rem"
        }}>
          {/* Customer Card */}
          <div style={{
            padding: "2.5rem 2rem",
            border: "2px solid rgba(16, 185, 129, 0.2)",
            borderRadius: "18px",
            cursor: "pointer",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.02) 100%)",
            animation: "slideInLeft 0.8s ease 0.1s forwards",
            opacity: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#10b981";
            e.currentTarget.style.boxShadow = "0 20px 40px rgba(16, 185, 129, 0.25)";
            e.currentTarget.style.transform = "translateY(-12px)";
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.2)";
            e.currentTarget.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.08)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.02) 100%)";
          }}
          >
            <div style={{ fontSize: "3.5rem", marginBottom: "1.2rem", opacity: 0.85 }}>🛍️</div>
            <h2 style={{ color: "#1f2937", marginBottom: "0.5rem", fontSize: "1.6rem", fontWeight: "700" }}>
              Customer
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "2.2rem", fontSize: "0.95rem", lineHeight: "1.6" }}>
              Jelajahi katalog produk dan belanja dengan pengalaman yang mulus
            </p>
            <button 
              onClick={() => setRole("customer")}
              style={{ 
                width: "100%",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                boxShadow: "0 8px 20px rgba(16, 185, 129, 0.3)",
                color: "white",
                border: "none",
                padding: "0.85rem 1.5rem",
                borderRadius: "10px",
                fontWeight: "600",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 12px 28px rgba(16, 185, 129, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 20px rgba(16, 185, 129, 0.3)";
              }}
            >
              Masuk Sebagai Pembeli
            </button>
          </div>

          {/* Admin Card */}
          <div style={{
            padding: "2.5rem 2rem",
            border: "2px solid rgba(102, 126, 234, 0.2)",
            borderRadius: "18px",
            cursor: "pointer",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            background: "linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.02) 100%)",
            animation: "slideInRight 0.8s ease 0.1s forwards",
            opacity: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#667eea";
            e.currentTarget.style.boxShadow = "0 20px 40px rgba(102, 126, 234, 0.25)";
            e.currentTarget.style.transform = "translateY(-12px)";
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(102, 126, 234, 0.2)";
            e.currentTarget.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.08)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.02) 100%)";
          }}
          >
            <div style={{ fontSize: "3.5rem", marginBottom: "1.2rem", opacity: 0.85 }}>👤</div>
            <h2 style={{ color: "#1f2937", marginBottom: "0.5rem", fontSize: "1.6rem", fontWeight: "700" }}>
              Admin
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "2.2rem", fontSize: "0.95rem", lineHeight: "1.6" }}>
              Kelola produk, pantau penjualan, dan analisis performa bisnis
            </p>
            <button 
              onClick={() => setRole("admin")}
              style={{ 
                width: "100%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
                color: "white",
                border: "none",
                padding: "0.85rem 1.5rem",
                borderRadius: "10px",
                fontWeight: "600",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 12px 28px rgba(102, 126, 234, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 20px rgba(102, 126, 234, 0.3)";
              }}
            >
              Masuk Sebagai Admin
            </button>
          </div>
        </div>

        <hr style={{
          marginTop: "3rem",
          border: "none",
          borderTop: "1px solid #e5e7eb",
          opacity: 0.5
        }} />
        
        <p style={{
          marginTop: "1.5rem",
          color: "#9ca3af",
          fontSize: "0.85rem",
          letterSpacing: "0.3px"
        }}>
          © 2026 KasirKu • Platform Penjualan Modern
        </p>
      </div>
    </div>
  );
}
