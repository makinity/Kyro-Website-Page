import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AppButton from '@/Components/shared/AppButton';
import { cn } from '@/lib/cn';

const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Gestures', href: '#gestures' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
                scrolled
                    ? 'bg-kyro-bg/90 backdrop-blur-md border-b border-kyro-border'
                    : 'bg-transparent',
            )}
        >
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <a href="/" className="flex items-center gap-2 group">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-kyro-cyan/10 border border-kyro-cyan/30 group-hover:shadow-cyan-sm transition-all">
                        <Zap size={16} className="text-kyro-cyan" />
                    </div>
                    <span className="font-heading text-lg font-bold text-kyro-primary">
                        Kyro<span className="text-kyro-cyan">Pad</span>
                    </span>
                </a>

                {/* Desktop nav */}
                <ul className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="text-sm text-kyro-muted transition-colors hover:text-kyro-cyan"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Desktop CTA */}
                <div className="hidden items-center gap-3 md:flex">
                    <AppButton variant="outline" size="sm" as="a" href="#pricing">
                        Get Pro — $4.99
                    </AppButton>
                </div>

                {/* Mobile menu toggle */}
                <button
                    className="text-kyro-muted hover:text-kyro-cyan md:hidden"
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-kyro-border bg-kyro-surface md:hidden"
                    >
                        <ul className="flex flex-col px-6 py-4 gap-4">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-kyro-muted hover:text-kyro-cyan"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <AppButton variant="primary" size="sm" as="a" href="#pricing" className="w-full justify-center">
                                    Get Pro — $4.99
                                </AppButton>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
