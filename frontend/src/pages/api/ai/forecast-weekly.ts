import type { NextApiRequest, NextApiResponse } from 'next';

interface ResponseData {
  forecast?: number[];
  error?: string;
}

/**
 * GET /api/ai/forecast-weekly
 * Fetches 7-day air quality forecast from Python FastAPI service
 * Uses LSTM model predictions
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const pythonServiceUrl = process.env.PYTHON_API_URL || 'http://localhost:8000';
    const response = await fetch(`${pythonServiceUrl}/forecast-weekly`);

    if (!response.ok) {
      throw new Error('Python service error');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Forecast error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
