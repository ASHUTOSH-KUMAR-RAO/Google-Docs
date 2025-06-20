"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParam } from "@/hooks/use-search-params";
import { SearchIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";

export const SearchInput = () => {
  const [search, setSearch] = useSearchParam("search");
  const [value, setValue] = useState(search);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    setSearch("");
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="flex-1 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="relative max-w-[726px] w-full group">
        <div className={`
          relative transition-all duration-300 ease-in-out
          ${isFocused 
            ? 'transform scale-[1.02] shadow-lg shadow-blue-500/20' 
            : 'shadow-md hover:shadow-lg'
          }
          rounded-full bg-gradient-to-r from-slate-50 to-gray-50
          border border-gray-200/50 hover:border-gray-300/70
          ${isFocused ? 'border-blue-400/60 bg-white' : ''}
        `}>
          
          {/* Search Icon */}
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className={`
              absolute left-3 top-1/2 -translate-y-1/2 
              rounded-full transition-all duration-200
              hover:bg-blue-50 hover:text-blue-600
              ${isFocused ? 'text-blue-500' : 'text-gray-500'}
              [&_svg]:size-5
            `}
          >
            <SearchIcon />
          </Button>

          {/* Input Field */}
          <Input
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={inputRef}
            placeholder="Search anything..."
            className={`
              md:text-base font-medium
              placeholder:text-gray-400 placeholder:font-normal
              px-14 py-3 h-[52px]
              border-none bg-transparent
              focus-visible:ring-0 focus-visible:ring-offset-0
              focus-visible:outline-none
              rounded-full
              transition-all duration-200
            `}
          />

          {/* Clear Button */}
          {value && (
            <Button
              onClick={handleClear}
              type="button"
              variant="ghost"
              size="icon"
              className={`
                absolute right-3 top-1/2 -translate-y-1/2 
                rounded-full transition-all duration-200
                hover:bg-red-50 hover:text-red-500
                text-gray-400 hover:scale-110
                [&_svg]:size-4
                opacity-0 group-hover:opacity-100
                ${isFocused ? 'opacity-100' : ''}
              `}
            >
              <XIcon />
            </Button>
          )}

          {/* Subtle glow effect when focused */}
          <div className={`
            absolute inset-0 rounded-full 
            transition-opacity duration-300
            ${isFocused 
              ? 'bg-gradient-to-r from-blue-400/5 to-purple-400/5 opacity-100' 
              : 'opacity-0'
            }
            pointer-events-none
          `} />
        </div>

        {/* Optional: Search suggestions indicator */}
        {value && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2">
            <div className="px-3 py-1 bg-gray-800 text-white text-xs rounded-full opacity-75">
              Press Enter to search
            </div>
          </div>
        )}
      </form>
    </div>
  );
};