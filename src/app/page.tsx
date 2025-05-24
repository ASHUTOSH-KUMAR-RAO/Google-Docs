import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Button variant="destructive" >
        Click{" "}
        <Link href="/Documents/1244">
          <span className="text-gray-500 underline">&nbsp;Here&nbsp;</span>
        </Link>{" "}
        And Go To the Documents Page
      </Button>
    </div>
  );
};

export default Home;
