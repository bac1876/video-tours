'use client';

import React, { useState } from 'react';
import { VideoClip, Photo } from '../types';

interface ClipReviewProps {
  clips: VideoClip[];
  photos: Photo[];
  onRegenerateClip: (clipIndex: number, photo: Photo) => Promise<VideoClip | null>;
  onApproveAll: () => void;
  onBack: () => void;
  isRegenerating: boolean;
  regeneratingIndex: number | null;
}

export default function ClipReview({
  clips,
  photos,
  onRegenerateClip,
  onApproveAll,
  onBack,
  isRegenerating,
  regeneratingIndex,
}: ClipReviewProps) {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const handleRegenerate = async (index: number) => {
    const photo = photos.find(p => p.order === clips[index].order);
    if (photo) {
      await onRegenerateClip(index, photo);
    }
  };

  const sortedClips = [...clips].sort((a, b) => a.order - b.order);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Review Your Video Clips
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Preview each clip before creating the final tour. Regenerate any that need improvement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedClips.map((clip, index) => {
          const photo = photos.find(p => p.order === clip.order);
          const isCurrentlyRegenerating = regeneratingIndex === index;

          return (
            <div
              key={clip.order}
              className={`bg-white dark:bg-gray-800 border-2 rounded-xl overflow-hidden transition-all duration-300 ${
                isCurrentlyRegenerating
                  ? 'border-primary-500 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="relative aspect-video bg-gray-900">
                {clip.status === 'completed' && clip.url ? (
                  <video
                    src={clip.url}
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                    onPlay={() => setPlayingIndex(index)}
                    onPause={() => setPlayingIndex(null)}
                    onEnded={() => setPlayingIndex(null)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm">Video unavailable</p>
                    </div>
                  </div>
                )}

                {isCurrentlyRegenerating && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <div className="text-center text-white">
                      <svg className="animate-spin h-10 w-10 mx-auto mb-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <p className="text-sm font-medium">Regenerating...</p>
                    </div>
                  </div>
                )}

                <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
                  Room {clip.order + 1}
                </div>

                {clip.duration > 0 && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {clip.duration.toFixed(1)}s
                  </div>
                )}
              </div>

              <div className="p-4 space-y-3">
                {photo && (
                  <div className="flex items-center space-x-3">
                    <img
                      src={photo.url}
                      alt={`Original ${clip.order + 1}`}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {photo.filename}
                      </p>
                      {photo.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                          {photo.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleRegenerate(index)}
                  disabled={isRegenerating}
                  className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors duration-200 ${
                    isRegenerating
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/50'
                  }`}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Regenerate This Clip</span>
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        <button
          onClick={onBack}
          disabled={isRegenerating}
          className="px-6 py-3 rounded-xl font-semibold text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back to Photos
        </button>

        <button
          onClick={onApproveAll}
          disabled={isRegenerating}
          className="px-8 py-3 rounded-xl font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isRegenerating ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Please wait...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Approve All & Create Final Tour</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
