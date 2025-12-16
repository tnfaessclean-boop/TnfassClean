# Bio-Digital System - Full Stack API Documentation

## Overview

RESTful API for the Bio-Digital System built with Nest.js and MongoDB.

**Base URL:** `http://localhost:3001/api`

**Authentication:** JWT Bearer Token (when implemented)

## Response Format

All endpoints return JSON responses:

```json
{
  "success": true,
  "data": {},
  "message": "Success message"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error type",
  "message": "Error description",
  "statusCode": 400
}
```

---

## Air Quality Endpoints

### Get Current Air Quality

**Endpoint:** `GET /air-quality/current`

**Description:** Returns the latest air quality measurements

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "co2": 410.5,
    "pm25": 12.3,
    "so2": 8.2,
    "temperature": 22.5,
    "humidity": 65,
    "o2": 20.9,
    "createdAt": "2024-12-09T10:30:00Z"
  }
}
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

### Get Air Quality History

**Endpoint:** `GET /air-quality/history`

**Description:** Returns historical air quality data

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| days | number | 7 | Number of days to retrieve |

**Example:** `GET /air-quality/history?days=14`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "co2": 410.5,
      "pm25": 12.3,
      "so2": 8.2,
      "temperature": 22.5,
      "humidity": 65,
      "o2": 20.9,
      "createdAt": "2024-12-09T10:30:00Z"
    }
  ]
}
```

---

### Get Air Quality Prediction

**Endpoint:** `GET /air-quality/prediction`

**Description:** Returns predicted air quality values (stub - to be implemented)

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| hours | number | 24 | Hours to predict ahead |

**Example:** `GET /air-quality/prediction?hours=48`

---

### Create Air Quality Record

**Endpoint:** `POST /air-quality`

**Description:** Add new air quality measurement (admin only when auth implemented)

**Request Body:**
```json
{
  "co2": 410.5,
  "pm25": 12.3,
  "so2": 8.2,
  "temperature": 22.5,
  "humidity": 65,
  "o2": 20.9
}
```

**Response:** Created record with `_id` and `createdAt`

---

## Water System Endpoints

### Get Current Water System Status

**Endpoint:** `GET /water-system/current`

**Description:** Returns current water system metrics

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "reservoir": 85.5,
    "flow": 245.3,
    "generation": 1250.8,
    "purity": 96.2,
    "createdAt": "2024-12-09T10:30:00Z"
  }
}
```

---

### Get Water System History

**Endpoint:** `GET /water-system/history`

**Description:** Returns historical water system data

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| days | number | 7 | Number of days to retrieve |

---

### Create Water System Record

**Endpoint:** `POST /water-system`

**Description:** Add new water system measurement

**Request Body:**
```json
{
  "reservoir": 85.5,
  "flow": 245.3,
  "generation": 1250.8,
  "purity": 96.2
}
```

---

## Dashboard Endpoints

### Get All Metrics

**Endpoint:** `GET /dashboard/metrics`

**Description:** Returns aggregated metrics from all systems

**Response:**
```json
{
  "success": true,
  "data": {
    "airQuality": {
      "current": {},
      "history": []
    },
    "waterSystem": {
      "current": {},
      "history": []
    },
    "timestamp": "2024-12-09T10:30:00Z"
  }
}
```

---

## System Status Endpoints

### Get System Status

**Endpoint:** `GET /system/status`

**Description:** Returns overall system health status

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "uptime": 3600,
    "lastCheck": "2024-12-09T10:30:00Z"
  }
}
```

---

### Get Active Alerts

**Endpoint:** `GET /system/alerts`

**Description:** Returns active system alerts

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "alert-001",
      "type": "warning",
      "message": "High CO2 levels detected",
      "severity": "medium",
      "createdAt": "2024-12-09T10:30:00Z"
    }
  ]
}
```

---

### Get Performance Metrics

**Endpoint:** `GET /system/performance`

**Description:** Returns system performance statistics

**Response:**
```json
{
  "success": true,
  "data": {
    "responseTime": 45,
    "requestsPerSecond": 120,
    "memoryUsage": 256,
    "cpuUsage": 32
  }
}
```

---

## Error Handling

### Common Error Codes

| Code | Message | Cause |
|------|---------|-------|
| 400 | Bad Request | Invalid parameters |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Database connection error |

### Example Error Response

```json
{
  "success": false,
  "error": "ValidationError",
  "message": "Invalid temperature value. Must be between -50 and 60",
  "statusCode": 400
}
```

---

## Authentication (Future Implementation)

When authentication is enabled, include JWT token in header:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:3001/api/air-quality/current
```

---

## Rate Limiting

Rate limiting will be implemented to prevent abuse:
- Public endpoints: 100 requests/minute
- Authenticated endpoints: 1000 requests/minute
- Admin endpoints: 5000 requests/minute

---

## Pagination

For endpoints returning multiple records:

**Query Parameters:**
```
?page=1&limit=20&sort=createdAt&order=desc
```

---

## CORS Configuration

CORS is enabled for:
- Local development: `http://localhost:3000`
- Production: Configure via `CORS_ORIGIN` environment variable

---

## Versioning

Current API version: `v1`

Future API versions will be accessible at `/api/v2`, `/api/v3`, etc.

---

## Integration Examples

### JavaScript/Fetch

```javascript
// Get current air quality
const response = await fetch('http://localhost:3001/api/air-quality/current');
const data = await response.json();
console.log(data.data);
```

### Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

// Get current readings
const { data } = await api.get('/air-quality/current');
```

### cURL

```bash
curl http://localhost:3001/api/air-quality/current
```

---

## Webhook Support (Future)

Webhooks for real-time notifications:
- High pollution alerts
- System anomalies
- Data thresholds exceeded

---

## Monitoring & Logging

All requests are logged with:
- Timestamp
- Method & endpoint
- Response status
- Duration
- User/client info (when auth enabled)

Access logs: `backend/logs/requests.log`
Error logs: `backend/logs/errors.log`

---

## Support & Feedback

For API issues or feature requests, contact: support@bio-digital.dev
