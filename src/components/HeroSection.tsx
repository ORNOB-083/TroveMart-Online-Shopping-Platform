'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ShoppingBag, Star, Truck, Clock, Package } from 'lucide-react';

const CATEGORY_PILLS = [
    'Electronics',
    'Fashion',
    'Home & Living',
    'Beauty',
    'Sports',
    'Handmade Crafts',
    'Toys & Kids',
];

const STATS = [
    { label: 'Products', value: '50K+' },
    { label: 'Sellers', value: '3.2K+' },
    { label: 'Happy Customers', value: '120K+' },
];

export default function HeroSection() {
    const [activePill, setActivePill] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActivePill((prev) => (prev + 1) % CATEGORY_PILLS.length);
        }, 2200);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full h-[68vh] min-h-[520px] overflow-hidden bg-gradient-to-br from-[#0f1117] via-[#1a1d24] to-[#2a1f1a]">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#B75D3E]/10 animate-float-slow" />
                <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-[#E08B5E]/10 animate-float-medium" />
                <div className="absolute top-1/3 left-1/2 w-16 h-16 rounded-full bg-[#B75D3E]/5 animate-float-fast" />
                <div className="absolute bottom-1/3 left-10 w-24 h-24 rounded-full bg-[#E08B5E]/10 animate-float-slow" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 right-10 w-12 h-12 rounded-full bg-[#B75D3E]/10 animate-float-medium" style={{ animationDelay: '1.5s' }} />
            </div>

            <motion.div
                className="absolute top-20 left-10 text-5xl opacity-20 pointer-events-none"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
                🛒
            </motion.div>
            <motion.div
                className="absolute bottom-20 right-10 text-6xl opacity-20 pointer-events-none"
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
                📦
            </motion.div>
            <motion.div
                className="absolute top-1/2 left-1/4 text-4xl opacity-15 pointer-events-none"
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
                ⚡
            </motion.div>

            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-5"
                >
                    <Star className="w-3.5 h-3.5 text-[#E08B5E] fill-current" />
                    <span className="text-xs font-medium text-white/90">Trending Now</span>
                </motion.div>

                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl"
                    >
                        Shop the
                    </motion.h1>
                </div>
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-2xl mb-4"
                    >
                        <span className="bg-gradient-to-r from-[#E08B5E] to-[#F0B27E] bg-clip-text text-transparent">
                            Best Deals
                        </span>{' '}
                        Online
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-white/70 text-sm sm:text-base max-w-md mb-6"
                >
                    From electronics to fashion and home essentials — discover thousands of products at unbeatable prices.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-wrap gap-2 mb-7"
                >
                    {CATEGORY_PILLS.map((pill, i) => (
                        <span
                            key={pill}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-500 ${activePill === i
                                ? 'bg-[#B75D3E] border-[#B75D3E] text-white scale-105'
                                : 'bg-white/5 border-white/15 text-white/60'
                                }`}
                        >
                            {pill}
                        </span>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Link
                        href="/items"
                        className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] text-white font-semibold shadow-lg shadow-[#B75D3E]/30 hover:shadow-[#B75D3E]/50 hover:scale-[1.03] active:scale-95 transition-all duration-200"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        Start Shopping
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                        href="/about"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 hover:border-white/50 transition-all duration-200"
                    >
                        Learn More
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.75 }}
                    className="flex flex-wrap items-center gap-6 mt-8"
                >
                    <div className="flex items-center gap-2 text-sm text-white/70">
                        <Truck className="w-4 h-4 text-[#E08B5E]" />
                        Free Delivery
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                        <Clock className="w-4 h-4 text-[#E08B5E]" />
                        24/7 Support
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                        <Package className="w-4 h-4 text-[#E08B5E]" />
                        Easy Returns
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="flex items-center gap-8 mt-6"
                >
                    {STATS.map((stat, i) => (
                        <div key={stat.label} className="flex items-center gap-8">
                            <div>
                                <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
                                <p className="text-xs text-white/50">{stat.label}</p>
                            </div>
                            {i < STATS.length - 1 && <div className="w-px h-8 bg-white/15" />}
                        </div>
                    ))}
                </motion.div>
            </div>

            <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-4 right-4 sm:top-24 sm:right-16 w-32 sm:w-40 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/40 p-2.5 sm:p-3 z-20 shadow-2xl"
            >
                <div className="w-full h-16 sm:h-20 rounded-xl bg-gradient-to-br from-[#E08B5E]/70 to-[#B75D3E]/70 mb-2" />
                <p className="text-xs font-semibold text-white">New Arrival</p>
                <p className="text-xs text-white/90">৳24.99</p>
            </motion.div>
            <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-4 right-4 sm:bottom-28 sm:right-40 w-28 sm:w-36 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/40 p-2.5 sm:p-3 z-20 shadow-2xl"
            >
                <div className="w-full h-12 sm:h-16 rounded-xl bg-gradient-to-br from-[#B75D3E]/70 to-[#E08B5E]/70 mb-2" />
                <p className="text-xs font-semibold text-white">Best Seller</p>
                <p className="text-xs text-white/90">4.9 ★ rating</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
            >
                <span className="text-xs text-white/80 font-medium">Scroll to explore</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <ChevronDown className="w-4 h-4 text-white/80" />
                </motion.div>
            </motion.div>
        </section>
    );
}