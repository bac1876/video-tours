'use client';

import React, { useState } from 'react';
import Upload from '../components/Upload';
import Reorder from '../components/Reorder';
import Status from '../components/Status';
import Download from '../components/Download';
import { useUpload, useGenerateVideos } from '../hooks/useApi';
import { Photo, VideoClip, GeneratedVideos, AppStep, PropertyInfo } from '../types';

export default function Home() {
  const [step, setStep] = useState<AppStep>('upload');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [clips, setClips] = useState<VideoClip[]>([]);
  const [propertyInfo, setPropertyInfo] = useState<PropertyInfo | null>(null);
  const [finalVideos, setFinalVideos] = useState<GeneratedVideos | null>(null);
  const [generationStep, setGenerationStep] = useState<'generating-clips' | 'stitching' | 'complete'>('generating-clips');

  const { upload, isUploading, error: uploadError } = useUpload();
  const { generateAllVideos, generateFullTour, isGenerating, error: generateError, progress } = useGenerateVideos();

  const handleUploadComplete = async (uploadedPhotos: Photo[], uploadedPropertyInfo: PropertyInfo) => {
    const photosWithFiles = uploadedPhotos.map((photo) => ({
      ...photo,
      file: photo.file!,
    }));

    const result = await upload(photosWithFiles.map((p) => p.file));

    if (result) {
      const photosWithUrls = result.map((photo, index) => ({
        ...photo,
        file: photosWithFiles[index].file,
      }));
      setPhotos(photosWithUrls);
      setPropertyInfo(uploadedPropertyInfo);
      setStep('reorder');
    }
  };

  const handleReorderComplete = async (reorderedPhotos: Photo[]) => {
    setPhotos(reorderedPhotos);
    setStep('generating');
    setGenerationStep('generating-clips');

    const initialClips = reorderedPhotos.map((photo) => ({
      url: '',
      order: photo.order,
      duration: 0,
      status: 'pending' as const,
    }));
    setClips(initialClips);

    const generatedClips = await generateAllVideos(reorderedPhotos);

    if (generatedClips.length > 0) {
      setClips(generatedClips);
      setGenerationStep('stitching');

      const videos = await generateFullTour(generatedClips, propertyInfo!);

      if (videos) {
        setFinalVideos(videos);
        setGenerationStep('complete');
        setStep('download');
      } else {
        alert('Failed to stitch videos together. Please try again.');
      }
    } else {
      alert('Failed to generate any videos. Please try again.');
    }
  };

  const handleStartOver = () => {
    setStep('upload');
    setPhotos([]);
    setClips([]);
    setPropertyInfo(null);
    setFinalVideos(null);
    setGenerationStep('generating-clips');
  };

  const handleBack = () => {
    setStep('upload');
  };

  return (
    <div className="space-y-8">
      {uploadError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-4xl mx-auto">
          <p className="text-red-600 dark:text-red-400 text-sm">{uploadError}</p>
        </div>
      )}

      {generateError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-4xl mx-auto">
          <p className="text-red-600 dark:text-red-400 text-sm">{generateError}</p>
        </div>
      )}

      {step === 'upload' && (
        <Upload
          onUploadComplete={handleUploadComplete}
          isUploading={isUploading}
        />
      )}

      {step === 'reorder' && (
        <Reorder
          photos={photos}
          onReorderComplete={handleReorderComplete}
          onBack={handleBack}
        />
      )}

      {step === 'generating' && (
        <Status
          clips={clips}
          currentStep={generationStep}
          progress={progress}
        />
      )}

      {step === 'download' && finalVideos && (
        <Download
          videos={finalVideos}
          onStartOver={handleStartOver}
        />
      )}

      <div className="flex justify-center space-x-2 pt-8">
        {['upload', 'reorder', 'generating', 'download'].map((s, index) => (
          <div
            key={s}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              s === step
                ? 'bg-primary-600 w-8'
                : index < ['upload', 'reorder', 'generating', 'download'].indexOf(step)
                ? 'bg-primary-400'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
