"use client";
import { useState } from 'react';
import { Lock, Upload, FileText, X } from 'lucide-react';

const PDFUploadPage = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e?.dataTransfer?.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e?.target?.files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    setError('');
    if (!selectedFile) return;
    
    if (selectedFile?.type !== 'application/pdf') {
      setError('Please upload a PDF file only');
      return;
    }
    
    if (selectedFile?.size > 10 * 1024 * 1024) {
      setError('File size should be less than 10MB');
      return;
    }
    
    setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a PDF file');
      return;
    }
    if (!password) {
      setError('Please enter a password');
      return;
    }
    // Handle the upload logic here
    console.log('File:', file, 'Password:', password);
  };

  const removeFile = () => {
    setFile(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-fuchsia-900">Upload CAMS PDF</h2>
          <p className="mt-2 text-gray-600">With your PDF password</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-lg shadow-sm">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
                ${isDragging ? 'border-fuchsia-500 bg-fuchsia-50' : 'border-gray-300 hover:border-fuchsia-500'}
                ${file ? 'bg-gray-50' : 'bg-white'}`}
            >
              {!file ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Upload className="h-12 w-12 text-fuchsia-900" />
                  </div>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-fuchsia-900 hover:text-fuchsia-700">
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF up to 10MB</p>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <FileText className="h-6 w-6 flex-shrink-0 text-fuchsia-900" />
                    <span className="text-sm font-medium text-gray-700 truncate block">
                      {file.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                PDF Password
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500"
                  placeholder="Enter pdf password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fuchsia-900 hover:bg-fuchsia-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 transition-colors"
          >
            Upload PDF
          </button>
        </form>
      </div>
    </div>
  );
};

export default PDFUploadPage;