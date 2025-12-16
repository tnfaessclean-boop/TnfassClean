import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHealth() {
    return {
      status: 'success',
      message: 'TnafesClean API is running',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      endpoints: {
        health: 'GET /',
        airQualityCurrent: 'GET /api/air-quality/current',
        airQualityHistory: 'GET /api/air-quality/history',
        airQualityPrediction: 'GET /api/air-quality/prediction',
      },
    };
  }

  @Get('health')
  healthCheck() {
    return {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
