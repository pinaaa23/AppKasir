import { useState } from "react";
import { useLocation } from "react-router-dom";

import ReviewOrder from "../ReviewOrder";
import CustomerForm from "./CustomerForm";
import PaymentMethod from "./PaymentMethod";

export default function CheckoutPage() {

  const { state } = useLocation();
  const cartItems = state?.cart || [];

  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState(null);

  return (
    <div style={{
      maxWidth:"750px",
      margin:"auto",
      padding:"30px"
    }}>

      {/* STEP 1 */}
      {step === 1 && (
        <ReviewOrder
          cart={cartItems}
          onNext={()=>setStep(2)}
        />
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <CustomerForm
            onSubmit={(data)=>{
              setCustomer(data);
              setStep(3);
            }}
          />
          <button onClick={()=>setStep(1)}>Kembali</button>
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <PaymentMethod
          cart={cartItems}
          customer={customer}
          onBack={()=>setStep(2)}
        />
      )}

    </div>
  );
}
