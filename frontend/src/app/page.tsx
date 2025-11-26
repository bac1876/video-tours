'use client';

import React, { useState, useEffect, useRef } from 'react';
import Upload from '../components/Upload';
import Reorder from '../components/Reorder';
import Status from '../components/Status';
import Download from '../components/Download';
import ClipReview from '../components/ClipReview';
import { useUpload, useGenerateVideos } from '../hooks/useApi';
import { Photo, VideoClip, GeneratedVideos, AppStep, PropertyInfo } from '../types';
import { api } from '../utils/api';

export default function Home() {
  const [step, setStep] = useState<AppStep>('upload');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [clips, setClips] = useState<VideoClip[]>([]);
  const [propertyInfo, setPropertyInfo] = useState<PropertyInfo | null>(null);
  const [finalVideos, setFinalVideos] = useState<GeneratedVideos | null>(null);
  const [generationStep, setGenerationStep] = useState<'generating-clips' | 'stitching' | 'complete'>('generating-clips');
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<'waiting' | 'active' | 'completed' | 'failed' | 'delayed' | null>(null);
  const [jobProgress, setJobProgress] = useState<number>(0);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { upload, isUploading, error: uploadError } = useUpload();
  const { generateAllVideos, generateFullTour, error: generateError, progress } = useGenerateVideos();

  const handleUploadComplete = async (uploadedPhotos: Photo[], uploadedPropertyInfo: PropertyInfo) => {
    // If photos already have URLs (coming back from reorder), skip upload
    if (uploadedPhotos[0]?.url && !uploadedPhotos[0].url.startsWith('blob:')) {
      setPhotos(uploadedPhotos);
      setPropertyInfo(uploadedPropertyInfo);
      setStep('reorder');
      return;
    }

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
      // Go to review step instead of directly processing
      setStep('review');
    } else {
      alert('Failed to generate any clips. Please try again.');
      setStep('reorder');
    }
  };

  const handleRegenerateClip = async (clipIndex: number, photo: Photo): Promise<VideoClip | null> => {
    setIsRegenerating(true);
    setRegeneratingIndex(clipIndex);

    try {
      const response = await api.generateRoomVideo(photo.url, '', photo.order, photo.description, photo.filename);
      const newClip: VideoClip = {
        url: response.videoUrl,
        duration: response.duration,
        order: response.order,
        status: 'completed',
      };

      // Update the clip in the list
      setClips(prevClips => {
        const updatedClips = [...prevClips];
        updatedClips[clipIndex] = newClip;
        return updatedClips;
      });

      return newClip;
    } catch (error: any) {
      console.error('Failed to regenerate clip:', error);
      alert(`Failed to regenerate clip: ${error.message}`);
      return null;
    } finally {
      setIsRegenerating(false);
      setRegeneratingIndex(null);
    }
  };

  const handleApproveAllClips = async () => {
    // Filter only completed clips
    const completedClips = clips.filter(clip => clip.status === 'completed' && clip.url);

    if (completedClips.length === 0) {
      alert('No completed clips to process.');
      return;
    }

    // Start the full tour generation
    const newJobId = await generateFullTour(completedClips, propertyInfo!);

    if (newJobId) {
      setJobId(newJobId);
      setStep('processing');
      setJobStatus('waiting');
      setJobProgress(0);
    } else {
      alert('Failed to start full tour generation. Please try again.');
    }
  };

  const handleBackToReorder = () => {
    setStep('reorder');
  };

  // Polling effect for job status
  useEffect(() => {
    if (step === 'processing' && jobId) {
      pollingIntervalRef.current = setInterval(async () => {
        try {
          const jobData = await api.getJobStatus(jobId);
          const { state, progress: newProgress, result } = jobData;
          setJobStatus(state);
          setJobProgress(newProgress || 0);

          if (state === 'completed' && result) {
            setFinalVideos(result);
            setStep('download');
            setGenerationStep('complete');
            if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
          } else if (state === 'failed') {
            alert('Video generation failed. Please try again.');
            setStep('reorder');
            if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
          }
        } catch (err: any) {
          console.error('Failed to poll job status:', err);
          alert('Failed to get job status. Please try again.');
          setStep('reorder');
          if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
        }
      }, 5000); // Poll every 5 seconds
    } else {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [step, jobId]);

  const handleStartOver = () => {
    setStep('upload');
    setPhotos([]);
    setClips([]);
    setPropertyInfo(null);
    setFinalVideos(null);
    setGenerationStep('generating-clips');
    setJobId(null);
    setJobStatus(null);
    setJobProgress(0);
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
          initialPhotos={photos}
          initialPropertyInfo={propertyInfo || undefined}
        />
      )}

      {step === 'reorder' && (
        <Reorder
          photos={photos}
          onReorderComplete={handleReorderComplete}
          onBack={handleBack}
        />
      )}

      {/* Generating step for clips */}
      {step === 'generating' && (
        <Status
          clips={clips}
          currentStep={generationStep}
          progress={progress}
        />
      )}

      {/* Review step - preview and approve clips before stitching */}
      {step === 'review' && (
        <ClipReview
          clips={clips}
          photos={photos}
          onRegenerateClip={handleRegenerateClip}
          onApproveAll={handleApproveAllClips}
          onBack={handleBackToReorder}
          isRegenerating={isRegenerating}
          regeneratingIndex={regeneratingIndex}
        />
      )}

      {/* Processing step for full tour job */}
      {step === 'processing' && (
        <Status
          clips={clips}
          currentStep={'stitching'}
          jobId={jobId}
          jobStatus={jobStatus}
          jobProgress={jobProgress}
        />
      )}

      {step === 'download' && finalVideos && (
        <Download
          videos={finalVideos}
          onStartOver={handleStartOver}
        />
      )}

      <div className="flex justify-center space-x-2 pt-8">
        {['upload', 'reorder', 'generating', 'review', 'processing', 'download'].map((s, index) => (
          <div
            key={s}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              s === step
                ? 'bg-primary-600 w-8'
                : index < ['upload', 'reorder', 'generating', 'review', 'processing', 'download'].indexOf(step)
                ? 'bg-primary-400'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}