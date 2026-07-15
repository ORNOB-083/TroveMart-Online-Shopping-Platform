'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, ArrowRight, User, ShoppingBag, Package } from 'lucide-react';
import { getCurrentUser, AuthUser } from '@/lib/auth';
import { getCartCount } from '@/lib/cart';
import { getWishlistItemIds } from '@/lib/utils';

export default function UserDashboardPage() {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(getCurrentUser());
        
        const loadStats = () => {
            try {
                setCartCount(getCartCount());
                setWishlistCount(getWishlistItemIds().length);
            } catch (error) {
                console.error('Failed to load stats:', error);
            } finally {
                setLoading(false);
            }
        };

        loadStats();

        const handleCartChange = () => {
            setCartCount(getCartCount());
        };

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'trovemart_cart_items') {
                setCartCount(getCartCount());
            }
        };

        const handleWishlistChange = () => {
            setWishlistCount(getWishlistItemIds().length);
        };

        window.addEventListener('trovemart:cart-change', handleCartChange);
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('trovemart:wishlist-change', handleWishlistChange);

        return () => {
            window.removeEventListener('trovemart:cart-change', handleCartChange);
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('trovemart:wishlist-change', handleWishlistChange);
        };
    }, []);

    const quickActions = [
        {
            label: 'My Cart',
            description: `${cartCount} item${cartCount !== 1 ? 's' : ''} in cart`,
            icon: ShoppingCart,
            href: '/dashboard/user/cart',
            color: 'from-[#B75D3E] to-[#E08B5E]',
            count: cartCount,
        },
        {
            label: 'My Wishlist',
            description: `${wishlistCount} saved item${wishlistCount !== 1 ? 's' : ''}`,
            icon: Heart,
            href: '/dashboard/user/wishlist',
            color: 'from-rose-500 to-pink-500',
            count: wishlistCount,
        },
        {
            label: 'My Reviews',
            description: 'Write product reviews',
            icon: Star,
            href: '/dashboard/user/reviews',
            color: 'from-amber-500 to-orange-500',
            count: null,
        },
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
                    Manage your shopping experience from your dashboard.
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
                            className="block bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-5 hover:shadow-lg hover:shadow-[#B75D3E]/10 transition-all duration-300 group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-500 dark:text-gray-400">{action.label}</span>
                                <div className="relative">
                                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${action.color} bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center`}>
                                        <action.icon className={`w-4 h-4 text-transparent bg-clip-text bg-gradient-to-r ${action.color}`} />
                                    </div>
                                    {action.count !== null && action.count > 0 && (
                                        <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] rounded-full">
                                            {action.count > 9 ? '9+' : action.count}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{action.description}</p>
                            <div className="flex items-center text-xs text-[#B75D3E] dark:text-[#E08B5E] font-medium">
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
                        <div className="w-12 h-12 rounded-xl bg-[#B75D3E]/10 dark:bg-[#E08B5E]/10 flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-[#B75D3E] dark:text-[#E08B5E]" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Start Shopping</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Explore our collection</p>
                        </div>
                    </div>
                    <Link
                        href="/items"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] shadow-md shadow-[#B75D3E]/25 hover:shadow-[#B75D3E]/40 transition-all"
                    >
                        Browse Products
                        <ArrowRight className="w-4 h-4" />
                    </Link>
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
                            <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account</p>
                        </div>
                    </div>
                    <Link
                        href="/dashboard/user/profile"
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
                className="bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] rounded-2xl p-6 text-white"
            >
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                            <Package className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-1">Order tracking coming soon</h3>
                            <p className="text-sm text-white/80">Track your orders and view order history</p>
                        </div>
                    </div>
                    <div className="shrink-0">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                            Coming Soon
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}