<div align="center">

<!-- Animated Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a0b02,50:c8a97e,100:d4a853&height=220&section=header&text=☕%20BrewHub&fontSize=70&fontColor=f5e6d0&fontAlignY=35&desc=Premium%20Artisan%20Café%20Platform&descSize=18&descAlignY=55&descColor=c8a97e&animation=fadeIn" width="100%" />

<!-- Animated Badges -->
<p>
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

<!-- Typing Animation -->
<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Playfair+Display&weight=600&size=22&pause=1000&color=C8A97E&center=true&vCenter=true&multiline=true&width=600&height=80&lines=Craft+Your+Perfect+Cup+%E2%98%95;From+Bean+to+Cup%2C+Every+Sip+Matters;A+Full-Stack+3D+Animated+Caf%C3%A9+Experience" alt="Typing SVG" /></a>

<br/>

<!-- Quick Links -->
<a href="#-features"><img src="https://img.shields.io/badge/Features-c8a97e?style=flat-square" /></a>
<a href="#-tech-stack"><img src="https://img.shields.io/badge/Tech%20Stack-d4a853?style=flat-square" /></a>
<a href="#-getting-started"><img src="https://img.shields.io/badge/Get%20Started-4ade80?style=flat-square" /></a>
<a href="#-project-structure"><img src="https://img.shields.io/badge/Structure-60a5fa?style=flat-square" /></a>

</div>

---

## 🎬 What is BrewHub?

> **BrewHub** is a modern, full-stack café management platform with a stunning dark-themed UI, 3D animations, real-time order management, and a complete owner dashboard — all built with cutting-edge web technologies.

<div align="center">

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   🏠 Landing Page  →  🔐 Login  →  🍽️ Menu & Cart      │
│         ↓                              ↓               │
│   👨‍💼 Owner Dashboard  ←────  📦 Order System           │
│         ↓                                              │
│   📊 Analytics & Reports                               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🏠 Stunning Landing Page
- 🎮 **3D Coffee Cup** with React Three Fiber
- ☁️ Floating coffee beans & steam particles
- 🎞️ Smooth scroll animations (Framer Motion)
- 📸 Real Unsplash photography backgrounds
- ⭐ Testimonials & featured menu preview

</td>
<td width="50%">

### 👨‍💼 Owner Dashboard
- 🔐 Secure **JWT authentication**
- ✅ Approve/reject table requests
- 🔑 Auto-generated session codes (60s TOTP)
- 📋 Live order management pipeline
- 🗑️ Remove customers & delete orders
- 📊 Revenue analytics & popular dishes

</td>
</tr>
<tr>
<td width="50%">

### 🍽️ Interactive Menu
- 🔍 **Search** across 21+ items
- 🏷️ 9 categories (Coffee, Tea, Snacks...)
- 🛒 Sliding cart drawer with quantity controls
- 💰 Live price calculation
- 🎨 Animated food cards with hover effects

</td>
<td width="50%">

### 📦 Order System
- 📝 Place orders directly from cart
- 🔄 Status pipeline: `pending → accepted → preparing → completed`
- 🗑️ Owner can **delete** any order
- 🪑 Owner can **remove customers** & free tables
- 🔔 Real-time polling updates

</td>
</tr>
</table>

### 🎨 Design Highlights

<div align="center">

| Feature | Description |
|:---:|:---|
| 🌑 | **Premium Dark Theme** — Brown, black & gold palette |
| 🪟 | **Glassmorphism** — Frosted glass UI components |
| ✨ | **Micro-animations** — Smooth Framer Motion transitions |
| 🌟 | **Floating Particles** — Ambient gold particle background |
| 📱 | **Fully Responsive** — Mobile, tablet & desktop |
| 🎯 | **Custom Scrollbar** — Gold gradient scrollbar |

</div>

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:---:|:---:|:---|
| ⚡ | **Next.js 16** | App Router, SSR, API Routes |
| 📘 | **TypeScript** | Type safety across the stack |
| 🎨 | **Tailwind CSS v4** | Utility-first styling |
| 🎬 | **Framer Motion** | Page & component animations |
| 🎮 | **React Three Fiber** | 3D coffee cup scene |
| 🗄️ | **MongoDB + Mongoose** | Data persistence |
| 🔐 | **JWT** | Owner authentication |
| 📦 | **Zustand** | Cart state management |
| 🎯 | **Lucide React** | Beautiful icon library |
| 🔔 | **React Hot Toast** | Notification toasts |

</div>

---

## 🚀 Getting Started

### Prerequisites

```
✅ Node.js 18+
✅ MongoDB (local or Atlas)
```

### 1️⃣ Clone & Install

```bash
git clone https://github.com/sarthakmohitesm/BrewHub.git
cd BrewHub
npm install
```

### 2️⃣ Environment Setup

Create a `.env.local` file in the root:

```env
MONGODB_URI=mongodb://localhost:27017/brewhub
JWT_SECRET=your-secret-key
OWNER_EMAIL=owner@brewhub.com
OWNER_PASSWORD=brewhub2024
```

### 3️⃣ Run the Dev Server

```bash
npm run dev
```

### 4️⃣ Seed the Menu

```
1. Go to /owner/login
2. Login with owner credentials
3. Click "Seed Menu" in the dashboard sidebar
4. 🎉 21 menu items populate instantly!
```

---

## 📁 Project Structure

```
brewhub/
│
├── 📂 app/
│   ├── 📂 api/
│   │   ├── 📂 analytics/        # 📊 Dashboard analytics
│   │   ├── 📂 auth/
│   │   │   ├── 📂 customer/     # 🔐 Customer login
│   │   │   ├── 📂 owner/        # 🔐 Owner JWT auth
│   │   │   └── 📂 session-code/ # 🔑 TOTP session codes
│   │   ├── 📂 menu/             # 🍽️ Menu CRUD
│   │   ├── 📂 orders/           # 📦 Order management
│   │   ├── 📂 seed/             # 🌱 Menu seeder
│   │   └── 📂 tables/           # 🪑 Table registration
│   │
│   ├── 📂 login/                # Customer login page
│   ├── 📂 menu/                 # Interactive menu + cart
│   ├── 📂 owner/
│   │   ├── 📂 dashboard/        # 👨‍💼 Owner dashboard
│   │   └── 📂 login/            # Owner login
│   │
│   ├── 🎨 globals.css           # Design system & tokens
│   ├── 📄 layout.tsx            # Root layout
│   └── 🏠 page.tsx              # Landing page
│
├── 📂 components/
│   ├── 🎮 CoffeeScene.tsx       # 3D coffee cup (R3F)
│   ├── 🧭 Navbar.tsx            # Navigation bar
│   ├── 🦶 Footer.tsx            # Site footer
│   └── ✨ ParticlesBackground.tsx
│
├── 📂 models/
│   ├── MenuItem.ts              # Menu item schema
│   ├── Order.ts                 # Order schema
│   ├── Session.ts               # Session schema
│   └── Table.ts                 # Table schema
│
├── 📂 lib/
│   └── mongodb.ts               # DB connection helper
│
├── 📂 store/
│   └── cartStore.ts             # Zustand cart state
│
└── 📂 types/
    └── index.ts                 # TypeScript interfaces
```

---

## 🔑 Credentials

<div align="center">

| Role | Email | Password |
|:---:|:---:|:---:|
| 👨‍💼 **Owner** | `owner@brewhub.com` | `brewhub2024` |

</div>

---

## 📱 Pages

<div align="center">

| Page | Route | Description |
|:---:|:---:|:---|
| 🏠 Home | `/` | Landing page with 3D scene & animations |
| 🔐 Login | `/login` | Customer session-code login |
| 🍽️ Menu | `/menu` | Browse menu, search, add to cart |
| 👨‍💼 Owner Login | `/owner/login` | Secure owner authentication |
| 📊 Dashboard | `/owner/dashboard` | Full management console |

</div>

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

```
1. Fork the repo
2. Create your branch: git checkout -b feature/amazing-feature
3. Commit changes: git commit -m 'Add amazing feature'
4. Push to branch: git push origin feature/amazing-feature
5. Open a Pull Request
```

---

<div align="center">

## 📄 License

**MIT** — Free to use, modify & distribute.

---

<!-- Animated Footer -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a0b02,50:c8a97e,100:d4a853&height=120&section=footer" width="100%" />

<p>
  <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=500&size=14&pause=1000&color=C8A97E&center=true&vCenter=true&width=400&height=30&lines=Made+with+%E2%98%95+and+%E2%9D%A4%EF%B8%8F+by+Sarthak+Mohite" alt="Footer" />
</p>

</div>
