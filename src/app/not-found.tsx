'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Home, Compass, Mail, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function NotFound() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/items?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5EFE6] dark:bg-[#0f1117] flex items-center justify-center px-4 py-20 overflow-hidden relative transition-colors duration-300">
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#B75D3E]/10 dark:bg-[#E08B5E]/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E08B5E]/10 dark:bg-[#B75D3E]/5 rounded-full blur-3xl animate-pulse delay-1000" />
            </motion.div>

            <motion.div
                className="relative max-w-2xl w-full text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <motion.div
                    className="relative inline-block"
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                    <div className="text-[150px] sm:text-[200px] font-black leading-none tracking-tight select-none">
                        <span className="bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] bg-clip-text text-transparent">
                            404
                        </span>
                    </div>
                    {/* Floating shopping bag */}
                    <motion.div
                        className="absolute -top-6 -right-6 text-6xl sm:text-7xl"
                        animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        🛍️
                    </motion.div>
                    <motion.div
                        className="absolute -bottom-4 -left-9 text-5xl sm:text-6xl"
                        animate={{ y: [0, 10, 0], rotate: [0, -8, 8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    >
                        🛒
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-4">
                        Oops! This page is out of stock.
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
                        The page you&apos;re looking for might have been moved, deleted, or never existed. But don&apos;t worry — our aisles are full of amazing products waiting for you.
                    </p>
                </motion.div>

                <motion.form
                    onSubmit={handleSearch}
                    className="mt-8 flex items-center max-w-md mx-auto gap-2 bg-white dark:bg-gray-800 rounded-full border border-[#E4D9C7] dark:border-gray-700 shadow-sm focus-within:ring-2 focus-within:ring-[#B75D3E]/40 focus-within:border-[#B75D3E] transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for products..."
                        className="flex-1 bg-transparent px-5 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="mr-1 p-2.5 rounded-full bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] text-white shadow-md hover:shadow-lg transition-all hover:scale-105"
                    >
                        <Search className="w-4 h-4" />
                    </button>
                </motion.form>

                <motion.div
                    className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-gray-800 border border-[#E4D9C7] dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-[#B75D3E]/10 dark:hover:bg-[#E08B5E]/10 hover:text-[#B75D3E] dark:hover:text-[#E08B5E] transition-all hover:shadow-md"
                    >
                        <Home className="w-4 h-4" />
                        Home
                    </Link>
                    <Link
                        href="/items"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-gray-800 border border-[#E4D9C7] dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-[#B75D3E]/10 dark:hover:bg-[#E08B5E]/10 hover:text-[#B75D3E] dark:hover:text-[#E08B5E] transition-all hover:shadow-md"
                    >
                        <Compass className="w-4 h-4" />
                        Explore
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-gray-800 border border-[#E4D9C7] dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-[#B75D3E]/10 dark:hover:bg-[#E08B5E]/10 hover:text-[#B75D3E] dark:hover:text-[#E08B5E] transition-all hover:shadow-md"
                    >
                        <Mail className="w-4 h-4" />
                        Contact
                    </Link>
                </motion.div>

                <motion.div
                    className="mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.4 }}
                >
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#B75D3E] dark:hover:text-[#E08B5E] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go back to browsing
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
}