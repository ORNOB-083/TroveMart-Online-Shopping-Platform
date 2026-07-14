'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Boxes, ClipboardCheck, ShieldCheck, TrendingUp, ArrowRight } from 'lucide-react';
import { getCurrentUser, AuthUser } from '@/lib/auth';

export default function AdminDashboardPage() {
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(getCurrentUser());
    }, []);

    const stats = [
        { label: 'Total Users', value: '0', icon: Users },
        { label: 'Total Items', value: '0', icon: Boxes },
        { label: 'Pending Applications', value: '0', icon: ClipboardCheck },
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
                    Manage users, listings, and seller applications from one place.
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
                                <div className="w-8 h-8 rounded-full bg-rose-500/10 dark:bg-rose-500/10 flex items-center justify-center">
                                    <Icon className="w-4 h-4 text-rose-500" />
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
                    <div className="w-12 h-12 rounded-full bg-rose-500/10 dark:bg-rose-500/10 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Admin control center</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Review moderation and account actions quickly.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        href="/dashboard/admin/users"
                        className="rounded-2xl border border-[#E4D9C7] dark:border-gray-700 p-4 hover:bg-[#F5EFE6] dark:hover:bg-gray-800 transition-all"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-gray-100">Manage Users</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">View and moderate user accounts.</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-rose-500" />
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/admin/items"
                        className="rounded-2xl border border-[#E4D9C7] dark:border-gray-700 p-4 hover:bg-[#F5EFE6] dark:hover:bg-gray-800 transition-all"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-gray-100">Manage Items</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Approve or update listings.</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-rose-500" />
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/admin/applications"
                        className="rounded-2xl border border-[#E4D9C7] dark:border-gray-700 p-4 hover:bg-[#F5EFE6] dark:hover:bg-gray-800 transition-all"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-gray-100">Seller Applications</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Review seller requests and decisions.</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-rose-500" />
                        </div>
                    </Link>

                    <div className="rounded-2xl border border-dashed border-[#E4D9C7] dark:border-gray-700 p-4 bg-[#F5EFE6]/50 dark:bg-gray-800/50">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                            <p className="font-semibold text-gray-900 dark:text-gray-100">Growth insights</p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Add analytics later for active users, orders, and product performance.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
