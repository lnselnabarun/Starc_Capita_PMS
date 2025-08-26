"use client";
import { useState } from "react";
import { Lock, Upload, FileText, X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const PDFUploadPage = () => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  // const [password, setPassword] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setError("");
    if (!selectedFile) return;

    // Change this line from "PDF file only" to "Excel file only"
    if (
      selectedFile?.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
      selectedFile?.type !== "application/vnd.ms-excel"
    ) {
      setError("Please upload an Excel file only (.xlsx or .xls)");
      return;
    }

    if (selectedFile?.size > 10 * 1024 * 1024) {
      setError("File size should be less than 10MB");
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!file) {
      setError("Please select an Excel file"); // CHANGED from "PDF file"
      return;
    }
    // if (!password) {
    //   setError("Please enter a password");
    //   return;
    // }

    // Get user ID from local storage
    const userId = localStorage.getItem("UserId");
    if (!userId) {
      setError("User ID not found. Please log in again.");
      return;
    }
    // Create FormData to send file
    const formData = new FormData();
    formData.append("file", file);
    // formData.append("password", password);
    formData.append("user_id", userId);

    try {
      setIsLoading(true);

      // Make API call
      const response = await axios.post("https://dev.netrumusa.com/starkcapital/api/upload-stock-transaction-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response?.data)
      if (response.data?.status === "success") {
        setFile(null);
        // setPassword("");
        router.back();
      } else {
        throw new Error(response.data?.message || "Failed to fetch PDF list");
      }
      // Optional: Reset form after successful upload
    } catch (err) {
      // Handle error
      const errorMessage =
        err.response?.data?.message || "An error occurred during upload";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-fuchsia-900">
            UPLOAD STOCK EXCEL
          </h2>
          {/* <p className="mt-2 text-gray-600">With your Excel password</p> */}
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-lg shadow-sm">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
                ${
                  isDragging
                    ? "border-fuchsia-500 bg-fuchsia-50"
                    : "border-gray-300 hover:border-fuchsia-500"
                }
                ${file ? "bg-gray-50" : "bg-white"}`}
            >
              {!file ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Upload className="h-12 w-12 text-fuchsia-900" />
                  </div>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-fuchsia-900 hover:text-fuchsia-700"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".xlsx,.xls" // CHANGED from ".xlsx" to include both Excel formats
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">Excel up to 10MB</p>
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

            
          </div>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              ${
                isLoading
                  ? "bg-fuchsia-700 cursor-not-allowed"
                  : "bg-fuchsia-900 hover:bg-fuchsia-800"
              } 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 transition-colors`}
          >
            {isLoading ? "Uploading..." : "Upload Excel"}{" "}
          </button>
        </form>
        <button
          onClick={() => router.back()}
          type="submit"
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-fuchsia-900  bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors border-gray-500 mt-3`}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PDFUploadPage;
