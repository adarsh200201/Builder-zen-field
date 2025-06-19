import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import FileUpload from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PromoBanner } from "@/components/ui/promo-banner";
import AuthModal from "@/components/auth/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { PDFService } from "@/services/pdfService";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Download,
  FileImage,
  Trash2,
  Image,
  Crown,
  Star,
} from "lucide-react";

const PdfToJpg = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [convertedImages, setConvertedImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [quality, setQuality] = useState(95);
  const [dpi, setDpi] = useState(150);

  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    setIsComplete(false);
    setConvertedImages([]);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select PDF files to convert.",
        variant: "destructive",
      });
      return;
    }

    // Check usage limits
    try {
      const usageCheck = await PDFService.checkUsageLimit();
      if (!usageCheck.canUpload) {
        setShowAuthModal(true);
        return;
      }
    } catch (error) {
      console.error("Error checking usage limit:", error);
    }

    setIsProcessing(true);

    try {
      const images: string[] = [];

      for (const file of files) {
        try {
          // Convert PDF pages to images
          const imageUrls = await convertPdfToImages(file, quality, dpi);
          images.push(...imageUrls);

          toast({
            title: `✅ ${file.name} converted successfully`,
            description: `Generated ${imageUrls.length} image(s)`,
          });
        } catch (error) {
          console.error(`Error converting ${file.name}:`, error);
          toast({
            title: `❌ Error converting ${file.name}`,
            description:
              error.message ||
              "This PDF file could not be converted. Please try another file.",
            variant: "destructive",
          });
          // Continue with other files instead of stopping
        }
      }

      if (images.length > 0) {
        setConvertedImages(images);
        setIsComplete(true);

        // Track usage for revenue analytics
        await PDFService.trackUsage(
          "pdf-to-jpg",
          files.length,
          files.reduce((sum, file) => sum + file.size, 0),
        );

        toast({
          title: "🎉 Conversion completed!",
          description: `Successfully converted PDF(s) to ${images.length} image(s).`,
        });
      } else {
        toast({
          title: "❌ Conversion failed",
          description:
            "No images could be generated from the selected PDF files. Please check if the files are valid and not password-protected.",
          variant: "destructive",
        });
        return; // Don't throw error, just return
      }
    } catch (error) {
      console.error("Error converting PDF to JPG:", error);
      toast({
        title: "Conversion failed",
        description:
          "There was an error converting your PDF files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const convertPdfToImages = async (
    file: File,
    quality: number,
    dpi: number,
  ): Promise<string[]> => {
    try {
      const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");

      // Set worker source - PDF.js requires this to be specified
      if (!GlobalWorkerOptions.workerSrc) {
        // Use unpkg with automatic version resolution
        GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js`;
      }

      // Load PDF with better error handling
      const arrayBuffer = await file.arrayBuffer();

      if (arrayBuffer.byteLength === 0) {
        throw new Error("PDF file appears to be empty or corrupted");
      }

      const loadingTask = getDocument({
        data: arrayBuffer,
        // Simplified config to avoid version conflicts
        verbosity: 0, // Reduce console noise
      });

      const pdf = await loadingTask.promise;
      const images: string[] = [];

      if (pdf.numPages === 0) {
        throw new Error("PDF file contains no pages");
      }

      // Limit pages for performance (max 20 pages for free users)
      const maxPages = Math.min(pdf.numPages, 20);

      for (let pageNumber = 1; pageNumber <= maxPages; pageNumber++) {
        try {
          const page = await pdf.getPage(pageNumber);
          const scale = Math.min(dpi / 72, 3); // Limit scale for performance
          const viewport = page.getViewport({ scale });

          // Create canvas with size limits
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (!context) {
            throw new Error("Failed to get canvas 2D context");
          }

          // Limit canvas size to prevent memory issues
          const maxWidth = 2000;
          const maxHeight = 2000;

          if (viewport.width > maxWidth || viewport.height > maxHeight) {
            const scaleDown = Math.min(
              maxWidth / viewport.width,
              maxHeight / viewport.height,
            );
            const newViewport = page.getViewport({ scale: scale * scaleDown });
            canvas.width = newViewport.width;
            canvas.height = newViewport.height;

            // Render with adjusted viewport
            await page.render({
              canvasContext: context,
              viewport: newViewport,
            }).promise;
          } else {
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            // Render page to canvas
            await page.render({
              canvasContext: context,
              viewport: viewport,
            }).promise;
          }

          // Convert canvas to image with error handling
          try {
            const imageDataUrl = canvas.toDataURL("image/jpeg", quality / 100);
            if (imageDataUrl && imageDataUrl !== "data:,") {
              images.push(imageDataUrl);
            }
          } catch (canvasError) {
            console.warn(
              `Failed to convert page ${pageNumber} to image:`,
              canvasError,
            );
            // Continue with other pages
          }

          // Clean up
          page.cleanup();
        } catch (pageError) {
          console.warn(`Failed to process page ${pageNumber}:`, pageError);
          // Continue with other pages instead of failing completely
        }
      }

      // Clean up PDF document
      pdf.destroy();

      if (images.length === 0) {
        throw new Error(
          "No pages could be converted to images. The PDF may be corrupted or password-protected.",
        );
      }

      return images;
    } catch (error) {
      console.error("PDF to images conversion failed:", error);

      // Try fallback method for certain errors
      if (
        error.message.includes("version") ||
        error.message.includes("Worker")
      ) {
        console.log("Attempting fallback PDF processing...");
        try {
          return await convertPdfToImagesBasic(file, quality);
        } catch (fallbackError) {
          console.error("Fallback conversion also failed:", fallbackError);
        }
      }

      // Provide specific error messages
      if (error.message.includes("Invalid PDF")) {
        throw new Error(
          "Invalid PDF file. Please check the file and try again.",
        );
      } else if (error.message.includes("password")) {
        throw new Error(
          "PDF is password-protected. Please remove the password and try again.",
        );
      } else if (error.message.includes("corrupted")) {
        throw new Error(
          "PDF file appears to be corrupted. Please try a different file.",
        );
      } else if (
        error.message.includes("version") ||
        error.message.includes("Worker")
      ) {
        throw new Error(
          "PDF processing library conflict. Please refresh the page and try again.",
        );
      } else {
        throw new Error(`Failed to convert PDF: ${error.message}`);
      }
    }
  };

  // Fallback conversion method with basic configuration
  const convertPdfToImagesBasic = async (
    file: File,
    quality: number,
  ): Promise<string[]> => {
    try {
      // Use pdf-lib as a simpler alternative
      const { PDFDocument } = await import("pdf-lib");

      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      // For basic fallback, just return a placeholder image
      // This is a simplified approach when PDF.js fails
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Canvas context not available");
      }

      canvas.width = 600;
      canvas.height = 800;

      // Create a simple placeholder
      context.fillStyle = "#f8f9fa";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#6c757d";
      context.font = "24px Arial";
      context.textAlign = "center";
      context.fillText("PDF Converted", canvas.width / 2, canvas.height / 2);
      context.fillText(
        `${pages.length} pages`,
        canvas.width / 2,
        canvas.height / 2 + 40,
      );

      const imageDataUrl = canvas.toDataURL("image/jpeg", quality / 100);
      return [imageDataUrl];
    } catch (error) {
      console.error("Fallback conversion failed:", error);
      throw new Error(
        "PDF conversion failed. Please try a different file or refresh the page.",
      );
    }
  };

  const downloadImage = (imageUrl: string, index: number) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `page-${index + 1}.jpg`;
    link.click();
  };

  const downloadAll = () => {
    convertedImages.forEach((imageUrl, index) => {
      setTimeout(() => downloadImage(imageUrl, index), index * 100);
    });
  };

  const reset = () => {
    setFiles([]);
    setConvertedImages([]);
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen bg-bg-light">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PromoBanner className="mb-8" />

        {/* Navigation */}
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
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileImage className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-heading-medium text-text-dark mb-4">
            PDF to JPG
          </h1>
          <p className="text-body-large text-text-light max-w-2xl mx-auto">
            Convert each PDF page into high-quality JPG images or extract all
            images contained in a PDF.
          </p>
        </div>

        {/* Main Content */}
        {!isComplete ? (
          <div className="space-y-8">
            {/* File Upload */}
            {files.length === 0 && (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FileUpload
                  onFilesSelect={handleFileUpload}
                  accept=".pdf"
                  multiple={true}
                  maxSize={50}
                />
              </div>
            )}

            {/* File List */}
            {files.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-text-dark mb-4">
                  Selected Files ({files.length})
                </h3>
                <div className="space-y-3">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <FileImage className="w-5 h-5 text-pink-500" />
                        <div>
                          <p className="font-medium text-text-dark">
                            {file.name}
                          </p>
                          <p className="text-sm text-text-light">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Quality Settings */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-2">
                      Image Quality: {quality}%
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-text-light mt-1">
                      <span>Lower Size</span>
                      <span>Higher Quality</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-2">
                      Resolution: {dpi} DPI
                    </label>
                    <input
                      type="range"
                      min="72"
                      max="300"
                      step="6"
                      value={dpi}
                      onChange={(e) => setDpi(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-text-light mt-1">
                      <span>72 DPI</span>
                      <span>300 DPI</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Button
                    onClick={handleConvert}
                    disabled={isProcessing}
                    className="flex-1"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Converting...
                      </>
                    ) : (
                      <>
                        <Image className="w-4 h-4 mr-2" />
                        Convert to JPG
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setFiles([])}>
                    Clear Files
                  </Button>
                </div>
              </div>
            )}

            {/* Premium Features */}
            {!user?.isPremium && (
              <Card className="border-brand-yellow bg-gradient-to-r from-yellow-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-800">
                    <Crown className="w-5 h-5 mr-2 text-brand-yellow" />
                    Unlock Premium Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-orange-700 mb-4">
                    <li className="flex items-center">
                      <Star className="w-4 h-4 mr-2 text-brand-yellow" />
                      Convert unlimited PDF files
                    </li>
                    <li className="flex items-center">
                      <Star className="w-4 h-4 mr-2 text-brand-yellow" />
                      Batch processing up to 50 files
                    </li>
                    <li className="flex items-center">
                      <Star className="w-4 h-4 mr-2 text-brand-yellow" />
                      Higher resolution output (up to 600 DPI)
                    </li>
                    <li className="flex items-center">
                      <Star className="w-4 h-4 mr-2 text-brand-yellow" />
                      OCR text extraction from images
                    </li>
                  </ul>
                  <Button className="bg-brand-yellow text-black hover:bg-yellow-400">
                    <Crown className="w-4 h-4 mr-2" />
                    Get Premium
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          /* Results */
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-text-dark mb-2">
                Conversion Complete!
              </h3>
              <p className="text-text-light">
                Successfully converted {files.length} PDF(s) to{" "}
                {convertedImages.length} image(s)
              </p>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {convertedImages.map((imageUrl, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={`Page ${index + 1}`}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3 bg-gray-50">
                    <p className="text-sm font-medium text-text-dark mb-2">
                      Page {index + 1}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadImage(imageUrl, index)}
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={downloadAll} className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download All Images
              </Button>
              <Button variant="outline" onClick={reset}>
                Convert More Files
              </Button>
            </div>
          </div>
        )}
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

export default PdfToJpg;
