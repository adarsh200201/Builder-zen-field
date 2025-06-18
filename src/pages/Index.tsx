import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import FileUpload from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import {
  Combine,
  Scissors,
  Minimize,
  FileText,
  FileImage,
  Download,
  Shield,
  Zap,
  Users,
  Crown,
  CheckCircle,
  Star,
  ArrowRight,
} from "lucide-react";

const Index = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const pdfTools = [
    {
      title: "Merge PDF",
      description:
        "Combine PDFs in the order you want with the easiest PDF merger available.",
      icon: Combine,
      href: "/merge",
      color: "from-blue-500 to-blue-600",
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
        "Convert PDF to Word in seconds. It's completely free and easy to use.",
      icon: FileText,
      href: "/pdf-to-word",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Word to PDF",
      description:
        "Make DOC and DOCX files easy to read by converting them to PDF.",
      icon: FileText,
      href: "/word-to-pdf",
      color: "from-red-500 to-red-600",
    },
    {
      title: "PDF to JPG",
      description:
        "Convert each PDF page into a JPG or extract all images contained in a PDF.",
      icon: FileImage,
      href: "/pdf-to-jpg",
      color: "from-pink-500 to-pink-600",
    },
  ];

  const handleFilesSelect = (files: File[]) => {
    setSelectedFiles(files);
  };

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

          {/* Upload Section */}
          <div className="max-w-2xl mx-auto mb-16">
            <FileUpload
              onFilesSelect={handleFilesSelect}
              multiple={true}
              maxSize={10}
              className="animate-float"
            />

            {selectedFiles.length > 0 && (
              <div className="mt-6 text-center">
                <Button className="bg-brand-red hover:bg-red-600" size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  Process {selectedFiles.length} file
                  {selectedFiles.length > 1 ? "s" : ""}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PDF Tools Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pdfTools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <Link
                  key={tool.href}
                  to={tool.href}
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-brand-red/20"
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-heading-small text-text-dark mb-2 group-hover:text-brand-red transition-colors duration-200">
                        {tool.title}
                      </h3>
                      <p className="text-body-small text-text-light">
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
