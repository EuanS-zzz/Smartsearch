import type { VercelRequest, VercelResponse } from '@vercel/node';
import formidable from 'formidable';
import fs from 'fs';

// Product database
const productDatabase = [
  { id: 'm1', name: 'Striped Long Sleeve Tee', category: 'Tops', keywords: ['shirt', 'top', 'stripe', 'casual', 'clothing'], price: 49, image: '/images/Screenshot_2026-04-13_at_15.21.54.png' },
  { id: 'm5', name: 'Bomber Jacket', category: 'Jackets', keywords: ['jacket', 'outerwear', 'bomber', 'coat', 'clothing'], price: 149, image: '/images/Screenshot_2026-04-13_at_15.32.09.png' },
  { id: 'm4', name: 'Relaxed Fit Jeans', category: 'Denim', keywords: ['jeans', 'denim', 'pants', 'trousers', 'clothing'], price: 89, image: '/images/Screenshot_2026-04-13_at_15.31.26.png' },
  { id: 'w2', name: 'Olive Cargo Jacket', category: 'Jackets', keywords: ['jacket', 'cargo', 'outerwear', 'green', 'olive', 'clothing'], price: 129, image: '/images/Screenshot_2026-04-21_at_20.12.18.png' },
  { id: 'w7', name: 'Wide Leg Denim', category: 'Denim', keywords: ['jeans', 'denim', 'pants', 'wide leg', 'clothing'], price: 52, image: '/images/Screenshot_2026-04-21_at_20.23.26.png' },
  { id: 'm3', name: 'Classic Crewneck', category: 'Tops', keywords: ['sweatshirt', 'top', 'casual', 'grey', 'clothing'], price: 69, image: '/images/Screenshot_2026-04-13_at_15.30.51.png' },
  { id: 'w8', name: 'Striped Knit Tee', category: 'Tops', keywords: ['shirt', 'top', 'stripe', 'knit', 'clothing'], price: 48, image: '/images/Screenshot_2026-04-21_at_20.23.48.png' },
];

// Match products based on detected labels
const matchProductsToLabels = (labels: string[]) => {
  const scoredProducts = productDatabase.map(product => {
    const score = labels.reduce((total, label) => {
      const labelLower = label.toLowerCase();
      const matchesKeyword = product.keywords.some(kw =>
        labelLower.includes(kw) || kw.includes(labelLower)
      );
      return total + (matchesKeyword ? 1 : 0);
    }, 0);
    return { ...product, score };
  });

  return scoredProducts
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.GOOGLE_VISION_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'API key not configured',
        message: 'Please add GOOGLE_VISION_API_KEY to environment variables'
      });
    }

    // Parse the uploaded image
    const form = formidable({ maxFileSize: 5 * 1024 * 1024 });
    const [fields, files] = await form.parse(req);

    const imageFile = files.image?.[0];
    if (!imageFile) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // Read image and convert to base64
    const imageBuffer = fs.readFileSync(imageFile.filepath);
    const base64Image = imageBuffer.toString('base64');

    // Call Google Cloud Vision API using REST
    const visionResponse = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [{
            image: { content: base64Image },
            features: [
              { type: 'LABEL_DETECTION', maxResults: 15 },
              { type: 'IMAGE_PROPERTIES', maxResults: 1 }
            ]
          }]
        })
      }
    );

    if (!visionResponse.ok) {
      const errorData = await visionResponse.json();
      console.error('Vision API error:', errorData);
      return res.status(500).json({
        error: 'Vision API failed',
        message: errorData.error?.message || 'Unknown error'
      });
    }

    const visionData = await visionResponse.json();
    const result = visionData.responses[0];

    // Extract labels
    const labels = result.labelAnnotations?.map((l: any) => l.description) || [];

    // Extract dominant color
    const colors = result.imagePropertiesAnnotation?.dominantColors?.colors || [];
    const dominantColor = colors[0]?.color;

    // Match products
    const matchedProducts = matchProductsToLabels(labels);

    console.log(`Detected labels: ${labels.join(', ')}`);
    console.log(`Found ${matchedProducts.length} matching products`);

    return res.status(200).json({
      success: true,
      labels: labels.slice(0, 15),
      confidence: result.labelAnnotations?.[0]?.score || 0,
      dominantColor: dominantColor ? {
        red: Math.round(dominantColor.red || 0),
        green: Math.round(dominantColor.green || 0),
        blue: Math.round(dominantColor.blue || 0),
      } : null,
      matchedProducts: matchedProducts.map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        image: p.image,
        matchScore: p.score,
      })),
      productCount: matchedProducts.length,
    });

  } catch (error: any) {
    console.error('Visual search error:', error);
    return res.status(500).json({
      error: 'Search failed',
      message: error.message || 'An unexpected error occurred'
    });
  }
}
