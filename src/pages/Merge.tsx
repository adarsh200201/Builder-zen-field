import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import FileUpload from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Download,
  FileText,
  GripVertical,
  Trash2,
  RotateCw,
  Eye,
  Combine,
  CheckCircle,
  Loader2,
  Crown,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PDFService } from "@/services/pdfService";
import { UsageService } from "@/services/usageService";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import AuthModal from "@/components/auth/AuthModal";

interface ProcessedFile {
  id: string;
  file: File;
  preview?: string;
}

const Merge = () => {
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [mergedFileUrl, setMergedFileUrl] = useState<string>("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [usageLimitReached, setUsageLimitReached] = useState(false);

  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleFilesSelect = (newFiles: File[]) => {
    const processedFiles: ProcessedFile[] = newFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
    }));
    setFiles((prev) => [...prev, ...processedFiles]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const moveFile = (fromIndex: number, toIndex: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      const [movedFile] = newFiles.splice(fromIndex, 1);
      newFiles.splice(toIndex, 0, movedFile);
      return newFiles;
    });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      moveFile(draggedIndex, index);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleMerge = async () => {
    if (files.length < 2) return;

    // Check usage limits for non-premium users
    if (!user?.isPremium) {
      const canUse = await UsageService.trackUsage(
        "merge",
        files.reduce((sum, file) => sum + file.file.size, 0),
      );

      if (!canUse) {
        setUsageLimitReached(true);
        if (!isAuthenticated) {
          setShowAuthModal(true);
        }
        return;
      }
    }

    setIsProcessing(true);

    try {
      // Get total file size
      const totalSize = files.reduce((sum, file) => sum + file.file.size, 0);

      // Check file size limits (25MB for free users, 100MB for premium)
      const maxSize = user?.isPremium ? 100 * 1024 * 1024 : 25 * 1024 * 1024;
      if (totalSize > maxSize) {
        throw new Error(
          `File size exceeds ${user?.isPremium ? "100MB" : "25MB"} limit`,
        );
      }

      const mergedPdfBytes = await PDFService.mergePDFs(files);

      // For premium users, upload to Cloudinary for sharing
      if (user?.isPremium) {
        const cloudinaryUrl = await PDFService.uploadToCloudinary(
          mergedPdfBytes,
          `merged-pdf-${Date.now()}.pdf`,
        );
        setMergedFileUrl(cloudinaryUrl);
      }

      // Download the merged file
      PDFService.downloadFile(mergedPdfBytes, "merged-document.pdf");

      setIsComplete(true);

      toast({
        title: "Success!",
        description: "Your PDF files have been merged successfully.",
      });
    } catch (error: any) {
      console.error("Error merging PDFs:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to merge PDF files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadMergedFile = async () => {
    if (mergedFileUrl) {
      // Download from Cloudinary URL
      const link = document.createElement("a");
      link.href = mergedFileUrl;
      link.download = "merged-document.pdf";
      link.click();
    } else {
      // Re-merge and download
      try {
        const mergedPdfBytes = await PDFService.mergePDFs(files);
        PDFService.downloadFile(mergedPdfBytes, "merged-document.pdf");
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to download file. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg-light">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8">
          <Link
            to="/"
            className="text-body-medium text-text-light hover:text-brand-red"
          >
            <ArrowLeft className="w-4 h-4 mr-1 inline" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Combine className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-heading-medium text-text-dark mb-4">
            Merge PDF files
          </h1>
          <p className="text-body-large text-text-light max-w-2xl mx-auto">
            Combine PDFs in the order you want with the easiest PDF merger
            available.
          </p>
        </div>

        {/* Main Content */}
        {!isComplete ? (
          <div className="space-y-8">
            {/* File Upload */}
            {files.length === 0 && (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FileUpload
                  onFilesSelect={handleFilesSelect}
                  multiple={true}
                  maxSize={25}
                />
              </div>
            )}

            {/* File List */}
            {files.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-heading-small text-text-dark">
                    PDF Files ({files.length})
                  </h3>
                  <Button
                    variant="outline"
                    onClick={() =>
                      document.querySelector('input[type="file"]')?.click()
                    }
                  >
                    Add More Files
                  </Button>
                </div>

                <div className="space-y-3">
                  {files.map((processedFile, index) => (
                    <div
                      key={processedFile.id}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                      className={cn(
                        "flex items-center space-x-4 p-4 rounded-lg border transition-all duration-200 cursor-move",
                        draggedIndex === index
                          ? "border-brand-red bg-red-50 shadow-lg"
                          : "border-gray-200 bg-gray-50 hover:bg-gray-100",
                      )}
                    >
                      <GripVertical className="w-5 h-5 text-gray-400" />

                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-500" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-dark truncate">
                          {processedFile.file.name}
                        </p>
                        <p className="text-xs text-text-light">
                          {formatFileSize(processedFile.file.size)}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <RotateCw className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(processedFile.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hidden file input for adding more files */}
                <input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={(e) =>
                    e.target.files &&
                    handleFilesSelect(Array.from(e.target.files))
                  }
                  className="hidden"
                />
              </div>
            )}

            {/* Usage Limit Warning */}
            {usageLimitReached && !isAuthenticated && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-heading-small text-text-dark mb-2">
                  Daily Limit Reached
                </h3>
                <p className="text-body-medium text-text-light mb-4">
                  You've used your 3 free PDF operations today. Sign up to
                  continue!
                </p>
                <Button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-brand-red hover:bg-red-600"
                >
                  Sign Up Free
                </Button>
              </div>
            )}

            {usageLimitReached && isAuthenticated && !user?.isPremium && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-heading-small text-text-dark mb-2">
                  Upgrade to Premium
                </h3>
                <p className="text-body-medium text-text-light mb-4">
                  You've reached your daily limit. Upgrade to Premium for
                  unlimited access!
                </p>
                <Button
                  className="bg-brand-yellow text-black hover:bg-yellow-400"
                  asChild
                >
                  <Link to="/pricing">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade Now
                  </Link>
                </Button>
              </div>
            )}

            {/* Free Usage Counter */}
            {!isAuthenticated && !usageLimitReached && (
              <div className="text-center mb-4">
                <p className="text-body-small text-text-light">
                  Free users: {UsageService.getRemainingFreeUsage()}/3
                  operations remaining today
                </p>
              </div>
            )}

            {/* Merge Button */}
            {files.length >= 2 && !usageLimitReached && (
              <div className="text-center">
                <Button
                  size="lg"
                  onClick={handleMerge}
                  disabled={isProcessing}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Merging PDFs...
                    </>
                  ) : (
                    <>
                      <Combine className="w-5 h-5 mr-2" />
                      Merge PDF files
                    </>
                  )}
                </Button>

                {files.length < 2 && (
                  <p className="text-body-small text-text-light mt-2">
                    Add at least 2 PDF files to merge
                  </p>
                )}
              </div>
            )}

            {/* Processing */}
            {isProcessing && (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
                <h3 className="text-heading-small text-text-dark mb-2">
                  Merging your PDF files...
                </h3>
                <p className="text-body-medium text-text-light">
                  This may take a few moments depending on file size
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Success State */
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-heading-small text-text-dark mb-2">
              Your PDF has been merged successfully!
            </h3>
            <p className="text-body-medium text-text-light mb-6">
              Your merged PDF is ready for download
            </p>

            <div className="flex items-center justify-center space-x-4">
              <Button
                size="lg"
                onClick={downloadMergedFile}
                className="bg-brand-red hover:bg-red-600"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Merged PDF
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Merge Another PDF
              </Button>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Combine className="w-6 h-6 text-blue-500" />
            </div>
            <h4 className="font-semibold text-text-dark mb-2">Easy to Use</h4>
            <p className="text-body-small text-text-light">
              Drag and drop to reorder your PDF files exactly how you want them
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <h4 className="font-semibold text-text-dark mb-2">High Quality</h4>
            <p className="text-body-small text-text-light">
              Maintain the original quality of your PDF files during merge
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-purple-500" />
            </div>
            <h4 className="font-semibold text-text-dark mb-2">Any Size</h4>
            <p className="text-body-small text-text-light">
              Merge PDF files of any size without any limitations
            </p>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab="register"
      />
    </div>
  );
};

export default Merge;
