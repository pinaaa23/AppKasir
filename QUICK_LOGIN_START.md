# 🚀 Quick Start - Admin Login

## 1️⃣ Check Environment
```bash
# .env.local harus ada dengan:
VITE_SUPABASE_URL=https://aixzkmxoqtcosdevfuqx.supabase.co
VITE_SUPABASE_ANON_KEY=your-key-here
```

## 2️⃣ Create Admin User (Supabase)
1. Buka: https://app.supabase.com
2. Masuk dashboard Supabase
3. Pilih project KasirKu
4. **Authentication** → **Users**
5. Klik **Add User**
6. Input:
   - Email: `admin@kasirku.com` (atau email pilihan)
   - Password: `MinimalLima6Karakter` (min 6 chars)
7. Klik **Save**

## 3️⃣ Test Login
```bash
# Terminal
npm run dev

# Browser
Buka: http://localhost:5173
```

## 4️⃣ Test Flow
1. Klik **Admin** button di halaman awal
2. Input email & password dari step 2
3. Klik **Masuk**
4. ✅ Berhasil! Anda sekarang di Admin Panel
5. Klik **Logout** (hamburger menu) untuk test logout

## 5️⃣ Test Sign Up (Optional)
Di login page:
1. Klik **"Daftar di sini"**
2. Isi email & password baru
3. Klik **Buat Akun**
4. Email otomatis terdaftar
5. Logout & login dengan akun baru

---

## File yang Penting

| File | Fungsi |
|------|--------|
| `src/components/Login.jsx` | UI login page |
| `src/hooks/useAuth.js` | Logika authentication |
| `src/App.jsx` | App flow & routing |
| `.env.local` | Supabase credentials |

## Error Troubleshooting

| Error | Solution |
|-------|----------|
| "Supabase not configured" | Check `.env.local` |
| "Invalid login credentials" | Pastikan email & password benar di Supabase |
| Stuck di login page | Refresh browser, clear cache |
| Signup error | Email mungkin sudah registered |

---

**Siap? Let's Go!** 🎯
