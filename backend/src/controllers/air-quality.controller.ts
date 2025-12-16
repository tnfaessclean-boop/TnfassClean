import { Controller, Get, Query } from '@nestjs/common';
import { AirQualityService } from '../services/air-quality.service';
import { AirQualityEntity } from '../entities/air-quality.entity';

@Controller('api/air-quality')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) {}

  @Get('current')
  getCurrent(): AirQualityEntity {
    return this.airQualityService.getCurrent();
  }

  @Get('history')
  getHistory(@Query('days') days: number = 7): AirQualityEntity[] {
    return this.airQualityService.getHistory(days);
  }

  @Get('prediction')
  getPrediction(@Query('hours') hours: number = 24) {
    return {
      prediction: 'Slight increase expected',
      hours,
      model: 'Linear Regression',
    };
  }
}
