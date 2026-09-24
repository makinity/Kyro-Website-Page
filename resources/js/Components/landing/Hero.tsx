import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Wifi, Monitor } from 'lucide-react';
import DownloadCTAs from './DownloadCTAs';
import QRCodeModal from '@/Components/shared/QRCodeModal';
import GlowBadge from '@/Components/shared/GlowBadge';

export default function Hero() {
    const [qrOpen, setQrOpen] = useState(false);

    return (
        <>
            <section className="relative overflow-hidden bg-kyro-bg pt-28 pb-24 md:pt-36 md:pb-32">
                {/* Grid background */}
                <div className="absolute inset-0 bg-grid opacity-60" />

                {/* Hero glow */}
                <div className="absolute inset-0 bg-hero-glow" />

                <div className="relative mx-auto max-w-7xl px-6">
                    <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-12">

                        {/* Left: Text content */}
                        <motion.div
                            className="flex-1 text-center lg:text-left"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                        >
                            {/* Eyebrow badge */}
                            <div className="mb-6 flex justify-center lg:justify-start">
                                <GlowBadge variant="cyan">
                                    <Zap size={10} />
                                    Free Download · No Account Required
                                </GlowBadge>
                            </div>

                            {/* Headline */}
                            <h1 className="font-heading text-4xl font-bold leading-tight text-kyro-primary md:text-5xl lg:text-6xl xl:text-7xl">
                                Turn Your Phone into a{' '}
                                <span className="text-kyro-cyan text-glow">
                                    High-Precision Trackpad
                                </span>
                                {', '}
                                Macro Deck{' & '}
                                <span className="text-kyro-cyan text-glow">
                                    Windows&nbsp;11 Display.
                                </span>
                            </h1>

                            {/* Subheadline */}
                            <p className="mt-6 max-w-xl text-lg text-kyro-muted lg:text-xl">
                                KyroPad transforms your smartphone into a precision laptop trackpad with
                                native Windows 11 gestures, a customizable macro launchpad, and an ultra-low
                                latency live screen mirror — all over local Wi-Fi with zero cloud dependency.
                            </p>

                            {/* Feature pills */}
                            <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
                                {[
                                    { icon: <Wifi size={12} />, label: '100% Offline' },
                                    { icon: <Zap size={12} />, label: '~20ms Latency' },
                                    { icon: <Monitor size={12} />, label: 'Windows 11' },
                                ].map((pill) => (
                                    <span
                                        key={pill.label}
                                        className="flex items-center gap-1.5 rounded-full border border-kyro-border bg-kyro-surface px-3 py-1 text-xs text-kyro-muted"
                                    >
                                        <span className="text-kyro-cyan">{pill.icon}</span>
                                        {pill.label}
                                    </span>
                                ))}
                            </div>

                            {/* CTAs */}
                            <div className="mt-10">
                                <DownloadCTAs onQrClick={() => setQrOpen(true)} />
                            </div>
                        </motion.div>

                        {/* Right: Phone mockup */}
                        <motion.div
                            className="relative flex-1 flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        >
                            {/* Glow rings */}
                            <div className="absolute h-80 w-80 rounded-full border border-kyro-cyan/10 animate-ping" style={{ animationDuration: '3s' }} />
                            <div className="absolute h-64 w-64 rounded-full border border-kyro-cyan/15" />

                            {/* Phone frame */}
                            <motion.div
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                                className="relative z-10"
                            >
                                <div className="relative h-[480px] w-[240px] rounded-[2.5rem] border-2 border-kyro-cyan/30 bg-kyro-card shadow-cyan-lg overflow-hidden">
                                    {/* Phone notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-24 rounded-b-2xl bg-kyro-bg z-10" />

                                    {/* Screen content */}
                                    <div className="absolute inset-0 bg-kyro-surface flex flex-col items-center justify-center gap-4 px-4">
                                        {/* Trackpad area */}
                                        <div className="w-full rounded-xl border border-kyro-cyan/20 bg-kyro-bg/50 p-4 text-center">
                                            <p className="text-[10px] font-semibold uppercase tracking-widest text-kyro-cyan mb-2">
                                                Trackpad
                                            </p>
                                            <div className="h-24 rounded-lg bg-kyro-card border border-kyro-border flex items-center justify-center">
                                                <div className="h-3 w-3 rounded-full bg-kyro-cyan/60 shadow-cyan-sm" />
                                            </div>
                                        </div>

                                        {/* Macro grid */}
                                        <div className="w-full rounded-xl border border-kyro-border bg-kyro-bg/50 p-3">
                                            <p className="text-[10px] font-semibold uppercase tracking-widest text-kyro-muted mb-2 text-center">
                                                Macros
                                            </p>
                                            <div className="grid grid-cols-3 gap-1.5">
                                                {Array.from({ length: 6 }).map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="h-8 rounded-md bg-kyro-card border border-kyro-border/50"
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Connection status */}
                                        <div className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-kyro-success animate-pulse" />
                                            <span className="text-[10px] text-kyro-muted">Connected</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <QRCodeModal isOpen={qrOpen} onClose={() => setQrOpen(false)} />
        </>
    );
}
