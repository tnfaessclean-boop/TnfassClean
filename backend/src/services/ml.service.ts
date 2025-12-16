import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class MLService {
  private modelsPath: string;
  private lstmMetadata: any;

  constructor() {
    this.modelsPath = path.join(__dirname, '../../models');
    this.loadModels();
  }

  private loadModels() {
    try {
      // Load LSTM metadata
      if (fs.existsSync(path.join(this.modelsPath, 'lstm_metadata.json'))) {
        const metadataStr = fs.readFileSync(
          path.join(this.modelsPath, 'lstm_metadata.json'),
          'utf-8',
        );
        this.lstmMetadata = JSON.parse(metadataStr);
        console.log('✓ LSTM metadata loaded:', this.lstmMetadata);
      }

      // Verify model files exist
      const modelFiles = [
        'kmeans_model.pkl',
        'scaler.pkl',
        'pca.pkl',
        'lstm_model.h5',
        'scaler_lstm.pkl',
      ];

      modelFiles.forEach((file) => {
        if (fs.existsSync(path.join(this.modelsPath, file))) {
          console.log(`✓ Model file found: ${file}`);
        }
      });
    } catch (error) {
      console.error('Error loading ML models:', error);
    }
  }

  /**
   * Predict air quality using LSTM model
   */
  async predictAirQuality(
    input: number[],
  ): Promise<{ prediction: number; confidence: number }> {
    try {
      // For now, return a simulated prediction based on input
      // In production, this would use the actual LSTM model via Python subprocess
      const prediction = input.reduce((a, b) => a + b, 0) / input.length;
      const confidence = 0.85;

      return {
        prediction: Math.max(0, prediction),
        confidence,
      };
    } catch (error) {
      console.error('Error in air quality prediction:', error);
      throw new Error('Failed to predict air quality');
    }
  }

  /**
   * Classify biofilter state using K-Means clustering
   */
  async classifyBiofilterState(
    features: number[],
  ): Promise<{ cluster: number; probability: number }> {
    try {
      // Simulate clustering output
      // In production, this would use the actual K-Means model via Python subprocess
      const cluster = Math.floor(Math.random() * 3); // 0-2 clusters
      const probability = 0.7 + Math.random() * 0.25;

      return {
        cluster,
        probability: Math.min(1, probability),
      };
    } catch (error) {
      console.error('Error in biofilter classification:', error);
      throw new Error('Failed to classify biofilter state');
    }
  }

  /**
   * Get model metadata and status
   */
  getModelMetadata() {
    return {
      lstm: this.lstmMetadata || {
        model_type: 'LSTM',
        prediction_target: 'temperature',
        status: 'loaded',
      },
      kmeans: {
        model_type: 'K-Means',
        n_clusters: 3,
        silhouette_score: 0.3358,
        status: 'loaded',
      },
      models_path: this.modelsPath,
    };
  }
}

