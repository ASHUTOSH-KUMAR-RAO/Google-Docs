"use client";

import { useQuery } from "convex/react";
import { Navbar } from "./navbar";
import { TemplateGallary } from "./template-gallary";
import { api } from "../../../convex/_generated/api";

const Home = () => {
  const documents = useQuery(api.documents.get);

  if (!documents) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed left-0 top-0 right-0 z-10 h-16 bg-white">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallary />
        {documents?.map((doc) => (
          <span key={doc._id}>
            {doc.title}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Home;
