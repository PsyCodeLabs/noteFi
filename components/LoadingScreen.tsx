import React from 'react';

interface LoadingScreenProps {
  message: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base">
      <div className="w-12 h-12 border-8 border-emerald-600 relative animate-loader rounded-md">
        <div className="absolute top-0 left-0 w-full bg-emerald-600 h-full animate-loader2" />
      </div>
      <p className="text-emerald-600 mt-4 text-lg font-semibold animate-pulse">{message}</p>
    </div>
  );
};

export default LoadingScreen;
