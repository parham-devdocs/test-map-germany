// components/Loading.jsx
import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        {/* Ring 1 */}
        <div className="absolute animate-ping h-16 w-16 rounded-full bg-blue-400 opacity-75"></div>
        {/* Ring 2 */}
        <div className="absolute animate-ping h-20 w-20 rounded-full bg-purple-400 opacity-50" style={{ animationDelay: '-0.5s' }}></div>
        {/* Ring 3 */}
        <div className="absolute animate-ping h-24 w-24 rounded-full bg-pink-400 opacity-30" style={{ animationDelay: '-1s' }}></div>
        {/* Center dot */}
        <div className="relative z-10 h-4 w-4 rounded-full bg-blue-600 mx-auto"></div>
      </div>
      <p className="text-gray-600 text-sm font-medium mt-6">Loading ...</p>
    </div>
  );
};

export default Loading;