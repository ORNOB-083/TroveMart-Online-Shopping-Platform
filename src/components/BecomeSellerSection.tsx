'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Store, TrendingUp, Users, Zap, ArrowRight } from 'lucide-react';

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
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#B75D3E] to-[#8F4530] p-8 sm:p-12 lg:p-16"
                >
                    <div
                        className="pointer-events-none absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '26px 26px',
                        }}
                    />

                    <div className="relative grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-white bg-white/15 px-3 py-1.5 rounded-full mb-5">
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
                                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#B75D3E] bg-white rounded-xl hover:bg-white/90 hover:scale-[1.03] active:scale-95 transition-all duration-200"
                            >
                                Apply to Become a Seller
                                <ArrowRight className="w-4 h-4" />
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
                                    className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4"
                                >
                                    <div className="shrink-0 w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
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