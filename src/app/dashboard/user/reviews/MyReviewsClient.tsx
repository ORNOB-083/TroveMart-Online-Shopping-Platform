'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Trash2, MessageSquareText } from 'lucide-react';
import toast from 'react-hot-toast';
import { getMyReviews, deleteReview } from '@/lib/actions/reviews';
import { MyReview } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export default function MyReviewsClient() {
    const [reviews, setReviews] = useState<MyReview[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        getMyReviews()
            .then(setReviews)
            .catch(() => toast.error('Failed to load your reviews.'))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            await deleteReview(id);
            setReviews((prev) => prev.filter((r) => r._id !== id));
            toast.success('Review deleted.');
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Failed to delete review.');
        } finally {
            setDeletingId(null);
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
        <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">My Reviews</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Everything you've reviewed across TrovéMart.
                </p>

                {reviews.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl">
                        <MessageSquareText className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            You haven't written any reviews yet.
                        </p>
                        <Link
                            href="/items"
                            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#B75D3E] to-[#E08B5E]"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence>
                            {reviews.map((review) => (
                                <motion.div
                                    key={review._id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-4 flex gap-4"
                                >
                                    {review.item ? (
                                        <Link href={`/items/${review.item._id}`} className="shrink-0">
                                            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#F5EFE6] dark:bg-gray-800">
                                                <Image src={review.item.images[0]} alt={review.item.title} fill className="object-cover" />
                                            </div>
                                        </Link>
                                    ) : (
                                        <div className="w-16 h-16 rounded-xl bg-[#F5EFE6] dark:bg-gray-800 shrink-0 flex items-center justify-center text-xs text-gray-400">
                                            N/A
                                        </div>
                                    )}

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                {review.item ? (
                                                    <Link
                                                        href={`/items/${review.item._id}`}
                                                        className="text-sm font-semibold text-gray-900 dark:text-gray-100 hover:text-[#B75D3E] dark:hover:text-[#E08B5E] transition-colors line-clamp-1"
                                                    >
                                                        {review.item.title}
                                                    </Link>
                                                ) : (
                                                    <span className="text-sm font-semibold text-gray-400">
                                                        Product no longer available
                                                    </span>
                                                )}
                                                {review.item && (
                                                    <p className="text-xs text-gray-400 mt-0.5">{formatPrice(review.item.price)}</p>
                                                )}
                                            </div>

                                            <button
                                                onClick={() => handleDelete(review._id)}
                                                disabled={deletingId === review._id}
                                                className="shrink-0 p-1.5 text-gray-400 hover:text-red-500 disabled:opacity-50 transition-colors"
                                                aria-label="Delete review"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-0.5 my-1.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-[#E08B5E] text-[#E08B5E]' : 'text-gray-300 dark:text-gray-600'
                                                        }`}
                                                />
                                            ))}
                                            <span className="text-xs text-gray-400 ml-1.5">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </motion.div>
        </div>
    );
}