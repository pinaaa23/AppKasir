import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Transaction from "./components/Transaction";
import Report from "./components/Report";

export default function App() {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [menu, setMenu] = useState("produk");

  return (
    <>
      <Navbar setMenu={setMenu} />

      <div className="container">
        {menu === "produk" && (
          <>
            <ProductForm products={products} setProducts={setProducts} />
            <ProductList products={products} setProducts={setProducts} />
          </>
        )}

        {menu === "transaksi" && (
          <Transaction
            products={products}
            transactions={transactions}
            setTransactions={setTransactions}
          />
        )}

        {menu === "laporan" && (
          <Report transactions={transactions} />
        )}
      </div>
    </>
  );
}
