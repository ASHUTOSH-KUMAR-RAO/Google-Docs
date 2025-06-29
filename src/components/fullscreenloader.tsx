import React from "react";
import { Sparkles } from "lucide-react";

interface FullScreenLoaderProps {
  label?: string;
}

export const FullScreenLoader = ({
  label,
}: FullScreenLoaderProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 relative overflow-hidden">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main loader */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        
        {/* Enhanced spinner with multiple layers */}
        <div className="relative flex items-center justify-center">
          {/* Outer rotating ring */}
          <div className="absolute w-20 h-20 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
          
          {/* Middle pulsing ring */}
          <div className="absolute w-16 h-16 border-3 border-transparent border-t-purple-400/60 border-l-blue-400/60 rounded-full animate-spin animation-reverse animation-duration-2000"></div>
          
          {/* Inner gradient circle */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-pulse flex items-center justify-center shadow-lg">
            <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
            </div>
          </div>
          
          {/* Outer glow effect */}
          <div className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-ping"></div>
        </div>
        
        {/* Enhanced label section */}
        {label && (
          <div className="text-center space-y-3 max-w-xs">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 tracking-wide">
              {label}
            </p>
            
            {/* Animated progress bar */}
            <div className="relative w-32 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-auto">
              <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-slide"></div>
            </div>
            
            {/* Subtle dots indicator */}
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-200"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce animation-delay-400"></div>
            </div>
          </div>
        )}
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-float"
            style={{
              left: `${15 + (i * 10)}%`,
              top: `${20 + (i * 8)}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + (i * 0.5)}s`
            }}
          ></div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(400%); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.7; 
          }
          33% { 
            transform: translateY(-15px) translateX(10px) rotate(120deg); 
            opacity: 0.9; 
          }
          66% { 
            transform: translateY(-8px) translateX(-5px) rotate(240deg); 
            opacity: 0.4; 
          }
        }
        
        .animate-slide {
          animation: slide 2s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animation-reverse {
          animation-direction: reverse;
        }
        
        .animation-duration-2000 {
          animation-duration: 2s;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  );
};

// Demo
export default function LoaderDemo() {
  return (
    <div className="h-96 relative overflow-hidden rounded-lg border">
      <FullScreenLoader label="Loading your experience..." />
    </div>
  );
}