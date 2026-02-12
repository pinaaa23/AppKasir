import { useState } from "react";
import ReviewOrder from "../ReviewOrder";
import CustomerForm from "./CustomerForm";
import PaymentMethod from "./PaymentMethod";

export default function CheckoutWizard({ cart }) {

  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState(null);

  return (
    <div style={{ maxWidth:"750px", margin:"auto", padding:"30px" }}>

      {step === 1 && (
        <>
          <ReviewOrder cart={cart} />
          <button onClick={() => setStep(2)}>
            Lanjut
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <CustomerForm
            onSubmit={(data)=>{
              setCustomer(data);
              setStep(3);
            }}
          />
          <button onClick={() => setStep(1)}>
            Kembali
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <PaymentMethod
            cart={cart}
            customer={customer}
          />
          <button onClick={() => setStep(2)}>
            Kembali
          </button>
        </>
      )}

    </div>
  );
}