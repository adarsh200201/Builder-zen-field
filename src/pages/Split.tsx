import ToolPlaceholder from "./ToolPlaceholder";
import { Scissors } from "lucide-react";

const Split = () => {
  return (
    <ToolPlaceholder
      toolName="Split PDF"
      toolDescription="Separate one page or a whole set for easy conversion into independent PDF files."
      icon={<Scissors className="w-12 h-12 text-green-500" />}
      comingSoon={true}
    />
  );
};

export default Split;
