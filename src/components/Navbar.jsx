export default function Navbar({ setMenu, role, onLogout }) {
  return (
    <nav style={{
      background: "transparent",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      padding: "1.2rem 2rem",
      color: "var(--dark)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 6px 20px rgba(16,24,40,0.06)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      borderBottom: "1px solid rgba(16,24,40,0.06)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <h3 style={{ 
          fontSize: "1.5rem", 
          margin: 0,
          fontWeight: "800",
          letterSpacing: "-0.5px",
          background: "linear-gradient(90deg, var(--primary), var(--secondary))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          KasirKu
        </h3>
      </div>
      
      {role === 'admin' ? (
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {["produk", "transaksi", "laporan"].map((menuItem) => (
            <button 
              key={menuItem}
              onClick={() => setMenu(menuItem)}
              style={{
                backgroundColor: "rgba(255,255,255,0.96)",
                border: "1px solid rgba(16,24,40,0.06)",
                padding: "0.6rem 1.1rem",
                fontSize: "0.95rem",
                fontWeight: "700",
                borderRadius: "10px",
                transition: "all 0.18s ease",
                cursor: "pointer",
                textTransform: "capitalize",
                color: "var(--dark)",
                letterSpacing: "0.3px",
                minWidth: "92px",
                textAlign: "center"
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = "0 8px 20px rgba(16,24,40,0.08)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = "none";
                e.target.style.transform = "translateY(0)";
              }}
            >
              {menuItem.charAt(0).toUpperCase() + menuItem.slice(1)}
            </button>
          ))}
          
          <div style={{ 
            background: "rgba(255,255,255,0.96)", 
            border: "1px solid rgba(16,24,40,0.06)",
            padding: "0.45rem 0.9rem",
            borderRadius: "8px",
            fontSize: "0.92rem",
            fontWeight: "700",
            color: "var(--primary-dark)",
            letterSpacing: "0.2px"
          }}>
            Admin
          </div>
          
          <button 
            onClick={onLogout}
            style={{
              backgroundColor: "rgba(233, 30, 30, 0.96)",
              border: "1px solid rgba(16,24,40,0.06)",
              padding: "0.6rem 1.1rem",
              fontSize: "0.95rem",
              fontWeight: "700",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.18s ease",
              color: "var(--dark)",
              letterSpacing: "0.3px"
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = "0 8px 20px rgba(16,24,40,0.08)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = "none";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
          <div style={{ 
            background: "rgba(255,255,255,0.96)", 
            border: "1px solid rgba(16,24,40,0.06)",
            padding: "0.45rem 0.9rem",
            borderRadius: "8px",
            fontSize: "0.92rem",
            fontWeight: "700",
            color: "var(--primary-dark)",
            letterSpacing: "0.2px"
          }}>
            Customer
          </div>
          
          <button 
            onClick={onLogout}
            style={{
              backgroundColor: "rgba(233, 30, 30, 0.96)",
              border: "1px solid rgba(16,24,40,0.06)",
              padding: "0.6rem 1.1rem",
              fontSize: "0.95rem",
              fontWeight: "700",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.18s ease",
              color: "var(--dark)",
              letterSpacing: "0.3px"
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = "0 8px 20px rgba(16,24,40,0.08)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = "none";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
