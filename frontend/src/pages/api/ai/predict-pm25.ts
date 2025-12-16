import type { NextApiRequest, NextApiResponse } from 'next';

interface ResponseData {
  predictions?: number[];
  rmse?: number;
  next_7_days?: number[];
  error?: string;
}

/**
 * POST /api/ai/predict-pm25
 * Predicts next day PM2.5 value using LSTM model
 * Requires 60-day historical sequence
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    const pythonServiceUrl = process.env.PYTHON_API_URL || 'http://localhost:8000';
    const response = await fetch(`${pythonServiceUrl}/predict-pm25`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      throw new Error('Python service error');
    }

    const predictions = await response.json();
    res.status(200).json(predictions);
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
