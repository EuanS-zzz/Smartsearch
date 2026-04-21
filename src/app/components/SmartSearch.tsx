import { Search, Camera, X, Upload, Loader2, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export function SmartSearch() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const suggestions = query.length > 0 ? [
    'Black Jacket',
    'Denim Collection',
    'Leather Boots'
  ] : [];

  // Start camera
  const handleOpenCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: 1280, height: 720 }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      }
    } catch (error) {
      toast.error('Camera access denied. Please enable camera permissions.');
      console.error('Camera error:', error);
    }
  };

  // Capture photo from camera
  const handleCapturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);

        // Stop camera stream
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
      }
    }
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Process image with API
  const handleProcessImage = async () => {
    if (!capturedImage) return;

    setIsProcessing(true);

    try {
      // Convert base64 to blob
      const blob = await fetch(capturedImage).then(r => r.blob());

      const formData = new FormData();
      formData.append('image', blob, 'search-image.jpg');

      // TODO: Replace with your actual API endpoint
      const API_ENDPOINT = '/api/visual-search';

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Visual search failed');
      }

      const data = await response.json();

      // Close modal
      handleCloseModal();

      // Navigate to results with labels
      const searchTerms = data.labels?.join(',') || 'visual-search';
      navigate(`/categories?search=${searchTerms}`);

      toast.success('Found similar items!', {
        description: `Showing results for: ${data.labels?.slice(0, 3).join(', ')}`,
      });

    } catch (error) {
      console.error('Visual search error:', error);

      // FALLBACK: Show mock results for demo
      toast.info('Visual search demo - Showing sample results');
      handleCloseModal();
      navigate('/categories?search=jacket,black,style');

    } finally {
      setIsProcessing(false);
    }
  };

  // Close modal and cleanup
  const handleCloseModal = () => {
    setShowCameraModal(false);
    setCapturedImage(null);
    setIsProcessing(false);

    // Stop camera if active
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  // Retake photo
  const handleRetake = () => {
    setCapturedImage(null);
    handleOpenCamera();
  };

  return (
    <>
      <div className="relative w-full max-w-2xl mx-auto">
        <div className={`relative rounded-full bg-[#F7F7F7] transition-all duration-200 ${focused ? 'shadow-lg' : 'shadow-sm'}`}>
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search for items, styles, or looks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            className="w-full pl-16 pr-16 py-5 bg-transparent outline-none text-[#111111] placeholder:text-[#999999]"
            style={{ fontSize: '1rem' }}
          />
          <button
            onClick={() => setShowCameraModal(true)}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#111111] transition-colors"
            aria-label="Visual search"
          >
            <Camera className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {suggestions.length > 0 && focused && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-lg border border-[#E5E5E5] overflow-hidden z-10">
            {suggestions.map((suggestion, i) => (
              <button
                key={i}
                className="w-full px-6 py-4 text-left hover:bg-[#F7F7F7] transition-colors text-[#111111]"
                onClick={() => setQuery(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Camera Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 text-[#666666] hover:text-[#111111] transition-colors z-10"
              disabled={isProcessing}
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>

            {!capturedImage && !stream && (
              <>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#111111] to-[#666666] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>
                  <h2 className="mb-3" style={{ fontSize: '1.75rem', fontWeight: 500, color: '#111111' }}>
                    Visual Search
                  </h2>
                  <p style={{ fontSize: '0.9375rem', color: '#666666', lineHeight: 1.6 }}>
                    Take a photo or upload an image to find similar items
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    className="w-full bg-[#111111] text-white py-4 rounded-xl hover:bg-[#2A2A2A] transition-colors flex items-center justify-center gap-3"
                    style={{ fontSize: '0.9375rem', fontWeight: 500 }}
                    onClick={handleOpenCamera}
                  >
                    <Camera className="w-5 h-5" strokeWidth={1.5} />
                    Open Camera
                  </button>

                  <button
                    className="w-full bg-[#F7F7F7] text-[#111111] py-4 rounded-xl hover:bg-[#E5E5E5] transition-colors flex items-center justify-center gap-3"
                    style={{ fontSize: '0.9375rem', fontWeight: 500 }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-5 h-5" strokeWidth={1.5} />
                    Upload Photo
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>

                <div className="mt-6 pt-6 border-t border-[#E5E5E5]">
                  <p style={{ fontSize: '0.75rem', color: '#999999', textAlign: 'center' }}>
                    Powered by AI • Max file size: 5MB
                  </p>
                </div>
              </>
            )}

            {/* Camera View */}
            {stream && !capturedImage && (
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden bg-black">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-auto"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                </div>
                <button
                  onClick={handleCapturePhoto}
                  className="w-full bg-[#111111] text-white py-4 rounded-xl hover:bg-[#2A2A2A] transition-colors"
                  style={{ fontSize: '0.9375rem', fontWeight: 500 }}
                >
                  Capture Photo
                </button>
              </div>
            )}

            {/* Image Preview & Process */}
            {capturedImage && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="mb-4" style={{ fontSize: '1.25rem', fontWeight: 500, color: '#111111' }}>
                    Preview
                  </h3>
                </div>

                <div className="relative rounded-2xl overflow-hidden bg-[#F7F7F7]">
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="w-full h-auto max-h-96 object-contain"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleRetake}
                    disabled={isProcessing}
                    className="flex-1 bg-[#F7F7F7] text-[#111111] py-4 rounded-xl hover:bg-[#E5E5E5] transition-colors disabled:opacity-50"
                    style={{ fontSize: '0.9375rem', fontWeight: 500 }}
                  >
                    Retake
                  </button>

                  <button
                    onClick={handleProcessImage}
                    disabled={isProcessing}
                    className="flex-1 bg-[#111111] text-white py-4 rounded-xl hover:bg-[#2A2A2A] transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
                    style={{ fontSize: '0.9375rem', fontWeight: 500 }}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" strokeWidth={1.5} />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" strokeWidth={1.5} />
                        Find Similar
                      </>
                    )}
                  </button>
                </div>

                {isProcessing && (
                  <div className="bg-[#F7F7F7] rounded-xl p-4 text-center">
                    <p style={{ fontSize: '0.875rem', color: '#666666' }}>
                      Analyzing image with AI...
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
