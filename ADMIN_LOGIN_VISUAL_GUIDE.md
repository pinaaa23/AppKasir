```
╔══════════════════════════════════════════════════════════════════════════════╗
║                    🔐 ADMIN LOGIN SYSTEM - SETUP GUIDE 🔐                    ║
╚══════════════════════════════════════════════════════════════════════════════╝

┌──────────────────────────────────────────────────────────────────────────────┐
│ STEP 1: VERIFY ENVIRONMENT                                                   │
└──────────────────────────────────────────────────────────────────────────────┘

File: .env.local (di root folder d:\PROJECT\KASIR)
Isi:
  VITE_SUPABASE_URL=https://aixzkmxoqtcosdevfuqx.supabase.co
  VITE_SUPABASE_ANON_KEY=<your-anon-key>

✓ Jika sudah ada, lanjut ke STEP 2
✗ Jika belum, copy dari Supabase dashboard

┌──────────────────────────────────────────────────────────────────────────────┐
│ STEP 2: CREATE ADMIN USER DI SUPABASE                                        │
└──────────────────────────────────────────────────────────────────────────────┘

1. Buka browser → https://app.supabase.com
2. Login dengan akun Supabase Anda
3. Pilih project "KasirKu"
4. Menu sidebar → Authentication → Users
5. Klik tombol "Add User" (biasanya di kanan atas)
6. Isi form:
   
   Email:     admin@kasirku.com    (atau email pilihan)
   Password:  Admin123456          (min 6 karakter, bagus 8+)
   
7. UNCHECK: "Auto confirm user" (jika ada)
8. Klik "Save"
9. Wait for success message

✓ Admin user berhasil dibuat!

┌──────────────────────────────────────────────────────────────────────────────┐
│ STEP 3: START DEVELOPMENT SERVER                                             │
└──────────────────────────────────────────────────────────────────────────────┘

Terminal:
  cd d:\PROJECT\KASIR
  npm run dev

Tunggu hingga:
  ✓ VITE v7.2.4 ready in XXX ms
  ✓ Local: http://localhost:5173

Browser:
  Open http://localhost:5173

┌──────────────────────────────────────────────────────────────────────────────┐
│ STEP 4: TEST LOGIN FLOW                                                      │
└──────────────────────────────────────────────────────────────────────────────┘

Home Page:
  Anda melihat 2 tombol:
  
  ┌─────────────┐          ┌──────────────┐
  │   🛍️ CUSTOMER│          │ 👤 ADMIN     │
  │             │          │              │
  │ Lihat produk│          │ Kelola stok  │
  └─────────────┘          └──────────────┘

Step A: Test Customer (Tanpa Login)
  1. Klik "CUSTOMER"
  2. Langsung masuk ke gallery (tidak perlu login)
  3. Lihat produk, test add to cart
  4. ✓ Customer berfungsi tanpa login

Step B: Test Admin (Harus Login)
  1. Refresh page (F5)
  2. Klik "ADMIN"
  3. ❌ Jangan bisa langsung masuk
  4. ✓ Redirect ke LOGIN PAGE

Login Page:
  Form login dengan:
  
  Email:     ___________________
  Password:  ___________________
             [  Masuk  ]
             
  Pilihan:
  ○ Login dengan akun existing
  ○ Sign up (buat akun baru)
  ○ Back (kembali ke role selection)

Step C: Login dengan akun admin
  1. Email:    admin@kasirku.com (dari STEP 2)
  2. Password: Admin123456       (dari STEP 2)
  3. Klik "Masuk"
  4. Wait... Loading...
  5. ✓ Berhasil! → Admin Dashboard

Admin Dashboard:
  Melihat:
  ├─ Navbar dengan menu:
  │  ├─ 🛒 Produk
  │  ├─ 📦 Transaksi
  │  ├─ 📊 Laporan
  │  └─ 🚪 Logout
  │
  └─ Content area sesuai menu

Step D: Test Logout
  1. Klik hamburger menu (≡)
  2. Klik "Logout"
  3. ✓ Redirect ke Role Selection
  4. Klik Admin lagi → Harus login ulang
  5. ✓ Logout berfungsi

┌──────────────────────────────────────────────────────────────────────────────┐
│ STEP 5: TROUBLESHOOTING                                                      │
└──────────────────────────────────────────────────────────────────────────────┘

Error: "Supabase not configured"
  ✓ Solution: Check .env.local ada & benar

Error: "Invalid login credentials"
  ✓ Solution: 
    - Email salah? Check di Supabase Users list
    - Password salah? Try reset atau buat user baru
    - Case sensitive? Email harus exact match

Error: "Stuck di login page"
  ✓ Solution:
    - Refresh page (F5)
    - Clear browser cache (Ctrl+Shift+Del)
    - Check browser console (F12) untuk error details
    - Restart npm server

Error: Browser console error?
  ✓ Solution:
    - Copy error message
    - Check LOGIN_SETUP.md untuk details
    - Verify Supabase configuration

┌──────────────────────────────────────────────────────────────────────────────┐
│ WHAT YOU CAN DO NOW                                                          │
└──────────────────────────────────────────────────────────────────────────────┘

As Customer (No Login):
  ✓ View product gallery
  ✓ Add products to cart
  ✓ See price & stock info

As Admin (With Login):
  ✓ Add new products
  ✓ Edit product prices & stock
  ✓ Delete products
  ✓ Record transactions
  ✓ View sales reports & profit
  ✓ Logout to switch role

┌──────────────────────────────────────────────────────────────────────────────┐
│ FILES CREATED                                                                │
└──────────────────────────────────────────────────────────────────────────────┘

New Components:
  ✓ src/components/Login.jsx          (Login page UI)

New Hooks:
  ✓ src/hooks/useAuth.js              (Auth logic)

Modified:
  ✓ src/App.jsx                       (Auth flow integration)

Documentation:
  ✓ LOGIN_SETUP.md                    (Full setup guide)
  ✓ LOGIN_IMPLEMENTATION.md           (Tech details)
  ✓ QUICK_LOGIN_START.md              (Quick reference)
  ✓ ADMIN_LOGIN_SUMMARY.md            (Complete summary)
  ✓ ADMIN_LOGIN_VISUAL_GUIDE.md       (This file)

┌──────────────────────────────────────────────────────────────────────────────┐
│ NEXT STEPS (OPTIONAL)                                                        │
└──────────────────────────────────────────────────────────────────────────────┘

If you want more features:
  □ Email verification (confirm email setelah signup)
  □ Password reset flow (forgot password)
  □ 2FA/OTP (two-factor authentication)
  □ Admin role levels (supervisor, cashier, owner)
  □ User management (admin bisa manage users)
  □ RLS policies (database security)

┌──────────────────────────────────────────────────────────────────────────────┐
│ QUICK REFERENCE                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

Start app:              npm run dev
Build for production:   npm run build
Check errors:           npm run lint

Supabase dashboard:     https://app.supabase.com
Supabase docs:          https://supabase.com/docs

Credentials file:       .env.local
App entry point:        src/App.jsx
Component files:        src/components/
Hook files:             src/hooks/

╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║               ✨ ADMIN LOGIN SYSTEM READY TO USE! ✨                        ║
║                                                                              ║
║               Selamat menggunakan KasirKu dengan sistem login                ║
║               yang aman, modern, dan cantik!                                ║
║                                                                              ║
║                          🚀 Happy Coding! 🚀                                ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```
