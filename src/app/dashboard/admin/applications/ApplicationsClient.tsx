'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, X, ClipboardList, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCurrentUser } from '@/lib/auth';
import { getAllApplications, approveApplication, rejectApplication } from '@/lib/actions/sellerApplications';
import { SellerApplication } from '@/lib/types';

type StatusTab = 'pending' | 'approved' | 'rejected' | 'all';

const TABS: { value: StatusTab; label: string }[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'all', label: 'All' },
];

export default function ApplicationsClient() {
    const router = useRouter();
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const [applications, setApplications] = useState<SellerApplication[]>([]);
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
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAuthorized(true);
    }, [router]);

    const fetchApplications = useCallback(async () => {
        setLoading(true);
        try {
            const results = await getAllApplications(activeTab);
            setApplications(results);
        } catch {
            toast.error('Failed to load applications.');
        } finally {
            setLoading(false);
        }
    }, [activeTab]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (authorized) fetchApplications();
    }, [authorized, fetchApplications]);

    const handleApprove = async (id: string) => {
        setProcessingId(id);
        try {
            await approveApplication(id);
            toast.success('Application approved — user is now a seller.');
            setApplications((prev) => prev.filter((a) => a._id !== id));
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Failed to approve application.');
        } finally {
            setProcessingId(null);
        }
    };

    const handleReject = async (id: string) => {
        setProcessingId(id);
        try {
            await rejectApplication(id);
            toast.success('Application rejected.');
            setApplications((prev) => prev.filter((a) => a._id !== id));
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Failed to reject application.');
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
        <div className="max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Seller Applications</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Review requests from buyers who want to start selling.
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
                                    layoutId="app-tab-underline"
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
                ) : applications.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl">
                        <ClipboardList className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">No {activeTab !== 'all' ? activeTab : ''} applications.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {applications.map((app) => (
                            <div
                                key={app._id}
                                className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-5"
                            >
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">{app.businessName}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                            Applied by {app.userName} &middot; {new Date(app.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span
                                        className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${app.status === 'approved'
                                                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                                                : app.status === 'rejected'
                                                    ? 'bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400'
                                                    : 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
                                            }`}
                                    >
                                        {app.status}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{app.businessDescription}</p>

                                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                                    <span className="flex items-center gap-1.5">
                                        <Mail className="w-3.5 h-3.5" />
                                        {app.userEmail}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Phone className="w-3.5 h-3.5" />
                                        {app.phone}
                                    </span>
                                </div>

                                {app.status === 'pending' && (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleApprove(app._id)}
                                            disabled={processingId === app._id}
                                            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg disabled:opacity-50 transition-colors"
                                        >
                                            <Check className="w-3.5 h-3.5" />
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(app._id)}
                                            disabled={processingId === app._id}
                                            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg disabled:opacity-50 transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}