
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiX, FiLock } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import Spinner from '../components/Spinner';
import { generateRender } from '../services/geminiService';
import { useGallery } from '../hooks/useGallery';
import { useUser, FREE_TRIAL_LIMIT } from '../hooks/useUser';

const RenderPage: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('Modern villa in Riyadh with stone façade and palm trees at sunset');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const { addGalleryItem } = useGallery();
  const { isSubscribed, renderCount, incrementRenderCount } = useUser();
  const navigate = useNavigate();

  const trialsUsed = isSubscribed ? 0 : renderCount;
  const canRender = isSubscribed || trialsUsed < FREE_TRIAL_LIMIT;
  const rendersRemaining = FREE_TRIAL_LIMIT - trialsUsed;

  const handleFileChange = (files: FileList | null) => {
    if (!canRender) return;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        setGeneratedImage(null);
        setError(null);
      } else {
        setError('Please upload a valid image file (PNG, JPG, etc.).');
      }
    }
  };

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (canRender) {
      handleFileChange(event.dataTransfer.files);
    }
  }, [canRender]);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setGeneratedImage(null);
  };

  const handleSuccessfulRender = (newImage: string) => {
    setGeneratedImage(newImage);
    if (imagePreview) {
        addGalleryItem({
            before: imagePreview,
            after: newImage,
            prompt: prompt,
        });
    }
    if (!isSubscribed) {
        incrementRenderCount();
        if (renderCount + 1 >= FREE_TRIAL_LIMIT) {
            setTimeout(() => navigate('/pricing'), 3000);
        }
    }
  };

  const handleRender = async () => {
    if (!canRender) {
      setError('You have used all your free trials. Please subscribe for unlimited renders.');
      return;
    }
    if (!imageFile || !prompt || !imagePreview) {
      setError('Please upload an image and enter a prompt.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    if (!process.env.API_KEY) {
      setError('API Key not configured. This is a demo. A simulated render will be added to the gallery.');
      setTimeout(() => {
        const newRenderedImage = `https://picsum.photos/seed/${Date.now()}/1024/768`;
        handleSuccessfulRender(newRenderedImage);
        setIsLoading(false);
      }, 3000);
      return;
    }

    try {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = async () => {
        try {
            const base64String = (reader.result as string).split(',')[1];
            const result = await generateRender(base64String, imageFile.type, prompt);
            handleSuccessfulRender(result.imageUrl);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An unknown error occurred during rendering.');
        } finally {
            setIsLoading(false);
        }
      };
      reader.onerror = () => {
        setError('Failed to read the image file.');
        setIsLoading(false);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold">AI Exterior Rendering</h1>
        <p className="mt-4 text-lg text-brand-gray max-w-2xl mx-auto">
          Upload your building's image, describe the desired aesthetic, and let our AI bring your vision to life.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg relative">
            {!canRender && (
              <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 z-10 flex flex-col items-center justify-center text-center p-4 rounded-lg">
                <FiLock className="w-16 h-16 text-brand-gold mb-4" />
                <h3 className="text-2xl font-bold">Free Trials Ended</h3>
                <p className="text-brand-gray my-2">You've used all your free renders. Subscribe to unlock unlimited rendering.</p>
                <Link to="/pricing" className="mt-4 bg-brand-gold text-brand-dark font-bold py-2 px-6 rounded-md text-lg hover:bg-brand-gold-light transition-transform transform hover:scale-105">
                  Subscribe Now
                </Link>
              </div>
            )}
            <div className={`${!canRender ? 'blur-sm' : ''}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">1. Upload Your Image</h2>
                {!isSubscribed && <span className="text-sm font-medium text-brand-gray">{rendersRemaining} free trial{rendersRemaining !== 1 ? 's' : ''} left</span>}
              </div>
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Building preview" className="w-full h-auto rounded-md object-cover max-h-96" />
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors"
                    aria-label="Remove image"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  className={`border-2 border-dashed border-brand-gray dark:border-gray-600 rounded-lg p-12 text-center transition-colors ${canRender ? 'cursor-pointer hover:border-brand-gold dark:hover:border-brand-gold' : 'cursor-not-allowed'}`}
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e.target.files)}
                    disabled={!canRender}
                  />
                  <label htmlFor="file-upload" className={canRender ? 'cursor-pointer' : 'cursor-not-allowed'}>
                    <FiUploadCloud className="mx-auto h-12 w-12 text-brand-gray" />
                    <p className="mt-2 text-sm text-brand-gray">
                      <span className="font-semibold text-brand-gold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-brand-gray mt-1">PNG, JPG, WEBP up to 10MB</p>
                  </label>
                </div>
              )}

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Describe Your Vision</h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'A modern villa in Riyadh with a stone façade and palm trees at sunset'"
                className="w-full p-3 border border-brand-stone dark:border-gray-600 rounded-md bg-brand-light dark:bg-gray-700 focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition"
                rows={4}
                disabled={!canRender}
              />

              <button
                onClick={handleRender}
                disabled={isLoading || !imageFile || !canRender}
                className="w-full mt-6 bg-brand-gold text-brand-dark font-bold py-3 px-8 rounded-md text-lg hover:bg-brand-gold-light transition-all transform hover:scale-105 disabled:bg-brand-gray disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
              >
                {isLoading ? <Spinner /> : 'Render Now'}
              </button>
            </div>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </div>
        </motion.div>

        {/* Output Section */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg h-full flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold mb-6 text-center">3. See the Result</h2>
            <div className="w-full aspect-video bg-brand-stone dark:bg-gray-900 rounded-md flex items-center justify-center">
              {isLoading ? (
                <div className="text-center">
                  <Spinner />
                  <p className="mt-4 text-brand-gray">Rendering your vision...</p>
                </div>
              ) : generatedImage ? (
                <img src={generatedImage} alt="Generated render" className="w-full h-full object-contain rounded-md" />
              ) : (
                <p className="text-brand-gray">Your generated image will appear here</p>
              )}
            </div>
            {generatedImage && !isLoading && (
              <a
                href={generatedImage}
                download="rendered-image.png"
                className="mt-6 bg-gray-600 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-700 transition-colors"
              >
                Download Image
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default RenderPage;
