import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Toolbar } from "./toolbar";

interface DocumentIdProps {
  params: Promise<{ documentId: String }>;
}

const DocumentIdPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
        <Navbar />
        <Toolbar />
      </div>

      <div className="pt-[180px] print:pt-0 ">
        <Editor />
      </div>
    </div>
  );
};

export default DocumentIdPage;
