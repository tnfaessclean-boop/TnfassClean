import apiClient from './client';

export interface AirQualityData {
  co2: number;
  pm25: number;
  so2: number;
  temperature: number;
  humidity: number;
  o2: number;
}

export interface WaterSystemData {
  reservoir: number;
  flow: number;
  generation: number;
  purity: number;
}

export interface DashboardMetrics {
  air: AirQualityData;
  water: WaterSystemData;
  timestamp: string;
}

// Air Quality Endpoints
export const airQualityAPI = {
  getCurrent: () => apiClient.get<AirQualityData>('/api/air-quality/current'),
  getHistory: (days: number = 7) =>
    apiClient.get<AirQualityData[]>('/api/air-quality/history', { params: { days } }),
  getPrediction: (hours: number = 24) =>
    apiClient.get('/api/air-quality/prediction', { params: { hours } }),
};

// Water System Endpoints
export const waterSystemAPI = {
  getCurrent: () => apiClient.get<WaterSystemData>('/api/water-system/current'),
  getHistory: (days: number = 7) =>
    apiClient.get<WaterSystemData[]>('/api/water-system/history', { params: { days } }),
  getGeneration: () => apiClient.get('/api/water-system/generation'),
};

// Dashboard Endpoints
export const dashboardAPI = {
  getMetrics: () => apiClient.get<DashboardMetrics>('/api/dashboard/metrics'),
  getAllMetrics: () => apiClient.get('/api/dashboard/all-metrics'),
};

// System Status Endpoints
export const systemAPI = {
  getStatus: () => apiClient.get('/api/system/status'),
  getAlerts: () => apiClient.get('/api/system/alerts'),
  getPerformance: () => apiClient.get('/api/system/performance'),
};
