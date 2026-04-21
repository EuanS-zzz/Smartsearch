// Alternative: Express.js Server (if not using Vercel)
// Use this if you want to deploy to Railway, Render, or your own server

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import multer from 'multer';
import vision from '@google-cloud/vision';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configure file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Initialize Google Vision client
const getVisionClient = () => {
  try {
    if (process.env.GOOGLE_CREDENTIALS) {
      const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
      return new vision.ImageAnnotatorClient({ credentials });
    }

    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      return new vision.ImageAnnotatorClient();
    }

    throw new Error('Google Cloud credentials not configured');
  } catch (error) {
    console.error('Vision client initialization error:', error);
    throw error;
  }
};

// Product matching function
const matchProductsToLabels = (labels: string[]) => {
  // Mock product database - Replace with your actual database
  const productDatabase = [
    { id: 'm1', name: 'Striped Long Sleeve Tee', category: 'Tops', keywords: ['shirt', 'top', 'stripe', 'casual'], price: 49, image: '/src/imports/Screenshot_2026-04-13_at_15.21.54.png' },
    { id: 'm5', name: 'Bomber Jacket', category: 'Jackets', keywords: ['jacket', 'outerwear', 'bomber', 'coat'], price: 149, image: '/src/imports/Screenshot_2026-04-13_at_15.32.09.png' },
    { id: 'm4', name: 'Relaxed Fit Jeans', category: 'Denim', keywords: ['jeans', 'denim', 'pants', 'trousers'], price: 89, image: '/src/imports/Screenshot_2026-04-13_at_15.31.26.png' },
    { id: 'w2', name: 'Olive Cargo Jacket', category: 'Jackets', keywords: ['jacket', 'cargo', 'outerwear', 'green', 'olive'], price: 129, image: '/src/imports/Screenshot_2026-04-21_at_20.12.18.png' },
    { id: 'w7', name: 'Wide Leg Denim', category: 'Denim', keywords: ['jeans', 'denim', 'pants', 'wide leg'], price: 52, image: '/src/imports/Screenshot_2026-04-21_at_20.23.26.png' },
    { id: 'm3', name: 'Classic Crewneck', category: 'Tops', keywords: ['sweatshirt', 'top', 'casual', 'grey'], price: 69, image: '/src/imports/Screenshot_2026-04-13_at_15.30.51.png' },
    { id: 'w8', name: 'Striped Knit Tee', category: 'Tops', keywords: ['shirt', 'top', 'stripe', 'knit'], price: 48, image: '/src/imports/Screenshot_2026-04-21_at_20.23.48.png' },
  ];

  // Score products based on label matches
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

  // Return matches sorted by score
  return scoredProducts
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
};

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Visual search endpoint
app.post('/api/visual-search', upload.single('image'), async (req: Request, res: Response) => {
  try {
    // Validate image upload
    if (!req.file) {
      return res.status(400).json({
        error: 'No image provided',
        message: 'Please upload an image file',
      });
    }

    console.log(`Processing image: ${req.file.originalname} (${req.file.size} bytes)`);

    // Initialize Vision API client
    const client = getVisionClient();

    // Perform label detection
    const [labelResult] = await client.labelDetection({
      image: { content: req.file.buffer },
    });

    const labels = labelResult.labelAnnotations || [];
    const labelDescriptions = labels
      .map(label => label.description || '')
      .filter(Boolean)
      .slice(0, 15);

    console.log('Detected labels:', labelDescriptions);

    // Optional: Get dominant colors
    const [colorResult] = await client.imageProperties({
      image: { content: req.file.buffer },
    });

    const colors = colorResult.imagePropertiesAnnotation?.dominantColors?.colors || [];
    const dominantColor = colors[0]?.color;

    // Match products
    const matchedProducts = matchProductsToLabels(labelDescriptions);

    console.log(`Found ${matchedProducts.length} matching products`);

    // Return results
    res.json({
      success: true,
      labels: labelDescriptions,
      confidence: labels[0]?.score || 0,
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

    // Handle specific errors
    if (error.code === 7) {
      return res.status(403).json({
        error: 'Invalid API credentials',
        message: 'Please check your Google Cloud Vision API key',
      });
    }

    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        error: 'File too large',
        message: 'Image must be less than 5MB',
      });
    }

    res.status(500).json({
      error: 'Visual search failed',
      message: error.message || 'An unexpected error occurred',
    });
  }
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not found',
    message: 'API endpoint not found',
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Server error',
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Visual Search API running on port ${PORT}`);
  console.log(`📸 Endpoint: http://localhost:${PORT}/api/visual-search`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
});

export default app;
