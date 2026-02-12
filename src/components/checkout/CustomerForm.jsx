import { useState } from "react";

export default function CustomerForm({ onSubmit }) {
  const [isNew, setIsNew] = useState(true);

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!form.name || !form.address || !form.phone) {
    alert("Nama, alamat, dan no HP wajib diisi");
    return;
    }


    if (isNew && (!form.email || !form.password)) {
      alert("Email & password wajib untuk akun baru");
      return;
    }

    onSubmit(form);
  };

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h3 style={{ marginBottom: "1rem" }}>Data Pelanggan</h3>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          <input
            type="radio"
            checked={isNew}
            onChange={() => setIsNew(true)}
          />
          Buat akun baru
        </label>

        <label style={{ marginLeft: "15px" }}>
          <input
            type="radio"
            checked={!isNew}
            onChange={() => setIsNew(false)}
          />
          Sudah punya akun
        </label>
      </div>

      <input
  name="name"
  value={form.name}
  placeholder="Nama"
  onChange={handleChange}
  style={styles.input}
/>

<textarea
  name="address"
  value={form.address}
  placeholder="Alamat"
  onChange={handleChange}
  style={styles.input}
/>

<input
  name="phone"
  value={form.phone}
  placeholder="No WhatsApp"
  onChange={handleChange}
  style={styles.input}
/>


      {isNew && (
        <>
          <input
            name="email"
            value={form.email}
            placeholder="Email"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="password"
            type="password"
            value={form.password}
            placeholder="Password"
            onChange={handleChange}
            style={styles.input}
          />
        </>
      )}

      <button onClick={handleSubmit} style={styles.button}>
        Lanjut ke Pembayaran
      </button>
    </div>
  );
}

const styles = {
  input: {
    width: "100%",
    marginBottom: "10px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb"
  },

  button: {
    background: "#22c55e",
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    color: "white",
    fontWeight: 600,
    cursor: "pointer"
  }
};
