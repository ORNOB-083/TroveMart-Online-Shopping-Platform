'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Store, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { getItemById } from '@/lib/actions/items';
import { getReviews, addReview } from '@/lib/actions/reviews';
import { Item, Review } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { getCurrentUser, isAuthenticated } from '@/lib/auth';
import ItemCard from '@/components/ItemCard';

type Tab = 'description' | 'specs' | 'reviews';

export default function ItemDetailsClient({ itemId }: { itemId: string }) {
    const [item, setItem] = useState<Item | null>(null);
    const [related, setRelated] = useState<Item[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [activeTab, setActiveTab] = useState<Tab>('description');
    const [liked, setLiked] = useState(false);

    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);

    const user = getCurrentUser();
    const alreadyReviewed = reviews.some((r) => r.userId === user?.id);

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const [detailsRes, reviewsRes] = await Promise.all([
                    getItemById(itemId),
                    getReviews(itemId),
                ]);
                setItem(detailsRes.item);
                setRelated(detailsRes.related);
                setReviews(reviewsRes);
            } catch (err) {
                console.error(err);
                toast.error('Failed to load this product.');
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [itemId]);

    const handleSubmitReview = async () => {
        if (!isAuthenticated()) {
            toast.error('Please log in to write a review.');
            return;
        }
        if (!reviewComment.trim()) {
            toast.error('Please write a comment.');
            return;
        }

        setSubmittingReview(true);
        try {
            const newReview = await addReview(itemId, reviewRating, reviewComment.trim());
            setReviews((prev) => [newReview, ...prev]);
            setReviewComment('');
            setReviewRating(5);
            toast.success('Review submitted!');
        } catch (err: unknown) {
            const errorMessage = ((err as { response?: { data?: { message?: string } } })?.response?.data?.message) || 'Failed to submit review.';
            toast.error(errorMessage);
        } finally {
            setSubmittingReview(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5EFE6] dark:bg-[#0f1117]">
                <div className="w-8 h-8 border-2 border-[#B75D3E]/30 border-t-[#B75D3E] rounded-full animate-spin" />
            </div>
        );
    }

    if (!item) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5EFE6] dark:bg-[#0f1117] gap-3">
                <p className="text-gray-500 dark:text-gray-400">Product not found.</p>
                <Link href="/items" className="text-[#B75D3E] dark:text-[#E08B5E] text-sm font-medium hover:underline">
                    Back to Explore
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#F5EFE6] dark:bg-[#0f1117] min-h-screen transition-colors duration-300 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                    <Link href="/items" className="hover:text-[#B75D3E] dark:hover:text-[#E08B5E]">Explore</Link>
                    <span className="mx-1.5">/</span>
                    <span>{item.category}</span>
                </div>

                <div className="grid md:grid-cols-2 gap-10">

                    <div>
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 mb-3">
                            <Image
                                src={item.images[activeImage]}
                                alt={item.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                                priority
                            />
                            {item.images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setActiveImage((i) => (i === 0 ? item.images.length - 1 : i - 1))}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-black/60 flex items-center justify-center backdrop-blur-sm"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setActiveImage((i) => (i === item.images.length - 1 ? 0 : i + 1))}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-black/60 flex items-center justify-center backdrop-blur-sm"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </>
                            )}
                        </div>

                        {item.images.length > 1 && (
                            <div className="flex gap-3">
                                {item.images.map((img, i) => (
                                    <button
                                        key={img}
                                        onClick={() => setActiveImage(i)}
                                        className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-[#B75D3E]' : 'border-[#E4D9C7] dark:border-gray-700'
                                            }`}
                                    >
                                        <Image src={img} alt={`${item.title} ${i + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-[#B75D3E]/10 dark:bg-[#E08B5E]/10 text-[#B75D3E] dark:text-[#E08B5E] rounded-full mb-3">
                            {item.category}
                        </span>

                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                            {item.title}
                        </h1>

                        <div className="flex items-center gap-4 mb-5">
                            {item.reviewCount > 0 && (
                                <div className="flex items-center gap-1.5">
                                    <Star className="w-4 h-4 fill-[#E08B5E] text-[#E08B5E]" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                        {item.ratingAvg.toFixed(1)}
                                    </span>
                                    <span className="text-sm text-gray-400">({item.reviewCount} reviews)</span>
                                </div>
                            )}
                            <span
                                className={`text-sm font-medium ${item.quantity > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'
                                    }`}
                            >
                                {item.quantity > 0 ? `${item.quantity} in stock` : 'Out of stock'}
                            </span>
                        </div>

                        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                            {formatPrice(item.price)}
                        </p>

                        <div className="flex items-center gap-3 mb-8">
                            <button
                                disabled={item.quantity === 0}
                                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-[#B75D3E] to-[#E08B5E] shadow-lg shadow-[#B75D3E]/25 hover:shadow-[#B75D3E]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                Add to Cart
                            </button>
                            <button
                                onClick={() => setLiked((v) => !v)}
                                className="w-12 h-12 shrink-0 rounded-xl border border-[#E4D9C7] dark:border-gray-700 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors"
                            >
                                <Heart className={`w-4.5 h-4.5 ${liked ? 'fill-[#B75D3E] text-[#B75D3E]' : 'text-gray-500'}`} />
                            </button>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl">
                            <div className="w-11 h-11 rounded-full bg-[#B75D3E]/10 dark:bg-[#E08B5E]/10 flex items-center justify-center shrink-0">
                                <Store className="w-5 h-5 text-[#B75D3E] dark:text-[#E08B5E]" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{item.sellerName}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Verified seller on TrovéMart</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <div className="flex items-center gap-1 border-b border-[#E4D9C7] dark:border-gray-800 mb-6">
                        {(['description', 'specs', 'reviews'] as Tab[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative px-5 py-3 text-sm font-medium capitalize transition-colors ${activeTab === tab
                                    ? 'text-[#B75D3E] dark:text-[#E08B5E]'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                    }`}
                            >
                                {tab === 'specs' ? 'Specifications' : tab === 'reviews' ? `Reviews (${item.reviewCount})` : 'Description'}
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="tab-underline"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B75D3E] dark:bg-[#E08B5E]"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'description' && (
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                                    {item.description}
                                </p>
                            )}

                            {activeTab === 'specs' && (
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-2xl">
                                    {Object.entries(item.specs).map(([key, value]) => (
                                        <div key={key} className="flex justify-between py-2 border-b border-[#E4D9C7] dark:border-gray-800">
                                            <dt className="text-sm text-gray-500 dark:text-gray-400">{key}</dt>
                                            <dd className="text-sm font-medium text-gray-900 dark:text-gray-100">{value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="max-w-2xl">
                                    {isAuthenticated() && !alreadyReviewed && (
                                        <div className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-5 mb-6">
                                            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                                Write a Review
                                            </h4>
                                            <div className="flex items-center gap-1 mb-3">
                                                {[1, 2, 3, 4, 5].map((r) => (
                                                    <button key={r} onClick={() => setReviewRating(r)}>
                                                        <Star
                                                            className={`w-6 h-6 transition-colors ${r <= reviewRating ? 'fill-[#E08B5E] text-[#E08B5E]' : 'text-gray-300 dark:text-gray-600'
                                                                }`}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                            <textarea
                                                value={reviewComment}
                                                onChange={(e) => setReviewComment(e.target.value)}
                                                placeholder="Share your experience with this product..."
                                                rows={3}
                                                className="w-full px-3.5 py-2.5 text-sm bg-[#F9F5EF] dark:bg-gray-800/60 border border-[#E4D9C7] dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-[#B75D3E] transition-colors resize-none mb-3"
                                            />
                                            <button
                                                onClick={handleSubmitReview}
                                                disabled={submittingReview}
                                                className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-linear-to-r from-[#B75D3E] to-[#E08B5E] disabled:opacity-60 transition-all"
                                            >
                                                {submittingReview ? 'Submitting...' : 'Submit Review'}
                                            </button>
                                        </div>
                                    )}

                                    {!isAuthenticated() && (
                                        <div className="bg-white dark:bg-[#1a1d24] border border-dashed border-[#E4D9C7] dark:border-gray-700 rounded-2xl p-5 mb-6 text-center">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                <Link href={`/login?redirect=/items/${itemId}`} className="text-[#B75D3E] dark:text-[#E08B5E] font-medium hover:underline">
                                                    Log in
                                                </Link>{' '}
                                                to write a review.
                                            </p>
                                        </div>
                                    )}

                                    {reviews.length === 0 ? (
                                        <p className="text-sm text-gray-500 dark:text-gray-400">No reviews yet. Be the first to share your thoughts.</p>
                                    ) : (
                                        <div className="space-y-4">
                                            {reviews.map((review) => (
                                                <div key={review._id} className="flex gap-3 pb-4 border-b border-[#E4D9C7] dark:border-gray-800 last:border-0">
                                                    <Image
                                                        src={
                                                            review.userImage ||
                                                            `https://ui-avatars.com/api/?name=${encodeURIComponent(review.userName)}&background=B75D3E&color=fff&size=36`
                                                        }
                                                        alt={review.userName}
                                                        width={36}
                                                        height={36}
                                                        className="w-9 h-9 rounded-full object-cover shrink-0"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{review.userName}</span>
                                                            <span className="text-xs text-gray-400">
                                                                {new Date(review.createdAt).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-0.5 mb-1.5">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`w-3 h-3 ${i < review.rating ? 'fill-[#E08B5E] text-[#E08B5E]' : 'text-gray-300 dark:text-gray-600'}`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {related.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-5">
                            You Might Also Like
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
                            {related.map((r) => (
                                <ItemCard key={r._id} item={r} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}