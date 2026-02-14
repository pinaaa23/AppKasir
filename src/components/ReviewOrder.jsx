export default function ReviewOrder({ cart, onNext }) {

  const total = cart.reduce(
    (sum,item)=> sum + item.sell_price * item.quantity,
    0
  );

  return (
    <div style={{
      background:"#ffffff",
      padding:"35px",
      borderRadius:"22px",
      boxShadow:"0 20px 50px rgba(0,0,0,0.06)"
    }}>

      {/* HEADER STEP */}
      <div style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        marginBottom:"30px"
      }}>
        <div style={{
          fontSize:"24px",
          fontWeight:"800"
        }}>
          Checkout
        </div>

        <div style={{
          background:"#eef2ff",
          padding:"8px 16px",
          borderRadius:"999px",
          fontWeight:"600",
          color:"#4338ca"
        }}>
          Step 1 - Review
        </div>
      </div>

      <h2 style={{
        marginBottom:"25px",
        fontWeight:"700"
      }}>
        Review Pesanan
      </h2>

      {/* LIST PRODUK */}
      <div style={{
        display:"flex",
        flexDirection:"column",
        gap:"16px"
      }}>
        {cart.map((item,i)=>(
          <div key={i} style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            background:"#f9fafb",
            padding:"18px",
            borderRadius:"16px"
          }}>

            {/* LEFT */}
            <div style={{
              display:"flex",
              alignItems:"center",
              gap:"16px"
            }}>
              <img
                src={item.image}
                style={{
                  width:"75px",
                  height:"75px",
                  borderRadius:"14px",
                  objectFit:"cover",
                  background:"#fff"
                }}
              />

              <div>
                <div style={{
                  fontSize:"17px",
                  fontWeight:"700"
                }}>
                  {item.name}
                </div>

                <div style={{
                  marginTop:"4px",
                  color:"#6b7280"
                }}>
                  {item.quantity} Kg
                </div>
              </div>
            </div>

            {/* PRICE */}
            <div style={{
              fontWeight:"800",
              fontSize:"18px",
              color:"#2563eb"
            }}>
              Rp {(item.sell_price * item.quantity)
                .toLocaleString("id-ID")}
            </div>

          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div style={{
        marginTop:"30px",
        paddingTop:"20px",
        borderTop:"1px solid #e5e7eb",
        display:"flex",
        justifyContent:"space-between",
        fontSize:"21px",
        fontWeight:"800"
      }}>
        <span>Total Pembayaran</span>
        <span>
          Rp {total.toLocaleString("id-ID")}
        </span>
      </div>

      {/* BUTTON */}
      <button
        onClick={onNext}
        style={{
          width:"100%",
          marginTop:"30px",
          padding:"16px",
          borderRadius:"14px",
          border:"none",
          background:"#4f46e5",
          color:"#fff",
          fontSize:"16px",
          fontWeight:"700",
          cursor:"pointer"
        }}
      >
        Lanjut ke Data Customer →
      </button>

    </div>
  );
}
