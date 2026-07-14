'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    Camera,
    CheckCircle,
    Edit3,
    Link as LinkIcon,
    Loader2,
    Mail,
    Save,
    Shield,
    Upload,
    User,
    X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthUser, getCurrentUser, setCurrentUser } from '@/lib/auth';

export default function UserProfilePage() {
    const currentUser = getCurrentUser();
    const [user, setUser] = useState<AuthUser | null>(currentUser);
    const [name, setName] = useState(currentUser?.name || '');
    const [imageUrl, setImageUrl] = useState('');
    const [imageTab, setImageTab] = useState<'upload' | 'link'>('upload');
    const [savedImage, setSavedImage] = useState<string | null>(currentUser?.image || null);
    const [pendingImage, setPendingImage] = useState<string | null>(null);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingImage, setIsEditingImage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploadLoading, setIsUploadLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const joinDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-BD', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : '—';

    const uploadToImgbb = async (file: File) => {
        const apiKey = process.env.NEXT_PUBLIC_IMGBB_KEY;
        if (!apiKey) throw new Error('Upload key is not configured');

        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (!response.ok || !data?.data?.url) {
            throw new Error('Upload failed');
        }

        return data.data.url as string;
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Only image files are allowed.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image must be less than 5MB.');
            return;
        }

        setIsUploadLoading(true);
        const uploadToast = 'upload';
        toast.loading('Uploading image...', { id: uploadToast });

        try {
            const url = await uploadToImgbb(file);
            setPendingImage(url);
            toast.success('Image ready! Click Save to apply.', { id: uploadToast });
        } catch {
            toast.error('Upload failed. Please try again.', { id: uploadToast });
        } finally {
            setIsUploadLoading(false);
        }
    };

    const handleLinkPreview = () => {
        const trimmedUrl = imageUrl.trim();
        if (!trimmedUrl) {
            toast.error('Please enter an image URL.');
            return;
        }

        setPendingImage(trimmedUrl);
        toast.success('Preview ready! Click Save to apply.');
    };

    const handleSaveName = async () => {
        if (!user) return;
        if (!name.trim()) {
            toast.error('Name cannot be empty.');
            return;
        }

        setIsLoading(true);
        try {
            const updatedUser = { ...user, name: name.trim() };
            setCurrentUser(updatedUser);
            setUser(updatedUser);
            toast.success('Name updated successfully.');
            setIsEditingName(false);
        } catch {
            toast.error('Failed to update name.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveImage = async () => {
        if (!user || !pendingImage) {
            toast.error('Please select or preview an image first.');
            return;
        }

        setIsLoading(true);
        try {
            const updatedUser = { ...user, image: pendingImage };
            setCurrentUser(updatedUser);
            setUser(updatedUser);
            setSavedImage(pendingImage);
            setPendingImage(null);
            setImageUrl('');
            toast.success('Profile photo saved.');
            setIsEditingImage(false);
        } catch {
            toast.error('Failed to save photo.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelImage = () => {
        setPendingImage(null);
        setImageUrl('');
        setIsEditingImage(false);
    };

    const modalPreviewSrc = pendingImage || savedImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'U')}&background=B75D3E&color=fff&size=96`;
    const profileImageSrc = savedImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'U')}&background=B75D3E&color=fff&size=96`;

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-1"
            >
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Profile</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage your personal details and profile photo.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.06 }}
                className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm"
            >
                <div className="h-28 bg-gradient-to-r from-[#B75D3E] via-[#D97C4D] to-[#E08B5E]" />
                <div className="px-6 pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 mb-5">
                        <div className="relative inline-block">
                            <img
                                src={profileImageSrc}
                                alt={name || user?.name || 'Profile'}
                                className="w-24 h-24 rounded-2xl border-4 border-white dark:border-[#1a1d24] object-cover shadow-lg"
                            />
                            <button
                                onClick={() => setIsEditingImage(true)}
                                className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                                <Camera className="w-6 h-6 text-white" />
                            </button>
                            <button
                                onClick={() => setIsEditingImage(true)}
                                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                            >
                                <Camera className="w-3.5 h-3.5 text-white" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2 pb-1">
                            {user?.email && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Active Account</span>
                                </div>
                            )}
                            <span className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F5EFE6] dark:bg-gray-800 text-[#B75D3E] dark:text-[#E08B5E] border border-[#E4D9C7] dark:border-gray-700">
                                {user?.role === 'seller' ? 'Seller' : user?.role === 'admin' ? 'Admin' : 'Buyer'}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            {isEditingName ? (
                                <div className="flex items-center gap-2 flex-1">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        className="flex-1 px-3 py-1.5 text-lg font-bold bg-gray-50 dark:bg-gray-800 border border-[#E4D9C7] dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#B75D3E]/30"
                                        autoFocus
                                    />
                                    <button
                                        onClick={handleSaveName}
                                        disabled={isLoading}
                                        className="p-1.5 rounded-lg bg-[#B75D3E] text-white hover:bg-[#A24F35] transition-colors disabled:opacity-50"
                                    >
                                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditingName(false);
                                            setName(user?.name || '');
                                        }}
                                        className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{name || user?.name || 'Your Name'}</h2>
                                    <button
                                        onClick={() => setIsEditingName(true)}
                                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#B75D3E] hover:bg-[#F5EFE6] dark:hover:bg-gray-800 transition-all"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                </>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email || 'your@email.com'}</p>
                    </div>
                </div>
            </motion.div>

            {isEditingImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                >
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleCancelImage} />
                    <motion.div
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="relative z-10 w-full max-w-md bg-white dark:bg-[#1a1d24] rounded-2xl shadow-2xl border border-[#E4D9C7] dark:border-gray-800 p-6"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Update Profile Photo</h3>
                            <button
                                onClick={handleCancelImage}
                                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex flex-col items-center mb-5 gap-2">
                            <img
                                src={modalPreviewSrc}
                                alt="Preview"
                                className="w-24 h-24 rounded-2xl object-cover border-4 border-[#F5EFE6] dark:border-gray-700 shadow-md"
                            />
                            {pendingImage && (
                                <span className="text-xs text-amber-600 dark:text-amber-400 font-medium bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg border border-amber-100 dark:border-amber-800">
                                    Preview only — not saved yet
                                </span>
                            )}
                        </div>

                        <div className="flex gap-2 mb-4 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                            <button
                                onClick={() => setImageTab('upload')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                                    imageTab === 'upload'
                                        ? 'bg-white dark:bg-[#1a1d24] text-[#B75D3E] dark:text-[#E08B5E] shadow-sm'
                                        : 'text-gray-500 dark:text-gray-400'
                                }`}
                            >
                                <Upload className="w-4 h-4" />
                                Upload File
                            </button>
                            <button
                                onClick={() => setImageTab('link')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                                    imageTab === 'link'
                                        ? 'bg-white dark:bg-[#1a1d24] text-[#B75D3E] dark:text-[#E08B5E] shadow-sm'
                                        : 'text-gray-500 dark:text-gray-400'
                                }`}
                            >
                                <LinkIcon className="w-4 h-4" />
                                Image Link
                            </button>
                        </div>

                        {imageTab === 'upload' ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-[#B75D3E] dark:hover:border-[#E08B5E] rounded-xl p-6 text-center cursor-pointer transition-all group"
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                {isUploadLoading ? (
                                    <Loader2 className="w-8 h-8 text-[#B75D3E] mx-auto mb-2 animate-spin" />
                                ) : (
                                    <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#B75D3E] mx-auto mb-2 transition-colors" />
                                )}
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#B75D3E] transition-colors">
                                    {isUploadLoading ? 'Uploading...' : 'Click to upload image'}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="relative">
                                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="url"
                                        placeholder="https://example.com/photo.jpg"
                                        value={imageUrl}
                                        onChange={(event) => setImageUrl(event.target.value)}
                                        className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B75D3E]/30 focus:border-[#B75D3E] transition-all"
                                    />
                                </div>
                                <button
                                    onClick={handleLinkPreview}
                                    className="w-full py-2 rounded-xl border border-[#E4D9C7] dark:border-gray-700 text-[#B75D3E] dark:text-[#E08B5E] text-sm font-medium hover:bg-[#F5EFE6] dark:hover:bg-gray-800 transition-colors"
                                >
                                    Preview Image
                                </button>
                            </div>
                        )}

                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={handleCancelImage}
                                className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveImage}
                                disabled={isLoading || !pendingImage}
                                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] text-white font-semibold text-sm shadow-lg shadow-[#B75D3E]/20 hover:shadow-[#B75D3E]/35 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Save Photo
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.12 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
                {[
                    { icon: User, label: 'Full Name', value: name || user?.name, color: 'text-[#B75D3E]', bg: 'bg-[#F5EFE6] dark:bg-[#2a1f1a]' },
                    { icon: Mail, label: 'Email Address', value: user?.email, color: 'text-[#E08B5E]', bg: 'bg-[#FFF7EE] dark:bg-[#2d241f]' },
                    { icon: Shield, label: 'Account Role', value: user?.role === 'seller' ? 'Seller' : user?.role === 'admin' ? 'Admin' : 'Buyer', color: 'text-[#4F8A6B]', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
                    { icon: Calendar, label: 'Member Since', value: joinDate, color: 'text-[#3B82F6]', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={`${item.label}-${index}`}
                            className="bg-white dark:bg-[#1a1d24] rounded-2xl p-5 border border-[#E4D9C7] dark:border-gray-800 shadow-sm flex items-center gap-4"
                        >
                            <div className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                                <Icon className={`w-5 h-5 ${item.color}`} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{item.label}</p>
                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                                    {item.value || '—'}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.18 }}
                className="bg-white dark:bg-[#1a1d24] rounded-2xl p-5 border border-[#E4D9C7] dark:border-gray-800 shadow-sm"
            >
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Account Status</h3>
                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Active Account</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Email Verified</span>
                    </div>
                    {savedImage && (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800">
                            <Camera className="w-3.5 h-3.5 text-violet-500" />
                            <span className="text-xs font-medium text-violet-600 dark:text-violet-400">Profile Photo Set</span>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
