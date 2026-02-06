# 📚 Setup Supabase untuk Aplikasi KASIR

## Step 1: Buat Project Supabase

1. Buka https://supabase.com
2. Sign up atau login dengan akun Anda
3. Click "New Project"
4. Isi detail:
   - **Name**: KASIR atau nama lainnya
   - **Password**: Set password yang kuat
   - **Region**: Pilih yang terdekat (Indonesia: Singapore)
5. Tunggu project dibuat (± 1-2 menit)

## Step 2: Dapatkan Credentials

1. Buka project Anda
2. Klik "Settings" di menu kiri
3. Pilih "API"
4. Copy:
   - **Project URL** → VITE_SUPABASE_URL
   - **anon public key** → VITE_SUPABASE_ANON_KEY

## Step 3: Update .env File

Buka file `.env` di root project dan ganti:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 4: Buat Tabel di Supabase

Ikuti langkah berikut di Supabase Dashboard:

### Tabel 1: products

1. Klik "SQL Editor" → "New Query"
2. Copy paste script ini:

```sql
CREATE TABLE products (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Buat policy untuk SELECT (semua orang bisa baca)
CREATE POLICY "Allow public read" ON products
  FOR SELECT USING (true);

-- Buat policy untuk INSERT/UPDATE/DELETE (semua orang bisa)
CREATE POLICY "Allow all" ON products
  FOR ALL USING (true);
```

3. Click "Run"

### Tabel 2: transactions

1. Klik "New Query" lagi
2. Copy paste script ini:

```sql
CREATE TABLE transactions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
  product_name VARCHAR(255) NOT NULL,
  weight DECIMAL(10, 2) NOT NULL,
  price_per_kg DECIMAL(12, 2) NOT NULL,
  total DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Buat policy untuk SELECT
CREATE POLICY "Allow public read" ON transactions
  FOR SELECT USING (true);

-- Buat policy untuk INSERT
CREATE POLICY "Allow all" ON transactions
  FOR ALL USING (true);
```

3. Click "Run"

## Step 5: Verifikasi Tabel

1. Klik "Table Editor" di menu kiri
2. Pastikan terlihat:
   - `products` table
   - `transactions` table

## Step 6: Test Connection

Setelah setup selesai, jalankan aplikasi:

```bash
npm run dev
```

Cek browser console (F12) untuk memastikan tidak ada error Supabase.

## ✅ Selesai!

Sekarang aplikasi sudah terhubung dengan Supabase. Fitur-fitur:
- ✅ Produk akan disimpan di database
- ✅ Transaksi akan tercatat otomatis
- ✅ Data persisten (tidak hilang saat refresh)

## 🔒 Security Notes

- File `.env` sudah di-ignore git (jangan commit ke repo)
- RLS policies sudah diatur untuk akses publik
- Untuk production, atur policies yang lebih ketat

## Troubleshooting

**Error: "Failed to fetch"?**
- Pastikan credentials di `.env` benar
- Cek network tab di DevTools
- Pastikan Supabase project status aktif

**Gambar tidak muncul?**
- Tetap gunakan file upload atau URL gambar yang valid
- Data gambar disimpan sebagai base64 atau URL

---

Pertanyaan? Hubungi support Supabase di https://supabase.com/support
