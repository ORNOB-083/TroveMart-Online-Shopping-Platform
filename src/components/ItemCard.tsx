'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Star, Eye } from 'lucide-react';
import { Item } from '@/lib/types';
import { formatPrice, isLiked, toggleWishlistItem } from '@/lib/utils';

export default function ItemCard({ item }: { item: Item }) {
    const [liked, setLiked] = useState(() => isLiked(item._id));

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group relative bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#B75D3E]/10 hover:-translate-y-1 transition-all duration-300"
        >
            <div className="relative aspect-square overflow-hidden bg-[#F5EFE6] dark:bg-gray-800">
                <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />

                <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide bg-white/90 dark:bg-black/60 text-[#B75D3E] dark:text-[#E08B5E] rounded-full backdrop-blur-sm">
                    {item.category}
                </span>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setLiked(toggleWishlistItem(item._id));
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 -translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                >
                    <Heart
                        className={`w-4 h-4 transition-colors ${liked ? 'fill-[#B75D3E] text-[#B75D3E]' : 'text-gray-500'
                            }`}
                    />
                </button>

                <Link
                    href={`/items/${item._id}`}
                    className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/95 dark:bg-[#1a1d24]/95 text-sm font-semibold text-gray-900 dark:text-gray-100 backdrop-blur-sm opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
                >
                    <Eye className="w-4 h-4" />
                    View Details
                </Link>
            </div>

            <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 mb-1">
                    {item.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2.5 min-h-8">
                    {item.description}
                </p>

                <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-gray-900 dark:text-gray-100">
                        {formatPrice(item.price)}
                    </span>
                    {item.reviewCount > 0 && (
                        <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-[#E08B5E] text-[#E08B5E]" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {item.ratingAvg.toFixed(1)} ({item.reviewCount})
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}