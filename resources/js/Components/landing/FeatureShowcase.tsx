import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, LayoutGrid, Monitor } from 'lucide-react';
import AppCard from '@/Components/shared/AppCard';
import GlowBadge from '@/Components/shared/GlowBadge';
import SectionHeading from '@/Components/shared/SectionHeading';

const features = [
    {
        icon: MousePointer2,
        title: 'Precision Laptop Trackpad',
        badge: null,
        description:
            'Hardware-grade touchpad experience with native Windows 11 Precision Touchpad ballistics. Every gesture is faithfully replicated.',
        bullets: [
            '1-finger move & tap-to-click',
            'Double-tap & hold to drag',
            '2-finger scroll & pinch zoom',
            '3-finger Task View & Desktop gestures',
            'Haptic feedback on every tap',
        ],
        color: 'cyan' as const,
    },
    {
        icon: LayoutGrid,
        title: 'Custom Macro Launchpad',
        badge: null,
        description:
            'One-tap control over your Windows 11 workflow. Launch apps, snap windows, control audio, and trigger any system shortcut instantly.',
        bullets: [
            'Window snap left, right, maximize',
            'Volume up/down & mute toggle',
            'One-touch app launching',
            'Send text & special hotkeys',
            'Workstation lock shortcut',
        ],
        color: 'cyan' as const,
    },
    {
        icon: Monitor,
        title: 'Live Screen Mirror',
        badge: 'Pro',
        description:
            'Ultra-low latency real-time display mirroring with direct touch-to-click. Works across all your monitors with one tap.',
        bullets: [
            '~20ms latency over local Wi-Fi',
            'Switch Display 1, Display 2, All',
            'Touch-to-click directly on the screen',
            'Fullscreen landscape mode',
            '60 FPS HD quality mode',
        ],
        color: 'pro' as const,
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function FeatureShowcase() {
    return (
        <section id="features" className="py-24 bg-kyro-surface">
            <div className="mx-auto max-w-7xl px-6">
                <SectionHeading
                    eyebrow="What KyroPad Does"
                    title="Three Tools. One App."
                    subtitle="Replace your peripheral devices with your smartphone. Each feature works independently — or together."
                />

                <motion.div
                    className="grid grid-cols-1 gap-6 md:grid-cols-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div key={feature.title} variants={cardVariants}>
                                <AppCard hover glow={feature.badge === 'Pro'} padding="lg" className="h-full flex flex-col">
                                    {/* Icon + badge */}
                                    <div className="mb-5 flex items-start justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-kyro-cyan/10 border border-kyro-cyan/20">
                                            <Icon className="text-kyro-cyan" size={22} />
                                        </div>
                                        {feature.badge && (
                                            <GlowBadge variant="pro">⭐ {feature.badge}</GlowBadge>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-heading text-xl font-bold text-kyro-primary mb-3">
                                        {feature.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-kyro-muted mb-5">
                                        {feature.description}
                                    </p>

                                    {/* Bullets */}
                                    <ul className="mt-auto space-y-2">
                                        {feature.bullets.map((bullet) => (
                                            <li key={bullet} className="flex items-center gap-2.5 text-sm text-kyro-muted">
                                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-kyro-cyan" />
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </AppCard>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
