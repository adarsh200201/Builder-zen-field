import ToolPlaceholder from "./ToolPlaceholder";
import { Minimize } from "lucide-react";

const Compress = () => {
  return (
    <ToolPlaceholder
      toolName="Compress PDF"
      toolDescription="Reduce file size while optimizing for maximal PDF quality."
      icon={<Minimize className="w-12 h-12 text-purple-500" />}
      comingSoon={true}
    />
  );
};

export default Compress;
