'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Photo, PropertyInfo } from '../types';

interface UploadProps {
  onUploadComplete: (photos: Photo[], propertyInfo: PropertyInfo) => void;
  isUploading: boolean;
  initialPhotos?: Photo[];
  initialPropertyInfo?: PropertyInfo;
}

const MAX_FILES = 15;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function Upload({
  onUploadComplete,
  isUploading,
  initialPhotos,
  initialPropertyInfo
}: UploadProps) {
  const [files, setFiles] = useState<File[]>(initialPhotos?.map(p => p.file).filter(Boolean) as File[] || []);
  const [previews, setPreviews] = useState<string[]>(initialPhotos?.map(p => p.url) || []);
  const [descriptions, setDescriptions] = useState<string[]>(initialPhotos?.map(p => p.description || '') || []);
  const [error, setError] = useState<string | null>(null);
  const [propertyInfo, setPropertyInfo] = useState<PropertyInfo>(initialPropertyInfo || {
    address: '',
    price: '',
    agentName: '',
    agentCompany: '',
    agentPhone: '',
  });

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null);

    if (rejectedFiles.length > 0) {
      const errors = rejectedFiles.map((f) => f.errors[0]?.message).join(', ');
      setError(`Some files were rejected: ${errors}`);
      return;
    }

    if (files.length + acceptedFiles.length > MAX_FILES) {
      setError(`Maximum ${MAX_FILES} files allowed`);
      return;
    }

    const newFiles = [...files, ...acceptedFiles];
    setFiles(newFiles);

    const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);

    const newDescriptions = acceptedFiles.map(() => '');
    setDescriptions([...descriptions, ...newDescriptions]);
  }, [files, previews]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxSize: MAX_FILE_SIZE,
    maxFiles: MAX_FILES,
    disabled: isUploading,
  });

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    const newDescriptions = descriptions.filter((_, i) => i !== index);

    URL.revokeObjectURL(previews[index]);
    setFiles(newFiles);
    setPreviews(newPreviews);
    setDescriptions(newDescriptions);
  };

  const updateDescription = (index: number, description: string) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = description;
    setDescriptions(newDescriptions);
  };

  const handleSubmit = () => {
    if (files.length === 0) {
      setError('Please upload at least one photo');
      return;
    }

    if (!propertyInfo.address || !propertyInfo.price || !propertyInfo.agentName || !propertyInfo.agentCompany || !propertyInfo.agentPhone) {
      setError('Please fill in all property and agent information');
      return;
    }

    const photos: Photo[] = files.map((file, index) => ({
      id: `temp-${index}`,
      url: previews[index],
      filename: file.name,
      order: index,
      file,
      description: descriptions[index] || undefined,
    }));

    onUploadComplete(photos, propertyInfo);
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setPropertyInfo({ ...propertyInfo, agentPhone: formatted });
  };

  const formatPrice = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned) return '';
    return `$${parseInt(cleaned).toLocaleString()}`;
  };

  const handlePriceChange = (value: string) => {
    const formatted = formatPrice(value);
    setPropertyInfo({ ...propertyInfo, price: formatted });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Property Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Enter property details and upload 1-15 room photos
        </p>
      </div>

      {/* Property Information Form */}
      <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Property Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Property Address
            </label>
            <input
              type="text"
              placeholder="123 Main Street, City, State ZIP"
              value={propertyInfo.address}
              onChange={(e) => setPropertyInfo({ ...propertyInfo, address: e.target.value })}
              disabled={isUploading}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              List Price
            </label>
            <input
              type="text"
              placeholder="$599,000"
              value={propertyInfo.price}
              onChange={(e) => handlePriceChange(e.target.value)}
              disabled={isUploading}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Agent Name
            </label>
            <input
              type="text"
              placeholder="John Smith"
              value={propertyInfo.agentName}
              onChange={(e) => setPropertyInfo({ ...propertyInfo, agentName: e.target.value })}
              disabled={isUploading}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company
            </label>
            <input
              type="text"
              placeholder="ABC Realty"
              value={propertyInfo.agentCompany}
              onChange={(e) => setPropertyInfo({ ...propertyInfo, agentCompany: e.target.value })}
              disabled={isUploading}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="(555) 123-4567"
              value={propertyInfo.agentPhone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              disabled={isUploading}
              maxLength={14}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Upload Room Photos
        </h3>
      </div>

      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
          transition-all duration-300 ease-in-out
          ${
            isDragActive
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-300 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-600'
          }
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          {isDragActive ? (
            <p className="text-lg text-primary-600 dark:text-primary-400 font-medium">
              Drop your photos here...
            </p>
          ) : (
            <div>
              <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                Drag & drop photos here, or click to browse
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                JPG, PNG, or WebP (max 10MB per file, up to 15 files)
              </p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Selected Photos ({files.length}/{MAX_FILES})
            </h3>
            <button
              onClick={() => {
                previews.forEach((preview) => URL.revokeObjectURL(preview));
                setFiles([]);
                setPreviews([]);
                setDescriptions([]);
              }}
              disabled={isUploading}
              className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 disabled:opacity-50"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group border-2 border-gray-200 dark:border-gray-700 rounded-lg p-3 space-y-2">
                <div className="relative">
                  <img
                    src={preview}
                    alt={files[index].name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeFile(index)}
                    disabled={isUploading}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {files[index].name}
                </p>
                <input
                  type="text"
                  placeholder="Room description (e.g., Living room, TV on left wall, fireplace on right)"
                  value={descriptions[index] || ''}
                  onChange={(e) => updateDescription(index, e.target.value)}
                  disabled={isUploading}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isUploading || files.length === 0}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <span className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Uploading...</span>
              </span>
            ) : (
              `Continue with ${files.length} photo${files.length > 1 ? 's' : ''}`
            )}
          </button>
        </div>
      )}
    </div>
  );
}
