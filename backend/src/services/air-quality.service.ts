import { Injectable } from '@nestjs/common';
import { AirQualityEntity } from '../entities/air-quality.entity';

@Injectable()
export class AirQualityService {
  private data: AirQualityEntity[] = [];

  constructor() {
    // Initialize with mock data
    this.data.push(
      new AirQualityEntity(410.5, 12.3, 8.2, 22.5, 65, 20.9),
      new AirQualityEntity(408.2, 11.8, 7.9, 22.1, 64, 20.95),
      new AirQualityEntity(412.1, 13.1, 8.5, 23.2, 66, 20.85),
    );
  }

  getCurrent(): AirQualityEntity {
    return this.data[this.data.length - 1] || this.getDefaultAirQuality();
  }

  getHistory(days: number): AirQualityEntity[] {
    return this.data;
  }

  create(data: Partial<AirQualityEntity>): AirQualityEntity {
    const newReading = new AirQualityEntity(
      data.co2 || 410,
      data.pm25 || 12,
      data.so2 || 8,
      data.temperature || 22,
      data.humidity || 65,
      data.o2 || 20.9,
    );
    this.data.push(newReading);
    return newReading;
  }

  getDefaultAirQuality(): AirQualityEntity {
    return new AirQualityEntity(410.5, 12.3, 8.2, 22.5, 65, 20.9);
  }
}
