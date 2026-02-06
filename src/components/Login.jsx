import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'

export default function Login({ onLoginSuccess, onBack }) {
  const { loading, error, signIn, signUp, setError } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [localError, setLocalError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')

    if (!email || !password) {
      setLocalError('Email dan password harus diisi')
      return
    }

    if (isSignUp && password !== confirmPassword) {
      setLocalError('Password tidak cocok')
      return
    }

    if (password.length < 6) {
      setLocalError('Password minimal 6 karakter')
      return
    }

    if (isSignUp) {
      const { error } = await signUp(email, password)
      if (error) {
        setLocalError(error)
      } else {
        setLocalError('')
        onLoginSuccess()
      }
    } else {
      const { error } = await signIn(email, password)
      if (error) {
        setLocalError(error)
      } else {
        setLocalError('')
        onLoginSuccess()
      }
    }
  }

  useEffect(() => {
    if (error) {
      setLocalError(error)
    }
  }, [error])

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
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>

      <div style={{
        textAlign: "center",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        padding: "3.5rem 3rem",
        borderRadius: "25px",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.25)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        position: "relative",
        zIndex: 1,
        maxWidth: "420px",
        width: "90%",
        animation: "fadeInUp 0.8s ease forwards"
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "800",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "0.5rem",
          letterSpacing: "-0.5px"
        }}>
          KasirKu Admin
        </h1>

        <p style={{
          color: "#6b7280",
          fontSize: "1rem",
          marginBottom: "2rem",
          fontWeight: "500"
        }}>
          {isSignUp ? 'Buat akun admin baru' : 'Masuk ke dashboard admin'}
        </p>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          {/* Email Input */}
          <div style={{ marginBottom: "1.5rem", textAlign: "left" }}>
            <label style={{
              display: "block",
              color: "#374151",
              fontSize: "0.95rem",
              fontWeight: "600",
              marginBottom: "0.5rem"
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@kasirku.com"
              style={{
                width: "100%",
                padding: "0.85rem 1rem",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                fontSize: "1rem",
                fontFamily: "inherit",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
                outline: "none"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: isSignUp ? "1.5rem" : "2rem", textAlign: "left" }}>
            <label style={{
              display: "block",
              color: "#374151",
              fontSize: "0.95rem",
              fontWeight: "600",
              marginBottom: "0.5rem"
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "0.85rem 1rem",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                fontSize: "1rem",
                fontFamily: "inherit",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
                outline: "none"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Confirm Password Input (Sign Up) */}
          {isSignUp && (
            <div style={{ marginBottom: "2rem", textAlign: "left" }}>
              <label style={{
                display: "block",
                color: "#374151",
                fontSize: "0.95rem",
                fontWeight: "600",
                marginBottom: "0.5rem"
              }}>
                Konfirmasi Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                  outline: "none"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          )}

          {/* Error Message */}
          {localError && (
            <div style={{
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid #ef4444",
              color: "#dc2626",
              padding: "0.75rem 1rem",
              borderRadius: "10px",
              marginBottom: "1.5rem",
              fontSize: "0.9rem",
              animation: "shake 0.5s ease"
            }}>
              {localError}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: loading
                ? "linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)"
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              padding: "1rem 1.5rem",
              borderRadius: "12px",
              fontSize: "1.05rem",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
              opacity: loading ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 12px 28px rgba(102, 126, 234, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 20px rgba(102, 126, 234, 0.3)";
              }
            }}
          >
            {loading ? (isSignUp ? "Mendaftar..." : "Masuk...") : (isSignUp ? "Buat Akun" : "Masuk")}
          </button>
        </form>

        {/* Toggle Sign Up / Sign In */}
        <p style={{
          marginTop: "1.5rem",
          color: "#6b7280",
          fontSize: "0.95rem"
        }}>
          {isSignUp ? "Sudah punya akun? " : "Belum punya akun? "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setLocalError('')
              setEmail('')
              setPassword('')
              setConfirmPassword('')
            }}
            style={{
              background: "none",
              border: "none",
              color: "#667eea",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "inherit",
              textDecoration: "underline",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#764ba2";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#667eea";
            }}
          >
            {isSignUp ? "Masuk di sini" : "Daftar di sini"}
          </button>
        </p>

        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          style={{
            marginTop: "1.5rem",
            background: "rgba(102, 126, 234, 0.1)",
            border: "1px solid #667eea",
            color: "#667eea",
            padding: "0.7rem 1.5rem",
            borderRadius: "10px",
            fontSize: "0.95rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(102, 126, 234, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(102, 126, 234, 0.1)";
          }}
        >
          ← Kembali ke Pilihan Role
        </button>

        <hr style={{
          marginTop: "2rem",
          border: "none",
          borderTop: "1px solid #e5e7eb",
          opacity: 0.5
        }} />

        <p style={{
          marginTop: "1rem",
          color: "#9ca3af",
          fontSize: "0.8rem",
          letterSpacing: "0.3px"
        }}>
          © 2026 KasirKu • Platform Penjualan Modern
        </p>
      </div>
    </div>
  )
}
