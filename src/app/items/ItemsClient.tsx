/* eslint-disable react-hooks/static-components */
'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import {
    Search,
    SlidersHorizontal,
    X,
    ChevronDown,
    Star,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { getItems, getCategories } from '@/lib/actions/items';
import { Item } from '@/lib/types';
import ItemCard from '@/components/ItemCard';
import SkeletonCard from '@/components/SkeletonCard';

const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
];

const HERO_SLIDES = [
    {
        image:
            'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80',
        title: 'Shop the latest arrivals',
        subtitle: 'Fresh picks from trusted sellers across every category.',
    },
    {
        image:
            'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
        title: 'Discover everyday favorites',
        subtitle: 'From home essentials to style upgrades, everything is just a tap away.',
    },
    {
        image:
            'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80',
        title: 'Your next best find is here',
        subtitle: 'Browse handpicked products with seamless shopping and great deals.',
    },
];

export default function ItemsClient() {
    const [items, setItems] = useState<Item[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minRating, setMinRating] = useState(0);
    const [sort, setSort] = useState('newest');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        getCategories().then(setCategories).catch(() => { });
    }, []);

    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => setDebouncedSearch(search), 400);
        return () => clearTimeout(debounceRef.current);
    }, [search]);

    const fetchItems = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getItems({
                search: debouncedSearch,
                category,
                minPrice: minPrice ? Number(minPrice) : undefined,
                maxPrice: maxPrice ? Number(maxPrice) : undefined,
                minRating: minRating || undefined,
                sort,
                page,
                limit: 8,
            });
            setItems(res.items);
            setTotalPages(res.totalPages);
            setTotal(res.total);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [debouncedSearch, category, minPrice, maxPrice, minRating, sort, page]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchItems();
    }, [fetchItems]);

    // Reset to page 1 whenever a filter changes
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPage(1);
    }, [debouncedSearch, category, minPrice, maxPrice, minRating, sort]);

    const clearFilters = () => {
        setSearch('');
        setCategory('all');
        setMinPrice('');
        setMaxPrice('');
        setMinRating(0);
    };

    const activeFilterCount =
        (category !== 'all' ? 1 : 0) + (minPrice ? 1 : 0) + (maxPrice ? 1 : 0) + (minRating ? 1 : 0);

    const FilterPanel = () => (
        <div className="space-y-6">
            <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Category</h4>
                <div className="space-y-1.5">
                    <label className="flex items-center gap-2.5 cursor-pointer text-sm">
                        <input
                            type="radio"
                            checked={category === 'all'}
                            onChange={() => setCategory('all')}
                            className="w-4 h-4 text-[#B75D3E] focus:ring-[#B75D3E]/30"
                        />
                        <span className="text-gray-600 dark:text-gray-300">All Categories</span>
                    </label>
                    {categories.map((cat) => (
                        <label key={cat} className="flex items-center gap-2.5 cursor-pointer text-sm">
                            <input
                                type="radio"
                                checked={category === cat}
                                onChange={() => setCategory(cat)}
                                className="w-4 h-4 text-[#B75D3E] focus:ring-[#B75D3E]/30"
                            />
                            <span className="text-gray-600 dark:text-gray-300">{cat}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Price Range</h4>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-[#F9F5EF] dark:bg-gray-800/60 border border-[#E4D9C7] dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:border-[#B75D3E] transition-colors"
                    />
                    <span className="text-gray-400">–</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-[#F9F5EF] dark:bg-gray-800/60 border border-[#E4D9C7] dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:border-[#B75D3E] transition-colors"
                    />
                </div>
            </div>

            <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Minimum Rating</h4>
                <div className="flex flex-col gap-1.5">
                    {[4, 3, 2, 1].map((r) => (
                        <button
                            key={r}
                            onClick={() => setMinRating(minRating === r ? 0 : r)}
                            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm transition-colors ${minRating === r
                                ? 'bg-[#B75D3E]/10 text-[#B75D3E] dark:text-[#E08B5E]'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-[#F5EFE6] dark:hover:bg-gray-800'
                                }`}
                        >
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-3.5 h-3.5 ${i < r ? 'fill-[#E08B5E] text-[#E08B5E]' : 'text-gray-300 dark:text-gray-600'
                                        }`}
                                />
                            ))}
                            <span className="ml-1">& up</span>
                        </button>
                    ))}
                </div>
            </div>

            {activeFilterCount > 0 && (
                <button
                    onClick={clearFilters}
                    className="w-full py-2 text-sm font-medium text-[#B75D3E] dark:text-[#E08B5E] border border-[#B75D3E]/30 dark:border-[#E08B5E]/30 rounded-xl hover:bg-[#B75D3E]/5 transition-colors"
                >
                    Clear All Filters
                </button>
            )}
        </div>
    );

    return (
        <div className="bg-[#F5EFE6] dark:bg-[#0f1117] min-h-screen transition-colors duration-300">

            <div className="relative h-[34vh] sm:h-[38vh] lg:h-[42vh] overflow-hidden">
                <Swiper
                    modules={[Autoplay, Pagination, EffectFade]}
                    effect="fade"
                    autoplay={{ delay: 4500, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop
                    className="h-full w-full"
                >
                    {HERO_SLIDES.map((slide) => (
                        <SwiperSlide key={slide.title}>
                            <div className="relative h-full w-full">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="h-full w-full object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0f1117]/85 via-[#0f1117]/45 to-[#0f1117]/25" />
                                <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                                    <motion.div
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="max-w-3xl text-center text-white"
                                    >
                                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                                            Explore Everything TrovéMart
                                        </h1>
                                        <p className="text-sm sm:text-base lg:text-lg text-white/80 mb-4">
                                            {total.toLocaleString()} products from trusted sellers, all in one place.
                                        </p>
                                        <div className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                                            {slide.title}
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-[#B75D3E] focus:ring-2 focus:ring-[#B75D3E]/20 transition-all"
                        />
                    </div>

                    <button
                        onClick={() => setFilterOpen(true)}
                        className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-xl text-gray-700 dark:text-gray-200"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                        {activeFilterCount > 0 && (
                            <span className="w-5 h-5 flex items-center justify-center text-xs bg-[#B75D3E] text-white rounded-full">
                                {activeFilterCount}
                            </span>
                        )}
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setSortOpen((v) => !v)}
                            className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm font-medium bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-xl text-gray-700 dark:text-gray-200 w-full sm:w-52"
                        >
                            {SORT_OPTIONS.find((o) => o.value === sort)?.label}
                            <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {sortOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-xl shadow-lg overflow-hidden z-30"
                                >
                                    {SORT_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => {
                                                setSort(opt.value);
                                                setSortOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sort === opt.value
                                                ? 'bg-[#B75D3E]/10 text-[#B75D3E] dark:text-[#E08B5E]'
                                                : 'text-gray-700 dark:text-gray-200 hover:bg-[#F5EFE6] dark:hover:bg-gray-800'
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="flex gap-8">
                    <aside className="hidden lg:block w-64 shrink-0">
                        <div className="sticky top-24 bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-5">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-5">Filters</h3>
                            <FilterPanel />
                        </div>
                    </aside>

                    <div className="flex-1 min-w-0">
                        {loading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                                {[...Array(8)].map((_, i) => (
                                    <SkeletonCard key={i} />
                                ))}
                            </div>
                        ) : items.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-gray-500 dark:text-gray-400 mb-4">
                                    No products match your filters.
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#B75D3E] to-[#E08B5E]"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                                    {items.map((item) => (
                                        <ItemCard key={item._id} item={item} />
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-10">
                                        <button
                                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                                            disabled={page === 1}
                                            className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#E4D9C7] dark:border-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setPage(i + 1)}
                                                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${page === i + 1
                                                    ? 'bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] text-white'
                                                    : 'border border-[#E4D9C7] dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-[#F5EFE6] dark:hover:bg-gray-800'
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                            disabled={page === totalPages}
                                            className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#E4D9C7] dark:border-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {filterOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setFilterOpen(false)}
                            className="lg:hidden fixed inset-0 bg-black/40 z-40"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.25 }}
                            className="lg:hidden fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-[#1a1d24] z-50 shadow-2xl overflow-y-auto"
                        >
                            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E4D9C7] dark:border-gray-800">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Filters</h3>
                                <button onClick={() => setFilterOpen(false)} className="text-gray-500 dark:text-gray-400">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-5">
                                <FilterPanel />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}