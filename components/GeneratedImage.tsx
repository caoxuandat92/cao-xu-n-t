import React from 'react';
import { ImageIcon, DownloadIcon } from './icons';

interface GeneratedImageProps {
  imageUrl: string | null;
  isLoading: boolean;
  onImageClick: (url: string) => void;
}

const GeneratedImage: React.FC<GeneratedImageProps> = ({ imageUrl, isLoading, onImageClick }) => {
  if (isLoading) {
    return (
      <div className="w-full aspect-square bg-gray-700/50 rounded-lg animate-pulse flex items-center justify-center">
         <div className="text-center text-gray-500">
            <svg className="animate-spin h-8 w-8 text-cyan-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
             <p className="mt-2 text-sm font-medium">Đang tạo...</p>
        </div>
      </div>
    );
  }

  if (imageUrl) {
    return (
      <div 
        className="relative w-full aspect-square bg-black rounded-lg overflow-hidden shadow-lg group cursor-pointer"
        onClick={() => onImageClick(imageUrl)}
      >
        <img src={imageUrl} alt="Ảnh đã tạo" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <p className="text-white opacity-0 group-hover:opacity-100 font-semibold transition-opacity">Xem ảnh đầy đủ</p>
        </div>
        <a
          href={imageUrl}
          download="anh-giang-sinh-ai.png"
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-3 right-3 bg-cyan-500/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
          aria-label="Tải ảnh xuống"
        >
          <DownloadIcon className="w-5 h-5" />
        </a>
      </div>
    );
  }

  return (
    <div className="w-full aspect-square bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center">
      <div className="text-center text-gray-500">
        <ImageIcon className="w-12 h-12 mx-auto mb-2" />
        <p className="font-semibold">Ảnh do AI tạo</p>
        <p className="text-sm">Sẽ xuất hiện ở đây</p>
      </div>
    </div>
  );
};

export default GeneratedImage;