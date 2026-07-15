'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Store } from 'lucide-react';
import toast from 'react-hot-toast';
import { getMyWishlist, toggleWishlist } from '@/lib/actions/wishlist';
import { Item } from '@/lib/types';
import ItemCard from '@/components/ItemCard';

export default function WishlistClient() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyWishlist()
            .then(setItems)
            .catch(() => toast.error('Failed to load your wishlist.'))
            .finally(() => setLoading(false));
    }, []);

    const handleRemove = async (itemId: string) => {
        // Optimistic update
        setItems((prev) => prev.filter((i) => i._id !== itemId));
        try {
            await toggleWishlist(itemId);
            toast.success('Removed from wishlist.');
        } catch {
            toast.error('Failed to remove item. Refresh to try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-[#B75D3E]/30 border-t-[#B75D3E] rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    My Wishlist & Followed Stores
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                    Products you&apos;ve saved for later.
                </p>

                {items.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl mb-10">
                        <Heart className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Nothing saved yet. Tap the heart on any product to add it here.
                        </p>
                        <Link
                            href="/items"
                            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#B75D3E] to-[#E08B5E]"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
                        <AnimatePresence>
                            {items.map((item) => (
                                <motion.div
                                    key={item._id}
                                    layout
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <ItemCard item={item} onWishlistChange={() => handleRemove(item._id)} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Followed Stores</h2>
                    <div className="text-center py-12 bg-white dark:bg-[#1a1d24] border border-dashed border-[#E4D9C7] dark:border-gray-700 rounded-2xl">
                        <Store className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Following sellers isn&apos;t available yet — check back soon.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}