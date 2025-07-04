import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NetworkStatus } from "@/components/ui/network-status";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Merge from "./pages/Merge";
import Split from "./pages/Split";
import Compress from "./pages/Compress";
import Convert from "./pages/Convert";
import PdfToJpg from "./pages/PdfToJpg";
import PdfToWord from "./pages/PdfToWord";
import WordToPdf from "./pages/WordToPdf";
import PdfToPowerPoint from "./pages/PdfToPowerPoint";
import PdfToExcel from "./pages/PdfToExcel";
import JpgToPdf from "./pages/JpgToPdf";
import Watermark from "./pages/Watermark";
import ProtectPdf from "./pages/ProtectPdf";
import UnlockPdf from "./pages/UnlockPdf";
import CropPdf from "./pages/CropPdf";
import OrganizePdf from "./pages/OrganizePdf";
import PageNumbers from "./pages/PageNumbers";
import EditPdf from "./pages/EditPdf";
import SignPdf from "./pages/SignPdf";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import Rotate from "./pages/Rotate";
import TestAllTools from "./pages/TestAllTools";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Press from "./pages/Press";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Affiliate from "./pages/Affiliate";
import FeatureRequests from "./pages/FeatureRequests";
import Help from "./pages/Help";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Gdpr from "./pages/Gdpr";
import Security from "./pages/Security";
import ApiDocs from "./pages/ApiDocs";
import Status from "./pages/Status";
import {
  PowerPointToPdf,
  ExcelToPdf,
  RotatePdf,
  HtmlToPdf,
  PdfToPdfA,
  RepairPdf,
  ScanToPdf,
  OcrPdf,
  ComparePdf,
  RedactPdf,
} from "./pages/AllTools";

// Import placeholder components with aliases to avoid conflicts
import {
  PdfToPowerPoint as PdfToPowerPointPlaceholder,
  PdfToExcel as PdfToExcelPlaceholder,
  JpgToPdf as JpgToPdfPlaceholder,
  Watermark as WatermarkPlaceholder,
  UnlockPdf as UnlockPdfPlaceholder,
  ProtectPdf as ProtectPdfPlaceholder,
  OrganizePdf as OrganizePdfPlaceholder,
  CropPdf as CropPdfPlaceholder,
  PageNumbers as PageNumbersPlaceholder,
  EditPdf as EditPdfPlaceholder,
  SignPdf as SignPdfPlaceholder,
} from "./pages/AllTools";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/merge" element={<Merge />} />
            <Route path="/split" element={<Split />} />
            <Route path="/compress" element={<Compress />} />
            <Route path="/convert" element={<Convert />} />
            <Route path="/pdf-to-jpg" element={<PdfToJpg />} />
            <Route path="/pdf-to-word" element={<PdfToWord />} />
            <Route path="/word-to-pdf" element={<WordToPdf />} />
            <Route path="/pdf-to-powerpoint" element={<PdfToPowerPoint />} />
            <Route path="/pdf-to-excel" element={<PdfToExcel />} />
            <Route path="/jpg-to-pdf" element={<JpgToPdf />} />
            <Route path="/rotate-pdf" element={<Rotate />} />
            <Route
              path="/pdf-to-powerpoint-placeholder"
              element={<PdfToPowerPointPlaceholder />}
            />
            <Route path="/powerpoint-to-pdf" element={<PowerPointToPdf />} />
            <Route
              path="/pdf-to-excel-placeholder"
              element={<PdfToExcelPlaceholder />}
            />
            <Route path="/excel-to-pdf" element={<ExcelToPdf />} />
            <Route path="/edit-pdf" element={<EditPdf />} />
            <Route
              path="/jpg-to-pdf-placeholder"
              element={<JpgToPdfPlaceholder />}
            />
            <Route path="/sign-pdf" element={<SignPdf />} />
            <Route path="/watermark" element={<Watermark />} />
            <Route path="/unlock-pdf" element={<UnlockPdf />} />
            <Route path="/protect-pdf" element={<ProtectPdf />} />
            <Route path="/organize-pdf" element={<OrganizePdf />} />
            <Route path="/html-to-pdf" element={<HtmlToPdf />} />
            <Route path="/pdf-to-pdfa" element={<PdfToPdfA />} />
            <Route path="/repair-pdf" element={<RepairPdf />} />
            <Route path="/page-numbers" element={<PageNumbers />} />
            <Route path="/scan-to-pdf" element={<ScanToPdf />} />
            <Route path="/ocr-pdf" element={<OcrPdf />} />
            <Route path="/compare-pdf" element={<ComparePdf />} />
            <Route path="/redact-pdf" element={<RedactPdf />} />
            <Route path="/crop-pdf" element={<CropPdf />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/test-all-tools" element={<TestAllTools />} />
            <Route path="/tools" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/press" element={<Press />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/affiliate" element={<Affiliate />} />
            <Route path="/feature-requests" element={<FeatureRequests />} />
            <Route path="/help" element={<Help />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/gdpr" element={<Gdpr />} />
            <Route path="/security" element={<Security />} />
            <Route path="/api-docs" element={<ApiDocs />} />
            <Route path="/status" element={<Status />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <NetworkStatus />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
