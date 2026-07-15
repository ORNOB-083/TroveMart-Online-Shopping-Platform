'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Ban, CheckCircle2, Users as UsersIcon, Shield, Store, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCurrentUser } from '@/lib/auth';
import { getAllUsers, banUser, unbanUser } from '@/lib/actions/admin';
import { AdminUser } from '@/lib/types';

type RoleTab = 'all' | 'user' | 'seller' | 'admin';

const TABS: { value: RoleTab; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'user', label: 'Buyers' },
    { value: 'seller', label: 'Sellers' },
    { value: 'admin', label: 'Admins' },
];

const ROLE_ICON = { user: UserIcon, seller: Store, admin: Shield };

export default function ManageUsersClient() {
    const router = useRouter();
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<RoleTab>('all');
    const [processingId, setProcessingId] = useState<string | null>(null);

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (!currentUser || currentUser.role !== 'admin') {
            toast.error('Admin access only.');
            router.replace('/dashboard/user');
            return;
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAuthorized(true);
    }, [router]);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const results = await getAllUsers(activeTab);
            setUsers(results);
        } catch {
            toast.error('Failed to load users.');
        } finally {
            setLoading(false);
        }
    }, [activeTab]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (authorized) fetchUsers();
    }, [authorized, fetchUsers]);

    const handleToggleBan = async (user: AdminUser) => {
        setProcessingId(user._id);
        try {
            const updated = user.banned ? await unbanUser(user._id) : await banUser(user._id);
            setUsers((prev) => prev.map((u) => (u._id === user._id ? updated : u)));
            toast.success(user.banned ? 'User unbanned.' : 'User banned.');
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Failed to update user.');
        } finally {
            setProcessingId(null);
        }
    };

    if (authorized === null) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-[#B75D3E]/30 border-t-[#B75D3E] rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Manage Users</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    View all buyers and sellers, and ban accounts that violate platform rules.
                </p>

                <div className="flex items-center gap-1 border-b border-[#E4D9C7] dark:border-gray-800 mb-6">
                    {TABS.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${activeTab === tab.value
                                ? 'text-[#B75D3E] dark:text-[#E08B5E]'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.value && (
                                <motion.div
                                    layoutId="user-tab-underline"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B75D3E] dark:bg-[#E08B5E]"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="w-8 h-8 border-2 border-[#B75D3E]/30 border-t-[#B75D3E] rounded-full animate-spin" />
                    </div>
                ) : users.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl">
                        <UsersIcon className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">No users found.</p>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-[#E4D9C7] dark:border-gray-800 text-left">
                                        <th className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400">User</th>
                                        <th className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Role</th>
                                        <th className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Joined</th>
                                        <th className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                                        <th className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => {
                                        const RoleIcon = ROLE_ICON[user.role];
                                        return (
                                            <tr key={user._id} className="border-b border-[#E4D9C7] dark:border-gray-800 last:border-0">
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={
                                                                user.image ||
                                                                `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=B75D3E&color=fff&size=32`
                                                            }
                                                            alt={user.name}
                                                            className="w-8 h-8 rounded-full object-cover shrink-0"
                                                        />
                                                        <div className="min-w-0">
                                                            <p className="font-medium text-gray-900 dark:text-gray-100 truncate">{user.name}</p>
                                                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 capitalize">
                                                        <RoleIcon className="w-3.5 h-3.5" />
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3 text-gray-500 dark:text-gray-400">
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span
                                                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${user.banned
                                                            ? 'bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400'
                                                            : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                                                            }`}
                                                    >
                                                        {user.banned ? 'Banned' : 'Active'}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3 text-right">
                                                    {user.role !== 'admin' && (
                                                        <button
                                                            onClick={() => handleToggleBan(user)}
                                                            disabled={processingId === user._id}
                                                            className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg disabled:opacity-50 transition-colors ${user.banned
                                                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                                                                : 'bg-red-500 hover:bg-red-600 text-white'
                                                                }`}
                                                        >
                                                            {user.banned ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />}
                                                            {user.banned ? 'Unban' : 'Ban'}
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}