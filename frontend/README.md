# Bio-Digital System - Frontend

Next.js frontend for the Bio-Digital System with real-time data visualization and dashboard.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

### Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
frontend/
├── components/          # Reusable React components
│   ├── Layout.tsx       # Main layout wrapper
│   └── DashboardOverview.tsx  # Dashboard component
├── pages/              # Next.js pages
│   ├── _app.tsx        # App wrapper
│   ├── index.tsx       # Homepage
│   ├── dashboard.tsx   # Dashboard page
│   ├── how-it-works.tsx
│   ├── subsystems.tsx
│   ├── sustainability.tsx
│   └── about.tsx
├── lib/
│   └── api/
│       ├── client.ts   # Axios client with JWT interceptor
│       └── endpoints.ts # API endpoint definitions
├── public/             # Static assets
├── styles/             # Global styles
├── next.config.js      # Next.js configuration
├── tsconfig.json       # TypeScript configuration
└── .env.local         # Environment variables
```

## 🛠 Configuration

### Environment Variables (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Bio-Digital System
```

## 📦 Dependencies

### Core
- **next** (14.x) - React framework
- **react** (18.x) - UI library
- **react-dom** (18.x) - DOM rendering

### API & Data
- **axios** - HTTP client
- **recharts** - React charts library
- **chart.js** - Charting library

### Styling
- **tailwindcss** - Utility-first CSS
- **autoprefixer** - CSS vendor prefixing

### Development
- **typescript** - Type safety
- **eslint** - Code linting
- **tailwindcss** - CSS framework

## 🎨 Components

### Layout Component

Main layout wrapper for all pages with navigation and footer.

```tsx
import { Layout } from '@/components/Layout';

export default function Page() {
  return (
    <Layout title="Page Title">
      {/* Content */}
    </Layout>
  );
}
```

### DashboardOverview Component

Real-time metrics display with data fetching.

```tsx
import { DashboardOverview } from '@/components/DashboardOverview';

export default function Dashboard() {
  return <DashboardOverview />;
}
```

## 🔌 API Integration

### Using the API Client

```typescript
import { api } from '@/lib/api/client';
import { 
  getAirQualityCurrent, 
  getWaterSystemCurrent 
} from '@/lib/api/endpoints';

// Get current air quality
const airQuality = await getAirQualityCurrent();

// Get water system metrics
const water = await getWaterSystemCurrent();
```

### JWT Authentication

JWT tokens are automatically attached to requests:

```typescript
// Token is read from localStorage and injected
// Set token with:
localStorage.setItem('authToken', token);

// Token is automatically sent in Authorization header:
// Authorization: Bearer {token}

// On 401 response, token is cleared
```

## 📱 Pages

### Home Page (index.tsx)
Landing page with hero section and feature overview

### Dashboard (dashboard.tsx)
Real-time system metrics and visualization

### How It Works (how-it-works.tsx)
11-step workflow explanation

### Subsystems (subsystems.tsx)
Detailed subsystem information

### Sustainability (sustainability.tsx)
Environmental impact and sustainability metrics

### About (about.tsx)
Project information and team

## 🎯 Development Workflow

1. **Create Component**
```tsx
// components/NewComponent.tsx
export function NewComponent() {
  return <div>Component</div>;
}
```

2. **Use in Page**
```tsx
// pages/new-page.tsx
import { NewComponent } from '@/components/NewComponent';

export default function NewPage() {
  return (
    <Layout title="New Page">
      <NewComponent />
    </Layout>
  );
}
```

3. **Fetch Data**
```tsx
import { useEffect, useState } from 'react';
import { getAirQualityCurrent } from '@/lib/api/endpoints';

export function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAirQualityCurrent().then(setData);
  }, []);

  return <div>{/* Render data */}</div>;
}
```

## 🧪 Testing

Run tests with Jest:

```bash
npm run test
```

Coverage report:

```bash
npm run test:coverage
```

## 🔍 Linting

Check code quality:

```bash
npm run lint
```

Fix linting issues:

```bash
npm run lint:fix
```

## 📦 Building & Deployment

### Build for Production

```bash
npm run build
```

Creates optimized production bundle in `.next/`

### Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Docker Deployment

```bash
docker build -t bio-digital-frontend .
docker run -p 3000:3000 bio-digital-frontend
```

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Find process on port 3000
netstat -ano | findstr :3000

# Kill process
taskkill /PID {PID} /F

# Or use different port
npm run dev -- -p 3001
```

### API Connection Error
- Verify backend is running on http://localhost:3001
- Check `NEXT_PUBLIC_API_URL` in .env.local
- Check browser console for CORS errors

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [Axios](https://axios-http.com)

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/my-feature`
4. Submit pull request

## 📝 License

This project is part of the Bio-Digital System initiative.

## 📞 Support

For issues or questions:
- Check existing documentation
- Review example components
- Check API documentation at `/API_DOCUMENTATION.md`
