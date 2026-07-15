'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, Link2, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { uploadToImgbb } from '@/lib/actions/imgbb';

interface ImageUploaderProps {
    images: string[];
    onChange: (images: string[]) => void;
    max?: number;
}

export default function ImageUploader({ images, onChange, max = 5 }: ImageUploaderProps) {
    const [urlInput, setUrlInput] = useState('');
    const [showUrlField, setShowUrlField] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const canAddMore = images.length < max;

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file.');
            return;
        }

        setUploading(true);
        try {
            const url = await uploadToImgbb(file);
            onChange([...images, url]);
        } catch (err: any) {
            toast.error(err.message || 'Image upload failed.');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleAddUrl = () => {
        if (!urlInput.trim()) return;
        try {
            new URL(urlInput.trim());
        } catch {
            toast.error('Enter a valid image URL.');
            return;
        }
        onChange([...images, urlInput.trim()]);
        setUrlInput('');
        setShowUrlField(false);
    };

    const removeImage = (index: number) => {
        onChange(images.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-3">
                {images.map((img, i) => (
                    <div key={img + i} className="relative aspect-square rounded-xl overflow-hidden border border-[#E4D9C7] dark:border-gray-700 group">
                        <Image src={img} alt={`Image ${i + 1}`} fill className="object-cover" />
                        <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                        {i === 0 && (
                            <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 text-[10px] font-semibold bg-[#B75D3E] text-white rounded">
                                Cover
                            </span>
                        )}
                    </div>
                ))}

                {canAddMore && (
                    <div className="aspect-square rounded-xl border-2 border-dashed border-[#E4D9C7] dark:border-gray-700 flex flex-col items-center justify-center gap-1.5 relative">
                        {uploading ? (
                            <Loader2 className="w-5 h-5 text-[#B75D3E] animate-spin" />
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#B75D3E] dark:hover:text-[#E08B5E] transition-colors p-2"
                                >
                                    <Upload className="w-4 h-4" />
                                    <span className="text-[10px] font-medium">Upload</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowUrlField((v) => !v)}
                                    className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#B75D3E] dark:hover:text-[#E08B5E] transition-colors p-2"
                                >
                                    <Link2 className="w-4 h-4" />
                                    <span className="text-[10px] font-medium">URL</span>
                                </button>
                            </>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                    </div>
                )}
            </div>

            {showUrlField && (
                <div className="flex items-center gap-2 mb-2">
                    <input
                        type="text"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="Paste image URL..."
                        className="flex-1 px-3 py-2 text-sm bg-[#F9F5EF] dark:bg-gray-800/60 border border-[#E4D9C7] dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:border-[#B75D3E]"
                    />
                    <button
                        type="button"
                        onClick={handleAddUrl}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#B75D3E] rounded-lg"
                    >
                        Add
                    </button>
                </div>
            )}

            <p className="text-xs text-gray-400">
                {images.length}/{max} images added — first image is the cover photo.
            </p>
        </div>
    );
}