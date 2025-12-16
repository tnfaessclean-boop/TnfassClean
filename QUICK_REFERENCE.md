# 🚀 Quick Reference Card

## Installation (5 minutes)

```bash
# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install

# MongoDB (pick one)
# Option 1: Local
mongod

# Option 2: Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Running the Stack

**Terminal 1: Backend**
```bash
cd backend
npm run dev
# Runs on http://localhost:3001
```

**Terminal 2: Frontend**
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

**Terminal 3: MongoDB (if not auto-started)**
```bash
mongod
```

## Docker (One Command)

```bash
docker-compose up -d
```

All services start automatically:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- MongoDB: mongodb://localhost:27017

## Environment Variables

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Backend (.env)**
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/bio-digital
JWT_SECRET=secret-key-change-in-prod
CORS_ORIGIN=http://localhost:3000
```

## API Endpoints

```
GET  /api/air-quality/current
GET  /api/air-quality/history?days=7
POST /api/air-quality

GET  /api/water-system/current
GET  /api/water-system/history?days=7
POST /api/water-system

GET  /api/dashboard/metrics

GET  /api/system/status
GET  /api/system/alerts
GET  /api/system/performance
```

## Common Commands

### Frontend
```bash
npm run dev          # Dev server
npm run build        # Production build
npm start            # Production server
npm run lint         # Check code quality
npm run lint:fix     # Fix issues
```

### Backend
```bash
npm run dev          # Dev server
npm run build        # Compile TypeScript
npm start            # Production server
npm run lint         # Check code quality
npm run lint:fix     # Fix issues
npm run test         # Run tests
```

## Project Structure

```
bio-digital-fullstack/
├── frontend/                 # Next.js App
│   ├── pages/               # React pages
│   ├── components/          # Reusable components
│   ├── lib/api/             # API client
│   └── public/              # Static files
│
├── backend/                 # Nest.js App
│   └── src/
│       ├── controllers/     # Route handlers
│       ├── services/        # Business logic
│       ├── entities/        # DB models
│       └── modules/         # Feature modules
│
├── docker-compose.yml
├── README.md
├── API_DOCUMENTATION.md
├── MIGRATION_GUIDE.md
└── IMPLEMENTATION_ROADMAP.md
```

## Testing APIs

### cURL
```bash
# Get current air quality
curl http://localhost:3001/api/air-quality/current

# Create new reading
curl -X POST http://localhost:3001/api/air-quality \
  -H "Content-Type: application/json" \
  -d '{"co2":410,"pm25":12,"so2":8,"temperature":22,"humidity":65,"o2":20.9}'
```

### Browser
```javascript
// In console
fetch('http://localhost:3001/api/air-quality/current')
  .then(r => r.json())
  .then(d => console.log(d))
```

### Axios (from frontend)
```javascript
import { getAirQualityCurrent } from '@/lib/api/endpoints';

const data = await getAirQualityCurrent();
```

## Troubleshooting

### Port Already in Use
```bash
# Find process on port
netstat -ano | findstr :3000  # Frontend
netstat -ano | findstr :3001  # Backend

# Kill it
taskkill /PID {PID} /F
```

### MongoDB Won't Connect
- Verify mongod is running
- Check connection string in .env
- Try: `mongo mongodb://localhost:27017/bio-digital`

### Dependencies Error
```bash
rm -r node_modules package-lock.json
npm install
```

### Build Error
```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && npm run build
```

## Next Steps

1. **Phase 1**: Install dependencies ✅
2. **Phase 2**: Convert HTML pages to React ⏳
3. **Phase 3**: Complete backend services ⏳
4. **Phase 4**: Add tests ⏳
5. **Phase 5**: Deploy ⏳

## Important Paths

**Frontend API**: `/frontend/lib/api/`
**Backend Controllers**: `/backend/src/controllers/`
**Backend Services**: `/backend/src/services/`
**Database Entities**: `/backend/src/entities/`

## Documentation

| File | Purpose |
|------|---------|
| `README.md` | Main overview |
| `API_DOCUMENTATION.md` | All endpoints |
| `MIGRATION_GUIDE.md` | HTML→React conversion |
| `IMPLEMENTATION_ROADMAP.md` | Task checklist |
| `PROJECT_COMPLETION_SUMMARY.md` | What's done |
| `frontend/README.md` | Frontend guide |
| `backend/README.md` | Backend guide |

## Key Technologies

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Nest.js 10, TypeORM, MongoDB
- **API**: REST with Axios client
- **Auth**: JWT ready to implement
- **Deployment**: Docker & Docker Compose

## JWT Usage (When Implemented)

```typescript
// Set token
localStorage.setItem('authToken', token);

// Token auto-attached to all requests
// Authorization: Bearer {token}

// 401 response auto-clears token
```

## Production Checklist

- [ ] Change JWT_SECRET in .env
- [ ] Update CORS_ORIGIN for production URL
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Configure MongoDB Atlas
- [ ] Set up CI/CD pipeline
- [ ] Add rate limiting
- [ ] Enable logging
- [ ] Create backups
- [ ] Setup monitoring

## Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Nest.js Docs](https://docs.nestjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [TypeORM Docs](https://typeorm.io)
- [Tailwind CSS](https://tailwindcss.com)

## File Counts

- **Configuration Files**: 10+
- **Component Files**: 2+ (expandable)
- **Service Files**: 1+ (expandable)
- **Entity Files**: 2
- **Documentation Files**: 7
- **Docker Files**: 3
- **Total Files**: 25+

---

**Remember**: Start with Phase 2 - Install Dependencies!

```bash
cd frontend && npm install
cd ../backend && npm install
```

Then start the servers and visit http://localhost:3000 🎉
