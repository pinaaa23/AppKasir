import { useState } from "react";
import { useLocation } from "react-router-dom";

import ReviewOrder from "../ReviewOrder";
import CustomerForm from "./CustomerForm";
import PaymentMethod from "./PaymentMethod";
import BankTransfer from "./BankTransfer";
import PaymentInstruction from "./PaymentInstruction";

export default function CheckoutPage() {

  const { state } = useLocation();
  const cartItems = state?.cart || [];

  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);

  // Map bank ID to display name
  const bankNames = {
    bca: "BCA",
    bri: "BRI",
    bni: "BNI",
    mandiri: "Mandiri",
    ovo: "OVO",
    gopay: "GoPay",
    dana: "DANA",
    shopeepay: "ShopeePay"
  };

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
          onSelectTransfer={()=>setStep(4)}
        />
      )}

      {/* STEP 4 - Bank Transfer Selection */}
      {step === 4 && (
        <BankTransfer
          cart={cartItems}
          customer={customer}
          onBack={()=>setStep(3)}
          onSelectBank={(bankId)=>{
            setSelectedBank(bankId);
            setStep(5);
          }}
        />
      )}

      {/* STEP 5 - Payment Instruction */}
      {step === 5 && selectedBank && (
        <PaymentInstruction
          bankType={selectedBank}
          bankName={bankNames[selectedBank]}
          total={cartItems.reduce((sum, item) => sum + item.sell_price * item.quantity, 0)}
          customer={customer}
          onBack={()=>setStep(4)}
          onConfirm={async () => {
            // Process payment confirmation
            const total = cartItems.reduce((sum, item) => sum + item.sell_price * item.quantity, 0);
            
            const generateInvoice = () => {
              const date = new Date();
              const y = date.getFullYear();
              const m = String(date.getMonth() + 1).padStart(2, "0");
              const d = String(date.getDate()).padStart(2, "0");
              const random = Math.floor(Math.random() * 9000) + 1000;
              return `INV-${y}${m}${d}-${random}`;
            };

            const invoice = generateInvoice();
            const phone = customer.phone.replace(/^0/, "62");

            const items = cartItems.map((item) => ({
              product_id: item.id,
              name: item.name,
              quantity: item.quantity,
              sell_price: item.sell_price,
              buy_price: item.buy_price || 0,
              total: (item.sell_price || 0) * (item.quantity || 0)
            }));

            const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
            const totalBuyCost = cartItems.reduce(
              (sum, item) => sum + (Number(item.buy_price) || 0) * (item.quantity || 0),
              0
            );

            const avgBuyPrice = totalQuantity > 0 ? totalBuyCost / totalQuantity : 0;
            const avgSellPrice = totalQuantity > 0 ? total / totalQuantity : 0;

            const payload = {
              product_id: cartItems.length === 1 ? cartItems[0].id : null,
              product_name: cartItems.length === 1 ? cartItems[0].name : '',
              quantity: totalQuantity,
              buy_price_at_sale: avgBuyPrice,
              sell_price_at_sale: avgSellPrice,
              total,
              status: 'pending',
              payment_method: `transfer_${selectedBank}`,
              invoice,
              customer_name: customer.name || '',
              customer_phone: customer.phone || '',
              items
            };

            // Simpan transaksi ke Supabase
            try {
              const { supabase } = await import("../../lib/supabase");
              await supabase.from('transactions').insert([payload]);
            } catch (err) {
              console.warn('Gagal menyimpan transaksi:', err);
            }

            // Send WhatsApp
            const productList = cartItems
              .map(
                (item, i) =>
                  `${i + 1}. ${item.name} (${item.quantity} Kg) - Rp ${(item.sell_price * item.quantity).toLocaleString("id-ID")}`
              )
              .join("\n");

            const now = new Date().toLocaleString("id-ID");

            const text = `
INVOICE PEMBELIAN

No Invoice : ${invoice}
Tanggal    : ${now}

Halo ${customer.name},

${productList}

Total:
Rp ${total.toLocaleString("id-ID")}

Metode:
TRANSFER ${bankNames[selectedBank].toUpperCase()}

Terima kasih
`.trim();

            window.open(
              `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
              "_blank"
            );

            alert("Pembayaran dikirim ke WhatsApp. Terima kasih!");
            setStep(1);
            setCustomer(null);
            setSelectedBank(null);
          }}
        />
      )}

    </div>
  );
}
