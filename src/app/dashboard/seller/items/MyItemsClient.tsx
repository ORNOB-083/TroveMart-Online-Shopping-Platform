'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, XCircle, PlusCircle, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCurrentUser } from '@/lib/auth';
import { getMyItems } from '@/lib/actions/items';
import { Item } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

const STATUS_CONFIG = {
    pending: { label: 'Pending Review', icon: Clock, className: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' },
    approved: { label: 'Approved', icon: CheckCircle2, className: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' },
    rejected: { label: 'Rejected', icon: XCircle, className: 'bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400' },
};

export default function MyItemsClient() {
    const router = useRouter();
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = getCurrentUser();
        if (!user || (user.role !== 'seller' && user.role !== 'admin')) {
            toast.error('Only sellers can view this page.');
            router.replace('/dashboard/user');
            return;
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAuthorized(true);
    }, [router]);

    useEffect(() => {
        if (!authorized) return;
        getMyItems()
            .then(setItems)
            .catch(() => toast.error('Failed to load your items.'))
            .finally(() => setLoading(false));
    }, [authorized]);

    if (authorized === null || loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-[#B75D3E]/30 border-t-[#B75D3E] rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">My Items</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Track the approval status of everything you&apos;ve listed.
                        </p>
                    </div>
                    <Link
                        href="/dashboard/seller/add"
                        className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] shadow-md shadow-[#B75D3E]/25 hover:shadow-[#B75D3E]/40 transition-all"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Add Item
                    </Link>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl">
                        <Package className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">You haven&apos;t listed any items yet.</p>
                        <Link
                            href="/dashboard/seller/add"
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#B75D3E] to-[#E08B5E]"
                        >
                            <PlusCircle className="w-4 h-4" />
                            List Your First Item
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {items.map((item, i) => {
                            const statusInfo = STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG];
                            return (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl overflow-hidden"
                                >
                                    <div className="relative aspect-video bg-[#F5EFE6] dark:bg-gray-800">
                                        <Image src={item.images[0]} alt={item.title} fill className="object-cover" />
                                        <span
                                            className={`absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${statusInfo.className}`}
                                        >
                                            <statusInfo.icon className="w-3 h-3" />
                                            {statusInfo.label}
                                        </span>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 mb-1">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                                                {formatPrice(item.price)}
                                            </span>
                                            <span className="text-xs text-gray-400">{item.quantity} in stock</span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </motion.div>
        </div>
    );
}