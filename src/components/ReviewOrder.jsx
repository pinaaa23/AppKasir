export default function ReviewOrder({ cart }) {

  const total = cart.reduce(
    (sum, item) => sum + item.sell_price * item.quantity,
    0
  );

  return (
    <div>

      <h2 style={{ marginBottom:"20px" }}>
        Review Pesanan
      </h2>

      <div style={styles.card}>
        {cart.map(item => (
          <div key={item.id} style={styles.row}>

            <img
              src={item.image}
              style={styles.image}
            />

            <div style={{ flex:1 }}>
              <p style={styles.name}>{item.name}</p>
              <p style={styles.qty}>
                {item.quantity} Kg
              </p>
            </div>

            <p style={styles.price}>
              Rp {(item.sell_price*item.quantity)
                .toLocaleString("id-ID")}
            </p>

          </div>
        ))}
      </div>

      <div style={styles.total}>
        <span>Total</span>
        <span>
          Rp {total.toLocaleString("id-ID")}
        </span>
      </div>

    </div>
  );
}

const styles = {

  card:{
    background:"#fff",
    padding:"20px",
    borderRadius:"14px",
    marginBottom:"20px"
  },

  row:{
    display:"flex",
    alignItems:"center",
    gap:"12px",
    marginBottom:"12px"
  },

  image:{
    width:60,
    height:60,
    borderRadius:"8px",
    objectFit:"cover"
  },

  name:{
    margin:0,
    fontWeight:600
  },

  qty:{
    margin:0,
    color:"#666"
  },

  price:{
    fontWeight:600,
    color:"#1e88e5"
  },

  total:{
    display:"flex",
    justifyContent:"space-between",
    background:"#f1f5f9",
    padding:"16px",
    borderRadius:"12px",
    marginBottom:"20px",
    fontWeight:600
  },

  button:{
    width:"100%",
    padding:"14px",
    background:"#22c55e",
    border:"none",
    borderRadius:"12px",
    color:"#fff",
    fontWeight:600
  }

};
