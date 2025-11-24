'use client';

import React, { useState, useEffect, useRef } from 'react';
import Upload from '../components/Upload';
import Reorder from '../components/Reorder';
import Status from '../components/Status';
import Download from '../components/Download';
import { useUpload, useGenerateVideos } from '../hooks/useApi';
import { Photo, VideoClip, GeneratedVideos, AppStep, PropertyInfo } from '../types';
import { api } from '../utils/api'; // Import api to poll job status

export default function Home() {
  const [step, setStep] = useState<AppStep>('upload');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [clips, setClips] = useState<VideoClip[]>([]);
  const [propertyInfo, setPropertyInfo] = useState<PropertyInfo | null>(null);
  const [finalVideos, setFinalVideos] = useState<GeneratedVideos | null>(null);
  const [generationStep, setGenerationStep] = useState<'generating-clips' | 'stitching' | 'complete'>('generating-clips');
  const [jobId, setJobId] = useState<string | null>(null); // New state for jobId
  const [jobStatus, setJobStatus] = useState<'waiting' | 'active' | 'completed' | 'failed' | 'delayed' | null>(null); // New state for job status
  const [jobProgress, setJobProgress] = useState<number>(0); // New state for job progress
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null); // Ref for polling interval

  const { upload, isUploading, error: uploadError } = useUpload();
  const { generateAllVideos, error: generateError } = useGenerateVideos();

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
    setStep('generating'); // First, generate individual clips
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
      // setGenerationStep('stitching'); // This is now done in job queue

      // Call generateFullTour which now returns a jobId
      const newJobId = await useGenerateVideos().generateFullTour(generatedClips, propertyInfo!); // Use the hook's generateFullTour

      if (newJobId) {
        setJobId(newJobId);
        setStep('processing'); // New step to indicate job queue processing
        setJobStatus('waiting');
        setJobProgress(0);
      } else {
        alert('Failed to start full tour generation. Please try again.');
        setStep('reorder'); // Go back to reorder if job dispatch fails
      }
    } else {
      alert('Failed to generate any clips. Please try again.');
      setStep('reorder'); // Go back to reorder if clips generation fails
    }
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

      {/* Existing generating step for clips */}
      {step === 'generating' && (
        <Status
          clips={clips}
          currentStep={generationStep}
          progress={useGenerateVideos().progress} // This progress is for individual clip generation
        />
      )}

      {/* New processing step for full tour job */}
      {step === 'processing' && (
        <Status
          clips={clips} // Still show clips, maybe greyed out or with a different indicator
          currentStep={'stitching'} // Indicate stitching for the UI
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
        {['upload', 'reorder', 'generating', 'processing', 'download'].map((s, index) => (
          <div
            key={s}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              s === step
                ? 'bg-primary-600 w-8'
                : index < ['upload', 'reorder', 'generating', 'processing', 'download'].indexOf(step)
                ? 'bg-primary-400'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}