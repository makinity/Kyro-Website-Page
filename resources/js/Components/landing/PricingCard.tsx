import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap } from 'lucide-react';
import SectionHeading from '@/Components/shared/SectionHeading';
import AppButton from '@/Components/shared/AppButton';
import GlowBadge from '@/Components/shared/GlowBadge';

const freeTier = [
    'Precision Laptop Trackpad',
    '2-Finger Scroll & Pinch Zoom',
    '3-Finger Desktop Gestures',
    'Custom Macro Launchpad',
    'Wireless Keyboard & Shortcuts',
    'Persistent Wi-Fi Auto-Connect',
    '100% Offline Local Privacy',
    'Zero Ads, Zero Subscriptions',
];

const proTier = [
    'Everything in Free',
    'Real-Time Live Screen Mirroring',
    'Full Multi-Monitor Touch & Drag',
    'Fullscreen Landscape Mode',
    '60 FPS HD Quality Mode',
    'Direct Touch-to-Click on Screen',
    'Lifetime License — No Renewals',
];

const proNotIncluded = [
    'No monthly fees',
    'No account required',
    'No cloud dependency',
];

export default function PricingCard() {
    return (
        <section id="pricing" className="py-24 bg-kyro-bg">
            <div className="mx-auto max-w-5xl px-6">
                <SectionHeading
                    eyebrow="Pricing"
                    title="Simple. Transparent. Forever."
                    subtitle="Start free. Upgrade once. No subscriptions, no renewals, no accounts."
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Free tier */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="glass-card rounded-2xl p-8 border border-kyro-border"
                    >
                        <div className="mb-6">
                            <GlowBadge variant="muted">Free Forever</GlowBadge>
                            <h3 className="font-heading mt-4 text-2xl font-bold text-kyro-primary">
                                KyroPad Free
                            </h3>
                            <div className="mt-2 flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-kyro-primary">$0</span>
                                <span className="text-kyro-muted">/ forever</span>
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8">
                            {freeTier.map((item) => (
                                <li key={item} className="flex items-center gap-3 text-sm text-kyro-muted">
                                    <Check size={15} className="text-kyro-success shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <AppButton variant="outline" size="lg" as="a" href="#" className="w-full justify-center">
                            Download Free
                        </AppButton>
                    </motion.div>

                    {/* Pro tier */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        viewport={{ once: true }}
                        className="relative rounded-2xl p-8 border border-kyro-cyan/40 bg-kyro-card shadow-cyan-md"
                    >
                        {/* Popular tag */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <GlowBadge variant="cyan">
                                <Zap size={10} />
                                Best Value
                            </GlowBadge>
                        </div>

                        <div className="mb-6">
                            <GlowBadge variant="pro">⭐ Pro</GlowBadge>
                            <h3 className="font-heading mt-4 text-2xl font-bold text-kyro-primary">
                                KyroPad Pro
                            </h3>
                            <div className="mt-2 flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-kyro-cyan">$4.99</span>
                                <span className="text-kyro-muted">/ one-time lifetime</span>
                            </div>
                        </div>

                        <ul className="space-y-3 mb-6">
                            {proTier.map((item) => (
                                <li key={item} className="flex items-center gap-3 text-sm text-kyro-muted">
                                    <Check size={15} className="text-kyro-cyan shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* What's NOT included (cross out) */}
                        <ul className="space-y-2 mb-8">
                            {proNotIncluded.map((item) => (
                                <li key={item} className="flex items-center gap-3 text-sm text-kyro-subtle">
                                    <X size={14} className="text-kyro-subtle shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <AppButton variant="primary" size="lg" as="a" href="#" className="w-full justify-center">
                            Get Pro — $4.99 Lifetime
                        </AppButton>

                        <p className="mt-3 text-center text-xs text-kyro-muted">
                            Available via App Store & Google Play In-App Purchase
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
