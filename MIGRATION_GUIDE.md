# Bio-Digital Full-Stack Migration Guide

Complete migration from static HTML/CSS/JS to Next.js + Nest.js architecture.

## 🏗️ Project Structure

```
bio-digital-fullstack/
├── frontend/                 # Next.js Application
│   ├── pages/               # React page components
│   ├── components/          # Reusable React components
│   ├── lib/
│   │   └── api/             # API client and endpoints
│   ├── public/              # Static assets
│   ├── styles/              # Global styles (Tailwind)
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   └── .env.local
│
├── backend/                 # Nest.js Application
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── services/        # Business logic
│   │   ├── entities/        # Database entities (TypeORM)
│   │   ├── modules/         # Feature modules
│   │   ├── dtos/            # Data Transfer Objects
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── dist/                # Compiled output
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── docker-compose.yml       # Docker setup
└── README.md
```

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB (local or Atlas)
- Docker (optional)

## 🚀 Quick Start

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
# Backend runs on http://localhost:3001
```

### MongoDB Setup

Option 1: Local MongoDB
```bash
# Install MongoDB Community Edition
# Start MongoDB service
mongod
```

Option 2: MongoDB Atlas (Cloud)
```bash
# Update MONGODB_URI in backend/.env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bio-digital
```

Option 3: Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## 🔄 API Integration

### Environment Variables

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Backend (.env)**
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/bio-digital
CORS_ORIGIN=http://localhost:3000
```

### API Endpoints

All endpoints are prefixed with `/api/`

**Air Quality**
- `GET /api/air-quality/current` - Current air quality metrics
- `GET /api/air-quality/history?days=7` - Historical data
- `GET /api/air-quality/prediction?hours=24` - Predictions

**Water System**
- `GET /api/water-system/current` - Current water metrics
- `GET /api/water-system/history?days=7` - Historical data

**Dashboard**
- `GET /api/dashboard/metrics` - All metrics
- `GET /api/dashboard/all-metrics` - Detailed metrics

**System**
- `GET /api/system/status` - System status
- `GET /api/system/alerts` - Active alerts
- `GET /api/system/performance` - Performance metrics

## 📦 Converting Existing Pages

### Migration Pattern

**Old (HTML/CSS/JS)**
```html
<!-- pages/how-it-works.html -->
<section class="workflow-section">
  <h2>How It Works</h2>
  <!-- content -->
</section>
```

**New (React/TypeScript)**
```tsx
// pages/how-it-works.tsx
import { Layout } from '@/components/Layout';

export default function HowItWorks() {
  return (
    <Layout title="How It Works">
      <section className="workflow-section">
        <h2>How It Works</h2>
        {/* content */}
      </section>
    </Layout>
  );
}
```

### Pages to Convert

1. `index.html` → `pages/index.tsx`
2. `pages/how-it-works.html` → `pages/how-it-works.tsx`
3. `pages/subsystems.html` → `pages/subsystems.tsx`
4. `pages/dashboard.html` → `pages/dashboard.tsx`
5. `pages/sustainability.html` → `pages/sustainability.tsx`
6. `pages/about.html` → `pages/about.tsx`

## 🗄️ Database Schema

### Air Quality Collection
```javascript
{
  _id: ObjectId,
  co2: Number,
  pm25: Number,
  so2: Number,
  temperature: Number,
  humidity: Number,
  o2: Number,
  createdAt: Date
}
```

### Water System Collection
```javascript
{
  _id: ObjectId,
  reservoir: Number,
  flow: Number,
  generation: Number,
  purity: Number,
  createdAt: Date
}
```

## 🐳 Docker Deployment

```bash
docker-compose up -d
```

Starts:
- Frontend on port 3000
- Backend on port 3001
- MongoDB on port 27017

## 📝 Implementation Timeline

### Phase 1: Setup (1 hour)
- ✅ Create project structure
- ✅ Install dependencies
- ✅ Configure environment

### Phase 2: API Layer (2-3 hours)
- Create all endpoints
- Set up database models
- Implement services

### Phase 3: Frontend Migration (4-6 hours)
- Convert pages to React
- Integrate API calls
- Update styling to Tailwind

### Phase 4: Testing & Deployment (2-3 hours)
- Write tests
- Configure Docker
- Deploy to production

## 🔧 Useful Commands

**Frontend**
```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run lint       # Run ESLint
npm start          # Start production server
```

**Backend**
```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## 📚 Technology Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios
- Recharts

### Backend
- Nest.js 10
- TypeORM
- MongoDB
- JWT Authentication
- CORS/Helmet

## 🔐 Security Considerations

1. **Environment Variables** - Keep secrets in .env files
2. **CORS** - Configure allowed origins
3. **Validation** - All inputs validated server-side
4. **JWT** - Implement token-based auth when needed
5. **HTTPS** - Use in production
6. **Rate Limiting** - Implement per endpoint

## 📞 Support

For issues or questions:
1. Check the existing pages for patterns
2. Review Nest.js documentation: https://docs.nestjs.com
3. Review Next.js documentation: https://nextjs.org/docs

## 🎯 Next Steps

1. Install dependencies
2. Start MongoDB
3. Run frontend: `npm run dev`
4. Run backend: `npm run dev`
5. Begin converting pages one by one
