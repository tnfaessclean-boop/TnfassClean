import { Module } from '@nestjs/common';
import { AirQualityService } from '../../services/air-quality.service';
import { AirQualityController } from '../../controllers/air-quality.controller';

@Module({
  providers: [AirQualityService],
  controllers: [AirQualityController],
  exports: [AirQualityService],
})
export class AirQualityModule {}
