# Frontend Client Configuration & Documentation

Ushbu hujjatda loyihaning frontend (client) qismida amalga oshirilgan funksiyalar va mantiqiy jarayonlar tavsiflangan.

## 🔧 Tizim Sozlamalari
- **Backend Port:** Server `http://localhost:5000` portida ishlayotgani sababli, barcha so'rovlar shu portga yo'naltirildi.
- **Environment Variables:** `.env` fayli yaratildi va `VITE_API_URL=http://localhost:5000/api` deb belgilandi.

## 🔑 Autentifikatsiya (Authentication)

### 1. Majburiy Autentifikatsiya (`src/App.jsx`)
Ilova endi foydalanuvchi tizimga kirmagan bo'lsa, avtomatik ravishda `/login` sahifasiga yo'naltiradi.

### 2. State Management (MongoDB Persistence)
Barcha sevimlilar va savat ma'lumotlari endi `localStorage` o'rniga to'g'ridan-to'g'ri **MongoDB** bazasida saqlanadi. 

## 📦 Mahsulotlar va UI (Uzum Market Style)

### 1. Backend Integration (Favorites & Cart)
- **Favorites:** `POST /api/favorites` orqali qo'shiladi va `DELETE /api/favorites/:userId/:productId` orqali o'chiriladi.
- **Cart:** `POST /api/carts` orqali mahsulot va uning miqdori yuboriladi.

### 2. Sharhlar Tizimi (Comments)
`ProductDetail.jsx` sahifasida to'liq sharh qoldirish tizimi yaratildi:
- **Ko'rish:** Mahsulotga tegishli barcha sharhlar, foydalanuvchi ismi va yulduzchali reytingi bilan ko'rinadi.
- **Qoldirish:** Tizimga kirgan foydalanuvchilar matn va 1 dan 5 gacha bo'lgan yulduzcha orqali sharh qoldira oladi.
- **API:** `POST /api/comments` va `GET /api/comments`.

### 3. Qidiruv Tizimi (Search)
- **Navbar:** Qidiruv inputiga so'z yozilib "Enter" bosilganda, URL `/?q=soz` ko'rinishiga keladi.
- **ProductGrid:** URL'dagi `q` parametrini o'qiydi va mahsulotlarni **title** (nomi) bo'yicha filter qiladi.

## 🧭 Navigatsiya
- **Logo:** Logo rasm formatiga (`market-horizontal-logo.png`) o'tkazildi.
- **Favicon:** Sayt ikonkasiga `market.png` o'rnatildi.


