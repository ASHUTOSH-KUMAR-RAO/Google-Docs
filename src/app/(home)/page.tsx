import { Navbar } from "./navbar";
import { TemplateGallary } from "./template-gallary";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed left-0 top-0 right-0 z-10 h-16 bg-white">
        <Navbar/>
      </div>
      <div className="mt-16">

    <TemplateGallary/>
    </div>
    </div>
  );
};

export default Home;
