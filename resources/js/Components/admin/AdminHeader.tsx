import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, LogOut, User } from 'lucide-react';
import { router } from '@inertiajs/react';

interface AdminHeaderProps {
    onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
    const { auth } = usePage().props as { auth: { user: { name: string; email: string } } };

    const logout = () => {
        router.post(route('logout'));
    };

    return (
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-kyro-border bg-kyro-bg/90 backdrop-blur-sm px-6 py-4">
            {/* Mobile menu toggle */}
            <button
                onClick={onMenuClick}
                className="text-kyro-muted hover:text-kyro-primary lg:hidden"
                aria-label="Open sidebar"
            >
                <Menu size={20} />
            </button>

            {/* Spacer (desktop) */}
            <div className="hidden lg:block" />

            {/* Right side: user + logout */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-kyro-cyan/10 border border-kyro-cyan/20">
                        <User size={13} className="text-kyro-cyan" />
                    </div>
                    <span className="hidden text-kyro-muted sm:block">
                        {auth?.user?.name ?? 'Admin'}
                    </span>
                </div>

                <button
                    onClick={logout}
                    className="flex items-center gap-1.5 text-sm text-kyro-muted hover:text-kyro-danger transition-colors"
                    title="Log out"
                >
                    <LogOut size={15} />
                    <span className="hidden sm:block">Logout</span>
                </button>
            </div>
        </header>
    );
}
