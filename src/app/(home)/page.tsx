import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Navbar } from "./navbar";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed left-0 top-0 right-0 z-10 h-16 bg-white">
        <Navbar/>
      </div>
      <div className="mt-16">

      <Button variant="destructive" >
        Click{" "}
        <Link href="/Documents/1244">
          <span className="text-gray-500 underline">&nbsp;Here&nbsp;</span>
        </Link>{" "}
        And Go To the Documents Page
      </Button>
    </div>
    </div>
  );
};

export default Home;
