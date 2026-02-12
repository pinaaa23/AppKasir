import { useState } from "react";

export default function useCheckout() {

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.total || 0),
    0
  );

  const submitCheckout = async (formData) => {
    try {
      setLoading(true);

      const payload = {
        customer: formData,
        items: cartItems,
        total: totalAmount,
      };

      console.log(payload);

      // nanti disini bisa masuk API / supabase
      await new Promise((resolve) => setTimeout(resolve, 1000));

      clearCart();
      alert("Checkout berhasil!");

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    cartItems,
    totalAmount,
    loading,
    addToCart,
    submitCheckout,
    clearCart
  };
}
