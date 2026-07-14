// src/app/dashboard/user/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Package, Heart, Star, ShoppingBag, ArrowRight, Smile } from 'lucide-react';
import { getCurrentUser, AuthUser } from '@/lib/auth';

export default function UserDashboardPage() {
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(getCurrentUser());
    }, []);

    const stats = [
        { label: 'Orders', value: 0, icon: Package },
        { label: 'Wishlist Items', value: 0, icon: Heart },
        { label: 'Reviews Written', value: 0, icon: Star },
    ];

    return (
        <div className="max-w-5xl">
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
            >
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Here&apos;s what&apos;s happening with your account.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                        className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-5"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
                            <div className="w-8 h-8 rounded-full bg-[#B75D3E]/10 dark:bg-[#E08B5E]/10 flex items-center justify-center">
                                <stat.icon className="w-4 h-4 text-[#B75D3E] dark:text-[#E08B5E]" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-8 mb-6 text-center"
            >
                <div className="w-14 h-14 mx-auto rounded-full bg-[#F5EFE6] dark:bg-gray-800 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-6 h-6 text-[#B75D3E] dark:text-[#E08B5E]" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    No orders yet
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 max-w-sm mx-auto">
                    When you place an order, it&apos;ll show up here so you can track its status.
                </p>
                <Link
                    href="/items"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] shadow-md shadow-[#B75D3E]/25 hover:shadow-[#B75D3E]/40 transition-all"
                >
                    Start Shopping
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.28 }}
                className="bg-white dark:bg-[#1a1d24] border border-dashed border-[#E4D9C7] dark:border-gray-700 rounded-2xl p-6 flex items-center justify-between gap-4"
            >
                <div className="flex items-center gap-4">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-[#B75D3E]/10 dark:bg-[#E08B5E]/10 flex items-center justify-center">
                        <Smile className="w-5 h-5 text-[#B75D3E] dark:text-[#E08B5E]" />
                    </div>
                    <div>
                        <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-sm mb-0.5">
                            Keep your account up to date
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Add a profile photo and confirm your details for faster checkout.
                        </p>
                    </div>
                </div>
                <Link
                    href="/dashboard/user/profile"
                    className="shrink-0 px-4 py-2 text-sm font-medium text-[#B75D3E] dark:text-[#E08B5E] border border-[#B75D3E]/30 dark:border-[#E08B5E]/30 rounded-xl hover:bg-[#B75D3E]/5 dark:hover:bg-[#E08B5E]/5 transition-all"
                >
                    Manage Account
                </Link>
            </motion.div>
        </div>
    );
}