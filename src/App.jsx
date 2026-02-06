import { useState, useEffect } from 'react'
import './App.css'
import useProducts from './hooks/useProducts'
import useTransactions from './hooks/useTransactions'
import useAuth from './hooks/useAuth'
import RoleSelection from './components/RoleSelection'
import Login from './components/Login'
import Navbar from './components/Navbar'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import ProductGallery from './components/ProductGallery'
import Transaction from './components/Transaction'
import Report from './components/Report'

function App() {
  const [role, setRole] = useState(null)
  const [menu, setMenu] = useState('produk')
  const [editingId, setEditingId] = useState(null)
  const { isAuthenticated, checkAuth, signOut } = useAuth()

  // Check authentication status on mount
  useEffect(() => {
    checkAuth()
  }, [])
  
  const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts()
  const { transactions, addTransaction } = useTransactions()

  if (!role) {
    return <RoleSelection setRole={setRole} />
  }

  // Show login for admin users
  if (role === 'admin' && !isAuthenticated) {
    return (
      <Login
        onLoginSuccess={() => {
          // Already authenticated after login
        }}
        onBack={() => setRole(null)}
      />
    )
  }

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)",
        color: "white"
      }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "3rem", margin: 0 }}>⏳</p>
          <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>Memuat data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e53935 0%, #c62828 100%)",
        color: "white"
      }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "3rem", margin: 0 }}>⚠️</p>
          <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>Error: {error}</p>
          <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>Periksa setup Supabase Anda di file SUPABASE_SETUP.md</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar 
        setMenu={setMenu} 
        role={role}
        onLogout={() => {
          signOut()
          setRole(null)
        }}
      />
      
      {role === 'customer' ? (
        <ProductGallery products={products} />
      ) : (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
          {menu === 'produk' && (
            <>
              <ProductForm 
                products={products} 
                addProduct={addProduct}
                updateProduct={updateProduct}
                editingId={editingId}
                onEditComplete={() => setEditingId(null)}
              />
              <ProductList 
                products={products} 
                deleteProduct={deleteProduct}
                onEdit={(id) => setEditingId(id)}
              />
            </>
          )}
          {menu === 'transaksi' && (
            <Transaction 
              products={products} 
              transactions={transactions}
              addTransaction={addTransaction}
            />
          )}
          {menu === 'laporan' && <Report transactions={transactions} />}
        </div>
      )}
    </div>
  )
}

export default App
