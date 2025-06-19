export interface ProcessedFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

export class PDFService {
  private static API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  // Simple network check to avoid fetch errors
  private static async isBackendAvailable(): Promise<boolean> {
    try {
      // Simple fetch without AbortController to avoid signal issues
      const response = await Promise.race([
        fetch(`${this.API_URL}/health`, {
          method: "HEAD", // Use HEAD for minimal data transfer
        }),
        new Promise<Response>((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 2000),
        ),
      ]);

      return response.ok;
    } catch (error) {
      // Log for debugging but don't throw
      console.log("Backend availability check failed:", error.message);
      return false;
    }
  }

  // Get authentication token
  private static getToken(): string | null {
    return (
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1] || null
    );
  }

  // Get session ID for anonymous users
  private static getSessionId(): string {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = Math.random().toString(36).substr(2, 9);
      localStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
  }

  // Create headers for API requests
  private static createHeaders(): HeadersInit {
    const headers: HeadersInit = {};
    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  // Merge PDFs using backend API with client-side fallback
  static async mergePDFs(files: ProcessedFile[]): Promise<Uint8Array> {
    try {
      const formData = new FormData();

      files.forEach((fileData) => {
        formData.append("files", fileData.file);
      });

      formData.append("sessionId", this.getSessionId());

      const response = await fetch(`${this.API_URL}/pdf/merge`, {
        method: "POST",
        headers: this.createHeaders(),
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to merge PDF files");
      }

      const arrayBuffer = await response.arrayBuffer();
      return new Uint8Array(arrayBuffer);
    } catch (error) {
      console.error("Error merging PDFs:", error);

      // Check if it's a network error - fallback to client-side processing
      if (error instanceof TypeError && error.message.includes("fetch")) {
        console.warn("Backend unavailable, using client-side PDF merging");
        return await this.mergePDFsClientSide(files);
      }

      throw error;
    }
  }

  // Client-side PDF merging fallback
  private static async mergePDFsClientSide(
    files: ProcessedFile[],
  ): Promise<Uint8Array> {
    try {
      const { PDFDocument } = await import("pdf-lib");

      const mergedPdf = await PDFDocument.create();

      for (const fileData of files) {
        const arrayBuffer = await fileData.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      return pdfBytes;
    } catch (error) {
      console.error("Error in client-side PDF merging:", error);
      throw new Error("Failed to merge PDF files");
    }
  }

  // Compress PDF using backend API with client-side fallback
  static async compressPDF(
    file: File,
    quality: number = 0.7,
  ): Promise<Uint8Array> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("quality", quality.toString());
      formData.append("sessionId", this.getSessionId());

      const response = await fetch(`${this.API_URL}/pdf/compress`, {
        method: "POST",
        headers: this.createHeaders(),
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to compress PDF file");
      }

      const arrayBuffer = await response.arrayBuffer();
      return new Uint8Array(arrayBuffer);
    } catch (error) {
      console.error("Error compressing PDF:", error);

      // Check if it's a network error - fallback to client-side processing
      if (error instanceof TypeError && error.message.includes("fetch")) {
        console.warn("Backend unavailable, using client-side PDF optimization");
        return await this.optimizePDFClientSide(file);
      }

      throw error;
    }
  }

  // Client-side PDF optimization fallback (basic compression)
  private static async optimizePDFClientSide(file: File): Promise<Uint8Array> {
    try {
      const { PDFDocument } = await import("pdf-lib");

      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Basic optimization - just re-save the PDF which can reduce size
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: false,
        addDefaultPage: false,
      });

      return pdfBytes;
    } catch (error) {
      console.error("Error in client-side PDF optimization:", error);
      throw new Error("Failed to optimize PDF file");
    }
  }

  // Split PDF using backend API with client-side fallback
  static async splitPDF(file: File): Promise<Uint8Array[]> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("sessionId", this.getSessionId());

      const response = await fetch(`${this.API_URL}/pdf/split`, {
        method: "POST",
        headers: this.createHeaders(),
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to split PDF file");
      }

      // For now, return single page (backend returns first page)
      const arrayBuffer = await response.arrayBuffer();
      return [new Uint8Array(arrayBuffer)];
    } catch (error) {
      console.error("Error splitting PDF:", error);

      // Check if it's a network error - fallback to client-side processing
      if (error instanceof TypeError && error.message.includes("fetch")) {
        console.warn("Backend unavailable, using client-side PDF splitting");
        return await this.splitPDFClientSide(file);
      }

      throw error;
    }
  }

  // Client-side PDF splitting fallback
  private static async splitPDFClientSide(file: File): Promise<Uint8Array[]> {
    try {
      const { PDFDocument } = await import("pdf-lib");

      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();
      const splitPDFs: Uint8Array[] = [];

      // Split into individual pages
      for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFDocument.create();
        const [page] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(page);

        const pdfBytes = await newPdf.save();
        splitPDFs.push(pdfBytes);
      }

      return splitPDFs;
    } catch (error) {
      console.error("Error in client-side PDF splitting:", error);
      throw new Error("Failed to split PDF file");
    }
  }

  // Rotate PDF (client-side for now, can be moved to backend)
  static async rotatePDF(file: File, rotation: number): Promise<Uint8Array> {
    try {
      const { PDFDocument } = await import("pdf-lib");

      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      pages.forEach((page) => {
        page.setRotation({ angle: rotation });
      });

      const pdfBytes = await pdfDoc.save();
      return pdfBytes;
    } catch (error) {
      console.error("Error rotating PDF:", error);
      throw new Error("Failed to rotate PDF file");
    }
  }

  // Check usage limits
  static async checkUsageLimit(): Promise<{
    canUpload: boolean;
    remainingUploads: number | string;
    message: string;
    isPremium: boolean;
  }> {
    // During 3-month free promotion, always allow unlimited access
    // Skip backend check to avoid fetch errors
    console.log("Using 3-month free promotion mode");
    return {
      canUpload: true,
      remainingUploads: "unlimited",
      message: "🚀 3 Months Free Access - All tools unlocked!",
      isPremium: true, // Treat as premium during free period
    };
  }

  // Track usage
  static async trackUsage(
    toolUsed: string,
    fileCount: number,
    totalFileSize: number,
  ): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_URL}/usage/track`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...this.createHeaders(),
        },
        body: JSON.stringify({
          toolUsed,
          fileCount,
          totalFileSize,
          sessionId: this.getSessionId(),
        }),
      });

      return response.ok;
    } catch (error) {
      console.error("Error tracking usage:", error);
      return false;
    }
  }

  // Download file helper
  static downloadFile(pdfBytes: Uint8Array, filename: string): void {
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  // Upload to Cloudinary (Premium feature)
  static async uploadToCloudinary(
    pdfBytes: Uint8Array,
    filename: string,
  ): Promise<string> {
    try {
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const formData = new FormData();
      formData.append("file", blob, filename);

      const response = await fetch(`${this.API_URL}/upload/cloudinary`, {
        method: "POST",
        headers: this.createHeaders(),
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload to cloud");
      }

      const data = await response.json();
      return data.file.url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  }

  // Get available tools
  static async getAvailableTools(): Promise<any[]> {
    try {
      const response = await fetch(`${this.API_URL}/pdf/tools`);

      if (!response.ok) {
        throw new Error("Failed to fetch tools");
      }

      const data = await response.json();
      return data.tools;
    } catch (error) {
      console.error("Error fetching tools:", error);
      return [];
    }
  }
}
