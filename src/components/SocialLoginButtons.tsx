'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { FaFacebook } from 'react-icons/fa';
import { loginWithGoogle } from '@/lib/auth';

interface GoogleAccountButtonOptions {
    theme?: string;
    size?: string;
    width?: number | string;
    shape?: string;
    logo_alignment?: string;
}

interface GoogleAccountId {
    initialize: (config: { client_id?: string; callback: (response: { credential: string }) => void }) => void;
    renderButton: (element: HTMLElement, options: GoogleAccountButtonOptions) => void;
}

interface GoogleIdentityServices {
    accounts: {
        id: GoogleAccountId;
    };
}

declare global {
    interface Window {
        google?: GoogleIdentityServices;
    }
}

export default function SocialLoginButtons() {
    const router = useRouter();
    const googleWrapperRef = useRef<HTMLDivElement>(null);
    const googleBtnRef = useRef<HTMLDivElement>(null);

    const handleGoogleCredential = async (response: { credential: string }) => {
        try {
            await loginWithGoogle(response.credential);
            router.push('/');
        } catch {
            // toast handled by caller pages if needed; kept silent here to avoid duplicate toasts
        }
    };

    const initGoogleButton = () => {
        if (!window.google || !googleBtnRef.current || !googleWrapperRef.current) return;

        const width = Math.min(googleWrapperRef.current.offsetWidth, 400);

        window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            callback: handleGoogleCredential,
        });

        googleBtnRef.current.innerHTML = '';
        window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: 'outline',
            size: 'large',
            width,
            shape: 'pill',
            logo_alignment: 'center',
        });
    };

    useEffect(() => {
        if (window.google) initGoogleButton();
        const handleResize = () => initGoogleButton();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleFacebookLogin = () => {
        const redirectUri = `${window.location.origin}/auth/facebook/callback`;
        const state = Math.random().toString(36).substring(2);
        sessionStorage.setItem('fb_oauth_state', state);

        const params = new URLSearchParams({
            client_id: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '',
            redirect_uri: redirectUri,
            state,
            scope: 'email,public_profile',
            response_type: 'code',
        });

        window.location.href = `https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`;
    };

    return (
        <>
            <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={initGoogleButton} />

            <div className="flex flex-col gap-3 w-full">
                <div ref={googleWrapperRef} className="w-full">
                    <div ref={googleBtnRef} className="flex justify-center w-full" />
                </div>

                <button
                    type="button"
                    onClick={handleFacebookLogin}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#E4D9C7] dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                    <FaFacebook className="w-4 h-4 text-[#1877F2]" />
                    Continue with Facebook
                </button>
            </div>
        </>
    );
}