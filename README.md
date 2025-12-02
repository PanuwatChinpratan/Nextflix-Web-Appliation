# Nextflix Web Application

Next.js 16 frontend + NestJS API gateway. UI ตามแบบ Netflix: hero เปลี่ยนสุ่ม, แถวหนัง, My List (ผ่าน backend favorites), i18n, theme light/dark, responsive ครบ.

## Setup (รวบรัด)

### Backend (NestJS)
```bash
cd backend/my-app-backend
npm install
npx prisma db push          # สร้าง collection Favorite (ถ้าใช้ Mongo)
# env dev: ตั้งค่าใน backend/my-app-backend/.env.development (NODE_ENV=development)
npm run start:dev           # API http://localhost:4000, Swagger http://localhost:4000/docs
```

### Frontend (Next.js)
```bash
cd frontend/my-app
npm install
# env dev: ตั้งค่าใน frontend/my-app/.env.development (NEXT_PUBLIC_API_URL=http://localhost:4000)
npm run dev                 # เปิด http://localhost:3000 (หรือ 3001 ถ้าปรับ)
```

### Env ที่ใช้ (สรุป)
- Dev: `.env.development` ของแต่ละฝั่ง, รันด้วย `NODE_ENV=development`.
- Prod: `.env.production` ของแต่ละฝั่ง, รันด้วย `NODE_ENV=production`.
- ตัวแปรหลัก
  - Frontend: `NEXT_PUBLIC_API_URL`
  - Backend: `PORT`, `FRONTEND_URL` (origin หลัก), `CORS_ORIGINS` (origin เพิ่มเติมคั่นจุลภาค), `TMDB_API_KEY`, `DATABASE_URL`
- บนระบบดีพลอย: ตั้ง ENV ตามไฟล์ production ด้วยตัวเอง (ไม่อ่านไฟล์ใน repo อัตโนมัติ)

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
