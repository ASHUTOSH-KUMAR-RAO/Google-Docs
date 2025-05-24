import { Editor } from "./editor";
import { Toolbar } from "./toolbar";

interface DocumentIdProps {
  params: Promise<{ documentId: String }>;
}

const DocumentIdPage = async ({ params }: DocumentIdProps) => {
  const { documentId } = await params; // By the Help of Destructering
  return <div className="min-h-screen bg-[#f5f5f5]">
    <Toolbar/>
  <Editor/>
  </div>;
};


export default DocumentIdPage;




