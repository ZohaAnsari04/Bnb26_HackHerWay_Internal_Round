'use client';

import React, { useState, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { UploadCloud, Film, FileAudio, FileText, Image as ImageIcon, X, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function UploadModal() {
  const { isUploadModalOpen, setIsUploadModalOpen, startAnalysisFlow } = useApp();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isUploadModalOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
  };

  const handleStartUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(15);
    await new Promise((r) => setTimeout(r, 300));
    setUploadProgress(50);
    await new Promise((r) => setTimeout(r, 400));
    setUploadProgress(85);
    await new Promise((r) => setTimeout(r, 300));
    setUploadProgress(100);
    await new Promise((r) => setTimeout(r, 200));

    // Determine asset type
    const ext = selectedFile.name.split('.').pop()?.toLowerCase();
    let assetType: 'video' | 'audio' | 'image' | 'script' = 'video';
    if (ext === 'mp3' || ext === 'wav') assetType = 'audio';
    else if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') assetType = 'image';
    else if (ext === 'pdf' || ext === 'txt') assetType = 'script';

    // Transition to AI Analysis flow
    setIsUploading(false);
    setSelectedFile(null);
    setUploadProgress(0);
    startAnalysisFlow(selectedFile.name, assetType);
  };

  const handleSelectSample = () => {
    setIsUploading(true);
    setUploadProgress(100);
    setTimeout(() => {
      setIsUploading(false);
      startAnalysisFlow('AI_Future_of_Work.mp4', 'video');
    }, 400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isUploading && setIsUploadModalOpen(false)}
          className="fixed inset-0 bg-[#17172A]/30 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-[0_24px_70px_rgba(20,20,50,0.18)] border border-[rgba(20,20,40,0.08)] overflow-hidden z-10"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[rgba(20,20,40,0.06)] flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#17172A] tracking-tight">Bring your content to life</h3>
              <p className="text-xs text-[#68697A] mt-0.5">Upload any raw recording or script to begin AI content orchestration</p>
            </div>
            {!isUploading && (
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1.5 rounded-lg text-[#68697A] hover:text-[#17172A] hover:bg-black/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="p-6 space-y-5">
            {/* Drag & Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-[#635BFF] bg-[#635BFF]/5'
                  : selectedFile
                  ? 'border-[#22C55E] bg-[#22C55E]/5'
                  : 'border-[rgba(20,20,40,0.12)] hover:border-[#635BFF]/50 hover:bg-[#FAFAF7]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".mp4,.mov,.webm,.mp3,.wav,.png,.jpg,.jpeg,.pdf,.txt"
                className="hidden"
                onChange={handleFileInputChange}
              />

              <div className="flex flex-col items-center">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3.5 transition-colors ${
                    selectedFile
                      ? 'bg-[#22C55E]/10 text-[#22C55E]'
                      : 'bg-[#635BFF]/10 text-[#635BFF]'
                  }`}
                >
                  {selectedFile ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <UploadCloud className="w-7 h-7" />
                  )}
                </div>

                {selectedFile ? (
                  <div>
                    <p className="text-sm font-semibold text-[#17172A]">{selectedFile.name}</p>
                    <p className="text-xs text-[#68697A] mt-0.5">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to analyze
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-semibold text-[#17172A]">
                      Drag & drop video, audio, image or script
                    </p>
                    <p className="text-xs text-[#68697A] mt-1">
                      or <span className="text-[#635BFF] font-medium underline">browse files</span> from your computer
                    </p>
                  </div>
                )}

                {/* Supported Formats Pills */}
                <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                  {['MP4', 'MOV', 'WEBM', 'MP3', 'WAV', 'PNG', 'JPG', 'PDF', 'TXT'].map((fmt) => (
                    <span
                      key={fmt}
                      className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-[rgba(20,20,40,0.04)] text-[#68697A]"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Upload Progress Bar */}
            {isUploading && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-[#68697A]">
                  <span>Uploading asset...</span>
                  <span className="font-semibold text-[#635BFF]">{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-[#F0F1F6] rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: `${uploadProgress}%` }}
                    className="h-full bg-gradient-to-r from-[#635BFF] to-[#8B5CF6]"
                  />
                </div>
              </div>
            )}

            {/* Hackathon Demo Preset Option */}
            <div className="pt-2 border-t border-[rgba(20,20,40,0.06)] flex items-center justify-between">
              <div className="text-left">
                <span className="text-xs font-semibold text-[#17172A]">Live Hackathon Demo?</span>
                <p className="text-[11px] text-[#68697A]">Use pre-configured 4K keynote recording</p>
              </div>
              <button
                type="button"
                onClick={handleSelectSample}
                disabled={isUploading}
                className="px-3.5 py-1.5 rounded-xl border border-[rgba(20,20,40,0.12)] text-xs font-medium text-[#17172A] hover:bg-[#FAFAF7] hover:border-[#635BFF]/30 transition-all flex items-center gap-1.5"
              >
                <span>Load Sample Video</span>
                <ArrowRight className="w-3 h-3 text-[#635BFF]" />
              </button>
            </div>
          </div>

          {/* Footer Action */}
          <div className="px-6 py-4 border-t border-[rgba(20,20,40,0.06)] bg-[#FAFAF7] flex items-center justify-between">
            <span className="text-xs text-[#68697A]">
              Max file size: 2 GB • Encrypted storage
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                disabled={isUploading}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#68697A] hover:text-[#17172A] hover:bg-black/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleStartUpload}
                disabled={!selectedFile || isUploading}
                className={`px-5 py-2 rounded-xl text-xs font-medium ${
                  selectedFile && !isUploading
                    ? 'btn-primary-gradient'
                    : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                }`}
              >
                {isUploading ? 'Uploading...' : 'Continue to AI Analysis'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
