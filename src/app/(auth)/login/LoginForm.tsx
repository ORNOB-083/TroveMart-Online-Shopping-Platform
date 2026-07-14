// src/app/(auth)/login/LoginForm.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Package, Heart, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { login } from '@/lib/auth';
import SocialLoginButtons from '@/components/SocialLoginButtons';

const VALUE_PROPS = [
    { icon: Package, text: 'Track every order in one place' },
    { icon: Heart, text: 'Save favorites across all categories' },
    { icon: Shield, text: 'Secure checkout, every time' },
];

interface FormState {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
}

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect') || '/';

    const [formData, setFormData] = useState<FormState>({ email: '', password: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const validate = (): boolean => {
        const next: FormErrors = {};
        if (!formData.email.trim()) next.email = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = 'Enter a valid email address.';
        if (!formData.password) next.password = 'Password is required.';

        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        try {
            await login(formData.email.trim(), formData.password);
            toast.success('Welcome back to TrovéMart! 🎉');
            router.push(redirectTo);
        } catch (err: any) {
            console.error(err);
            const message = err?.response?.data?.message || 'Invalid email or password.';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-[#F5EFE6] dark:bg-[#0f1117] relative overflow-hidden transition-colors duration-300">

            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#B75D3E]/10 dark:bg-[#B75D3E]/15 blur-[110px]" />
                <div className="absolute bottom-0 left-0 w-[26rem] h-[26rem] rounded-full bg-[#E08B5E]/15 dark:bg-[#E08B5E]/10 blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-4xl bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-3xl shadow-2xl shadow-[#B75D3E]/5 overflow-hidden flex flex-col md:flex-row"
            >
                <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-[#B75D3E] to-[#8F4530] p-10 flex-col justify-center relative overflow-hidden">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '22px 22px',
                        }}
                    />
                    <div className="relative z-10">
                        <h2 className="text-white text-2xl font-semibold mb-2 leading-snug">
                            Good to have you back.
                        </h2>
                        <p className="text-white/70 text-sm mb-8">
                            Pick up right where you left off — your orders, wishlist, and sellers are waiting.
                        </p>

                        <div className="space-y-4">
                            {VALUE_PROPS.map((item, i) => (
                                <motion.div
                                    key={item.text}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="shrink-0 w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                                        <item.icon className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm text-white/90">{item.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-3/5 p-8 sm:p-10">
                    <div className="mb-7">
                        <Link href="/" className="text-xl font-bold tracking-tight">
                            <span className="bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] bg-clip-text text-transparent">Trové</span>
                            <span className="text-gray-900 dark:text-gray-100">Mart</span>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-4 mb-1">
                            Welcome back
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Sign in to continue shopping on TrovéMart.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                        <div>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-2.5 bg-[#F9F5EF] dark:bg-gray-800/60 border rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.email
                                            ? 'border-red-400 focus:ring-red-400/30'
                                            : 'border-[#E4D9C7] dark:border-gray-700 focus:border-[#B75D3E] focus:ring-[#B75D3E]/30'
                                        }`}
                                />
                            </div>
                            {errors.email && <p className="text-xs text-red-500 mt-1 ml-1">{errors.email}</p>}
                        </div>

                        <div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-11 py-2.5 bg-[#F9F5EF] dark:bg-gray-800/60 border rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.password
                                            ? 'border-red-400 focus:ring-red-400/30'
                                            : 'border-[#E4D9C7] dark:border-gray-700 focus:border-[#B75D3E] focus:ring-[#B75D3E]/30'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-xs text-red-500 mt-1 ml-1">{errors.password}</p>}
                        </div>

                        <div className="flex justify-end">
                            <Link
                                href="/forgot-password"
                                className="text-xs text-[#B75D3E] dark:text-[#E08B5E] hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileTap={{ scale: 0.97 }}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] text-white font-semibold text-sm shadow-lg shadow-[#B75D3E]/25 hover:shadow-[#B75D3E]/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-[#E4D9C7] dark:bg-gray-700" />
                        <span className="text-gray-400 dark:text-gray-500 text-xs">Or continue with</span>
                        <div className="flex-1 h-px bg-[#E4D9C7] dark:bg-gray-700" />
                    </div>

                    <SocialLoginButtons />

                    <p className="text-center text-gray-500 dark:text-gray-400 text-xs mt-6">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-[#B75D3E] dark:text-[#E08B5E] font-medium hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}