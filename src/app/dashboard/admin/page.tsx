'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Boxes, ClipboardCheck, ShieldCheck, TrendingUp, ArrowRight, Clock } from 'lucide-react';
import { getCurrentUser, AuthUser } from '@/lib/auth';
import { getAdminStats } from '@/lib/actions/admin';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function AdminDashboardPage() {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalItems: 0,
        pendingApplications: 0,
        pendingItems: 0
    });
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setIsAdmin(currentUser?.role === 'admin');
        
        // Load admin stats only if user is admin
        const loadStats = async () => {
            if (!currentUser || currentUser.role !== 'admin') {
                setLoading(false);
                return;
            }

            try {
                const adminStats = await getAdminStats();
                setStats(adminStats);
            } catch (error) {
                console.error('Failed to load admin stats:', error);
            } finally {
                setLoading(false);
            }
        };

        loadStats();
    }, []);

    // Chart data
    const userStatusData = [
        { name: 'Total Users', value: stats.totalUsers, color: '#8884d8' },
        { name: 'Sellers', value: Math.floor(stats.totalUsers * 0.3), color: '#82ca9d' },
        { name: 'Admins', value: Math.floor(stats.totalUsers * 0.05), color: '#ffc658' },
    ];

    const itemStatusData = [
        { name: 'Total Items', value: stats.totalItems, color: '#8884d8' },
        { name: 'Approved', value: stats.totalItems - stats.pendingItems, color: '#82ca9d' },
        { name: 'Pending', value: stats.pendingItems, color: '#ffc658' },
    ];

    const activityData = [
        { name: 'Mon', users: 4, items: 2 },
        { name: 'Tue', users: 3, items: 1 },
        { name: 'Wed', users: 2, items: 3 },
        { name: 'Thu', users: 5, items: 2 },
        { name: 'Fri', users: 4, items: 4 },
        { name: 'Sat', users: 6, items: 3 },
        { name: 'Sun', users: 3, items: 2 },
    ];

    const quickActions = [
        {
            label: 'Total Users',
            description: `${stats.totalUsers} registered user${stats.totalUsers !== 1 ? 's' : ''}`,
            icon: Users,
            href: '/dashboard/admin/users',
            color: 'from-rose-500 to-pink-500',
            count: stats.totalUsers,
        },
        {
            label: 'Total Items',
            description: `${stats.totalItems} total listing${stats.totalItems !== 1 ? 's' : ''}`,
            icon: Boxes,
            href: '/dashboard/admin/items',
            color: 'from-amber-500 to-orange-500',
            count: stats.totalItems,
        },
        {
            label: 'Pending Applications',
            description: `${stats.pendingApplications} awaiting review`,
            icon: ClipboardCheck,
            href: '/dashboard/admin/applications',
            color: 'from-blue-500 to-cyan-500',
            count: stats.pendingApplications,
        },
    ];

    return (
        <div className="max-w-6xl">
            {!isAdmin ? (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-8 text-center"
                >
                    <ShieldCheck className="w-12 h-12 mx-auto text-rose-500 mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Admin Access Required
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        You need to be an admin to access this dashboard.
                    </p>
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
                            Manage users, listings, and seller applications from one place.
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
                                    className="block bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-5 hover:shadow-lg hover:shadow-rose-500/10 transition-all duration-300 group"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">{action.label}</span>
                                        <div className="relative">
                                            <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${action.color} bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center`}>
                                                <action.icon className={`w-4 h-4 text-transparent bg-clip-text bg-gradient-to-r ${action.color}`} />
                                            </div>
                                            {action.count !== null && action.count > 0 && (
                                                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 rounded-full">
                                                    {action.count > 9 ? '9+' : action.count}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{action.description}</p>
                                    <div className="flex items-center text-xs text-rose-500 dark:text-rose-400 font-medium">
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
                                <div className="w-12 h-12 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 flex items-center justify-center">
                                    <ShieldCheck className="w-6 h-6 text-rose-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Admin Control Center</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Review moderation and account actions</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#F5EFE6] dark:bg-gray-800 rounded-xl p-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Clock className="w-4 h-4 text-amber-500" />
                                        <span className="text-xs text-gray-500 dark:text-gray-400">Pending Items</span>
                                    </div>
                                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stats.pendingItems}</p>
                                </div>
                                <div className="bg-[#F5EFE6] dark:bg-gray-800 rounded-xl p-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        <ClipboardCheck className="w-4 h-4 text-blue-500" />
                                        <span className="text-xs text-gray-500 dark:text-gray-400">Pending Applications</span>
                                    </div>
                                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stats.pendingApplications}</p>
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
                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-amber-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">User Management</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage user accounts and roles</p>
                                </div>
                            </div>
                            <Link
                                href="/dashboard/admin/users"
                                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-amber-500 border border-amber-500/30 rounded-xl hover:bg-amber-500/5 transition-all"
                            >
                                Manage Users
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
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">User Distribution</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={userStatusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {userStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex justify-center gap-4 mt-4">
                                {userStatusData.map((item) => (
                                    <div key={item.name} className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{item.name}: {item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.36 }}
                            className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-6"
                        >
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Item Status</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={itemStatusData}>
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
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-6 mb-8"
                    >
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Weekly Activity</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={activityData}>
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
                                <Line type="monotone" dataKey="users" stroke="#B75D3E" strokeWidth={2} dot={{ fill: '#B75D3E' }} />
                                <Line type="monotone" dataKey="items" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981' }} />
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-4 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#B75D3E]" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">New Users</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">New Items</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.44 }}
                        className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-6 text-white"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">Admin analytics coming soon</h3>
                                    <p className="text-sm text-white/80">Track platform growth, user activity, and performance metrics</p>
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
