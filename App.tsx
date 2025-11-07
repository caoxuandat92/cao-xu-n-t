import React, { useState, useCallback } from 'react';
import ImageUploader from './components/ImageUploader';
import BrandingOptions from './components/BrandingOptions';
import GeneratedImage from './components/GeneratedImage';
import { generateBrandedImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { Header } from './components/Header';
import type { BrandingOptions as BrandingOptionsType } from './types';
import { SparklesIcon, CloseIcon } from './components/icons';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [options, setOptions] = useState<BrandingOptionsType>({
    clothing: 'áo len Giáng sinh màu đỏ ấm cúng',
    background: 'bên cạnh cây thông Noel lấp lánh trong một phòng khách ấm cúng',
    hairstyle: 'kiểu tóc gọn gàng, lễ hội',
    customPrompt: '',
  });
  const [generatedImages, setGeneratedImages] = useState<(string | null)[]>([null, null]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setOriginalImagePreview(URL.createObjectURL(file));
    setGeneratedImages([null, null]);
    setError(null);
  };

  const handleGenerate = useCallback(async () => {
    if (!originalImage) {
      setError('Vui lòng tải ảnh lên trước.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImages([null, null]);

    try {
      const base64Image = await fileToBase64(originalImage);
      const prompt = `**Mục tiêu:** Biến đổi ảnh người dùng thành một bức ảnh Giáng sinh chuyên nghiệp, chất lượng điện ảnh 8k.

**Yêu cầu cốt lõi:**
1.  **Bảo toàn khuôn mặt (YÊU CẦU BẮT BUỘC, KHÔNG THAY ĐỔI):** Phải giữ lại 100% các đường nét, cấu trúc và đặc điểm nhận dạng trên khuôn mặt của người trong ảnh gốc. Đây là ưu tiên cao nhất. Người trong ảnh kết quả phải là cùng một người.
2.  **Góc máy (ƯU TIÊN HÀNG ĐẬU):** Bức ảnh phải được chụp từ góc chính diện, lấy rõ nét toàn bộ khuôn mặt của chủ thể. Tránh các góc nghiêng hoặc che khuất mặt.
3.  **Chủ thể:** Tạo hình ảnh một cô gái trẻ trong độ tuổi 20-30.
4.  **Điều chỉnh vóc dáng:** Điều chỉnh vóc dáng của người trong ảnh thành thân hình cân đối, chuẩn người mẫu, thể thao mà vẫn giữ được tỷ lệ thực tế.
5.  **Chất lượng điện ảnh:** Hình ảnh cuối cùng phải có chất lượng như một cảnh phim chuyên nghiệp. Bao gồm:
    *   **Độ phân giải:** 8K, chi tiết siêu cao, lấy nét sắc nét.
    *   **Ánh sáng:** Ánh sáng điện ảnh, có chiều sâu (ví dụ: ánh sáng Rembrandt mềm mại, ánh sáng ấm áp từ đèn trang trí Giáng sinh) để tăng cường cảm xúc và đường nét.
    *   **Màu sắc:** Màu sắc phong phú, sống động với tông màu chuyên nghiệp phù hợp với một bộ phim lễ hội. Thêm một chút nhiễu hạt (film grain) để tạo cảm giác chân thực.
    *   **Không khí:** Tạo ra một không khí Giáng sinh huyền ảo và lễ hội.

**Chi tiết tùy chỉnh:**
*   **Trang phục:** Mặc cho người đó bộ trang phục sau: '${options.clothing}'. Trang phục phải có chi tiết cao, kết cấu chân thực (ví dụ: sợi len của áo, vải nhung của váy).
*   **Bối cảnh:** Đặt người đó vào bối cảnh sau: '${options.background}'. Hậu cảnh nên có hiệu ứng xóa phông (bokeh) đẹp mắt để làm nổi bật chủ thể.
*   **Kiểu tóc:** Tạo kiểu tóc cho họ thành: '${options.hairstyle}'. Mái tóc phải trông tự nhiên, có thể thấy rõ từng sợi tóc.${options.customPrompt ? `
*   **Yêu cầu bổ sung:** ${options.customPrompt}` : ''}`;

      // Generate two images in parallel
      const promises = [
        generateBrandedImage(base64Image, originalImage.type, prompt),
        generateBrandedImage(base64Image, originalImage.type, prompt)
      ];
      
      const results = await Promise.all(promises);
      setGeneratedImages(results);

    } catch (err) {
      console.error(err);
      setError('Không thể tạo ảnh. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, options]);
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Control Panel */}
          <div className="bg-gray-800/50 rounded-2xl p-6 shadow-2xl border border-gray-700 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">1. Tải ảnh của bạn lên</h2>
            <ImageUploader onImageUpload={handleImageUpload} previewUrl={originalImagePreview} />

            <h2 className="text-2xl font-bold mt-8 mb-4 text-cyan-400">2. Tùy chỉnh ảnh Giáng sinh</h2>
            <BrandingOptions options={options} setOptions={setOptions} />
            
            <button
              onClick={handleGenerate}
              disabled={isLoading || !originalImage}
              className="mt-8 w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg text-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300 shadow-lg"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang tạo...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-6 h-6 mr-2" />
                  Tạo ảnh Giáng sinh
                </>
              )}
            </button>
            {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
          </div>

          {/* Output Panel */}
          <div className="bg-gray-800/50 rounded-2xl p-6 shadow-2xl border border-gray-700 backdrop-blur-sm">
             <h2 className="text-2xl font-bold mb-4 text-cyan-400">3. Kết quả của bạn</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {generatedImages.map((imageUrl, index) => (
                  <GeneratedImage 
                    key={index} 
                    imageUrl={imageUrl} 
                    isLoading={isLoading} 
                    onImageClick={setSelectedImage}
                  />
                ))}
             </div>
          </div>
        </div>
      </main>

      {/* Modal for full image view */}
      {selectedImage && (
          <div 
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300"
              onClick={() => setSelectedImage(null)}
          >
              <div 
                  className="relative max-w-4xl max-h-[90vh] p-4"
                  onClick={e => e.stopPropagation()}
              >
                  <img 
                      src={selectedImage} 
                      alt="Xem ảnh đầy đủ" 
                      className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                  />
                  <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition"
                      aria-label="Đóng"
                  >
                      <CloseIcon className="w-6 h-6" />
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default App;