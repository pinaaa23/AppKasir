# 🔐 Login Admin - Setup Guide

## Fitur Baru
Admin sekarang harus login terlebih dahulu sebelum mengakses dashboard. Login menggunakan Supabase authentication dengan fitur:
- ✅ Login dengan email & password
- ✅ Registrasi akun admin baru
- ✅ Sesi authenticated tersimpan
- ✅ Design modern & responsive

## Steps Setup

### 1. Pastikan Supabase Credentials di `.env.local`
File `.env.local` harus berisi:
```
VITE_SUPABASE_URL=https://aixzkmxoqtcosdevfuqx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2. Enable Authentication di Supabase
Di dashboard Supabase:
1. Pergi ke **Authentication** → **Providers**
2. Pastikan **Email** provider aktif (biasanya sudah default)
3. Di tab **User Management**, buat akun admin pertama:
   - Klik **+ Add User**
   - Input email & password
   - Password harus minimal 6 karakter

### 3. Test Login Flow
1. Buka aplikasi
2. Klik **Admin** di halaman RoleSelection
3. Anda akan diarahkan ke Login page
4. Masukkan email & password admin
5. Jika berhasil, Anda akan masuk ke dashboard

### 4. Fitur Login Page
- **Login**: Masuk dengan email & password yang sudah terdaftar
- **Sign Up**: Buat akun admin baru (jika diizinkan di Supabase)
- **Back**: Kembali ke pilihan role
- **Logout**: Tombol logout di Navbar untuk keluar

## Struktur File Baru

```
src/
├── components/
│   └── Login.jsx          (✨ Login page dengan design modern)
├── hooks/
│   └── useAuth.js         (✨ Custom hook untuk authentication)
```

## Implementasi Detail

### useAuth.js Hook
Menyediakan:
- `user` - Data user yang login
- `isAuthenticated` - Status login
- `loading` - Loading state
- `error` - Error message
- `signIn(email, password)` - Login
- `signUp(email, password)` - Daftar
- `signOut()` - Logout
- `checkAuth()` - Check status login

### Login.jsx Component
- Form input email & password
- Toggle antara login & sign up mode
- Error messages handling
- Beautiful design dengan gradient & animations
- Responsive di semua ukuran

## Cara Kerja

```
User Pilih Admin
    ↓
Check isAuthenticated?
    ↓ (Belum login)
Tampilkan Login Page
    ↓
User login/signup
    ↓ (Berhasil)
Redirect ke Admin Dashboard
    ↓
Access Products, Transactions, Reports
```

## Tips Keamanan

1. **Jangan share credentials** - Setiap admin harus punya akun sendiri
2. **Password kuat** - Minimal 6 karakter (lebih baik 8+)
3. **Logout sebelum pergi** - Klik logout di Navbar
4. **Supabase RLS** - Opsi: Setup Row Level Security untuk data protection lebih lanjut

## Troubleshooting

### Error "Supabase not configured"
- Pastikan `.env.local` ada dan kredensial benar
- Restart dev server: `npm run dev`

### Login gagal dengan "Invalid login credentials"
- Cek email & password benar
- Email case-sensitive di Supabase

### Stuck di Login page
- Cek browser console untuk error details
- Pastikan internet connection stabil
- Clear browser cache/cookies

### Sign up tidak berfungsi
- Di Supabase Authentication settings, pastikan auto-confirm email disabled (atau setup email confirmation)
- Default behavior: akun otomatis aktif setelah signup

## Next Steps (Opsional)

1. **Email Verification** - Setup email confirmation di Supabase
2. **Password Reset** - Tambah forgot password feature
3. **Role-based Access** - Setup admin levels/permissions
4. **Multi-factor Authentication** - 2FA/OTP support
5. **RLS Policies** - Secure database dengan Row Level Security

## Support

Jika ada issue dengan authentication:
1. Check Supabase dashboard untuk error logs
2. Lihat browser console (F12)
3. Verify `.env.local` configuration
