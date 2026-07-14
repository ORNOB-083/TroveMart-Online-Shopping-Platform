'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser, AuthUser } from '@/lib/auth';
import DashboardSidebar from '@/components/DashboardSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    const [user, setUser] = useState<AuthUser | null | undefined>(undefined); // undefined = still checking

    useEffect(() => {
        const syncUser = () => {
            const current = getCurrentUser();
            if (!current) {
                router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
                return;
            }
            setUser(current);
        };

        syncUser();

        const handleAuthChange = () => syncUser();
        window.addEventListener('trovemart:auth-change', handleAuthChange);
        window.addEventListener('storage', handleAuthChange);

        return () => {
            window.removeEventListener('trovemart:auth-change', handleAuthChange);
            window.removeEventListener('storage', handleAuthChange);
        };
    }, [pathname, router]);

    if (user === undefined) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-[#F5EFE6] dark:bg-[#0f1117]">
                <div className="w-8 h-8 border-2 border-[#B75D3E]/30 border-t-[#B75D3E] rounded-full animate-spin" />
            </div>
        );
    }

    if (!user) return null; 

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-[#F5EFE6] dark:bg-[#0f1117] transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex">
                <DashboardSidebar user={user} />

                {/* Content */}
                <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 pt-20 md:pt-8">{children}</main>
            </div>
        </div>
    );
}