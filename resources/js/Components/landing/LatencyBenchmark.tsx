import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import SectionHeading from '@/Components/shared/SectionHeading';
import AppCard from '@/Components/shared/AppCard';

const benchmarks = [
    { label: 'KyroPad',        ms: 20,  highlight: true },
    { label: 'Competitor A',   ms: 80,  highlight: false },
    { label: 'Competitor B',   ms: 120, highlight: false },
    { label: 'Remote Desktop', ms: 200, highlight: false },
];

const MAX_MS = 250;

export default function LatencyBenchmark() {
    return (
        <section className="py-24 bg-kyro-surface">
            <div className="mx-auto max-w-4xl px-6">
                <SectionHeading
                    eyebrow="Performance"
                    title="~20ms Latency. No Compromises."
                    subtitle="Measured over local Wi-Fi. KyroPad streams your desktop in real-time — faster than you can blink."
                />

                <AppCard padding="lg" glow>
                    <div className="space-y-5">
                        {benchmarks.map((bench, i) => (
                            <div key={bench.label}>
                                <div className="mb-1.5 flex items-center justify-between">
                                    <span className={`text-sm font-medium ${bench.highlight ? 'text-kyro-cyan' : 'text-kyro-muted'}`}>
                                        {bench.highlight && <Zap size={12} className="inline mr-1 mb-0.5" />}
                                        {bench.label}
                                    </span>
                                    <span className={`text-sm font-bold tabular-nums ${bench.highlight ? 'text-kyro-cyan' : 'text-kyro-muted'}`}>
                                        ~{bench.ms}ms
                                    </span>
                                </div>
                                <div className="h-2.5 w-full rounded-full bg-kyro-border overflow-hidden">
                                    <motion.div
                                        className={`h-full rounded-full ${bench.highlight ? 'bg-kyro-cyan shadow-cyan-sm' : 'bg-kyro-subtle'}`}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${(bench.ms / MAX_MS) * 100}%` }}
                                        transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
                                        viewport={{ once: true }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="mt-6 text-center text-xs text-kyro-subtle">
                        Tested on local 5GHz Wi-Fi. Results vary based on network conditions.
                    </p>
                </AppCard>
            </div>
        </section>
    );
}
