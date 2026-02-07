export default function RoleSelection({ setRole }) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "2rem 1rem",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      position: "relative",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>

      {/* Animated background blobs */}
      <div style={{
        position: "absolute",
        width: "clamp(200px,40vw,400px)",
        height: "clamp(200px,40vw,400px)",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "50%",
        top: "-100px",
        left: "-100px",
        animation: "float 8s ease-in-out infinite"
      }} />

      <div style={{
        position: "absolute",
        width: "clamp(150px,30vw,300px)",
        height: "clamp(150px,30vw,300px)",
        background: "rgba(255, 255, 255, 0.08)",
        borderRadius: "50%",
        bottom: "-50px",
        right: "-50px",
        animation: "float 10s ease-in-out infinite reverse"
      }} />

      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0px);}
          50% { transform: translateY(30px);}
        }
        @keyframes fadeInUp {
          from {opacity:0; transform:translateY(40px);}
          to {opacity:1; transform:translateY(0);}
        }
        @keyframes slideInLeft {
          from {opacity:0; transform:translateX(-40px);}
          to {opacity:1; transform:translateX(0);}
        }
        @keyframes slideInRight {
          from {opacity:0; transform:translateX(40px);}
          to {opacity:1; transform:translateX(0);}
        }
      `}</style>

      <div style={{
        textAlign: "center",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        padding: "clamp(1.5rem,4vw,4rem)",
        borderRadius: "25px",
        boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
        border: "1px solid rgba(255,255,255,0.3)",
        position: "relative",
        zIndex: 1,
        maxWidth: "900px",
        width: "100%",
        animation: "fadeInUp 0.8s ease forwards"
      }}>

        <h1 style={{
          fontSize: "clamp(1.8rem,5vw,2.8rem)",
          fontWeight: "800",
          background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "0.5rem"
        }}>
          KasirKu
        </h1>

        <p style={{
          color:"#6b7280",
          fontSize:"1.1rem",
          marginBottom:"0.3rem",
          fontWeight:"500"
        }}>
          Sistem Penjualan Modern & Efisien
        </p>

        <p style={{
          color:"#9ca3af",
          fontSize:"0.95rem",
          marginBottom:"3rem"
        }}>
          Pilih peran Anda untuk melanjutkan
        </p>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(350px,1fr))",
          gap:"2rem"
        }}>

          {/* Customer */}
          <div style={{
            padding:"2.5rem 2rem",
            border:"2px solid rgba(16,185,129,0.2)",
            borderRadius:"18px",
            background:"linear-gradient(135deg,rgba(16,185,129,0.05),rgba(16,185,129,0.02))",
            animation:"slideInLeft 0.8s ease forwards"
          }}>
            <div style={{fontSize:"3.5rem",marginBottom:"1rem"}}>🛍️</div>
            <h2 style={{marginBottom:"0.5rem"}}>Customer</h2>
            <p style={{marginBottom:"2rem",color:"#6b7280"}}>
              Jelajahi katalog produk dan belanja dengan pengalaman yang mulus
            </p>
            <button
              onClick={()=>setRole("customer")}
              style={{
                width:"100%",
                background:"linear-gradient(135deg,#10b981,#059669)",
                color:"white",
                border:"none",
                padding:"0.9rem",
                borderRadius:"10px",
                fontWeight:"600",
                cursor:"pointer"
              }}>
              Masuk Sebagai Pembeli
            </button>
          </div>

          {/* Admin */}
          <div style={{
            padding:"2.5rem 2rem",
            border:"2px solid rgba(102,126,234,0.2)",
            borderRadius:"18px",
            background:"linear-gradient(135deg,rgba(102,126,234,0.05),rgba(118,75,162,0.02))",
            animation:"slideInRight 0.8s ease forwards"
          }}>
            <div style={{fontSize:"3.5rem",marginBottom:"1rem"}}>👤</div>
            <h2 style={{marginBottom:"0.5rem"}}>Admin</h2>
            <p style={{marginBottom:"2rem",color:"#6b7280"}}>
              Kelola produk, pantau penjualan, dan analisis performa bisnis
            </p>
            <button
              onClick={()=>setRole("admin")}
              style={{
                width:"100%",
                background:"linear-gradient(135deg,#667eea,#764ba2)",
                color:"white",
                border:"none",
                padding:"0.9rem",
                borderRadius:"10px",
                fontWeight:"600",
                cursor:"pointer"
              }}>
              Masuk Sebagai Admin
            </button>
          </div>

        </div>

        <p style={{
          marginTop:"2rem",
          color:"#9ca3af",
          fontSize:"0.85rem"
        }}>
          © 2026 KasirKu • Platform Penjualan Modern
        </p>

      </div>
    </div>
  )
}
