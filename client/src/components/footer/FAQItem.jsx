import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import YouTubeEmbed from './YouTubeEmbed';

const FAQItem = ({ question, answer, videoId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm mb-4 transition-all duration-300 hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{question}</h3>
        <span className="ml-2 flex-shrink-0 text-gray-500 dark:text-gray-400">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 bg-gray-50 dark:bg-gray-900">
          <div className="prose dark:prose-invert max-w-none mb-4">
            {answer}
          </div>
          <div className="mt-4">
            <YouTubeEmbed videoId={videoId} title={question} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;