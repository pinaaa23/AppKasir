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

  const {
    isAuthenticated,
    checkAuth,
    signOut,
    signIn,
    signUp,
    loading: authLoading,
    error: authError
  } = useAuth()

  useEffect(() => {
    checkAuth()
  }, [])

  const {
    products,
    loading: productsLoading,
    error: productsError,
    addProduct,
    updateProduct,
    deleteProduct
  } = useProducts()

  const { transactions, addTransaction } = useTransactions()

  if (!role) {
    return <RoleSelection setRole={setRole} />
  }

  if (role === 'admin' && !isAuthenticated) {
    return (
      <Login
        signIn={signIn}
        signUp={signUp}
        loading={authLoading}
        error={authError}
        onLoginSuccess={() => {}}
        onBack={() => setRole(null)}
      />
    )
  }

  if (productsLoading) {
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

  if (productsError) {
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
          <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
            Error: {productsError?.message || 'Terjadi kesalahan'}
          </p>
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

          {menu === 'laporan' && (
            <Report transactions={transactions} />
          )}
        </div>
      )}
    </div>
  )
}

export default App
