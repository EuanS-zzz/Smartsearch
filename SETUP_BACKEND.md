# Visual Search Backend Setup Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Google Cloud Setup

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create a New Project** (or select existing)
   - Click "Select a project" → "New Project"
   - Name: `zara-visual-search`
   - Click "Create"

3. **Enable Vision API**
   - Search for "Vision API" in top search bar
   - Click "Cloud Vision API"
   - Click "Enable"

4. **Create Service Account**
   - Go to: APIs & Services → Credentials
   - Click "Create Credentials" → "Service Account"
   - Name: `visual-search-service`
   - Click "Create and Continue"
   - Role: "Cloud Vision API User" (or "Owner" for simplicity)
   - Click "Done"

5. **Generate JSON Key**
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key"
   - Choose "JSON"
   - Click "Create" → Downloads `your-project-xxxxx.json`

---

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Easiest)

1. **Create Vercel Account**
   - Go to: https://vercel.com/signup
   - Sign up with GitHub

2. **Import Your Project**
   - Click "Add New" → "Project"
   - Import your code repository (GitHub/GitLab)
   - Or upload your project folder

3. **Add Environment Variable**
   - In project settings → "Environment Variables"
   - Name: `GOOGLE_CREDENTIALS`
   - Value: **Paste entire JSON key file contents** (copy from downloaded file)
   - Click "Add"

4. **Deploy**
   - Click "Deploy"
   - Wait 30-60 seconds
   - ✅ Done! Your API is live at `https://your-project.vercel.app/api/visual-search`

---

#### Option B: Using Vercel CLI (For Developers)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Navigate to your project
cd /path/to/your/zara-project

# 4. Add environment variable
vercel env add GOOGLE_CREDENTIALS

# Paste your JSON key when prompted (entire contents)

# 5. Deploy
vercel --prod

# ✅ Done! Note the deployment URL
```

---

### Step 3: Update Frontend

Open: `src/app/components/SmartSearch.tsx`

Find line ~86:
```tsx
const API_ENDPOINT = '/api/visual-search';
```

**If using Vercel:** Keep as is (automatic proxy)

**If using separate domain:** Change to:
```tsx
const API_ENDPOINT = 'https://your-vercel-app.vercel.app/api/visual-search';
```

---

## 🧪 Testing

### Test with cURL:

```bash
curl -X POST \
  https://your-app.vercel.app/api/visual-search \
  -F "image=@/path/to/test-image.jpg"
```

### Expected Response:

```json
{
  "success": true,
  "labels": [
    "Jacket",
    "Clothing",
    "Outerwear",
    "Black",
    "Fashion"
  ],
  "dominantColor": {
    "red": 45,
    "green": 45,
    "blue": 50
  },
  "matchedProducts": [
    {
      "id": "m5",
      "name": "Bomber Jacket",
      "category": "Jackets",
      "score": 3
    }
  ],
  "productCount": 1
}
```

---

## 💰 Pricing

### Google Cloud Vision API
- **Free Tier**: 1,000 images/month
- **After free tier**: $1.50 per 1,000 images
- **Your cost**: ~$0 for MVP, ~$10-20/month for production

### Vercel Hosting
- **Free Tier**: 
  - 100GB bandwidth/month
  - Unlimited API requests
  - Custom domains
- **Your cost**: $0 for most sites

**Total monthly cost:** ~$0-20 depending on usage

---

## 🔧 Configuration Options

### Increase API Accuracy

Edit `/api/visual-search.ts` line ~78:

```typescript
// Get more labels
const labelDescriptions = labels
  .slice(0, 20); // Changed from 10 to 20

// Add object detection
const [objectResult] = await client.objectLocalization({
  image: { content: imageBuffer },
});
```

### Add Product Database Integration

Replace mock function at line ~37:

```typescript
const matchProductsToLabels = async (labels: string[]) => {
  // Connect to your actual database
  const products = await db.products.find({
    $or: labels.map(label => ({
      keywords: { $regex: label, $options: 'i' }
    }))
  });
  
  return products;
};
```

---

## 🐛 Troubleshooting

### Error: "API key invalid"
- Check `GOOGLE_CREDENTIALS` environment variable
- Ensure JSON is valid (use JSON validator)
- Verify Vision API is enabled in Google Cloud

### Error: "No image provided"
- Frontend is not sending FormData correctly
- Check network tab in browser dev tools
- Verify file is under 5MB

### Error: "Method not allowed"
- API only accepts POST requests
- Check frontend is using `method: 'POST'`

### CORS errors
- Add your domain to CORS headers in `visual-search.ts`
- Or deploy frontend + backend on same domain (Vercel)

---

## 📊 Monitoring

### View API Logs (Vercel):
1. Go to Vercel Dashboard
2. Select your project
3. Click "Logs" tab
4. See real-time API calls

### Track API Usage (Google Cloud):
1. Go to Cloud Console
2. APIs & Services → Dashboard
3. See Vision API usage chart

---

## 🚀 Advanced: Database Integration

### Connect to MongoDB:

```typescript
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);

const matchProductsToLabels = async (labels: string[]) => {
  await client.connect();
  const db = client.db('zara');
  
  const products = await db.collection('products').find({
    keywords: { $in: labels.map(l => new RegExp(l, 'i')) }
  }).limit(10).toArray();
  
  return products;
};
```

Add to `package.json`:
```json
"mongodb": "^6.3.0"
```

Add environment variable:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/zara
```

---

## ✅ Checklist

- [ ] Google Cloud project created
- [ ] Vision API enabled
- [ ] Service account created
- [ ] JSON key downloaded
- [ ] Vercel account created
- [ ] Environment variable added
- [ ] Project deployed
- [ ] API tested with cURL
- [ ] Frontend connected
- [ ] Visual search working!

---

## 🆘 Need Help?

**Common Issues:**
1. JSON key format - Must be single-line string with escaped quotes
2. CORS - Deploy frontend + backend together on Vercel
3. File size - Compress images before upload
4. Quotas - Check Google Cloud quotas page

**Support Resources:**
- Google Vision Docs: https://cloud.google.com/vision/docs
- Vercel Docs: https://vercel.com/docs
- This project's GitHub issues

---

## 🎉 Success!

Once deployed, your visual search will:
1. Accept camera/uploaded images
2. Analyze with Google AI
3. Return product matches
4. Show results instantly

**Your API is now live! 🚀**
