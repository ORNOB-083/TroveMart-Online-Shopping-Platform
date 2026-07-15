'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
    LayoutDashboard,
    User,
    Package,
    Heart,
    Star,
    RotateCcw,
    PlusCircle,
    LayoutGrid,
    Users,
    Boxes,
    ClipboardCheck,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Shield,
    Store,
    Menu,
    X,
    LucideIcon,
} from 'lucide-react';
import { logout, AuthUser } from '@/lib/auth';

type Role = 'user' | 'seller' | 'admin';

interface NavItem {
    label: string;
    href: string;
    icon: LucideIcon;
}

const NAV_LINKS: Record<Role, NavItem[]> = {
    user: [
        { label: 'Overview', href: '/dashboard/user', icon: LayoutDashboard },
        { label: 'Manage My Profile', href: '/dashboard/user/profile', icon: User },
        { label: 'My Orders', href: '/dashboard/user/orders', icon: Package },
        { label: 'My Wishlist & Followed Stores', href: '/dashboard/user/wishlist', icon: Heart },
        { label: 'My Reviews', href: '/dashboard/user/reviews', icon: Star },
        /* { label: 'My Returns & Cancellations', href: '/dashboard/user/returns', icon: RotateCcw }, */
    ],
    seller: [
        { label: 'Overview', href: '/dashboard/seller', icon: LayoutDashboard },
        { label: 'My Profile', href: '/dashboard/seller/profile', icon: User },
        { label: 'Add Item', href: '/dashboard/seller/add', icon: PlusCircle },
        { label: 'My Items', href: '/dashboard/seller/items', icon: LayoutGrid },
    ],
    admin: [
        { label: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
        { label: 'My Profile', href: '/dashboard/admin/profile', icon: User },
        { label: 'Manage Users', href: '/dashboard/admin/users', icon: Users },
        { label: 'Manage Items', href: '/dashboard/admin/items', icon: Boxes },
        { label: 'Seller Applications', href: '/dashboard/admin/applications', icon: ClipboardCheck },
    ],
};

const ROLE_CONFIG: Record<Role, { label: string; color: string; icon: LucideIcon }> = {
    user: { label: 'Buyer', color: 'from-[#B75D3E] to-[#E08B5E]', icon: User },
    seller: { label: 'Seller', color: 'from-emerald-500 to-teal-500', icon: Store },
    admin: { label: 'Admin', color: 'from-rose-500 to-red-500', icon: Shield },
};

interface DashboardSidebarProps {
    user: AuthUser;
}

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const role = (user.role || 'user') as Role;
    const links = NAV_LINKS[role];
    const roleConfig = ROLE_CONFIG[role];
    const RoleIcon = roleConfig.icon;

    const handleLogout = () => {
        logout();
        toast.success('Signed out successfully.');
        router.push('/');
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full">

            <div className={`flex items-center justify-between p-4 border-b border-[#E4D9C7] dark:border-gray-800 ${isCollapsed ? 'px-3' : ''}`}>
                {!isCollapsed && (
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-lg font-bold">
                            <span className="bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] bg-clip-text text-transparent">Trové</span>
                            <span className="text-gray-900 dark:text-gray-100">Mart</span>
                        </span>
                    </Link>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden lg:flex w-8 h-8 rounded-lg bg-[#F5EFE6] dark:bg-gray-800 items-center justify-center text-gray-500 hover:text-[#B75D3E] dark:hover:text-[#E08B5E] transition-colors ml-auto"
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
            </div>

            <div className={`p-4 border-b border-[#E4D9C7] dark:border-gray-800 ${isCollapsed ? 'px-3' : ''}`}>
                <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                    <div className="relative flex-shrink-0">
                        <img
                            src={
                                user.image ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'U')}&background=B75D3E&color=fff&size=40`
                            }
                            alt={user.name}
                            className="w-10 h-10 rounded-xl object-cover border-2 border-[#E4D9C7] dark:border-gray-700"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r ${roleConfig.color} flex items-center justify-center`}>
                            <RoleIcon className="w-2.5 h-2.5 text-white" />
                        </div>
                    </div>
                    {!isCollapsed && (
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                                {user.name}
                            </p>
                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                            <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${roleConfig.color} text-white`}>
                                {roleConfig.label}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${isActive
                                    ? 'bg-gradient-to-r from-[#B75D3E] to-[#E08B5E] text-white shadow-md shadow-[#B75D3E]/20'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-[#F5EFE6] dark:hover:bg-gray-800 hover:text-[#B75D3E] dark:hover:text-[#E08B5E]'
                                } ${isCollapsed ? 'justify-center px-2' : ''}`}
                        >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            {!isCollapsed && <span>{link.label}</span>}

                            {isCollapsed && (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                    {link.label}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-3 border-t border-[#E4D9C7] dark:border-gray-800">
                <button
                    onClick={handleLogout}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all ${isCollapsed ? 'justify-center' : ''
                        }`}
                >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </div>
    );

    return (
        <>
            <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden fixed top-20 left-4 z-40 w-10 h-10 rounded-xl bg-white dark:bg-[#1a1d24] border border-[#E4D9C7] dark:border-gray-700 shadow-md flex items-center justify-center text-gray-600 dark:text-gray-300"
            >
                <Menu className="w-5 h-5" />
            </button>

            <aside
                className={`hidden lg:flex flex-col h-screen sticky top-0 bg-white dark:bg-[#1a1d24] border-r border-[#E4D9C7] dark:border-gray-800 shadow-sm transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'
                    }`}
            >
                {SidebarContent()}
            </aside>

            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                            onClick={() => setIsMobileOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed top-0 left-0 h-full w-72 bg-white dark:bg-[#1a1d24] border-r border-[#E4D9C7] dark:border-gray-800 shadow-xl z-50"
                        >
                            <button
                                onClick={() => setIsMobileOpen(false)}
                                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#F5EFE6] dark:bg-gray-800 flex items-center justify-center text-gray-500"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            {SidebarContent()}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}