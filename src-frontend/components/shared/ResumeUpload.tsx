
import React, { useState } from 'react';
import { FileUpload } from './FileUpload';
import { toast } from 'sonner';

interface ResumeUploadProps {
  onUpload: (file: File) => void;
  currentResume?: string;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ onUpload, currentResume }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    onUpload(file);
    toast.success('CV seçildi: ' + file.name);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          CV Yükle (Opsiyonel)
        </label>
        <FileUpload
          onFileSelect={handleFileSelect}
          accept=".pdf,.doc,.docx"
          maxSize={5}
          label="CV yüklemek için tıklayın"
          currentFile={currentResume}
        />
      </div>
      {selectedFile && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <svg
            className="w-5 h-5 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm text-green-800">{selectedFile.name}</span>
        </div>
      )}
    </div>
  );
};
