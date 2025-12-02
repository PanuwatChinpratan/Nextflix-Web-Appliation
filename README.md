# Nextflix Web Application

Next.js 16 frontend + NestJS API gateway. UI ตามแบบ Netflix: hero เปลี่ยนสุ่ม, แถวหนัง, My List (ผ่าน backend favorites), i18n, theme light/dark, responsive ครบ.

## Setup (รวบรัด)

### Backend (NestJS)
```bash
cd backend/my-app-backend
npm install
cp .env.example .env        # ตรวจว่า TMDB_API_KEY, DATABASE_URL, FRONTEND_URL ถูกต้อง
npx prisma db push          # สร้าง collection Favorite (ถ้าใช้ Mongo)
npm run start:dev           # API ที่ http://localhost:4000, Swagger ที่ http://localhost:4000/docs
```

### Frontend (Next.js)
```bash
cd frontend/my-app
npm install
cp .env.example .env        # NEXT_PUBLIC_API_URL=http://localhost:4000
npm run dev                 # เปิดที่ http://localhost:3000 (หรือ 3001 ถ้าปรับ)
```

## สถาปัตยกรรมสั้น ๆ
- App Router (Next.js) ใช้การเรนเดอร์ฝั่งเซิร์ฟเวอร์สำหรับหน้า Home (`app/page.tsx`) พร้อม ISR 5 นาที แล้วสุ่ม hero/สลับลำดับ popular ฝั่ง server ก่อนส่งลง client
- Data layer ฝั่ง FE: fetch ผ่าน `lib/api-client.ts` ไปยัง NestJS เท่านั้น (ไม่คุย TMDB ตรง)
- State:
  - Favorites/My List: `useFavorites` (React Query + Nest favorites API)
  - Hero/Popular: SSR + props (สุ่มฝั่ง server)
- UI: Tailwind + shadcn/ui components (buttons, dropdown, skeleton, dialog), theme toggle + i18n (EN/TH)
- Types: `lib/types/*` ใช้ร่วมกับ API responses

## ฟีเจอร์หลัก
- Hero banner สุ่มจาก trending/popular พร้อมปุ่ม Play/More info
- แถว Popular on Netflix + My List (ดึงจาก backend favorites)
- หน้า detail `/movies/[id]`
- Theme light/dark, สวิตช์ภาษา EN/TH
- Responsive ทุกขนาดจอ
- Swagger docs ที่ `/docs` สำหรับทดสอบ API

## หมายเหตุที่ควรรู้
- ต้องมี `TMDB_API_KEY` ใน backend `.env`
- ถ้าไม่ตั้ง `DATABASE_URL` favorites จะเก็บ in-memory (หายเมื่อรีสตาร์ท)
- Hash navigation (เมนูใน header) จะดึงเพจจาก cache ISR; hero จะสุ่มใหม่ทุก 5 นาทีตาม revalidate
