'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, X, Clock, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCurrentUser } from '@/lib/auth';
import { getAdminItems, approveItem, rejectItem } from '@/lib/actions/admin';
import { Item } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

type StatusTab = 'pending' | 'approved' | 'rejected' | 'all';

const TABS: { value: StatusTab; label: string }[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'all', label: 'All' },
];

export default function ManageItemsClient() {
    const router = useRouter();
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<StatusTab>('pending');
    const [processingId, setProcessingId] = useState<string | null>(null);

    useEffect(() => {
        const user = getCurrentUser();
        if (!user || user.role !== 'admin') {
            toast.error('Admin access only.');
            router.replace('/dashboard/user');
            return;
        }
        setAuthorized(true);
    }, [router]);

    const fetchItems = useCallback(async () => {
        setLoading(true);
        try {
            const results = await getAdminItems(activeTab);
            setItems(results);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load items.');
        } finally {
            setLoading(false);
        }
    }, [activeTab]);

    useEffect(() => {
        if (authorized) fetchItems();
    }, [authorized, fetchItems]);

    const handleApprove = async (id: string) => {
        setProcessingId(id);
        try {
            await approveItem(id);
            toast.success('Item approved and is now live.');
            setItems((prev) => prev.filter((i) => i._id !== id));
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Failed to approve item.');
        } finally {
            setProcessingId(null);
        }
    };

    const handleReject = async (id: string) => {
        setProcessingId(id);
        try {
            await rejectItem(id);
            toast.success('Item rejected.');
            setItems((prev) => prev.filter((i) => i._id !== id));
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Failed to reject item.');
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Manage Items</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Review and approve products submitted by sellers.
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
                                    layoutId="admin-tab-underline"
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
                ) : items.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl">
                        <Package className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">No {activeTab !== 'all' ? activeTab : ''} items found.</p>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-[#E4D9C7] dark:border-gray-800 text-left">
                                        <th className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Product</th>
                                        <th className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Seller</th>
                                        <th className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Category</th>
                                        <th className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Price</th>
                                        <th className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                                        <th className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item._id} className="border-b border-[#E4D9C7] dark:border-gray-800 last:border-0">
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#F5EFE6] dark:bg-gray-800">
                                                        <Image src={item.images[0]} alt={item.title} fill className="object-cover" />
                                                    </div>
                                                    <span className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1 max-w-[200px]">
                                                        {item.title}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 text-gray-600 dark:text-gray-300">{item.sellerName}</td>
                                            <td className="px-5 py-3 text-gray-600 dark:text-gray-300">{item.category}</td>
                                            <td className="px-5 py-3 font-medium text-gray-900 dark:text-gray-100">
                                                {formatPrice(item.price)}
                                            </td>
                                            <td className="px-5 py-3">
                                                <span
                                                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${item.status === 'approved'
                                                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                                                            : item.status === 'rejected'
                                                                ? 'bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400'
                                                                : 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
                                                        }`}
                                                >
                                                    {item.status === 'pending' && <Clock className="w-3 h-3" />}
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3">
                                                {item.status === 'pending' && (
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleApprove(item._id)}
                                                            disabled={processingId === item._id}
                                                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg disabled:opacity-50 transition-colors"
                                                        >
                                                            <Check className="w-3.5 h-3.5" />
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(item._id)}
                                                            disabled={processingId === item._id}
                                                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg disabled:opacity-50 transition-colors"
                                                        >
                                                            <X className="w-3.5 h-3.5" />
                                                            Reject
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}