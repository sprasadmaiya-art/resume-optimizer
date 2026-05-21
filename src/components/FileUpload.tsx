"use client";

import { useState, useCallback } from "react";
import { UploadCloud, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { usePostHog } from "posthog-js/react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onTextExtracted: (text: string) => void;
  isLoading: boolean;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function FileUpload({ onTextExtracted, isLoading: externalLoading }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const posthog = usePostHog();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = async (file: File) => {
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setError("File exceeds the 10MB limit. Please upload a smaller file.");
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/parse", {
        method: "POST",
        body: formData,
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        // Handle Vercel 413 Payload Too Large HTML response or other unexpected errors
        throw new Error("Server returned an unexpected response (the file might still be too large).");
      }

      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to parse file.");
      }

      onTextExtracted(data.text);
      setSuccess(true);
      posthog.capture("resume_uploaded", { file_type: file.type || "unknown" });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while parsing.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const isLoading = isUploading || externalLoading;

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all duration-200 bg-zinc-50/50",
          isDragging ? "border-teal-500 bg-teal-50/50" : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50",
          isLoading && "opacity-50 pointer-events-none"
        )}
      >
        <input
          type="file"
          accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isLoading}
        />
        
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={cn("p-4 rounded-full", isDragging ? "bg-teal-100 text-teal-600" : "bg-zinc-100 text-zinc-500")}>
            {isLoading ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : success ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            ) : (
              <UploadCloud className="w-8 h-8" />
            )}
          </div>
          
          <div>
            <p className="text-sm font-medium text-zinc-700">
              {isLoading ? "Parsing resume..." : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-zinc-500 mt-1">PDF, DOCX, or TXT (max. 10MB)</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 mt-3 text-sm text-red-600">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span className="leading-tight">{error}</span>
        </div>
      )}
    </div>
  );
}
