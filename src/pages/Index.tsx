import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import AdSense from "@/components/ads/AdSense";
import { PromoBanner } from "@/components/ui/promo-banner";
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
      isWorking: true,
    },
    {
      title: "Split PDF",
      description:
        "Separate one page or a whole set for easy conversion into independent PDF files.",
      icon: Scissors,
      href: "/split",
      color: "from-green-500 to-green-600",
      available: true,
      isWorking: true,
    },
    {
      title: "Compress PDF",
      description: "Reduce file size while optimizing for maximal PDF quality.",
      icon: Minimize,
      href: "/compress",
      color: "from-purple-500 to-purple-600",
      available: true,
      isWorking: true,
    },
    {
      title: "PDF to Word",
      description:
        "Easily convert your PDF files into easy to edit DOC and DOCX documents. The converted WORD document is almost 100% accurate.",
      icon: FileText,
      href: "/pdf-to-word",
      color: "from-orange-500 to-orange-600",
      available: true,
      isWorking: true,
      isNew: true,
    },
    {
      name: "PDF to PowerPoint",
      description:
        "Turn your PDF files into easy to edit PPT and PPTX slideshows.",
      icon: <FileText className="w-8 h-8" />,
      href: "/pdf-to-powerpoint",
      gradient: "from-red-500 to-red-600",
      isWorking: true,
      isNew: true,
    },
    {
      name: "PDF to Excel",
      description:
        "Pull data straight from PDFs into Excel spreadsheets in a few short seconds.",
      icon: <FileText className="w-8 h-8" />,
      href: "/pdf-to-excel",
      gradient: "from-emerald-500 to-emerald-600",
      isWorking: true,
      isNew: true,
    },
    {
      title: "Word to PDF",
      description:
        "Make DOC and DOCX files easy to read by converting them to PDF.",
      icon: FileText,
      href: "/word-to-pdf",
      color: "from-blue-600 to-blue-700",
      available: true,
      isWorking: true,
      isNew: true,
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
      available: true,
      isWorking: true,
      isNew: true,
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

      {/* Promotional Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <PromoBanner />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-heading-large text-text-dark mb-6 max-w-4xl mx-auto">
              Every tool you need to work with PDFs in one place
            </h1>
            <p className="text-body-large text-text-light max-w-3xl mx-auto">
              PdfPage is your ultimate PDF toolkit. All tools are 100% FREE and
              easy to use! Merge, split, compress, convert, rotate, unlock and
              watermark PDFs with just a few clicks.
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

      {/* Ad Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSense
            adSlot="1234567890"
            adFormat="horizontal"
            className="max-w-4xl mx-auto"
          />
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
              PdfPage is your number one web app for editing PDF with ease.
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
      <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-red to-red-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">PP</span>
                  </div>
                  <span className="font-bold text-2xl text-text-dark">
                    Pdf<span className="text-brand-red">Page</span>
                  </span>
                </div>
                <p className="text-body-medium text-text-light mb-6 max-w-xs">
                  The most popular free PDF tools to merge, split, compress,
                  convert, rotate, unlock and watermark PDFs. 100% free online
                  tools.
                </p>

                {/* Social Media Links */}
                <div className="flex items-center space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-800 hover:bg-blue-900 rounded-lg flex items-center justify-center transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-lg flex items-center justify-center transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-lg flex items-center justify-center transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.142.662-1.995 1.482-1.995.699 0 1.038.219 1.038 1.142 0 .695-.442 1.734-.67 2.692-.191.81.406 1.472 1.2 1.472 1.441 0 2.548-1.518 2.548-3.708 0-1.94-1.394-3.298-3.388-3.298-2.309 0-3.667 1.732-3.667 3.513 0 .695.267 1.442.602 1.846.066.08.075.15.055.231-.061.254-.196.796-.223.908-.035.146-.116.177-.268.107-1.001-.465-1.624-1.926-1.624-3.1 0-2.556 1.856-4.9 5.35-4.9 2.808 0 4.99 2.001 4.99 4.673 0 2.789-1.755 5.029-4.198 5.029-.82 0-1.591-.427-1.853-.936l-.503 1.917c-.181.695-.669 1.566-.996 2.097.751.232 1.544.357 2.368.357 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-black hover:bg-gray-800 rounded-lg flex items-center justify-center transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* PDF Tools */}
              <div>
                <h4 className="font-semibold text-text-dark mb-4">
                  Popular Tools
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link
                      to="/merge"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      Merge PDF
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/split"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      Split PDF
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/compress"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      Compress PDF
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pdf-to-word"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      PDF to Word
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/word-to-pdf"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      Word to PDF
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pdf-to-jpg"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      PDF to JPG
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Convert Tools */}
              <div>
                <h4 className="font-semibold text-text-dark mb-4">Convert</h4>
                <ul className="space-y-3">
                  <li>
                    <Link
                      to="/jpg-to-pdf"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      JPG to PDF
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pdf-to-powerpoint"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      PDF to PowerPoint
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pdf-to-excel"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      PDF to Excel
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/powerpoint-to-pdf"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      PowerPoint to PDF
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/excel-to-pdf"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      Excel to PDF
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/html-to-pdf"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      HTML to PDF
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Product */}
              <div>
                <h4 className="font-semibold text-text-dark mb-4">Product</h4>
                <ul className="space-y-3">
                  <li>
                    <Link
                      to="/pricing"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/desktop"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      Desktop App
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/mobile"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      Mobile App
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/api"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      Developer API
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/features"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/help"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      Help Center
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-semibold text-text-dark mb-4">Company</h4>
                <ul className="space-y-3">
                  <li>
                    <Link
                      to="/about"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/press"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      Press
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/careers"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/affiliate"
                      className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                    >
                      Affiliate Program
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Security Badges */}
          <div className="border-t border-gray-200 py-8">
            <div className="flex flex-wrap items-center justify-center space-x-8 mb-6">
              <div className="flex items-center space-x-2 text-body-small text-text-light">
                <Shield className="w-5 h-5 text-green-600" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center space-x-2 text-body-small text-text-light">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-body-small text-text-light">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>ISO27001 Certified</span>
              </div>
              <div className="flex items-center space-x-2 text-body-small text-text-light">
                <Users className="w-5 h-5 text-purple-600" />
                <span>50M+ Users</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-200 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-body-small text-text-light">
                © 2025 PdfPage. All rights reserved.
              </p>

              <div className="flex items-center space-x-4">
                <Link
                  to="/privacy"
                  className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                >
                  Privacy
                </Link>
                <Link
                  to="/terms"
                  className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                >
                  Terms
                </Link>
                <Link
                  to="/cookies"
                  className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                >
                  Cookies
                </Link>
                <Link
                  to="/security"
                  className="text-body-small text-text-light hover:text-brand-red transition-colors duration-200"
                >
                  Security
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                <select className="text-body-small text-text-light bg-transparent border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-brand-red">
                  <option>English</option>
                  <option>Español</option>
                  <option>Français</option>
                  <option>Deutsch</option>
                  <option>Italiano</option>
                  <option>Português</option>
                </select>
                <span className="text-body-small text-text-light">🌍</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
