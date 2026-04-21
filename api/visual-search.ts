import type { VercelRequest, VercelResponse } from '@vercel/node';
import vision from '@google-cloud/vision';
import formidable from 'formidable';
import fs from 'fs';

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Initialize Google Vision API client
const getVisionClient = () => {
  try {
    // Option 1: Use credentials from environment variable (Recommended)
    if (process.env.GOOGLE_CREDENTIALS) {
      const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
      return new vision.ImageAnnotatorClient({
        credentials,
      });
    }

    // Option 2: Use key file path
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      return new vision.ImageAnnotatorClient();
    }

    throw new Error('Google Cloud credentials not found');
  } catch (error) {
    console.error('Vision client error:', error);
    throw error;
  }
};

// Product matching logic (customize for your database)
const matchProductsToLabels = (labels: string[]): any[] => {
  // TODO: Replace with actual database query
  // This is a mock implementation

  const productDatabase = [
    { id: 'm1', name: 'Striped Long Sleeve Tee', category: 'Tops', keywords: ['shirt', 'top', 'stripe', 'casual'] },
    { id: 'm5', name: 'Bomber Jacket', category: 'Jackets', keywords: ['jacket', 'outerwear', 'bomber', 'coat'] },
    { id: 'm4', name: 'Relaxed Fit Jeans', category: 'Denim', keywords: ['jeans', 'denim', 'pants', 'trousers'] },
    { id: 'w2', name: 'Olive Cargo Jacket', category: 'Jackets', keywords: ['jacket', 'cargo', 'outerwear', 'green'] },
    { id: 'w7', name: 'Wide Leg Denim', category: 'Denim', keywords: ['jeans', 'denim', 'pants', 'wide leg'] },
  ];

  // Score each product based on label matches
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

  // Return top matches (score > 0)
  return scoredProducts
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
};

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ success: true });
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Use POST to upload images'
    });
  }

  try {
    // Parse form data
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, // 5MB max
      keepExtensions: true,
    });

    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>(
      (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve([fields, files]);
        });
      }
    );

    // Get uploaded image
    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;

    if (!imageFile) {
      return res.status(400).json({
        error: 'No image provided',
        message: 'Please upload an image file'
      });
    }

    // Read image file
    const imageBuffer = fs.readFileSync(imageFile.filepath);

    // Initialize Vision API client
    const client = getVisionClient();

    // Perform label detection
    const [result] = await client.labelDetection({
      image: { content: imageBuffer },
    });

    const labels = result.labelAnnotations || [];

    // Extract label descriptions
    const labelDescriptions = labels
      .map(label => label.description || '')
      .filter(Boolean)
      .slice(0, 10); // Top 10 labels

    // Extract dominant colors (optional)
    const [colorResult] = await client.imageProperties({
      image: { content: imageBuffer },
    });

    const colors = colorResult.imagePropertiesAnnotation?.dominantColors?.colors || [];
    const dominantColor = colors[0]?.color;

    // Match products based on labels
    const matchedProducts = matchProductsToLabels(labelDescriptions);

    // Cleanup temp file
    fs.unlinkSync(imageFile.filepath);

    // Return results
    return res.status(200).json({
      success: true,
      labels: labelDescriptions,
      dominantColor: dominantColor ? {
        red: dominantColor.red,
        green: dominantColor.green,
        blue: dominantColor.blue,
      } : null,
      matchedProducts,
      productCount: matchedProducts.length,
    });

  } catch (error: any) {
    console.error('Visual search error:', error);

    // Return appropriate error
    if (error.code === 'PERMISSION_DENIED') {
      return res.status(403).json({
        error: 'API key invalid',
        message: 'Please check your Google Cloud credentials'
      });
    }

    return res.status(500).json({
      error: 'Visual search failed',
      message: error.message || 'An unexpected error occurred',
    });
  }
}
