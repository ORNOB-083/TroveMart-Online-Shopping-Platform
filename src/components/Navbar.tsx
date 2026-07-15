'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sun,
    Moon,
    ChevronDown,
    LayoutDashboard,
    LogOut,
    ShoppingCart,
    User as UserIcon,
    Store,
    PlusCircle,
    LayoutGrid,
    Sparkles,
    LucideIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getCurrentUser, logout as logoutUser, AuthUser } from '@/lib/auth';

type Role = 'user' | 'seller' | 'admin';

interface RoleConfig {
    label: string;
    color: string;
    icon: LucideIcon;
}

const ROLE_CONFIG: Record<Role, RoleConfig> = {
    user: { label: 'Buyer', color: 'from-[#B75D3E] to-[#E08B5E]', icon: UserIcon },
    seller: { label: 'Seller', color: 'from-emerald-500 to-teal-500', icon: Store },
    admin: { label: 'Admin', color: 'from-rose-500 to-red-500', icon: Sparkles },
};

const DASHBOARD_LINKS: Record<Role, string> = {
    user: '/dashboard/user',
    seller: '/dashboard/seller',
    admin: '/dashboard/admin',
};

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const [isDark, setIsDark] = useState<boolean>(false);
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [user, setUser] = useState<AuthUser | null>(null);

    const role: Role = user?.role || 'user';
    const roleConfig = ROLE_CONFIG[role];
    const isSeller = role === 'seller';

    useEffect(() => {
        const syncUser = () => setUser(getCurrentUser());
        syncUser();

        const handleAuthChange = () => syncUser();
        window.addEventListener('trovemart:auth-change', handleAuthChange);
        window.addEventListener('storage', handleAuthChange);

        return () => {
            window.removeEventListener('trovemart:auth-change', handleAuthChange);
            window.removeEventListener('storage', handleAuthChange);
        };
    }, [pathname]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    const toggleTheme = useCallback(() => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('trovemart-theme', next ? 'dark' : 'light');
    }, [isDark]);

    const handleLogout = () => {
        logoutUser();
        setUser(null);
        setDropdownOpen(false);
        setMobileOpen(false);
        toast.success('Signed out successfully.');
        router.push('/');
    };

    const isActiveLink = (href: string): boolean => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Explore', href: '/items' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    const isHeroTransparent = isDark && pathname === '/' && !scrolled;

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isHeroTransparent
                    ? 'bg-transparent border-b border-white/10'
                    : 'bg-[#F5EFE6]/90 dark:bg-[#0f1117]/90 backdrop-blur-xl border-b border-[#E4D9C7] dark:border-gray-800 shadow-sm'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-2.5 shrink-0">
                            <Image
                                src="/logo.png"
                                alt="TrovéMart"
                                width={34}
                                height={34}
                                className="rounded-lg object-contain"
                                priority
                            />
                            <span className="text-2xl font-bold tracking-tight flex items-center gap-0">
                                <span
                                    className={
                                        isDark
                                            ? 'text-white'
                                            : 'bg-linear-to-r from-[#B75D3E] to-[#E08B5E] bg-clip-text text-transparent'
                                    }
                                >
                                    Trové
                                </span>
                                <span
                                    className={
                                        isDark
                                            ? 'bg-linear-to-r from-[#B75D3E] to-[#E08B5E] bg-clip-text text-transparent'
                                            : 'text-gray-900'
                                    }
                                >
                                    Mart
                                </span>
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8 mx-6">
                            {navLinks.map((link) => {
                                const active = isActiveLink(link.href);
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`relative py-2 text-sm font-medium transition-colors duration-200 group ${active
                                            ? 'text-[#B75D3E] dark:text-[#E08B5E]'
                                            : isHeroTransparent
                                                ? 'text-white/80 hover:text-white'
                                                : 'text-gray-700 dark:text-gray-300 hover:text-[#B75D3E] dark:hover:text-[#E08B5E]'
                                            }`}
                                    >
                                        {link.name}
                                        <span
                                            className={`absolute bottom-0 left-0 h-0.5 bg-[#B75D3E] dark:bg-[#E08B5E] transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'
                                                }`}
                                        />
                                    </Link>
                                );
                            })}

                            {/* {isSeller && (
                                <>
                                    <Link
                                        href="/items/add"
                                        className={`relative py-2 text-sm font-medium transition-colors duration-200 group ${pathname === '/items/add'
                                            ? 'text-[#B75D3E] dark:text-[#E08B5E]'
                                            : isHeroTransparent
                                                ? 'text-white/80 hover:text-white'
                                                : 'text-gray-700 dark:text-gray-300 hover:text-[#B75D3E] dark:hover:text-[#E08B5E]'
                                            }`}
                                    >
                                        <span className="flex items-center gap-1.5">
                                            <PlusCircle className="w-4 h-4" />
                                            Add Item
                                        </span>
                                        <span
                                            className={`absolute bottom-0 left-0 h-0.5 bg-[#B75D3E] dark:bg-[#E08B5E] transition-all duration-300 ${pathname === '/items/add' ? 'w-full' : 'w-0 group-hover:w-full'
                                                }`}
                                        />
                                    </Link>
                                    <Link
                                        href="/items/manage"
                                        className={`relative py-2 text-sm font-medium transition-colors duration-200 group ${pathname === '/items/manage'
                                            ? 'text-[#B75D3E] dark:text-[#E08B5E]'
                                            : isHeroTransparent
                                                ? 'text-white/80 hover:text-white'
                                                : 'text-gray-700 dark:text-gray-300 hover:text-[#B75D3E] dark:hover:text-[#E08B5E]'
                                            }`}
                                    >
                                        <span className="flex items-center gap-1.5">
                                            <LayoutGrid className="w-4 h-4" />
                                            My Items
                                        </span>
                                        <span
                                            className={`absolute bottom-0 left-0 h-0.5 bg-[#B75D3E] dark:bg-[#E08B5E] transition-all duration-300 ${pathname === '/items/manage' ? 'w-full' : 'w-0 group-hover:w-full'
                                                }`}
                                        />
                                    </Link>
                                </>
                            )} */}
                        </div>

                        <div className="hidden md:flex items-center gap-3">
                            <Link
                                href="/cart"
                                aria-label="View cart"
                                className={`p-2 rounded-full transition-all duration-200 ${isHeroTransparent
                                    ? 'text-white/90 hover:text-white hover:bg-white/20'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-[#E4D9C7]/60 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <ShoppingCart className="w-4.5 h-4.5" />
                            </Link>

                            <button
                                onClick={toggleTheme}
                                aria-label="Toggle theme"
                                className={`p-2 rounded-full transition-all duration-200 ${isHeroTransparent
                                    ? 'text-white/90 hover:text-white hover:bg-white/20'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-[#E4D9C7]/60 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.span
                                        key={isDark ? 'sun' : 'moon'}
                                        initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                        exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                                        transition={{ duration: 0.2 }}
                                        className="block"
                                    >
                                        {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
                                    </motion.span>
                                </AnimatePresence>
                            </button>

                            {!user ? (
                                <>
                                    <Link
                                        href="/login"
                                        className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${isHeroTransparent
                                            ? 'text-white hover:bg-white/20'
                                            : 'text-gray-700 dark:text-gray-200 hover:text-[#B75D3E] dark:hover:text-[#E08B5E] hover:bg-[#E4D9C7]/60 dark:hover:bg-gray-800'
                                            }`}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="px-6 py-2.5 text-sm font-semibold text-white rounded-xl bg-linear-to-r from-[#B75D3E] to-[#E08B5E] shadow-lg shadow-[#B75D3E]/30 hover:shadow-[#B75D3E]/50 hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out ring-1 ring-[#B75D3E]/20 hover:ring-[#B75D3E]/40"
                                    >
                                        Register
                                    </Link>
                                </>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={() => setDropdownOpen((prev) => !prev)}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 ${isHeroTransparent
                                            ? 'border-white/20 bg-white/10 hover:bg-white/20'
                                            : 'border-[#E4D9C7] dark:border-gray-700 bg-white/60 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        <img
                                            src={
                                                user.image ||
                                                `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=B75D3E&color=fff&size=32`
                                            }
                                            alt={user.name}
                                            className="w-7 h-7 rounded-full object-cover"
                                        />
                                        <span
                                            className={`text-sm font-medium max-w-20 truncate ${isHeroTransparent ? 'text-white' : 'text-gray-700 dark:text-gray-200'
                                                }`}
                                        >
                                            {user.name?.split(' ')[0]}
                                        </span>
                                        <ChevronDown
                                            className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''} ${isHeroTransparent ? 'text-white/70' : 'text-gray-400'
                                                }`}
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {dropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden z-50"
                                            >
                                                <div className="px-4 py-3 border-b border-[#E4D9C7] dark:border-gray-800">
                                                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                                    <span
                                                        className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-linear-to-r ${roleConfig.color} text-white`}
                                                    >
                                                        {roleConfig.label}
                                                    </span>
                                                </div>
                                                <div className="p-1.5">
                                                    <Link
                                                        href={DASHBOARD_LINKS[role]}
                                                        onClick={() => setDropdownOpen(false)}
                                                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-[#F5EFE6] dark:hover:bg-gray-800 hover:text-[#B75D3E] dark:hover:text-[#E08B5E] rounded-xl transition-all"
                                                    >
                                                        <LayoutDashboard className="w-4 h-4" />
                                                        Dashboard
                                                    </Link>
                                                    <Link
                                                        href={`${DASHBOARD_LINKS[role]}/profile`}
                                                        onClick={() => setDropdownOpen(false)}
                                                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-[#F5EFE6] dark:hover:bg-gray-800 hover:text-[#B75D3E] dark:hover:text-[#E08B5E] rounded-xl transition-all"
                                                    >
                                                        <UserIcon className="w-4 h-4" />
                                                        My Profile
                                                    </Link>
                                                    {role === 'user' && (
                                                        <Link
                                                            href="/become-a-seller"
                                                            onClick={() => setDropdownOpen(false)}
                                                            className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-[#F5EFE6] dark:hover:bg-gray-800 hover:text-[#B75D3E] dark:hover:text-[#E08B5E] rounded-xl transition-all"
                                                        >
                                                            <Store className="w-4 h-4" />
                                                            Become a Seller
                                                        </Link>
                                                    )}
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
                                                    >
                                                        <LogOut className="w-4 h-4" />
                                                        Sign Out
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>

                        <div className="md:hidden flex items-center gap-2">
                            <Link
                                href="/cart"
                                aria-label="View cart"
                                className={`p-2 rounded-full transition-colors ${isHeroTransparent
                                    ? 'text-white hover:bg-white/20'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-[#E4D9C7]/60 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <ShoppingCart className="w-4 h-4" />
                            </Link>

                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-full transition-colors ${isHeroTransparent
                                    ? 'text-white hover:bg-white/20'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-[#E4D9C7]/60 dark:hover:bg-gray-800'
                                    }`}
                            >
                                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </button>

                            {user && (
                                <img
                                    src={
                                        user.image ||
                                        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=B75D3E&color=fff&size=32`
                                    }
                                    alt={user.name}
                                    className="w-8 h-8 rounded-full object-cover border-2 border-[#B75D3E]/30"
                                />
                            )}

                            <button
                                onClick={() => setMobileOpen((prev) => !prev)}
                                className={`p-2 rounded-full transition-colors ${isHeroTransparent
                                    ? 'text-white hover:bg-white/20'
                                    : 'text-gray-600 dark:text-gray-200 hover:bg-[#E4D9C7]/60 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                                    <span
                                        className={`w-5 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''
                                            }`}
                                    />
                                    <span
                                        className={`w-5 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
                                    />
                                    <span
                                        className={`w-5 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''
                                            }`}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="md:hidden bg-[#F5EFE6] dark:bg-[#0f1117] border-t border-[#E4D9C7] dark:border-gray-800 shadow-lg overflow-hidden"
                        >
                            <div className="px-4 py-5 space-y-2">
                                {user && (
                                    <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                                        <img
                                            src={
                                                user.image ||
                                                `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=B75D3E&color=fff&size=32`
                                            }
                                            alt={user.name}
                                            className="w-9 h-9 rounded-full object-cover"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                        </div>
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-xs font-medium bg-linear-to-r ${roleConfig.color} text-white`}
                                        >
                                            {roleConfig.label}
                                        </span>
                                    </div>
                                )}

                                {navLinks.map((link) => {
                                    const active = isActiveLink(link.href);
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={`block px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${active
                                                ? 'bg-[#B75D3E]/10 text-[#B75D3E] dark:text-[#E08B5E] border-l-4 border-[#B75D3E]'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800'
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    );
                                })}

                                {isSeller && (
                                    <>
                                        <Link
                                            href="/items/add"
                                            onClick={() => setMobileOpen(false)}
                                            className="block px-4 py-3 text-sm font-medium rounded-xl text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800"
                                        >
                                            <span className="flex items-center gap-2">
                                                <PlusCircle className="w-4 h-4" />
                                                Add Item
                                            </span>
                                        </Link>
                                        <Link
                                            href="/items/manage"
                                            onClick={() => setMobileOpen(false)}
                                            className="block px-4 py-3 text-sm font-medium rounded-xl text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800"
                                        >
                                            <span className="flex items-center gap-2">
                                                <LayoutGrid className="w-4 h-4" />
                                                My Items
                                            </span>
                                        </Link>
                                    </>
                                )}

                                {user && role === 'user' && (
                                    <Link
                                        href="/become-a-seller"
                                        onClick={() => setMobileOpen(false)}
                                        className="block px-4 py-3 text-sm font-medium rounded-xl text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800"
                                    >
                                        Become a Seller
                                    </Link>
                                )}

                                {user && (
                                    <Link
                                        href={DASHBOARD_LINKS[role]}
                                        onClick={() => setMobileOpen(false)}
                                        className="block px-4 py-3 text-sm font-medium rounded-xl text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800"
                                    >
                                        Dashboard
                                    </Link>
                                )}

                                <div className="pt-4 border-t border-[#E4D9C7] dark:border-gray-800 flex flex-col gap-2">
                                    {!user ? (
                                        <>
                                            <Link
                                                href="/login"
                                                onClick={() => setMobileOpen(false)}
                                                className="block w-full py-3 text-center text-sm font-medium rounded-xl bg-white/60 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                href="/register"
                                                onClick={() => setMobileOpen(false)}
                                                className="block w-full py-3 text-center text-sm font-semibold rounded-xl bg-linear-to-r from-[#B75D3E] to-[#E08B5E] text-white shadow-md"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    ) : (
                                        <button
                                            onClick={handleLogout}
                                            className="w-full py-3 text-center text-sm font-medium rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500"
                                        >
                                            Sign Out
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {dropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />}
        </>
    );
}