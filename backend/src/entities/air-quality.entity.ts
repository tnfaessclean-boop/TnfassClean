export class AirQualityEntity {
  _id?: string;
  co2: number;
  pm25: number;
  so2: number;
  temperature: number;
  humidity: number;
  o2: number;
  createdAt?: Date;

  constructor(
    co2: number,
    pm25: number,
    so2: number,
    temperature: number,
    humidity: number,
    o2: number,
  ) {
    this.co2 = co2;
    this.pm25 = pm25;
    this.so2 = so2;
    this.temperature = temperature;
    this.humidity = humidity;
    this.o2 = o2;
    this.createdAt = new Date();
  }
}
