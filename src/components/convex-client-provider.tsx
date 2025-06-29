"use client";
import { ReactNode } from "react";
import {
  ConvexReactClient,
  Authenticated,
  Unauthenticated,
  AuthLoading,
} from "convex/react";

import { ConvexProviderWithClerk } from "convex/react-clerk";

import { ClerkProvider, useAuth, SignIn } from "@clerk/nextjs";
import { FullScreenLoader } from "./fullscreenloader";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Enhanced Sign In Component with unique design
const EnhancedSignIn = () => {
  return (
    <>
      {/* Global styles for Clerk components and animations */}
      <style jsx global>{`
        /* Keyframes for floating animation */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        
        /* Clerk component overrides with higher specificity */
        .cl-rootBox {
          width: 100% !important;
        }
        
        .cl-card {
          background: transparent !important;
          box-shadow: none !important;
          border: none !important;
          border-radius: 0 !important;
        }
        
        .cl-main {
          background: transparent !important;
        }
        
        .cl-headerTitle {
          color: white !important;
          font-size: 1.5rem !important;
          font-weight: 600 !important;
        }
        
        .cl-headerSubtitle {
          color: rgb(196 181 253) !important;
        }
        
        .cl-socialButtonsBlockButton {
          background: rgba(255, 255, 255, 0.1) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          color: white !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 12px !important;
          transition: all 0.3s ease !important;
        }
        
        .cl-socialButtonsBlockButton:hover {
          background: rgba(255, 255, 255, 0.2) !important;
          transform: translateY(-1px) !important;
        }
        
        .cl-socialButtonsBlockButtonText {
          color: white !important;
        }
        
        .cl-formFieldInput {
          background: rgba(255, 255, 255, 0.1) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          color: white !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 12px !important;
          padding: 12px 16px !important;
        }
        
        .cl-formFieldInput::placeholder {
          color: rgba(255, 255, 255, 0.6) !important;
        }
        
        .cl-formFieldInput:focus {
          border-color: rgb(168 85 247) !important;
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.3) !important;
          outline: none !important;
        }
        
        .cl-formFieldLabel {
          color: rgb(196 181 253) !important;
          font-weight: 500 !important;
        }
        
        .cl-formButtonPrimary {
          background: linear-gradient(135deg, rgb(168 85 247), rgb(236 72 153)) !important;
          border: none !important;
          color: white !important;
          border-radius: 12px !important;
          font-weight: 600 !important;
          padding: 12px 24px !important;
          transition: all 0.3s ease !important;
        }
        
        .cl-formButtonPrimary:hover {
          background: linear-gradient(135deg, rgb(147 51 234), rgb(219 39 119)) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 10px 25px rgba(168, 85, 247, 0.4) !important;
        }
        
        .cl-dividerLine {
          background: rgba(255, 255, 255, 0.2) !important;
        }
        
        .cl-dividerText {
          color: rgba(255, 255, 255, 0.6) !important;
          background: transparent !important;
        }
        
        .cl-footerActionLink {
          color: rgb(196 181 253) !important;
          text-decoration: none !important;
        }
        
        .cl-footerActionLink:hover {
          color: white !important;
        }
        
        .cl-internal-b3fm6y {
          background: transparent !important;
        }
        
        .cl-footer {
          background: transparent !important;
        }
        
        .cl-alternativeMethods {
          background: transparent !important;
        }
        
        /* Additional overrides for all clerk elements */
        [data-clerk-theme] * {
          background: transparent !important;
        }
        
        /* Override any white backgrounds */
        .cl-card,
        .cl-main,
        .cl-footer,
        .cl-rootBox > div {
          background: transparent !important;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>

        {/* Main container */}
        <div className="relative z-10 w-full max-w-md">
          {/* Logo/Brand section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4 shadow-2xl">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-purple-200 text-lg">
              Sign in to continue your journey
            </p>
          </div>

          {/* Enhanced card container */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
            {/* Card background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="mb-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-white text-center mb-2">
                  Authentication Required
                </h2>
                <p className="text-purple-200 text-center text-sm">
                  Please sign in to access your account
                </p>
              </div>

              {/* SignIn component wrapper with enhanced styling */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <SignIn 
                routing="hash"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "bg-transparent shadow-none border-0",
                      headerTitle: "text-white text-xl font-semibold",
                      headerSubtitle: "text-purple-200",
                      socialButtonsBlockButton: "bg-white/10 border border-white/20 text-white backdrop-blur-lg rounded-xl hover:bg-white/20 transition-all duration-300",
                      formFieldInput: "bg-white/10 border border-white/20 text-white backdrop-blur-lg rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30",
                      formFieldLabel: "text-purple-200 font-medium",
                      formButtonPrimary: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25",
                      dividerLine: "bg-white/20",
                      dividerText: "text-white/60",
                      footerActionLink: "text-purple-200 hover:text-white"
                    }
                  }}
                />
              </div>

              {/* Additional decorative elements */}
              <div className="mt-6 flex items-center justify-center space-x-4">
                <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1"></div>
                <span className="text-white/60 text-sm font-medium">Secure Login</span>
                <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1"></div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-white/60 text-sm">
              Protected by enterprise-grade security
            </p>
            <div className="flex justify-center mt-3 space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>


      </div>
    </>
  );
};

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <EnhancedSignIn />
        </Unauthenticated>
        <AuthLoading>
          <FullScreenLoader label="Loading authentication..." />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}