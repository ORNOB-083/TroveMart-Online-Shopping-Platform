'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
    Mail,
    Phone,
    MapPin,
    Send,
} from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Footer() {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.error('Please enter your email.');
            return;
        }
        toast.success('Subscribed! Welcome to the TrovéMart family.');
        setEmail('');
    };

    const year = new Date().getFullYear();

    return (
        <footer className="relative mt-16 bg-[#F5EFE6] dark:bg-[#0f1117] transition-colors duration-300 overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#B75D3E] to-transparent opacity-60 dark:opacity-80" />

            <div className="border-b border-[#E4D9C7] dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                Join the TrovéMart circle
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
                                New artisans, fresh finds, and stories from the workshop — straight to your inbox.
                            </p>
                        </div>
                        <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-1 px-5 py-3 text-sm rounded-full bg-white dark:bg-gray-800 border-2 border-[#E4D9C7] dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B75D3E]/40 focus:border-[#B75D3E] transition-all shadow-sm"
                            />
                            <button
                                type="submit"
                                className="shrink-0 flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] shadow-md shadow-[#B75D3E]/30 hover:shadow-lg hover:shadow-[#B75D3E]/40 hover:scale-105 transition-all duration-200"
                            >
                                <Send className="w-4 h-4" />
                                <span className="hidden sm:inline">Subscribe</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

                    <div>
                        <Link href="/" className="flex items-center gap-2.5 mb-4">
                            <Image
                                src="/logo.png"
                                alt="TrovéMart"
                                width={36}
                                height={36}
                                className="rounded-lg object-contain"
                            />
                            <span className="text-2xl font-bold tracking-tight">
                                <span className="bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] bg-clip-text text-transparent">
                                    Trové
                                </span>
                                <span className="text-gray-900 dark:text-gray-100">Mart</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
                            A marketplace for handmade treasures — pottery, textiles, and craft, made by real hands.
                        </p>
                        <div className="flex items-center gap-3 mt-5">
                            {[
                                { icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook' },
                                { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
                                { icon: FaTwitter, href: 'https://x.com', label: 'Twitter (X)' },
                            ].map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="p-2.5 rounded-full bg-white dark:bg-gray-800 border border-[#E4D9C7] dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gradient-to-r hover:from-[#B75D3E] hover:to-[#E08B5E] hover:text-white hover:border-transparent hover:shadow-md hover:scale-110 transition-all duration-200"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'Home', href: '/' },
                                { label: 'Explore', href: '/items' },
                                { label: 'Become a Seller', href: '/become-a-seller' },
                                { label: 'About Us', href: '/about' },
                                { label: 'Contact', href: '/contact' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#B75D3E] dark:hover:text-[#E08B5E] transition-colors duration-150 hover:translate-x-1 inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">
                            Get in Touch
                        </h4>
                        <ul className="space-y-3.5">
                            <li className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400">
                                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[#B75D3E] dark:text-[#E08B5E]" />
                                <a href="mailto:hello@trovemart.com" className="hover:text-[#B75D3E] dark:hover:text-[#E08B5E] transition-colors">
                                    hello@trovemart.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400">
                                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-[#B75D3E] dark:text-[#E08B5E]" />
                                <a href="tel:+8801700000000" className="hover:text-[#B75D3E] dark:hover:text-[#E08B5E] transition-colors">
                                    +880 1700-000000
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400">
                                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#B75D3E] dark:text-[#E08B5E]" />
                                <span>Dhaka, Bangladesh</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">
                            Support
                        </h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'Help Center', href: '/help' },
                                { label: 'Privacy Policy', href: '/privacy' },
                                { label: 'Terms of Service', href: '/terms' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#B75D3E] dark:hover:text-[#E08B5E] transition-colors duration-150 hover:translate-x-1 inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="relative border-t border-[#E4D9C7] dark:border-gray-800">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B75D3E]/40 to-transparent" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        &copy; {year} TrovéMart. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                        <span className="hidden sm:inline">Crafted with</span>
                        <span className="text-red-400 dark:text-red-500">❤️</span>
                        <span className="hidden sm:inline">for makers everywhere.</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}