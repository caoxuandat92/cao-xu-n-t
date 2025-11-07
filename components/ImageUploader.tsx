import React, { useRef } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  previewUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, previewUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="relative w-80 h-80 mx-auto bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center cursor-pointer hover:border-cyan-400 hover:bg-gray-700/80 transition-all duration-300"
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      {previewUrl ? (
        <img src={previewUrl} alt="Xem trước" className="w-full h-full object-cover rounded-lg" />
      ) : (
        <div className="text-center text-gray-400">
          <UploadIcon className="w-12 h-12 mx-auto mb-2" />
          <p className="font-semibold">Nhấp để tải ảnh lên</p>
          <p className="text-sm">PNG, JPG, hoặc WEBP</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;