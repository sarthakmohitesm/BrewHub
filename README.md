# BrewHub - Premium Artisan Café Platform ☕

A modern full-stack 3D animated café website built with Next.js, TypeScript, Tailwind CSS, Framer Motion, Three.js (React Three Fiber), and MongoDB.

![BrewHub](https://img.shields.io/badge/BrewHub-Premium%20Café-c8a97e?style=for-the-badge)

## ✨ Features

### 🏠 Landing Page
- Fully animated hero with 3D coffee cup (React Three Fiber)
- Floating coffee beans with physics
- Steam particle effects
- Smooth scroll animations (Framer Motion)
- About, Featured Menu, Testimonials, CTA sections

### 🪑 Table Registration
- Customer registers with name & table number
- Request stored in MongoDB
- Owner receives notification

### 👨‍💼 Owner Dashboard
- Secure JWT authentication
- Approve/reject table requests with auto-generated login codes
- Live order management (accept → preparing → completed)
- Analytics dashboard (revenue, popular dishes, order stats)
- Seed menu with 21 items

### 🍽️ Interactive Menu
- 5 categories: Coffee, Tea, Snacks, Desserts, Combos
- Search functionality
- Animated food cards
- Add-to-cart with quantity controls
- Sliding cart drawer
- Live total calculation

### 📦 Order System
- Place orders from cart
- Orders stored in MongoDB
- Status tracking (pending → accepted → preparing → completed)

### 🎨 Design
- Premium dark café aesthetic (brown + black + gold)
- Glassmorphism UI components
- Smooth Framer Motion animations
- Floating particle background
- Custom scrollbar
- Gold glow effects
- Fully responsive (mobile/tablet/desktop)

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| 3D Graphics | React Three Fiber + Drei |
| State | Zustand |
| Database | MongoDB + Mongoose |
| Auth | JWT |
| Icons | Lucide React |
| Toasts | React Hot Toast |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
# Navigate to project
cd brewhub

# Install dependencies (already done)
npm install

# Set up environment variables
# Edit .env.local with your MongoDB URI
```

### Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=mongodb://localhost:27017/brewhub
JWT_SECRET=your-secret-key
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
OWNER_EMAIL=owner@brewhub.com
OWNER_PASSWORD=brewhub2024
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Seed the Menu

1. Log in as owner: `owner@brewhub.com` / `brewhub2024`
2. Click "Seed Menu" button in the dashboard
3. 21 menu items will be populated across all categories

## 📁 Project Structure

```
brewhub/
├── app/
│   ├── api/
│   │   ├── analytics/     # Analytics endpoint
│   │   ├── auth/
│   │   │   ├── customer/  # Customer login validation
│   │   │   └── owner/     # Owner JWT authentication
│   │   ├── menu/          # Menu CRUD
│   │   ├── orders/        # Order management
│   │   ├── seed/          # Menu seeder
│   │   └── tables/        # Table registration
│   ├── login/             # Customer login page
│   ├── menu/              # Interactive menu page
│   ├── owner/
│   │   ├── dashboard/     # Owner dashboard
│   │   └── login/         # Owner login
│   ├── register/          # Table registration
│   ├── globals.css        # Design system
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── CoffeeScene.tsx    # 3D coffee cup scene
│   ├── Footer.tsx         # Site footer
│   ├── Navbar.tsx         # Navigation bar
│   └── ParticlesBackground.tsx
├── lib/
│   └── mongodb.ts         # Database connection
├── models/
│   ├── MenuItem.ts        # Menu item schema
│   ├── Order.ts           # Order schema
│   └── Table.ts           # Table registration schema
├── store/
│   └── cartStore.ts       # Zustand cart state
├── types/
│   └── index.ts           # TypeScript interfaces
└── .env.local             # Environment variables
```

## 🔑 Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Owner | owner@brewhub.com | brewhub2024 |

## 📱 Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing page with 3D scene |
| Register | `/register` | Table registration |
| Login | `/login` | Customer login |
| Menu | `/menu` | Interactive menu with cart |
| Owner Login | `/owner/login` | Owner authentication |
| Dashboard | `/owner/dashboard` | Management dashboard |

## License

MIT
