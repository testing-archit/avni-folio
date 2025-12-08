# Avni Portfolio

A modern, interactive portfolio website with a full-stack architecture featuring React frontend, Node.js backend, and PostgreSQL database.

## ✨ Features

### Frontend
- 🎨 Beautiful 3D animated hero section with Three.js
- 📱 Fully responsive design
- ✨ Smooth animations with Framer Motion
- 🎯 Portfolio filtering by category
- 🌟 Interactive project cards
- 💼 Dynamic work experience timeline
- 🛠️ Services showcase
- 📧 Functional contact form

### Backend
- 🗄️ PostgreSQL database (Neon)
- 🚀 RESTful API with Express
- 📊 7 database tables with normalized schema
- 🔒 Input validation and sanitization
- 🌐 CORS-enabled API
- ✅ Comprehensive error handling

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **PostgreSQL** - Relational database (Neon hosted)
- **pg** - PostgreSQL client
- **express-validator** - Input validation
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing

## 🗄️ Database Schema

The application uses 7 PostgreSQL tables:

- **contacts** - Contact form submissions
- **categories** - Portfolio categories (Logos, Events, etc.)
- **portfolio_items** - Project/work samples
- **portfolio_tags** - Tags for portfolio items
- **experiences** - Work history and positions
- **experience_skills** - Skills associated with experiences
- **services** - Services offered

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (Neon account recommended)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd avni-portfolio
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
```

### 4. Configure Environment Variables

Create `server/.env` file:

```env
DATABASE_URL=your_postgresql_connection_string
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 5. Initialize Database

```bash
cd server
npm run init-db    # Creates all tables
npm run seed-db    # Populates with initial data
```

### 6. Start Development Servers

**Terminal 1 - Backend Server:**
```bash
cd server
npm start
```
Server runs on `http://localhost:5000`

**Terminal 2 - Frontend Dev Server:**
```bash
npm run dev
```
App runs on `http://localhost:5173`

## 📁 Project Structure

```
avni-portfolio/
├── src/                          # Frontend source
│   ├── components/
│   │   ├── 3d/                  # Three.js components
│   │   ├── sections/            # Page sections
│   │   └── ui/                  # UI components
│   ├── data/
│   │   └── constants.js         # Static data
│   ├── utils/                   # Utility functions
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
│
├── server/                       # Backend source
│   ├── config/
│   │   └── database.js          # DB connection pool
│   ├── db/
│   │   ├── schema.sql           # Database schema
│   │   ├── init.js              # Schema initialization
│   │   └── seed.js              # Data seeding
│   ├── middleware/
│   │   └── validator.js         # Input validation
│   ├── routes/
│   │   ├── contacts.js          # Contact form API
│   │   ├── portfolio.js         # Portfolio projects API
│   │   ├── experiences.js       # Work history API
│   │   ├── services.js          # Services API
│   │   └── categories.js        # Categories API
│   ├── index.js                 # Express server
│   ├── package.json
│   └── README.md                # Backend documentation
│
├── public/                       # Static assets
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Server health check |
| `/api/categories` | GET | List all categories |
| `/api/portfolio` | GET | Get all portfolio items |
| `/api/portfolio/:id` | GET | Get single portfolio item |
| `/api/experiences` | GET | Get work history |
| `/api/experiences/:id` | GET | Get single experience |
| `/api/services` | GET | Get all services |
| `/api/services/:id` | GET | Get single service |
| `/api/contacts` | POST | Submit contact form |
| `/api/contacts` | GET | List contact submissions |
| `/api/contacts/:id` | GET | Get single contact |
| `/api/contacts/:id` | DELETE | Delete contact |

## 🎨 Customization

### Frontend
- Update colors in `tailwind.config.js`
- Modify 3D scene in `src/components/3d/HeroScene.jsx`
- Customize sections in `src/components/sections/`
- Edit static content in `src/data/constants.js`

### Backend
- Database schema: `server/db/schema.sql`
- Add new routes: `server/routes/`
- Modify validation: `server/middleware/validator.js`
- Update seed data: `server/db/seed.js`

## 📦 Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
npm start        # Start server
npm run dev      # Start with auto-reload
npm run init-db  # Initialize database schema
npm run seed-db  # Seed database with data
```

## 🔐 Security Features

- ✅ SQL injection protection (parameterized queries)
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Environment variable protection
- ✅ Email validation with regex
- ✅ SSL/TLS database connections

## 📝 License

MIT

---

**MADE FOR MY GF, WITH LOVE ❤️**

*HEHEHEHEHEEHHE* 😄
