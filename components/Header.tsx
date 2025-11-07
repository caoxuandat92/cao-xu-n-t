import React from 'react';
import { SparklesIcon } from './icons';

export const Header: React.FC = () => (
    <header className="bg-gray-800/30 backdrop-blur-md border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <SparklesIcon className="w-8 h-8 text-cyan-400" />
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                    Tạo ảnh giáng sinh
                </h1>
            </div>
        </div>
    </header>
);