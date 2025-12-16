import type { NextApiRequest, NextApiResponse } from 'next';

interface ResponseData {
  cluster?: number;
  silhouette_score?: number;
  features?: string[];
  error?: string;
}

/**
 * POST /api/ai/clustering
 * Proxies biofilter sensor data to Python FastAPI service
 * Returns cluster assignment and analysis metrics
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const sensorData = req.body;
    const pythonServiceUrl = process.env.PYTHON_API_URL || 'http://localhost:8000';

    const response = await fetch(`${pythonServiceUrl}/clustering`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sensorData),
    });

    if (!response.ok) {
      throw new Error('Python service error');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Clustering error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
