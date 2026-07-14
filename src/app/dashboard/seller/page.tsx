'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Package, PlusCircle, LayoutGrid, TrendingUp, ArrowRight, Store } from 'lucide-react';
import { getCurrentUser, AuthUser } from '@/lib/auth';

export default function SellerDashboardPage() {
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);

    const stats = [
        { label: 'Active Listings', value: '0', icon: Package },
        { label: 'Add New Item', value: 'Quick', icon: PlusCircle },
        { label: 'Managed Items', value: '0', icon: LayoutGrid },
    ];

    return (
        <div className="max-w-6xl">
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
                    Manage your products and grow your storefront from here.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.06 }}
                            className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-5"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 flex items-center justify-center">
                                    <Icon className="w-4 h-4 text-emerald-500" />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                        </motion.div>
                    );
                })}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-8 mb-6"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 flex items-center justify-center">
                        <Store className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Vendor control center</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Add new items and manage your store inventory.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        href="/items/add"
                        className="rounded-2xl border border-[#E4D9C7] dark:border-gray-700 p-4 hover:bg-[#F5EFE6] dark:hover:bg-gray-800 transition-all"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-gray-100">Add Item</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Create a new product listing.</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-emerald-500" />
                        </div>
                    </Link>

                    <Link
                        href="/items/manage"
                        className="rounded-2xl border border-[#E4D9C7] dark:border-gray-700 p-4 hover:bg-[#F5EFE6] dark:hover:bg-gray-800 transition-all"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-gray-100">My Items</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Edit or review existing listings.</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-emerald-500" />
                        </div>
                    </Link>

                    <div className="rounded-2xl border border-dashed border-[#E4D9C7] dark:border-gray-700 p-4 bg-[#F5EFE6]/50 dark:bg-gray-800/50">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                            <p className="font-semibold text-gray-900 dark:text-gray-100">Sales insights</p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Track item performance and improve your storefront over time.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
