'use client';

import React from 'react';
import { VideoClip } from '../types';

interface StatusProps {
  clips: VideoClip[];
  currentStep: 'generating-clips' | 'stitching' | 'complete';
  progress: {
    current: number;
    total: number;
    message: string;
  };
}

export default function Status({ clips, currentStep, progress }: StatusProps) {
  const completedClips = clips.filter((clip) => clip.status === 'completed').length;
  const failedClips = clips.filter((clip) => clip.status === 'failed').length;
  const totalClips = clips.length;

  const getProgressPercentage = () => {
    if (currentStep === 'generating-clips') {
      return (completedClips / totalClips) * 80; // 80% for clip generation
    } else if (currentStep === 'stitching') {
      return 80 + 20 * 0.5; // 80% + half of stitching
    } else {
      return 100;
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'failed':
        return (
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'generating':
        return (
          <svg
            className="animate-spin w-5 h-5 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        );
      default:
        return (
          <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full"></div>
        );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Generating Your Walkthrough
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          This may take 5-10 minutes. Please do not close this window.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>{progress.message}</span>
            <span>{Math.round(getProgressPercentage())}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        {currentStep === 'generating-clips' && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Room Videos ({completedClips}/{totalClips})
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {clips.map((clip, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
                >
                  {getStatusIcon(clip.status)}
                  <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                    Room {clip.order + 1}
                  </span>
                  {clip.status === 'completed' && (
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                      {clip.duration}s
                    </span>
                  )}
                  {clip.status === 'failed' && (
                    <span className="text-xs text-red-600 dark:text-red-400">
                      Failed
                    </span>
                  )}
                  {clip.status === 'generating' && (
                    <span className="text-xs text-blue-600 dark:text-blue-400">
                      Generating...
                    </span>
                  )}
                </div>
              ))}
            </div>
            {failedClips > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  {failedClips} room(s) failed to generate. The tour will continue with
                  successful rooms.
                </p>
              </div>
            )}
          </div>
        )}

        {currentStep === 'stitching' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <svg
                className="animate-spin w-6 h-6 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Stitching Videos Together
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Creating horizontal, compressed, and vertical versions...
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'complete' && (
          <div className="text-center space-y-3 py-6">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Walkthrough Complete!
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your videos are ready to download
            </p>
          </div>
        )}
      </div>

      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          Each room video is approximately 5 seconds long. The AI is creating realistic camera
          movements through each space.
        </p>
      </div>
    </div>
  );
}
