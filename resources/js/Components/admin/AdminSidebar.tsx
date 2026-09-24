import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Download, Tag, DollarSign, Zap, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { label: 'Dashboard',  href: '/admin',           icon: LayoutDashboard, routeName: 'admin.dashboard' },
    { label: 'Downloads',  href: '/admin/downloads',  icon: Download,         routeName: 'admin.downloads.index' },
    { label: 'Releases',   href: '/admin/releases',   icon: Tag,              routeName: 'admin.releases.index' },
    { label: 'Revenue',    href: '/admin/revenue',    icon: DollarSign,       routeName: 'admin.revenue.index' },
];

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
    const { url } = usePage();

    return (
        <div className="flex h-full flex-col bg-kyro-surface border-r border-kyro-border">
            {/* Logo */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-kyro-border">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-kyro-cyan/10 border border-kyro-cyan/30">
                        <Zap size={16} className="text-kyro-cyan" />
                    </div>
                    <div>
                        <span className="font-heading text-sm font-bold text-kyro-primary">
                            KyroPad
                        </span>
                        <span className="block text-[10px] text-kyro-muted">Admin Panel</span>
                    </div>
                </div>
                {onClose && (
                    <button onClick={onClose} className="text-kyro-muted hover:text-kyro-primary lg:hidden">
                        <X size={18} />
                    </button>
                )}
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = url.startsWith(item.href) &&
                            (item.href === '/admin' ? url === '/admin' || url === '/admin/' : true);

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className={cn(
                                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                                        active
                                            ? 'bg-kyro-cyan/10 text-kyro-cyan border border-kyro-cyan/20'
                                            : 'text-kyro-muted hover:bg-kyro-card hover:text-kyro-primary',
                                    )}
                                >
                                    <Icon size={16} className={active ? 'text-kyro-cyan' : 'text-kyro-subtle'} />
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Bottom: view site link */}
            <div className="px-3 pb-4 border-t border-kyro-border pt-4">
                <Link
                    href="/"
                    className="flex items-center gap-2 px-3 py-2 text-xs text-kyro-muted hover:text-kyro-cyan transition-colors rounded-lg hover:bg-kyro-card"
                >
                    ← View public site
                </Link>
            </div>
        </div>
    );
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    return (
        <>
            {/* Desktop sidebar */}
            <aside className="fixed left-0 top-0 hidden h-full w-64 lg:block z-30">
                <SidebarContent />
            </aside>

            {/* Mobile drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                            onClick={onClose}
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed left-0 top-0 z-50 h-full w-64 lg:hidden"
                        >
                            <SidebarContent onClose={onClose} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
