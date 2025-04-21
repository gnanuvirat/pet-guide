
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, Image, Film, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadType, setUploadType] = useState<'photo' | 'video'>('photo');
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if the file type matches the current tab
    if (uploadType === 'photo' && !file.type.includes('image')) {
      alert('Please upload an image file in Photo tab.');
      return;
    }
    if (uploadType === 'video' && !file.type.includes('video')) {
      alert('Please upload a video file in Video tab.');
      return;
    }

    setFile(file);
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      // Navigate to appropriate results page based on file type
      if (uploadType === 'photo') {
        navigate('/analysis');
      } else {
        navigate('/behavior');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-pet-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Upload Your Pet</h1>
          <p className="mt-2 text-lg text-gray-600">
            Upload a photo or video of your pet to get personalized insights
          </p>
        </div>

        <Card className="overflow-hidden animate-bounce-in">
          <Tabs defaultValue="photo" className="w-full" onValueChange={(value) => setUploadType(value as 'photo' | 'video')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="photo" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Photo
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-2">
                <Film className="h-4 w-4" />
                Video
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="photo" className="p-6">
              <div 
                className={`relative border-2 border-dashed rounded-lg p-8 transition-all ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
                } ${file ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
                
                {!file ? (
                  <div className="text-center cursor-pointer" onClick={onButtonClick}>
                    <UploadIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-1">Drag and drop your pet's photo</p>
                    <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
                    <p className="text-xs text-gray-400">Supported formats: JPG, PNG, GIF</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="relative inline-block">
                      <img 
                        src={preview!} 
                        alt="Preview" 
                        className="max-h-60 max-w-full rounded-lg object-contain"
                      />
                      <button 
                        onClick={clearFile}
                        className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                      >
                        <X className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                    <p className="mt-3 text-sm text-gray-500">{file.name}</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={handleUpload}
                  disabled={!file || isUploading}
                  className="pet-btn-primary"
                >
                  {isUploading ? 'Uploading...' : 'Analyze Photo'}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="video" className="p-6">
              <div 
                className={`relative border-2 border-dashed rounded-lg p-8 transition-all ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
                } ${file ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleChange}
                  className="hidden"
                />
                
                {!file ? (
                  <div className="text-center cursor-pointer" onClick={onButtonClick}>
                    <Film className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-1">Drag and drop your pet's video</p>
                    <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
                    <p className="text-xs text-gray-400">Supported formats: MP4, MOV, AVI</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="relative inline-block">
                      {file.type.includes('video') ? (
                        <video 
                          src={preview!} 
                          controls 
                          className="max-h-60 max-w-full rounded-lg"
                        />
                      ) : (
                        <div className="max-h-60 p-8 bg-gray-100 rounded-lg">
                          <Film className="h-20 w-20 mx-auto text-gray-400" />
                          <p className="mt-2 text-gray-500">Video preview</p>
                        </div>
                      )}
                      <button 
                        onClick={clearFile}
                        className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                      >
                        <X className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                    <p className="mt-3 text-sm text-gray-500">{file.name}</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={handleUpload}
                  disabled={!file || isUploading}
                  className="pet-btn-primary"
                >
                  {isUploading ? 'Uploading...' : 'Analyze Video'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
        
        <div className="mt-8 bg-pet-blue/60 rounded-xl p-6 animate-fade-in-up">
          <h3 className="text-xl font-bold mb-2">Tips for better analysis</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Make sure your pet is clearly visible in the photo or video</li>
            <li>Good lighting will improve accuracy of breed detection</li>
            <li>For videos, capture at least 30 seconds of natural behavior</li>
            <li>Include multiple angles for more comprehensive analysis</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Upload;
