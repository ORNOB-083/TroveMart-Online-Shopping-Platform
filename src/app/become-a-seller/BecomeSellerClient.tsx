'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Store, Clock, CheckCircle2, XCircle, LogOut, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCurrentUser, refreshSession, logout } from '@/lib/auth';
import { submitApplication, getMyApplication } from '@/lib/actions/sellerApplications';
import { SellerApplication } from '@/lib/types';

export default function BecomeSellerClient() {
    const router = useRouter();
    const [checking, setChecking] = useState(true);
    const [application, setApplication] = useState<SellerApplication | null>(null);
    const [isSeller, setIsSeller] = useState(false);

    const [businessName, setBusinessName] = useState('');
    const [businessDescription, setBusinessDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const user = getCurrentUser();
        if (!user) {
            router.replace('/login?redirect=/become-a-seller');
            return;
        }
        if (user.role === 'seller' || user.role === 'admin') {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsSeller(true);
            setChecking(false);
            return;
        }

        getMyApplication()
            .then(setApplication)
            .catch(() => toast.error('Failed to check application status.'))
            .finally(() => setChecking(false));
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!businessName.trim() || !businessDescription.trim() || !phone.trim()) {
            toast.error('Please fill in all fields.');
            return;
        }

        setSubmitting(true);
        try {
            const app = await submitApplication({
                businessName: businessName.trim(),
                businessDescription: businessDescription.trim(),
                phone: phone.trim(),
            });
            setApplication(app);
            toast.success('Application submitted! We\'ll review it shortly.');
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Failed to submit application.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleRefreshSession = async () => {
        setRefreshing(true);
        const updatedUser = await refreshSession();
        setRefreshing(false);

        if (updatedUser?.role === 'seller') {
            toast.success('Your account is now a seller account!');
            router.push('/dashboard/seller');
        } else {
            toast.error('Could not refresh automatically — please log out and log back in.');
        }
    };

    const handleLogoutAndBack = () => {
        logout();
        router.push('/login?redirect=/become-a-seller');
    };

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5EFE6] dark:bg-[#0f1117]">
                <div className="w-8 h-8 border-2 border-[#B75D3E]/30 border-t-[#B75D3E] rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5EFE6] dark:bg-[#0f1117] transition-colors duration-300 py-16 px-4">
            <div className="max-w-xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

                    {isSeller && (
                        <div className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-8 text-center">
                            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                You&apos;re already a seller!
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                Head to your seller dashboard to start listing products.
                            </p>
                            <Link
                                href="/dashboard/seller"
                                className="inline-flex px-6 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#B75D3E] to-[#E08B5E]"
                            >
                                Go to Seller Dashboard
                            </Link>
                        </div>
                    )}

                    {!isSeller && application?.status === 'pending' && (
                        <div className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-8 text-center">
                            <Clock className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                Application Under Review
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                We&apos;ve received your application for <strong>{application.businessName}</strong>.
                                An admin will review it shortly — check back here for updates.
                            </p>
                        </div>
                    )}

                    {!isSeller && application?.status === 'approved' && (
                        <div className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-8 text-center">
                            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                Congratulations — You&apos;re Approved!
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                Your seller account is ready. Click below to activate your seller tools.
                            </p>
                            <button
                                onClick={handleRefreshSession}
                                disabled={refreshing}
                                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] disabled:opacity-60 mb-3"
                            >
                                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                                {refreshing ? 'Activating...' : 'Activate Seller Tools'}
                            </button>
                            <p className="text-xs text-gray-400 mb-3">
                                If that doesn&apos;t work, log out and log back in to refresh your account.
                            </p>
                            <button
                                onClick={handleLogoutAndBack}
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#B75D3E] dark:text-[#E08B5E] hover:underline"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                                Log Out & Log Back In
                            </button>
                        </div>
                    )}

                    {!isSeller && application?.status === 'rejected' && (
                        <div className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-8 text-center mb-6">
                            <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
                            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                Application Not Approved
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Your previous application wasn&apos;t approved. You&apos;re welcome to apply again below.
                            </p>
                        </div>
                    )}

                    {!isSeller && (!application || application.status === 'rejected') && (
                        <div className="bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-2xl p-8">
                            <div className="text-center mb-6">
                                <div className="w-12 h-12 mx-auto rounded-xl bg-[#B75D3E]/10 dark:bg-[#E08B5E]/10 flex items-center justify-center mb-3">
                                    <Store className="w-6 h-6 text-[#B75D3E] dark:text-[#E08B5E]" />
                                </div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                    Become a Seller on TrovéMart
                                </h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Tell us about your business — we&apos;ll review and get back to you.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                                        Business / Store Name
                                    </label>
                                    <input
                                        type="text"
                                        value={businessName}
                                        onChange={(e) => setBusinessName(e.target.value)}
                                        placeholder="e.g. Willow & Clay Studio"
                                        className="w-full px-3.5 py-2.5 text-sm bg-[#F9F5EF] dark:bg-gray-800/60 border border-[#E4D9C7] dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-[#B75D3E] transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                                        What will you sell?
                                    </label>
                                    <textarea
                                        value={businessDescription}
                                        onChange={(e) => setBusinessDescription(e.target.value)}
                                        rows={4}
                                        placeholder="Tell us about the products you plan to list..."
                                        className="w-full px-3.5 py-2.5 text-sm bg-[#F9F5EF] dark:bg-gray-800/60 border border-[#E4D9C7] dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-[#B75D3E] transition-colors resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="e.g. 01700-000000"
                                        className="w-full px-3.5 py-2.5 text-sm bg-[#F9F5EF] dark:bg-gray-800/60 border border-[#E4D9C7] dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-[#B75D3E] transition-colors"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] shadow-lg shadow-[#B75D3E]/25 disabled:opacity-60 transition-all"
                                >
                                    {submitting ? 'Submitting...' : 'Submit Application'}
                                </button>
                            </form>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}