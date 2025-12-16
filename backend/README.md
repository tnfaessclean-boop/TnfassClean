# Bio-Digital System - Backend

Nest.js REST API for the Bio-Digital System with MongoDB integration.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB 4.4+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Backend runs on `http://localhost:3001`

### Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/     # Route handlers
│   ├── services/        # Business logic
│   ├── entities/        # Database entities (TypeORM)
│   ├── modules/         # Feature modules
│   ├── dtos/            # Data Transfer Objects
│   ├── app.module.ts    # Root module
│   └── main.ts          # Application bootstrap
├── dist/                # Compiled output
├── test/                # Test files
├── package.json
├── tsconfig.json
└── .env                # Environment variables
```

## 🛠 Configuration

### Environment Variables (.env)

```
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/bio-digital
JWT_SECRET=your-secret-key-here
CORS_ORIGIN=http://localhost:3000
```

### MongoDB Connection

**Local:**
```
MONGODB_URI=mongodb://localhost:27017/bio-digital
```

**Atlas (Cloud):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bio-digital
```

**Docker:**
```
MONGODB_URI=mongodb://mongodb:27017/bio-digital
```

## 📦 Dependencies

### Core Framework
- **@nestjs/core** - NestJS framework
- **@nestjs/common** - Common decorators and utilities
- **typescript** - Language support

### Database
- **typeorm** - ORM
- **mongodb** - MongoDB driver
- **@nestjs/typeorm** - TypeORM integration

### API
- **@nestjs/passport** - Authentication
- **passport** - Authentication middleware
- **passport-jwt** - JWT strategy
- **@nestjs/jwt** - JWT utilities
- **cors** - Cross-Origin Resource Sharing
- **helmet** - Security headers

### Utilities
- **class-validator** - Input validation
- **class-transformer** - DTO transformation
- **dotenv** - Environment variables

## 🏗 Architecture

### Module Structure

```
app.module.ts
├── AirQualityModule
│   ├── AirQualityController
│   ├── AirQualityService
│   └── AirQuality Entity
├── WaterSystemModule
│   ├── WaterSystemController
│   ├── WaterSystemService
│   └── WaterSystem Entity
├── DashboardModule
│   ├── DashboardController
│   ├── DashboardService
│   └── (aggregates from other modules)
└── SystemModule
    ├── SystemController
    ├── SystemService
    └── (handles alerts and monitoring)
```

### Service Pattern

```typescript
@Injectable()
export class MyService {
  constructor(
    @InjectRepository(MyEntity)
    private repository: Repository<MyEntity>,
  ) {}

  async findAll(): Promise<MyEntity[]> {
    return this.repository.find();
  }
}
```

### Controller Pattern

```typescript
@Controller('my-resource')
export class MyController {
  constructor(private readonly myService: MyService) {}

  @Get()
  async findAll() {
    return this.myService.findAll();
  }
}
```

## 📡 API Endpoints

See [API_DOCUMENTATION.md](../API_DOCUMENTATION.md) for complete endpoint reference.

### Air Quality
- `GET /api/air-quality/current`
- `GET /api/air-quality/history`
- `POST /api/air-quality`

### Water System
- `GET /api/water-system/current`
- `GET /api/water-system/history`
- `POST /api/water-system`

### Dashboard
- `GET /api/dashboard/metrics`

### System
- `GET /api/system/status`
- `GET /api/system/alerts`

## 🗄 Database Entities

### Air Quality
```typescript
@Entity('air_quality')
export class AirQuality {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  co2: number;

  @Column()
  pm25: number;

  @Column()
  so2: number;

  @Column()
  temperature: number;

  @Column()
  humidity: number;

  @Column()
  o2: number;

  @CreateDateColumn()
  createdAt: Date;
}
```

### Water System
```typescript
@Entity('water_system')
export class WaterSystem {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  reservoir: number;

  @Column()
  flow: number;

  @Column()
  generation: number;

  @Column()
  purity: number;

  @CreateDateColumn()
  createdAt: Date;
}
```

## 📊 Data Transfer Objects (DTOs)

### Creating a DTO

```typescript
// dtos/create-air-quality.dto.ts
import { IsNumber, Min, Max } from 'class-validator';

export class CreateAirQualityDto {
  @IsNumber()
  @Min(0)
  @Max(1000)
  co2: number;

  @IsNumber()
  @Min(0)
  @Max(500)
  pm25: number;

  // ... other fields
}
```

### Using in Controller

```typescript
@Post()
async create(@Body() createAirQualityDto: CreateAirQualityDto) {
  return this.service.create(createAirQualityDto);
}
```

## 🔐 Security

### CORS
- Configured for development: `http://localhost:3000`
- Configure for production via `CORS_ORIGIN` env variable

### Helmet
- Sets security headers automatically
- Protects against common vulnerabilities

### Input Validation
- All DTOs validated with class-validator
- Global ValidationPipe in main.ts

### JWT Authentication (Future)
```typescript
@UseGuards(JwtAuthGuard)
@Get('protected')
getProtected() {
  return { message: 'Protected resource' };
}
```

## 🧪 Testing

Run tests:

```bash
npm run test
```

Watch mode:

```bash
npm run test:watch
```

Coverage:

```bash
npm run test:cov
```

## 🔍 Linting

Check code quality:

```bash
npm run lint
```

Fix issues:

```bash
npm run lint:fix
```

## 🚀 Deployment

### Docker

```bash
docker build -t bio-digital-backend .
docker run -p 3001:3001 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/bio-digital \
  -e CORS_ORIGIN=http://localhost:3000 \
  bio-digital-backend
```

### Docker Compose

```bash
docker-compose up -d
```

### Traditional Server

```bash
npm run build
npm start
```

## 📝 Adding New Features

### 1. Create Entity

```typescript
// src/entities/new-feature.entity.ts
import { Entity, Column, ObjectIdColumn, CreateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('new_features')
export class NewFeature {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;
}
```

### 2. Create DTO

```typescript
// src/dtos/create-new-feature.dto.ts
export class CreateNewFeatureDto {
  name: string;
}
```

### 3. Create Service

```typescript
// src/services/new-feature.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewFeature } from '../entities/new-feature.entity';

@Injectable()
export class NewFeatureService {
  constructor(
    @InjectRepository(NewFeature)
    private repository: Repository<NewFeature>,
  ) {}

  async create(createDto: CreateNewFeatureDto) {
    return this.repository.save(createDto);
  }

  async findAll() {
    return this.repository.find();
  }
}
```

### 4. Create Controller

```typescript
// src/controllers/new-feature.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { NewFeatureService } from '../services/new-feature.service';
import { CreateNewFeatureDto } from '../dtos/create-new-feature.dto';

@Controller('new-feature')
export class NewFeatureController {
  constructor(private readonly service: NewFeatureService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() createDto: CreateNewFeatureDto) {
    return this.service.create(createDto);
  }
}
```

### 5. Create Module

```typescript
// src/modules/new-feature/new-feature.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewFeature } from '../../entities/new-feature.entity';
import { NewFeatureService } from '../../services/new-feature.service';
import { NewFeatureController } from '../../controllers/new-feature.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NewFeature])],
  controllers: [NewFeatureController],
  providers: [NewFeatureService],
  exports: [NewFeatureService],
})
export class NewFeatureModule {}
```

### 6. Register in App Module

```typescript
// src/app.module.ts
import { NewFeatureModule } from './modules/new-feature/new-feature.module';

@Module({
  imports: [
    // ... existing imports
    NewFeatureModule,
  ],
})
export class AppModule {}
```

## 🚨 Troubleshooting

### MongoDB Connection Failed
- Verify MongoDB is running: `mongod`
- Check connection string in .env
- For Atlas: ensure IP whitelist includes your IP

### Port Already in Use
```bash
# Find process on port 3001
netstat -ano | findstr :3001

# Kill process
taskkill /PID {PID} /F
```

### TypeORM Issues
```bash
# Regenerate connection metadata
npm run typeorm migration:generate
npm run typeorm migration:run
```

## 📚 Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Passport.js](http://www.passportjs.org)

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/my-feature`
4. Submit pull request

## 📝 License

This project is part of the Bio-Digital System initiative.

## 📞 Support

For issues or questions:
- Check NestJS documentation
- Review example services and controllers
- Check API documentation at `/API_DOCUMENTATION.md`
