// components/Loading.jsx
import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="relative">
        <div className="animate-spin h-16 w-16 rounded-full border-4 border-blue-200 border-t-blue-600"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-blue-600 w-5 h-5 rounded-full animate-ping"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;