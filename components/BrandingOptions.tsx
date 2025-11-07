
import React from 'react';
import type { BrandingOptions } from '../types';

interface BrandingOptionsProps {
  options: BrandingOptions;
  setOptions: React.Dispatch<React.SetStateAction<BrandingOptions>>;
}

const OptionInput: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; name: keyof BrandingOptions; placeholder: string; }> = ({ label, value, onChange, name, placeholder }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
        />
    </div>
);

const clothingSuggestions = [
    // 5 trang phục dạ hội (Toàn thân)
    { text: 'Váy dạ hội đỏ lộng lẫy bằng lụa satin, xẻ tà cao', type: 'Toàn thân' },
    { text: 'Đầm dạ hội trắng tinh khôi đính kim tuyến bạc lấp lánh', type: 'Toàn thân' },
    { text: 'Váy nhung đỏ rượu vang trễ vai sang trọng', type: 'Toàn thân' },
    { text: 'Đầm dạ hội trắng dài tay với phần lưng ren tinh tế', type: 'Toàn thân' },
    { text: 'Jumpsuit dạ hội màu đỏ rực rỡ với thắt lưng vàng gold', type: 'Toàn thân' },
    // 5 trang phục cute, ấm cúng (Chân dung)
    { text: 'Áo len trắng cổ lọ oversized và mũ len đỏ', type: 'Chân dung' },
    { text: 'Áo khoác lông trắng ấm áp và khăn choàng len đỏ', type: 'Chân dung' },
    { text: 'Áo hoodie đỏ họa tiết tuần lộc dễ thương', type: 'Chân dung' },
    { text: 'Bộ đồ ngủ liền thân màu trắng hình gấu bắc cực', type: 'Chân dung' },
    { text: 'Áo len đỏ dệt kim với cổ áo sơ mi trắng bên trong', type: 'Chân dung' },
];

const backgroundSuggestions = [
    'khung cảnh tuyết rơi ngoài trời',
    'bên trong một ngôi nhà gỗ ấm cúng có lò sưởi',
    'tại một khu chợ Giáng sinh nhộn nhịp',
    'đang ngồi trên xe trượt tuyết của ông già Noel',
    'trang trí cây thông Noel',
    'đang gói quà Giáng sinh',
    'bên cạnh một người tuyết dễ thương',
    'trên sân trượt băng lấp lánh',
    'tham dự một bữa tiệc Giáng sinh sang trọng',
    'đang nướng bánh quy gừng trong bếp',
];

const hairstyleSuggestions = [
    'tóc búi cao thanh lịch với vài lọn tóc buông lơi',
    'tóc gợn sóng mềm mại với phụ kiện lấp lánh',
    'tóc tết xương cá lệch vai',
    'tóc bob ngắn uốn cụp kết hợp băng đô Giáng sinh',
    'tóc dài duỗi thẳng mượt mà',
];

const customPromptSuggestions = [
    'thêm một chiếc vương miện lấp lánh',
    'phong cách anime, mắt to tròn',
    'thêm tuyết rơi nhẹ trong không khí',
    'cầm một ly sô cô la nóng',
    'có một chú mèo con bên cạnh',
    'thêm má hồng và tàn nhang dễ thương',
    'phong cách nghệ thuật Ghibli',
    'đeo một cặp kính dễ thương',
];


const BrandingOptions: React.FC<BrandingOptionsProps> = ({ options, setOptions }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOptions(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSuggestionClick = (field: keyof BrandingOptions, value: string) => {
    setOptions(prev => ({...prev, [field]: value}));
  }

  return (
    <div className="space-y-6">
      <div>
        <OptionInput
          label="Kiểu trang phục"
          name="clothing"
          value={options.clothing}
          onChange={handleChange}
          placeholder="ví dụ: áo len giáng sinh, áo vest"
        />
        <div className="mt-3">
            <label className="block text-sm font-medium text-gray-400 mb-2">Gợi ý trang phục Giáng sinh (Nữ):</label>
            <div className="flex flex-wrap gap-2">
                {clothingSuggestions.map(suggestion => (
                    <button 
                        key={suggestion.text}
                        onClick={() => handleSuggestionClick('clothing', suggestion.text)}
                        className="bg-gray-600/50 hover:bg-cyan-500/50 text-cyan-200 hover:text-white text-xs font-semibold py-1 px-3 rounded-full border border-gray-500 hover:border-cyan-400 transition-all duration-200"
                    >
                        {suggestion.text} <span className="text-gray-400">({suggestion.type})</span>
                    </button>
                ))}
            </div>
        </div>
      </div>
      
      <div>
        <OptionInput
          label="Bối cảnh"
          name="background"
          value={options.background}
          onChange={handleChange}
          placeholder="ví dụ: quán cà phê, thành phố tương lai"
        />
        <div className="mt-3">
            <label className="block text-sm font-medium text-gray-400 mb-2">Gợi ý bối cảnh Giáng sinh:</label>
            <div className="flex flex-wrap gap-2">
                {backgroundSuggestions.map(suggestion => (
                    <button 
                        key={suggestion}
                        onClick={() => handleSuggestionClick('background', suggestion)}
                        className="bg-gray-600/50 hover:bg-cyan-500/50 text-cyan-200 hover:text-white text-xs font-semibold py-1 px-3 rounded-full border border-gray-500 hover:border-cyan-400 transition-all duration-200"
                    >
                        {suggestion}
                    </button>
                ))}
            </div>
        </div>
      </div>
      
      <div>
        <OptionInput
            label="Kiểu tóc"
            name="hairstyle"
            value={options.hairstyle}
            onChange={handleChange}
            placeholder="ví dụ: tóc ngắn xoăn, tóc đuôi ngựa dài"
        />
        <div className="mt-3">
            <label className="block text-sm font-medium text-gray-400 mb-2">Gợi ý kiểu tóc Giáng sinh:</label>
            <div className="flex flex-wrap gap-2">
                {hairstyleSuggestions.map(suggestion => (
                    <button 
                        key={suggestion}
                        onClick={() => handleSuggestionClick('hairstyle', suggestion)}
                        className="bg-gray-600/50 hover:bg-cyan-500/50 text-cyan-200 hover:text-white text-xs font-semibold py-1 px-3 rounded-full border border-gray-500 hover:border-cyan-400 transition-all duration-200"
                    >
                        {suggestion}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <div>
        <label htmlFor="customPrompt" className="block text-sm font-medium text-gray-300 mb-1">Mô tả tùy chỉnh (Nâng cao)</label>
        <textarea
            id="customPrompt"
            name="customPrompt"
            value={options.customPrompt}
            onChange={handleChange}
            placeholder="ví dụ: thêm một chú mèo con, phong cách anime, đeo kính..."
            rows={3}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
        />
        <div className="mt-3">
            <label className="block text-sm font-medium text-gray-400 mb-2">Gợi ý nhanh:</label>
            <div className="flex flex-wrap gap-2">
                {customPromptSuggestions.map(suggestion => (
                    <button 
                        key={suggestion}
                        onClick={() => handleSuggestionClick('customPrompt', suggestion)}
                        className="bg-gray-600/50 hover:bg-cyan-500/50 text-cyan-200 hover:text-white text-xs font-semibold py-1 px-3 rounded-full border border-gray-500 hover:border-cyan-400 transition-all duration-200"
                    >
                        {suggestion}
                    </button>
                ))}
            </div>
        </div>
      </div>

    </div>
  );
};

export default BrandingOptions;
