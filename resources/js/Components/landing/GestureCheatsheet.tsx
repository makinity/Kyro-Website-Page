import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/Components/shared/SectionHeading';
import AppCard from '@/Components/shared/AppCard';

const gestures = [
    { gesture: '👆 1-Finger Slide',          action: 'Relative Pointer Movement (Δx, Δy)' },
    { gesture: '👆 1-Finger Quick Tap',       action: 'Left Click' },
    { gesture: '👆👆 1-Finger Double-Tap',    action: 'Double Left Click' },
    { gesture: '👆👆 Hold & Slide',           action: 'Tap-to-Drag (Window move / text select)' },
    { gesture: '✌️ 2-Finger Tap',             action: 'Right Click (Context Menu)' },
    { gesture: '✌️ 2-Finger Vertical Slide',  action: 'Smooth Mouse Wheel Scroll' },
    { gesture: '🤏 2-Finger Pinch / Spread',  action: 'Universal Zoom In / Out (Ctrl+Scroll)' },
    { gesture: '🖖 3-Finger Swipe Up',        action: 'Task View / Virtual Desktops (Win+Tab)' },
    { gesture: '🖖 3-Finger Swipe Down',      action: 'Show Desktop / Minimize All (Win+D)' },
    { gesture: '🖖 3-Finger Swipe Left/Right', action: 'Switch Virtual Desktops (Ctrl+Win+←/→)' },
];

export default function GestureCheatsheet() {
    return (
        <section id="gestures" className="py-24 bg-kyro-bg">
            <div className="mx-auto max-w-5xl px-6">
                <SectionHeading
                    eyebrow="Gesture Guide"
                    title="Every Gesture. Explained."
                    subtitle="KyroPad replicates the Windows 11 Precision Touchpad state machine exactly. If your laptop can do it, so can KyroPad."
                />

                <AppCard padding="none" className="overflow-hidden">
                    {/* Table header */}
                    <div className="grid grid-cols-2 border-b border-kyro-border bg-kyro-surface px-6 py-3">
                        <span className="text-xs font-semibold uppercase tracking-widest text-kyro-cyan">
                            Gesture
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-widest text-kyro-cyan">
                            Action
                        </span>
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-kyro-border/50">
                        {gestures.map((row, i) => (
                            <motion.div
                                key={row.gesture}
                                className="grid grid-cols-2 px-6 py-4 hover:bg-kyro-surface/60 transition-colors"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-sm font-medium text-kyro-primary">
                                    {row.gesture}
                                </span>
                                <span className="text-sm text-kyro-muted">
                                    {row.action}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </AppCard>
            </div>
        </section>
    );
}
