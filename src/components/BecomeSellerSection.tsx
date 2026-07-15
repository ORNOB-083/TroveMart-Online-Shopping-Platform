'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Store, TrendingUp, Users, Zap, ArrowRight, ShoppingBag, Package, Sparkles } from 'lucide-react';

const BENEFITS = [
    { icon: Zap, text: 'List your first products in minutes' },
    { icon: Users, text: 'Reach thousands of active buyers' },
    { icon: TrendingUp, text: 'Track sales and growth from your dashboard' },
];

export default function BecomeSellerSection() {
    return (
        <section className="py-16 sm:py-20 bg-[#F5EFE6] dark:bg-[#0f1117] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#B75D3E] via-[#C96048] to-[#8F4530] p-8 sm:p-12 lg:p-16 shadow-2xl shadow-[#B75D3E]/20 dark:shadow-[#B75D3E]/10"
                >
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-80 h-80 translate-x-1/4 translate-y-1/4 rounded-full bg-black/10 blur-3xl" />

                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)',
                                backgroundSize: '24px 24px',
                            }}
                        />

                        <motion.div
                            className="absolute top-8 right-8 sm:top-12 sm:right-12 text-3xl opacity-30"
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <ShoppingBag className="w-8 h-8" />
                        </motion.div>
                        <motion.div
                            className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 text-3xl opacity-30"
                            animate={{ y: [0, 14, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                        >
                            <Package className="w-8 h-8" />
                        </motion.div>
                        <motion.div
                            className="absolute top-1/2 right-4 sm:right-8 text-2xl opacity-20"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                        >
                            <Sparkles className="w-8 h-8" />
                        </motion.div>
                    </div>

                    <div className="relative grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-white bg-white/15 px-3 py-1.5 rounded-full mb-5 backdrop-blur-sm">
                                <Store className="w-3.5 h-3.5" />
                                For Sellers
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                                Turn what you make into what you earn.
                            </h2>
                            <p className="text-white/70 text-sm sm:text-base mb-8 max-w-md">
                                Whether it&apos;s handcrafted goods, electronics, or everyday essentials —
                                open your storefront on TrovéMart and start selling to real buyers today.
                            </p>
                            <Link
                                href="/become-a-seller"
                                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#B75D3E] bg-white rounded-xl shadow-lg shadow-black/10 hover:bg-white/90 hover:scale-[1.04] active:scale-95 transition-all duration-200"
                            >
                                Apply to Become a Seller
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {BENEFITS.map((item, i) => (
                                <motion.div
                                    key={item.text}
                                    initial={{ opacity: 0, x: 16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                                    className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-2xl p-4 transition-all duration-300 shadow-lg shadow-black/10"
                                >
                                    <div className="shrink-0 w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shadow-inner">
                                        <item.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-sm text-white/90 font-medium">{item.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}