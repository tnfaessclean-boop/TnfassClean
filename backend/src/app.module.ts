import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AirQualityModule } from './modules/air-quality/air-quality.module';
import { WaterSystemModule } from './modules/water-system/water-system.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { SystemModule } from './modules/system/system.module';
import { MLController } from './controllers/ml.controller';
import { MLService } from './services/ml.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AirQualityModule,
    WaterSystemModule,
    DashboardModule,
    SystemModule,
  ],
  controllers: [AppController, MLController],
  providers: [MLService],
})
export class AppModule {}
