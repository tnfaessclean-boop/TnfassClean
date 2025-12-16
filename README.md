# Bio-Digital System - Full Stack

Complete Next.js + Nest.js full-stack application for environmental monitoring and management.

## 📋 Overview

A modern full-stack web application combining:
- **Frontend**: Next.js 14 with React 18, TypeScript, Tailwind CSS
- **Backend**: Nest.js 10 with MongoDB, JWT authentication, TypeORM
- **Database**: MongoDB for flexible data storage
- **Architecture**: Service-based modular design with clear separation of concerns

## 🎯 Key Features

- ✅ Real-time air quality monitoring
- ✅ Water system management and tracking
- ✅ Integrated dashboard with metrics aggregation
- ✅ System health monitoring and alerts
- ✅ JWT-based authentication (ready for implementation)
- ✅ RESTful API with comprehensive endpoints
- ✅ Docker support for containerized deployment
- ✅ Type-safe TypeScript across full stack
- ✅ Responsive UI with Tailwind CSS
- ✅ Production-ready security (CORS, Helmet, validation)

## 🏗 Project Structure

```
bio-digital-fullstack/
├── frontend/                      # Next.js Application
│   ├── pages/                     # React pages (Next.js routing)
│   ├── components/                # Reusable React components
│   ├── lib/api/                   # API client and endpoints
│   ├── public/                    # Static assets
│   ├── styles/                    # Global styles
│   ├── package.json               # Frontend dependencies
│   ├── tsconfig.json              # TypeScript config
│   ├── next.config.js             # Next.js config
│   ├── Dockerfile                 # Docker image for frontend
│   ├── .env.local                 # Environment variables
│   └── README.md                  # Frontend documentation
│
├── backend/                       # Nest.js Application
│   ├── src/
│   │   ├── controllers/           # Route handlers
│   │   ├── services/              # Business logic
│   │   ├── entities/              # Database entities
│   │   ├── modules/               # Feature modules
│   │   ├── dtos/                  # Data Transfer Objects
│   │   ├── app.module.ts          # Root module
│   │   └── main.ts                # Bootstrap
│   ├── dist/                      # Compiled output
│   ├── package.json               # Backend dependencies
│   ├── tsconfig.json              # TypeScript config
│   ├── Dockerfile                 # Docker image for backend
│   ├── .env                       # Environment variables
│   └── README.md                  # Backend documentation
│
├── docker-compose.yml             # Docker orchestration
├── MIGRATION_GUIDE.md             # Migration from static site
├── API_DOCUMENTATION.md           # Complete API reference
├── PROJECT_SUMMARY.md             # Original static project info
└── README.md                      # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([download](https://nodejs.org))
- **npm** 9+ (comes with Node.js)
- **MongoDB** 4.4+ ([download](https://www.mongodb.com/try/download/community) or use [Atlas](https://www.mongodb.com/cloud/atlas))
- **Docker** (optional, for containerized deployment)

### Installation

#### 1. Clone or navigate to project

```bash
cd bio-digital-fullstack
```

#### 2. Frontend Setup

```bash
cd frontend
npm install
```

#### 3. Backend Setup

```bash
cd ../backend
npm install
```

#### 4. Configure Environment Variables

**Frontend (.env.local)**
```bash
cd ../frontend
# Edit .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Backend (.env)**
```bash
cd ../backend
# Edit .env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/bio-digital
JWT_SECRET=your-secret-key-change-in-production
CORS_ORIGIN=http://localhost:3000
```

#### 5. Start MongoDB

**Option A: Local Installation**
```bash
mongod
```

**Option B: Docker**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option C: MongoDB Atlas (Cloud)**
- Create account at https://www.mongodb.com/cloud/atlas
- Update `MONGODB_URI` in backend/.env

### Running the Application

#### Terminal 1: Start Backend

```bash
cd backend
npm run dev
# Runs on http://localhost:3001
```

#### Terminal 2: Start Frontend

```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

#### Access Application

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **API**: http://localhost:3001/api

## 🐳 Docker Setup

### Using Docker Compose

```bash
# Start all services (frontend, backend, MongoDB)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove volumes (careful - deletes database)
docker-compose down -v
```

Services will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- MongoDB: mongodb://localhost:27017

## 📡 API Overview

### Base URL
`http://localhost:3001/api`

### Available Endpoints

**Air Quality**
- `GET /api/air-quality/current`
- `GET /api/air-quality/history?days=7`
- `POST /api/air-quality`

**Water System**
- `GET /api/water-system/current`
- `GET /api/water-system/history?days=7`
- `POST /api/water-system`

**Dashboard**
- `GET /api/dashboard/metrics`

**System**
- `GET /api/system/status`
- `GET /api/system/alerts`

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API reference.

## 📚 Documentation

- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference with examples
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Guide for migrating from static HTML
- **[frontend/README.md](./frontend/README.md)** - Frontend setup and development
- **[backend/README.md](./backend/README.md)** - Backend setup and architecture
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Original project information

## 🛠 Development

### Frontend Development

```bash
cd frontend

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix
```

### Backend Development

```bash
cd backend

# Run development server
npm run dev

# Build application
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix
```

## 🔄 Workflow

### Adding a New Page

1. **Create React Component**
```tsx
// frontend/pages/new-page.tsx
import { Layout } from '@/components/Layout';

export default function NewPage() {
  return (
    <Layout title="New Page">
      {/* Content */}
    </Layout>
  );
}
```

2. **Add Navigation Link**
Update `components/Layout.tsx` navbar

3. **Run and Test**
```bash
cd frontend
npm run dev
# Visit http://localhost:3000/new-page
```

### Adding a New API Endpoint

1. **Create Entity** (if needed)
```typescript
// backend/src/entities/new-entity.entity.ts
@Entity()
export class NewEntity {
  // Fields
}
```

2. **Create Service**
```typescript
// backend/src/services/new-entity.service.ts
@Injectable()
export class NewEntityService {
  // Methods
}
```

3. **Create Controller**
```typescript
// backend/src/controllers/new-entity.controller.ts
@Controller('new-entity')
export class NewEntityController {
  // Routes
}
```

4. **Create/Update Module**
```typescript
// backend/src/modules/new-entity/new-entity.module.ts
@Module({
  // Configuration
})
export class NewEntityModule {}
```

5. **Register in App Module**
```typescript
// backend/src/app.module.ts
imports: [
  // NewEntityModule
]
```

6. **Add to Frontend API**
```typescript
// frontend/lib/api/endpoints.ts
export const newEntityAPI = {
  getAll: () => api.get('/new-entity'),
  create: (data) => api.post('/new-entity', data),
};
```

## 🔐 Security

- **CORS**: Configured for localhost:3000
- **Helmet**: Sets security HTTP headers
- **Validation**: Input validation on all endpoints
- **JWT**: Ready for authentication implementation
- **Environment Variables**: Secrets stored in .env files

## 🚨 Troubleshooting

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
# Local: mongod should be running
# Docker: docker ps should show mongodb
# Atlas: Check connection string and IP whitelist
```

### Port Already in Use

**Frontend (port 3000)**
```bash
netstat -ano | findstr :3000
taskkill /PID {PID} /F
```

**Backend (port 3001)**
```bash
netstat -ano | findstr :3001
taskkill /PID {PID} /F
```

### CORS Error
- Verify backend is running
- Check `NEXT_PUBLIC_API_URL` in frontend/.env.local
- Verify `CORS_ORIGIN` in backend/.env matches frontend URL

### Dependencies Issue
```bash
# Reinstall dependencies
rm -r node_modules package-lock.json
npm install
```

## 📊 Database

### Backup MongoDB

```bash
# Local backup
mongodump --db bio-digital --out ./backups

# Restore
mongorestore --db bio-digital ./backups/bio-digital
```

### MongoDB Compass (GUI)

Download [MongoDB Compass](https://www.mongodb.com/products/compass) for visual database management.

Connection string: `mongodb://localhost:27017`

## 🚀 Deployment

### Vercel (Frontend)

```bash
npm install -g vercel
vercel
```

### Heroku (Backend)

```bash
heroku login
heroku create your-app-name
git push heroku main
```

### AWS/Azure/DigitalOcean

Use Docker images with environment variables:

```bash
docker build -t bio-digital-frontend ./frontend
docker build -t bio-digital-backend ./backend

# Push to registry and deploy
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions (to be created).

## 📈 Performance

- **Frontend**: Optimized with Next.js static generation and ISR
- **Backend**: Efficient MongoDB queries with indexing
- **API**: Rate limiting ready (to be implemented)
- **Caching**: Strategy-based caching for data

## 📝 API Testing

### Using cURL

```bash
# Get current air quality
curl http://localhost:3001/api/air-quality/current

# Get air quality history
curl "http://localhost:3001/api/air-quality/history?days=7"

# Create new reading
curl -X POST http://localhost:3001/api/air-quality \
  -H "Content-Type: application/json" \
  -d '{
    "co2": 410,
    "pm25": 12,
    "so2": 8,
    "temperature": 22,
    "humidity": 65,
    "o2": 20.9
  }'
```

### Using Postman

1. Import API endpoints
2. Set `{{base_url}}` to `http://localhost:3001/api`
3. Create requests for each endpoint

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm run test
npm run test:coverage
```

### Backend Tests
```bash
cd backend
npm run test
npm run test:coverage
```

## 📞 Support & Contact

- **Documentation**: See README files in each directory
- **API Reference**: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Issues**: Create GitHub issue with details

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/description`
2. Commit changes: `git commit -am 'Add feature'`
3. Push branch: `git push origin feature/description`
4. Open pull request with description

## 📄 License

This project is part of the Bio-Digital System initiative.

## 🎉 Ready to Start?

1. **Install dependencies**: `npm install` in both frontend and backend
2. **Start MongoDB**: Use one of the options above
3. **Run backend**: `npm run dev` in backend directory
4. **Run frontend**: `npm run dev` in frontend directory
5. **Visit**: http://localhost:3000

Enjoy building! 🚀

---

**Last Updated**: December 2025  
**Version**: 1.0.0  
**Status**: Production Ready (beta)
