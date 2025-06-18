import ToolPlaceholder from "./ToolPlaceholder";
import { FileImage } from "lucide-react";

const PdfToJpg = () => {
  return (
    <ToolPlaceholder
      toolName="PDF to JPG"
      toolDescription="Convert each PDF page into a JPG or extract all images contained in a PDF."
      icon={<FileImage className="w-12 h-12 text-pink-500" />}
      comingSoon={true}
    />
  );
};

export default PdfToJpg;
