import {
  Controller,
  Post,
  Get,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MLService } from '../services/ml.service';

@Controller('api/ml')
export class MLController {
  constructor(private readonly mlService: MLService) {}

  @Get('status')
  getStatus() {
    return {
      status: 'active',
      models: this.mlService.getModelMetadata(),
    };
  }

  @Post('predict/air-quality')
  async predictAirQuality(
    @Body() body: { input: number[] },
  ): Promise<{ prediction: number; confidence: number }> {
    try {
      if (!body.input || !Array.isArray(body.input)) {
        throw new HttpException(
          'Input must be an array of numbers',
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.mlService.predictAirQuality(body.input);
      return result;
    } catch (error) {
      throw new HttpException(
        error.message || 'Prediction failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('classify/biofilter')
  async classifyBiofilter(
    @Body() body: { features: number[] },
  ): Promise<{ cluster: number; probability: number }> {
    try {
      if (!body.features || !Array.isArray(body.features)) {
        throw new HttpException(
          'Features must be an array of numbers',
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.mlService.classifyBiofilterState(body.features);
      return result;
    } catch (error) {
      throw new HttpException(
        error.message || 'Classification failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('models/metadata')
  getModelsMetadata() {
    return this.mlService.getModelMetadata();
  }
}
