import React, { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import CheckoutSummary from "./CheckoutSummary";
import PaymentMethod from "./PaymentMethod";
import useCheckout from "../../hooks/useCheckout";

export default function CheckoutPage() {
  const {
    cartItems,
    submitCheckout,
    loading,
  } = useCheckout();

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleSubmit = (data) => {
    submitCheckout({
      ...data,
      paymentMethod,
    });
  };

  return (
    <div className="checkout-page">
      <h2>Halaman Checkout</h2>

      <CheckoutSummary cartItems={cartItems} />

      <PaymentMethod
        value={paymentMethod}
        onChange={setPaymentMethod}
      />

      <CheckoutForm
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}