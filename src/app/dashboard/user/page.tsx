'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, ArrowRight, User, ShoppingBag, Package, TrendingUp } from 'lucide-react';
import { getCurrentUser, AuthUser } from '@/lib/auth';
import { getCartCount } from '@/lib/cart';
import { getWishlistItemIds } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';

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

    // Chart data
    const activityData = [
        { name: 'Mon', views: 12, cart: 2, wishlist: 1 },
        { name: 'Tue', views: 8, cart: 1, wishlist: 2 },
        { name: 'Wed', views: 15, cart: 3, wishlist: 1 },
        { name: 'Thu', views: 10, cart: 2, wishlist: 0 },
        { name: 'Fri', views: 18, cart: 4, wishlist: 2 },
        { name: 'Sat', views: 22, cart: 5, wishlist: 3 },
        { name: 'Sun', views: 14, cart: 3, wishlist: 1 },
    ];

    const wishlistCategoryData = [
        { name: 'Electronics', value: 35, color: '#8884d8' },
        { name: 'Fashion', value: 28, color: '#82ca9d' },
        { name: 'Home', value: 22, color: '#ffc658' },
        { name: 'Books', value: 10, color: '#ff7300' },
        { name: 'Other', value: 5, color: '#00c49f' },
    ];

    const priceRangeData = [
        { name: '$0-$25', value: 8, color: '#10B981' },
        { name: '$25-$50', value: 12, color: '#B75D3E' },
        { name: '$50-$100', value: 6, color: '#F59E0B' },
        { name: '$100+', value: 4, color: '#6366f1' },
    ];

    const spendingData = [
        { name: 'Jan', spending: 120 },
        { name: 'Feb', spending: 98 },
        { name: 'Mar', spending: 156 },
        { name: 'Apr', spending: 134 },
        { name: 'May', spending: 189 },
        { name: 'Jun', spending: 245 },
    ];

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

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.32 }}
                    className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-6"
                >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Weekly Shopping Activity</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={activityData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E4D9C7" />
                            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: '#1a1d24', 
                                    border: '1px solid #E4D9C7',
                                    borderRadius: '8px' 
                                }}
                            />
                            <Area type="monotone" dataKey="views" stackId="1" stroke="#B75D3E" fill="#B75D3E" fillOpacity={0.6} />
                            <Area type="monotone" dataKey="cart" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                            <Area type="monotone" dataKey="wishlist" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                        </AreaChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#B75D3E]" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">Views</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">Added to Cart</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">Wishlist</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.36 }}
                    className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-6"
                >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Wishlist Categories</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={wishlistCategoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {wishlistCategoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 mt-4 flex-wrap">
                        {wishlistCategoryData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-xs text-gray-500 dark:text-gray-400">{item.name}: {item.value}%</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-6"
                >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Price Range Distribution</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={priceRangeData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E4D9C7" />
                            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: '#1a1d24', 
                                    border: '1px solid #E4D9C7',
                                    borderRadius: '8px' 
                                }}
                            />
                            <Bar dataKey="value" fill="#B75D3E" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.44 }}
                    className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-6"
                >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Monthly Spending</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={spendingData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E4D9C7" />
                            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: '#1a1d24', 
                                    border: '1px solid #E4D9C7',
                                    borderRadius: '8px' 
                                }}
                            />
                            <Line type="monotone" dataKey="spending" stroke="#B75D3E" strokeWidth={2} dot={{ fill: '#B75D3E' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.48 }}
                className="bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] rounded-2xl p-6 text-white"
            >
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6" />
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