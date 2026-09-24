import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionHeading from '@/Components/shared/SectionHeading';
import { cn } from '@/lib/cn';

const faqs = [
    {
        q: 'How do I get started?',
        a: '3 steps: (1) Run the KyroPad Server on your Windows 11 PC. (2) Open the KyroPad app on your phone. (3) Enter your PC\'s Wi-Fi IP address and tap Connect. KyroPad remembers your IP for future sessions.',
    },
    {
        q: 'Do I need an internet connection?',
        a: 'No. KyroPad works 100% offline over your local Wi-Fi network. No cloud servers, no accounts, no telemetry. Everything stays on your network.',
    },
    {
        q: 'What Windows version is required?',
        a: 'KyroPad is optimized for Windows 11. The server uses Win32 GDI screen capture and native Windows input simulation, which works best on Windows 11. Windows 10 may work but is not officially tested.',
    },
    {
        q: 'Does the free version have any limitations?',
        a: 'The free version includes the full Precision Trackpad, Macro Launchpad, and Wireless Keyboard — no limitations. The only feature behind the Pro upgrade is Live Screen Mirroring with multi-monitor support.',
    },
    {
        q: 'How does the $4.99 lifetime purchase work?',
        a: 'It\'s a standard In-App Purchase through the App Store or Google Play. Pay once, unlock Pro features on that platform forever. No subscription, no renewals. Use "Restore Purchases" if you reinstall the app.',
    },
    {
        q: 'What if my phone and PC are on different networks?',
        a: 'KyroPad requires both devices to be on the same local Wi-Fi network. It will not work over mobile data or across different networks — this is what enables the ultra-low latency.',
    },
];

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-kyro-border last:border-b-0">
            <button
                className="flex w-full items-center justify-between py-5 text-left gap-4"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
            >
                <span className="font-medium text-kyro-primary">{q}</span>
                <ChevronDown
                    size={18}
                    className={cn('text-kyro-cyan shrink-0 transition-transform duration-200', open && 'rotate-180')}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 text-sm leading-relaxed text-kyro-muted">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQ() {
    return (
        <section id="faq" className="py-24 bg-kyro-surface">
            <div className="mx-auto max-w-3xl px-6">
                <SectionHeading
                    eyebrow="FAQ"
                    title="Common Questions"
                />

                <div className="glass-card rounded-2xl px-6 divide-y-0">
                    {faqs.map((faq) => (
                        <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                    ))}
                </div>
            </div>
        </section>
    );
}
