export interface ProcessedFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

export class PDFService {
  private static API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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

  // Merge PDFs using backend API
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
      throw error;
    }
  }

  // Compress PDF using backend API
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
      throw error;
    }
  }

  // Split PDF using backend API
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
      throw error;
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
    try {
      const sessionId = this.getSessionId();
      const response = await fetch(
        `${this.API_URL}/usage/check-limit?sessionId=${sessionId}`,
        {
          headers: this.createHeaders(),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to check usage limit");
      }

      return await response.json();
    } catch (error) {
      console.error("Error checking usage limit:", error);

      // Check if it's a network error
      if (error instanceof TypeError && error.message.includes("fetch")) {
        console.warn("Backend service unavailable, using fallback mode");
        // During the 3-month free promotion, allow unlimited access
        return {
          canUpload: true,
          remainingUploads: "unlimited",
          message: "🚀 3 Months Free Access - All tools unlocked!",
          isPremium: true, // Treat as premium during free period
        };
      }

      // Return default for other errors
      return {
        canUpload: true,
        remainingUploads: 3,
        message: "Unable to check limits - temporary issue",
        isPremium: false,
      };
    }
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
