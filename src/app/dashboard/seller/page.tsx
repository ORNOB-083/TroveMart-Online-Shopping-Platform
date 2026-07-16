'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Package, PlusCircle, LayoutGrid, ArrowRight, Store, User, TrendingUp, Clock } from 'lucide-react';
import { getCurrentUser, AuthUser } from '@/lib/auth';
import { api } from '@/lib/api';

export default function SellerDashboardPage() {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [activeListings, setActiveListings] = useState(0);
    const [pendingItems, setPendingItems] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isSeller, setIsSeller] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setIsSeller(currentUser?.role === 'seller');
        
        // Load seller stats only if user is a seller
        const loadStats = async () => {
            if (!currentUser || currentUser.role !== 'seller') {
                setLoading(false);
                return;
            }

            try {
                const { data } = await api.get('/items/mine');
                const items = data.items || [];
                
                setTotalItems(items.length);
                setActiveListings(items.filter((item: any) => item.status === 'approved').length);
                setPendingItems(items.filter((item: any) => item.status === 'pending').length);
            } catch (error) {
                console.error('Failed to load seller stats:', error);
                // Set defaults if API fails
                setTotalItems(0);
                setActiveListings(0);
                setPendingItems(0);
            } finally {
                setLoading(false);
            }
        };

        loadStats();
    }, []);

    const quickActions = [
        {
            label: 'My Items',
            description: `${totalItems} total listing${totalItems !== 1 ? 's' : ''}`,
            icon: LayoutGrid,
            href: '/dashboard/seller/items',
            color: 'from-emerald-500 to-teal-500',
            count: totalItems,
        },
        {
            label: 'Add New Item',
            description: 'Create a new product listing',
            icon: PlusCircle,
            href: '/dashboard/seller/add',
            color: 'from-blue-500 to-cyan-500',
            count: null,
        },
        {
            label: 'Pending Items',
            description: `${pendingItems} awaiting approval`,
            icon: Clock,
            href: '/dashboard/seller/items',
            color: 'from-amber-500 to-orange-500',
            count: pendingItems,
        },
    ];

    return (
        <div className="max-w-6xl">
            {!isSeller ? (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-8 text-center"
                >
                    <Store className="w-12 h-12 mx-auto text-emerald-500 mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Seller Access Required
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        You need to be a seller to access this dashboard. Apply to become a seller to start selling products.
                    </p>
                    <Link
                        href="/become-a-seller"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500"
                    >
                        Become a Seller
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            ) : (
                <>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {quickActions.map((action, i) => (
                    <motion.div
                        key={action.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                    >
                        <Link
                            href={action.href}
                            className="block bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-5 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-500 dark:text-gray-400">{action.label}</span>
                                <div className="relative">
                                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${action.color} bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center`}>
                                        <action.icon className={`w-4 h-4 text-transparent bg-clip-text bg-gradient-to-r ${action.color}`} />
                                    </div>
                                    {action.count !== null && action.count > 0 && (
                                        <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full">
                                            {action.count > 9 ? '9+' : action.count}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{action.description}</p>
                            <div className="flex items-center text-xs text-emerald-500 dark:text-emerald-400 font-medium">
                                View
                                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-6"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center">
                            <Store className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Store Performance</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Track your sales and growth</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#F5EFE6] dark:bg-gray-800 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Package className="w-4 h-4 text-emerald-500" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">Active Listings</span>
                            </div>
                            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{activeListings}</p>
                        </div>
                        <div className="bg-[#F5EFE6] dark:bg-gray-800 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Clock className="w-4 h-4 text-amber-500" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">Pending Review</span>
                            </div>
                            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{pendingItems}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.28 }}
                    className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-6"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Profile Settings</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Manage your seller account</p>
                        </div>
                    </div>
                    <Link
                        href="/dashboard/seller/profile"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-blue-500 border border-blue-500/30 rounded-xl hover:bg-blue-500/5 transition-all"
                    >
                        Manage Profile
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.36 }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white"
            >
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-1">Sales analytics coming soon</h3>
                            <p className="text-sm text-white/80">Track your revenue, orders, and customer insights</p>
                        </div>
                    </div>
                    <div className="shrink-0">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                            Coming Soon
                        </span>
                    </div>
                </div>
            </motion.div>
                </>
            )}
        </div>
    );
}
