import React, { useState } from 'react';

const YouTubeEmbed = ({ videoId, title }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md bg-gray-200 dark:bg-gray-700">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title || `YouTube video ${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;