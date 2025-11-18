'use client';

import React from 'react';
import { GeneratedVideos } from '../types';

interface DownloadProps {
  videos: GeneratedVideos;
  onStartOver: () => void;
}

export default function Download({ videos, onStartOver }: DownloadProps) {
  const videoFormats = [
    {
      name: 'Horizontal (1080p)',
      description: 'Perfect for MLS listings and website displays',
      url: videos.horizontal,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      color: 'blue',
    },
    {
      name: 'Compressed MLS',
      description: 'Smaller file size for faster uploads to MLS platforms',
      url: videos.compressed,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
          />
        </svg>
      ),
      color: 'green',
    },
    {
      name: 'Vertical (9:16)',
      description: 'Optimized for Instagram Reels, TikTok, and Stories',
      url: videos.vertical,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      color: 'purple',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; button: string }> = {
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        text: 'text-blue-600 dark:text-blue-400',
        button: 'bg-blue-600 hover:bg-blue-700',
      },
      green: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-200 dark:border-green-800',
        text: 'text-green-600 dark:text-green-400',
        button: 'bg-green-600 hover:bg-green-700',
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        border: 'border-purple-200 dark:border-purple-800',
        text: 'text-purple-600 dark:text-purple-400',
        button: 'bg-purple-600 hover:bg-purple-700',
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Your Walkthrough is Ready!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Download your videos in all formats below
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {videoFormats.map((format) => {
          const colors = getColorClasses(format.color);
          return (
            <div
              key={format.name}
              className={`${colors.bg} ${colors.border} border-2 rounded-xl p-6 space-y-4 transition-all duration-200 hover:shadow-xl`}
            >
              <div className={`${colors.text} flex justify-center`}>
                {format.icon}
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                  {format.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {format.description}
                </p>
              </div>
              <a
                href={format.url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className={`${colors.button} text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 block text-center w-full`}
              >
                Download
              </a>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">
          Quick Tips for Using Your Videos
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start space-x-2">
            <svg
              className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              <strong>Horizontal:</strong> Use for MLS listings, property websites, and YouTube
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <svg
              className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              <strong>Compressed:</strong> Upload to MLS platforms with file size limits
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <svg
              className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              <strong>Vertical:</strong> Share on Instagram Reels, TikTok, and Facebook Stories
            </span>
          </li>
        </ul>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={onStartOver}
          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200"
        >
          Create Another Walkthrough
        </button>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Videos are stored securely and will remain accessible for 30 days
      </div>
    </div>
  );
}
