// src/app/(auth)/register/RegisterForm.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, ShieldCheck, Truck, Store } from 'lucide-react';
import toast from 'react-hot-toast';
import { register } from '@/lib/auth';

const VALUE_PROPS = [
    { icon: ShieldCheck, text: 'Buyer protection on every order' },
    { icon: Truck, text: 'Fast shipping from trusted sellers' },
    { icon: Store, text: 'Start selling anytime, no fees to join' },
];

interface FormState {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
}

export default function RegisterForm() {
    const router = useRouter();

    const [formData, setFormData] = useState<FormState>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

        if (!formData.name.trim()) next.name = 'Full name is required.';
        else if (formData.name.trim().length < 2) next.name = 'Name is too short.';

        if (!formData.email.trim()) next.email = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = 'Enter a valid email address.';

        if (!formData.password) next.password = 'Password is required.';
        else if (formData.password.length < 6) next.password = 'Use at least 6 characters.';

        if (formData.confirmPassword !== formData.password) next.confirmPassword = 'Passwords do not match.';

        if (!agreedToTerms) next.terms = 'You must accept the Terms to continue.';

        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        try {
            await register(formData.name.trim(), formData.email.trim(), formData.password);
            toast.success('Welcome to TrovéMart! 🎉');
            router.push('/');
        } catch (err: any) {
            console.error(err);
            const message = err?.response?.data?.message || 'Something went wrong. Please try again.';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-[#F5EFE6] dark:bg-[#0f1117] relative overflow-hidden transition-colors duration-300">

            {/* Ambient background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#B75D3E]/10 dark:bg-[#B75D3E]/15 blur-[110px]" />
                <div className="absolute bottom-0 right-0 w-[26rem] h-[26rem] rounded-full bg-[#E08B5E]/15 dark:bg-[#E08B5E]/10 blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-4xl bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-800 rounded-3xl shadow-2xl shadow-[#B75D3E]/5 overflow-hidden flex flex-col md:flex-row"
            >
                {/* Left: form */}
                <div className="w-full md:w-3/5 p-8 sm:p-10">
                    <div className="mb-7">
                        <Link href="/" className="text-xl font-bold tracking-tight">
                            <span className="bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] bg-clip-text text-transparent">Trové</span>
                            <span className="text-gray-900 dark:text-gray-100">Mart</span>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-4 mb-1">
                            Create your account
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Join thousands shopping and selling on TrovéMart.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                        <div>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-2.5 bg-[#F9F5EF] dark:bg-gray-800/60 border rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.name
                                            ? 'border-red-400 focus:ring-red-400/30'
                                            : 'border-[#E4D9C7] dark:border-gray-700 focus:border-[#B75D3E] focus:ring-[#B75D3E]/30'
                                        }`}
                                />
                            </div>
                            {errors.name && <p className="text-xs text-red-500 mt-1 ml-1">{errors.name}</p>}
                        </div>

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

                        <div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-11 py-2.5 bg-[#F9F5EF] dark:bg-gray-800/60 border rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.confirmPassword
                                            ? 'border-red-400 focus:ring-red-400/30'
                                            : 'border-[#E4D9C7] dark:border-gray-700 focus:border-[#B75D3E] focus:ring-[#B75D3E]/30'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-xs text-red-500 mt-1 ml-1">{errors.confirmPassword}</p>
                            )}
                        </div>

                        <div>
                            <label className="flex items-start gap-2.5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={(e) => {
                                        setAgreedToTerms(e.target.checked);
                                        if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }));
                                    }}
                                    className="mt-0.5 w-4 h-4 rounded border-[#E4D9C7] dark:border-gray-700 text-[#B75D3E] focus:ring-[#B75D3E]/30"
                                />
                                <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                    I agree to TrovéMart&apos;s{' '}
                                    <Link href="/terms" className="text-[#B75D3E] dark:text-[#E08B5E] hover:underline">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link href="/privacy" className="text-[#B75D3E] dark:text-[#E08B5E] hover:underline">
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>
                            {errors.terms && <p className="text-xs text-red-500 mt-1 ml-1">{errors.terms}</p>}
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileTap={{ scale: 0.97 }}
                            className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] text-white font-semibold text-sm shadow-lg shadow-[#B75D3E]/25 hover:shadow-[#B75D3E]/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <p className="text-center text-gray-500 dark:text-gray-400 text-xs mt-6">
                        Already have an account?{' '}
                        <Link href="/login" className="text-[#B75D3E] dark:text-[#E08B5E] font-medium hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>

                {/* Right: value props panel */}
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
                            Everything you need, in one place.
                        </h2>
                        <p className="text-white/70 text-sm mb-8">
                            Fashion, electronics, home goods, handmade treasures — and thousands of sellers behind them.
                        </p>

                        <div className="space-y-4">
                            {VALUE_PROPS.map((item, i) => (
                                <motion.div
                                    key={item.text}
                                    initial={{ opacity: 0, x: 16 }}
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

                        <div className="mt-10 pt-6 border-t border-white/15 flex items-center gap-2 text-white/80 text-xs">
                            <Check className="w-4 h-4" />
                            No listing fees for your first 10 items
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}