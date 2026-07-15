'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Laptop,
    Shirt,
    Watch,
    Home,
    Gem,
    Gamepad2,
    LucideIcon,
} from 'lucide-react';

interface Category {
    label: string;
    value: string;
    icon: LucideIcon;
}

const CATEGORIES: Category[] = [
    { label: 'Electronics', value: 'Electronics', icon: Laptop },
    { label: 'Fashion', value: 'Fashion', icon: Shirt },
    { label: 'Accessories', value: 'Accessories', icon: Watch },
    { label: 'Home & Living', value: 'Home & Living', icon: Home },
    { label: 'Handmade Crafts', value: 'Handmade Crafts', icon: Gem },
    { label: 'Gaming', value: 'Gaming', icon: Gamepad2 },
];

export default function CategorySection() {
    return (
        <section className="py-14 sm:py-16 bg-white dark:bg-[#0f1117] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                            Shop by Category
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Find exactly what you&apos;re looking for.
                        </p>
                    </div>
                    <Link
                        href="/items"
                        className="hidden sm:block text-sm font-medium text-[#B75D3E] dark:text-[#E08B5E] hover:underline"
                    >
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {CATEGORIES.map((cat, i) => (
                        <motion.div
                            key={cat.value}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: i * 0.05 }}
                        >
                            <Link
                                href={`/items?category=${encodeURIComponent(cat.value)}`}
                                className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-[#E4D9C7] dark:border-gray-800 bg-[#F5EFE6]/40 dark:bg-[#1a1d24] hover:border-[#B75D3E]/40 dark:hover:border-[#E08B5E]/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#B75D3E]/10 transition-all duration-300"
                            >
                                <div className="w-14 h-14 rounded-full bg-[#B75D3E]/10 dark:bg-[#E08B5E]/10 flex items-center justify-center group-hover:bg-[#B75D3E]/15 dark:group-hover:bg-[#E08B5E]/15 group-hover:scale-110 transition-all duration-300">
                                    <cat.icon className="w-6 h-6 text-[#B75D3E] dark:text-[#E08B5E]" />
                                </div>
                                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 text-center">
                                    {cat.label}
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}