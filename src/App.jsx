import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import useProducts from "./hooks/useProducts";
import useTransactions from "./hooks/useTransactions";
import useAuth from "./hooks/useAuth";

import RoleSelection from "./components/RoleSelection";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import ProductGallery from "./components/ProductGallery";
import Transaction from "./components/Transaction";
import Report from "./components/Report";

import CheckoutPage from "./components/checkout/CheckoutPage";
import ReviewOrder from "./components/ReviewOrder";
import PaymentMethod from "./components/checkout/PaymentMethod";

function App() {
  const [role, setRole] = useState(null);
  const [menu, setMenu] = useState("produk");
  const [editingId, setEditingId] = useState(null);

  const {
    isAuthenticated,
    checkAuth,
    signOut,
    signIn,
    signUp,
    loading: authLoading,
    error: authError,
  } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  const {
    products,
    loading: productsLoading,
    error: productsError,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const { transactions, addTransaction } = useTransactions();

  if (!role) {
    return <RoleSelection setRole={setRole} />;
  }

  if (role === "admin" && !isAuthenticated) {
    return (
      <Login
        signIn={signIn}
        signUp={signUp}
        loading={authLoading}
        error={authError}
        onLoginSuccess={() => {}}
        onBack={() => setRole(null)}
      />
    );
  }

  if (productsLoading) {
    return <div>Loading...</div>;
  }

  if (productsError) {
    return <div>Error: {productsError?.message}</div>;
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* halaman checkout */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/review" element={<ReviewOrder />} />
        <Route path="/payment" element={<PaymentMethod />} />

        {/* halaman utama */}
        <Route
          path="*"
          element={
            <div>
              <Navbar
                setMenu={setMenu}
                role={role}
                onLogout={() => {
                  signOut();
                  setRole(null);
                }}
              />

              {role === "customer" ? (
                <ProductGallery products={products} />
              ) : (
                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
                  {menu === "produk" && (
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

                  {menu === "transaksi" && (
                    <Transaction
                      products={products}
                      transactions={transactions}
                      addTransaction={addTransaction}
                    />
                  )}

                  {menu === "laporan" && (
                    <Report transactions={transactions} />
                  )}
                </div>
              )}
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
