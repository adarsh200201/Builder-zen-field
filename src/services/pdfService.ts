import { PDFDocument } from "pdf-lib";

export interface ProcessedFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

export class PDFService {
  static async mergePDFs(files: ProcessedFile[]): Promise<Uint8Array> {
    try {
      const mergedPdf = await PDFDocument.create();

      for (const fileData of files) {
        const arrayBuffer = await fileData.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices(),
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      return pdfBytes;
    } catch (error) {
      console.error("Error merging PDFs:", error);
      throw new Error("Failed to merge PDF files");
    }
  }

  static async compressPDF(
    file: File,
    quality: number = 0.7,
  ): Promise<Uint8Array> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Basic compression by removing metadata and optimizing
      pdfDoc.setTitle("");
      pdfDoc.setAuthor("");
      pdfDoc.setSubject("");
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer("iLovePDF");
      pdfDoc.setCreator("iLovePDF");

      const pdfBytes = await pdfDoc.save({
        useObjectStreams: false,
        addDefaultPage: false,
      });

      return pdfBytes;
    } catch (error) {
      console.error("Error compressing PDF:", error);
      throw new Error("Failed to compress PDF file");
    }
  }

  static async splitPDF(file: File): Promise<Uint8Array[]> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();
      const splitPdfs: Uint8Array[] = [];

      for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(copiedPage);

        const pdfBytes = await newPdf.save();
        splitPdfs.push(pdfBytes);
      }

      return splitPdfs;
    } catch (error) {
      console.error("Error splitting PDF:", error);
      throw new Error("Failed to split PDF file");
    }
  }

  static async rotatePDF(file: File, rotation: number): Promise<Uint8Array> {
    try {
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

  static downloadFile(pdfBytes: Uint8Array, filename: string): void {
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  static async uploadToCloudinary(
    pdfBytes: Uint8Array,
    filename: string,
  ): Promise<string> {
    try {
      const formData = new FormData();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      formData.append("file", blob, filename);
      formData.append("upload_preset", "pdf_uploads"); // You need to create this in Cloudinary

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to upload to Cloudinary");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  }
}
