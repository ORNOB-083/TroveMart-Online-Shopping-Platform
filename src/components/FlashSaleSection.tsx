'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, ShoppingBag, Zap, ArrowRight } from 'lucide-react';
import { Item } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface FlashSaleSectionProps {
    items: Item[];
}

const getMockOriginalPrice = (price: number) => Math.round(price * 1.4);

export default function FlashSaleSection({ items }: FlashSaleSectionProps) {
    return (
        <section className="py-16 sm:py-20 bg-[#1a1d24] dark:bg-[#0f1117] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#B75D3E]/20 via-transparent to-[#E08B5E]/20 blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
                    <div>
                        <div className="flex items-center gap-2 text-[#E08B5E] mb-2">
                            <Zap className="w-5 h-5 fill-current animate-pulse" />
                            <span className="text-sm font-semibold uppercase tracking-widest">Limited Time</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                            Fresh Drops
                        </h2>
                        <p className="text-white/60 text-sm mt-1">Discover the newest arrivals trending right now.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-white/50 uppercase font-semibold tracking-wider">Ends In</span>
                            <div className="flex items-center gap-1 text-sm font-mono text-white bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                                <span className="bg-black/30 px-2 py-1 rounded-md">02</span>
                                <span className="text-white/40">:</span>
                                <span className="bg-black/30 px-2 py-1 rounded-md">15</span>
                                <span className="text-white/40">:</span>
                                <span className="bg-black/30 px-2 py-1 rounded-md">34</span>
                            </div>
                        </div>
                        <Link
                            href="/items"
                            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-white/70 hover:text-[#E08B5E] transition-colors duration-200"
                        >
                            View All
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {items.slice(0, 4).map((item, i) => {
                        const originalPrice = getMockOriginalPrice(item.price);
                        const discount = Math.round((1 - item.price / originalPrice) * 100);

                        return (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#B75D3E]/20 hover:border-[#E08B5E]/40 transition-all duration-300"
                            >
                                {discount > 0 && (
                                    <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md shadow-[#B75D3E]/50">
                                        -{discount}%
                                    </div>
                                )}

                                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#1a1d24] mb-4">
                                    <Image
                                        src={item.images[0] || '/placeholder.png'}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, 300px"
                                        className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                                    />
                                </div>

                                <h3 className="text-sm font-semibold text-white line-clamp-1 mb-2">
                                    {item.title}
                                </h3>

                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-base font-bold text-[#E08B5E] flex items-center gap-1">
                                        {formatPrice(item.price)}
                                    </span>
                                    {discount > 0 && (
                                        <span className="text-xs text-white/40 line-through">
                                            {formatPrice(originalPrice)}
                                        </span>
                                    )}
                                </div>

                                <Link
                                    href={`/items/${item._id}`}
                                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] text-white text-xs font-semibold shadow-lg shadow-[#B75D3E]/20 group-hover:shadow-[#B75D3E]/50 group-hover:scale-[1.03] active:scale-95 transition-all duration-200"
                                >
                                    <ShoppingBag className="w-3.5 h-3.5" />
                                    Shop Now
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}