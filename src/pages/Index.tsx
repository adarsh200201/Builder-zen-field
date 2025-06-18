import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import {
  Combine,
  Scissors,
  Minimize,
  FileText,
  FileImage,
  Shield,
  Zap,
  Users,
  Crown,
  CheckCircle,
  Star,
  ArrowRight,
} from "lucide-react";

const Index = () => {
  const pdfTools = [
    {
      title: "Merge PDF",
      description:
        "Combine PDFs in the order you want with the easiest PDF merger available.",
      icon: Combine,
      href: "/merge",
      color: "from-blue-500 to-blue-600",
      available: true,
    },
    {
      title: "Split PDF",
      description:
        "Separate one page or a whole set for easy conversion into independent PDF files.",
      icon: Scissors,
      href: "/split",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Compress PDF",
      description: "Reduce file size while optimizing for maximal PDF quality.",
      icon: Minimize,
      href: "/compress",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "PDF to Word",
      description:
        "Easily convert your PDF files into easy to edit DOC and DOCX documents. The converted WORD document is almost 100% accurate.",
      icon: FileText,
      href: "/pdf-to-word",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "PDF to PowerPoint",
      description:
        "Turn your PDF files into easy to edit PPT and PPTX slideshows.",
      icon: FileText,
      href: "/pdf-to-powerpoint",
      color: "from-red-500 to-red-600",
    },
    {
      title: "PDF to Excel",
      description:
        "Pull data straight from PDFs into Excel spreadsheets in a few short seconds.",
      icon: FileText,
      href: "/pdf-to-excel",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Word to PDF",
      description:
        "Make DOC and DOCX files easy to read by converting them to PDF.",
      icon: FileText,
      href: "/word-to-pdf",
      color: "from-blue-600 to-blue-700",
    },
    {
      title: "PowerPoint to PDF",
      description:
        "Make PPT and PPTX slideshows easy to view by converting them to PDF.",
      icon: FileText,
      href: "/powerpoint-to-pdf",
      color: "from-red-600 to-red-700",
    },
    {
      title: "Excel to PDF",
      description:
        "Make EXCEL spreadsheets easy to read by converting them to PDF.",
      icon: FileText,
      href: "/excel-to-pdf",
      color: "from-emerald-600 to-emerald-700",
    },
    {
      title: "Edit PDF",
      description:
        "Add text, images, shapes or freehand annotations to a PDF document. Edit the size, font, and color of the added content.",
      icon: FileText,
      href: "/edit-pdf",
      color: "from-indigo-500 to-indigo-600",
      isNew: true,
    },
    {
      title: "PDF to JPG",
      description:
        "Convert each PDF page into a JPG or extract all images contained in a PDF.",
      icon: FileImage,
      href: "/pdf-to-jpg",
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "JPG to PDF",
      description:
        "Convert JPG images to PDF in seconds. Easily adjust orientation and margins.",
      icon: FileImage,
      href: "/jpg-to-pdf",
      color: "from-pink-600 to-pink-700",
    },
    {
      title: "Sign PDF",
      description:
        "Sign yourself or request electronic signatures from others.",
      icon: FileText,
      href: "/sign-pdf",
      color: "from-violet-500 to-violet-600",
    },
    {
      title: "Watermark",
      description:
        "Stamp an image or text over your PDF in seconds. Choose the typography, transparency and position.",
      icon: FileText,
      href: "/watermark",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      title: "Rotate PDF",
      description:
        "Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!",
      icon: FileText,
      href: "/rotate-pdf",
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "HTML to PDF",
      description:
        "Convert webpages in HTML to PDF. Copy and paste the URL of the page you want and convert it to PDF with a click.",
      icon: FileText,
      href: "/html-to-pdf",
      color: "from-amber-500 to-amber-600",
    },
    {
      title: "Unlock PDF",
      description:
        "Remove PDF password security, giving you the freedom to use your PDFs as you want.",
      icon: FileText,
      href: "/unlock-pdf",
      color: "from-lime-500 to-lime-600",
    },
    {
      title: "Protect PDF",
      description:
        "Protect PDF files with a password. Encrypt PDF documents to prevent unauthorized access.",
      icon: Shield,
      href: "/protect-pdf",
      color: "from-red-500 to-red-600",
    },
    {
      title: "Organize PDF",
      description:
        "Sort pages of your PDF file however you like. Delete PDF pages or add PDF pages to your document at your convenience.",
      icon: FileText,
      href: "/organize-pdf",
      color: "from-slate-500 to-slate-600",
    },
    {
      title: "PDF to PDF/A",
      description:
        "Transform your PDF to PDF/A, the ISO-standardized version of PDF for long-term archiving. Your PDF will preserve formatting when accessed in the future.",
      icon: FileText,
      href: "/pdf-to-pdfa",
      color: "from-gray-500 to-gray-600",
    },
    {
      title: "Repair PDF",
      description:
        "Repair a damaged PDF and recover data from corrupt PDF. Fix PDF files with our Repair tool.",
      icon: FileText,
      href: "/repair-pdf",
      color: "from-orange-600 to-orange-700",
    },
    {
      title: "Page numbers",
      description:
        "Add page numbers into PDFs with ease. Choose your positions, dimensions, typography.",
      icon: FileText,
      href: "/page-numbers",
      color: "from-purple-600 to-purple-700",
    },
    {
      title: "Scan to PDF",
      description:
        "Capture document scans from your mobile device and send them instantly to your browser.",
      icon: FileText,
      href: "/scan-to-pdf",
      color: "from-green-600 to-green-700",
    },
    {
      title: "OCR PDF",
      description:
        "Easily convert scanned PDF into searchable and selectable documents.",
      icon: FileText,
      href: "/ocr-pdf",
      color: "from-blue-700 to-blue-800",
    },
    {
      title: "Compare PDF",
      description:
        "Show a side-by-side document comparison and easily spot changes between different file versions.",
      icon: FileText,
      href: "/compare-pdf",
      color: "from-indigo-600 to-indigo-700",
      isNew: true,
    },
    {
      title: "Redact PDF",
      description:
        "Redact text and graphics to permanently remove sensitive information from a PDF.",
      icon: FileText,
      href: "/redact-pdf",
      color: "from-red-700 to-red-800",
      isNew: true,
    },
    {
      title: "Crop PDF",
      description:
        "Crop margins of PDF documents or select specific areas, then apply the changes to one page or the whole document.",
      icon: Scissors,
      href: "/crop-pdf",
      color: "from-green-700 to-green-800",
      isNew: true,
    },
  ];

  return (
    <div className="min-h-screen bg-bg-light">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-heading-large text-text-dark mb-6 max-w-4xl mx-auto">
              Every tool you need to work with PDFs in one place
            </h1>
            <p className="text-body-large text-text-light max-w-3xl mx-auto">
              Every tool you need to use PDFs, at your fingertips. All are 100%
              FREE and easy to use! Merge, split, compress, convert, rotate,
              unlock and watermark PDFs with just a few clicks.
            </p>
          </div>
        </div>
      </section>

      {/* PDF Tools Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pdfTools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <Link
                  key={tool.href}
                  to={tool.href}
                  className={`group bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-brand-red/20 relative ${tool.available ? "ring-2 ring-green-200" : ""}`}
                >
                  {tool.isNew && (
                    <div className="absolute -top-2 -right-2 bg-brand-red text-white text-xs font-bold px-2 py-1 rounded-full">
                      New!
                    </div>
                  )}
                  {tool.available && (
                    <div className="absolute -top-2 -left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Live
                    </div>
                  )}
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-text-dark mb-1 group-hover:text-brand-red transition-colors duration-200 line-clamp-1">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-text-light line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-heading-medium text-text-dark mb-6">
              The PDF software trusted by millions of users
            </h2>
            <p className="text-body-large text-text-light max-w-3xl mx-auto">
              iLovePDF is your number one web app for editing PDF with ease.
              Enjoy all the tools you need to work efficiently with your digital
              documents while keeping your data safe and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-heading-small text-text-dark mb-2">
                Secure & Private
              </h3>
              <p className="text-body-small text-text-light">
                All files are processed securely and deleted after 1 hour
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-heading-small text-text-dark mb-2">
                Fast & Reliable
              </h3>
              <p className="text-body-small text-text-light">
                Process files quickly with our powerful servers
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-heading-small text-text-dark mb-2">
                Trusted by Millions
              </h3>
              <p className="text-body-small text-text-light">
                Over 50 million users worldwide trust our platform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Section */}
      <section className="py-16 bg-gradient-to-br from-bg-dark to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-heading-medium mb-6">
                Get more with Premium
              </h2>
              <p className="text-body-large text-gray-300 mb-8">
                Complete projects faster with batch file processing, convert
                scanned documents with OCR and e-sign your business agreements.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited file processing",
                  "No ads or interruptions",
                  "Batch file processing",
                  "OCR text recognition",
                  "Priority customer support",
                  "Advanced file security",
                ].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-brand-yellow mr-3" />
                    <span className="text-body-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className="bg-brand-yellow text-black hover:bg-yellow-400"
              >
                <Crown className="w-5 h-5 mr-2" />
                Get Premium
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-brand-red to-red-600 rounded-2xl p-8 transform rotate-3 shadow-2xl">
                <div className="bg-white rounded-lg p-6 transform -rotate-6">
                  <div className="flex items-center mb-4">
                    <Star className="w-6 h-6 text-brand-yellow mr-2" />
                    <span className="font-semibold text-text-dark">
                      Premium Plan
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-text-dark mb-2">
                    $9.99
                  </div>
                  <div className="text-body-small text-text-light">
                    per month
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-red to-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">iL</span>
                </div>
                <span className="font-bold text-xl text-text-dark">
                  iLove<span className="text-brand-red">PDF</span>
                </span>
              </div>
              <p className="text-body-small text-text-light">
                Your number one web app for editing PDF with ease.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-text-dark mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/tools"
                    className="text-body-small text-text-light hover:text-brand-red"
                  >
                    All Tools
                  </Link>
                </li>
                <li>
                  <Link
                    to="/desktop"
                    className="text-body-small text-text-light hover:text-brand-red"
                  >
                    Desktop App
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mobile"
                    className="text-body-small text-text-light hover:text-brand-red"
                  >
                    Mobile App
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-text-dark mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-body-small text-text-light hover:text-brand-red"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="text-body-small text-text-light hover:text-brand-red"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-body-small text-text-light hover:text-brand-red"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-text-dark mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/privacy"
                    className="text-body-small text-text-light hover:text-brand-red"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-body-small text-text-light hover:text-brand-red"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/security"
                    className="text-body-small text-text-light hover:text-brand-red"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-body-small text-text-light">
              © 2025 iLovePDF. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
