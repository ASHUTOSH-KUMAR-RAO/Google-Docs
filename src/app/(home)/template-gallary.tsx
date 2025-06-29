"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { templates } from "@/constants/templates";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { api } from "../../../convex/_generated/api";

export const TemplateGallary = () => {
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const [isCreating, setIsCreating] = useState(false);

  const onTemplateClick =  (title: string, initialContent: string) => {
    setIsCreating(true);
    create({ title, initialContent })
      .then((documentId) => {

        router.push(`/documents/${documentId}`);
      })
      .finally(()=>{
        setIsCreating(false);
      })
      ; 
  }
  return (
    <div className="bg-[#f1f3f4]">
      <div className="max-w-screen-xl mx-auto py-6 px-14 flex flex-col gap-y-4">
        <h3 className="text-base font-medium">Start a new document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.28571428571429%] pl-4"
              >
                <div
                  className={cn(
                    "aspect-[3/4] flex flex-col gap-y-2.5 group",
                    isCreating
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:shadow-xl transition-all duration-300"
                  )}
                >
                  <button
                    disabled={isCreating}
                    onClick={() => onTemplateClick(template.label, "")}
                    style={{
                      backgroundImage: `url(${template.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition-all duration-300 flex flex-col gap-y-4 bg-white items-center justify-center group-hover:scale-[1.02] shadow-sm hover:shadow-lg relative overflow-hidden"
                  >
                    {/* Subtle hover overlay */}
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                  <p className="text-sm font-medium truncate group-hover:text-blue-600 transition-colors duration-200">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hover:bg-gray-100 transition-colors duration-200" />
          <CarouselNext className="hover:bg-gray-100 transition-colors duration-200" />
        </Carousel>
      </div>
    </div>
  );
};
