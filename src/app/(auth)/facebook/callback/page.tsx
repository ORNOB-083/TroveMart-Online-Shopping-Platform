'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { loginWithFacebookCode } from '@/lib/auth';

function FacebookCallbackHandler() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const run = async () => {
            const code = searchParams.get('code');
            const state = searchParams.get('state');
            const error = searchParams.get('error');
            const savedState = sessionStorage.getItem('fb_oauth_state');
            sessionStorage.removeItem('fb_oauth_state');

            if (error) {
                toast.error('Facebook sign-in was cancelled.');
                router.replace('/login');
                return;
            }

            if (!code || !state || state !== savedState) {
                toast.error('Facebook sign-in failed. Please try again.');
                router.replace('/login');
                return;
            }

            try {
                const redirectUri = `${window.location.origin}/auth/facebook/callback`;
                await loginWithFacebookCode(code, redirectUri);
                toast.success('Signed in with Facebook!');
                router.replace('/');
            } catch (err) {
                console.error(err);
                toast.error('Facebook sign-in failed. Please try again.');
                router.replace('/login');
            }
        };

        run();
    }, [router, searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5EFE6] dark:bg-[#0f1117]">
            <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[#B75D3E]/30 border-t-[#B75D3E] rounded-full animate-spin" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Signing you in with Facebook...</p>
            </div>
        </div>
    );
}

export default function FacebookCallbackPage() {
    return (
        <Suspense fallback={null}>
            <FacebookCallbackHandler />
        </Suspense>
    );
}