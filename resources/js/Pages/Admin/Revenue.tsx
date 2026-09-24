import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { DollarSign, Plus, X } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import RevenueChart from '@/Components/admin/RevenueChart';
import StatsCard from '@/Components/admin/StatsCard';
import AppButton from '@/Components/shared/AppButton';
import AppCard from '@/Components/shared/AppCard';
import { motion, AnimatePresence } from 'framer-motion';

interface RevenueEntry {
    id: number;
    source: string;
    amount_usd: string;
    transaction_ref: string | null;
    note: string | null;
    recorded_at: string;
}

interface MonthlyTotal {
    month: string;
    total: number;
}

interface Summary {
    total_revenue: number;
    total_sales: number;
}

interface RevenueProps {
    entries: RevenueEntry[];
    summary: Summary;
    chartData: MonthlyTotal[];
}

const sourceLabel: Record<string, string> = {
    ios_iap:     '🍏 App Store IAP',
    android_iap: '🤖 Google Play IAP',
    manual:      '✏️ Manual Entry',
};

export default function Revenue({ entries, summary, chartData }: RevenueProps) {
    const [addOpen, setAddOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        source:          'manual',
        amount_usd:      '',
        transaction_ref: '',
        note:            '',
        recorded_at:     '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.revenue.store'), {
            onSuccess: () => { reset(); setAddOpen(false); },
        });
    };

    const fieldClass = 'w-full rounded-lg border border-kyro-border bg-kyro-bg px-4 py-2.5 text-sm text-kyro-primary placeholder-kyro-subtle focus:border-kyro-cyan focus:outline-none focus:ring-1 focus:ring-kyro-cyan/30 transition-colors';
    const labelClass = 'block mb-1.5 text-xs font-medium text-kyro-muted';
    const errorClass = 'mt-1 text-xs text-kyro-danger';

    return (
        <AdminLayout title="Revenue — KyroPad Admin">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-heading text-2xl font-bold text-kyro-primary">Revenue</h1>
                        <p className="mt-1 text-sm text-kyro-muted">Track lifetime Pro sales and revenue entries.</p>
                    </div>
                    <AppButton
                        variant="primary"
                        size="sm"
                        leftIcon={<Plus size={15} />}
                        onClick={() => setAddOpen(true)}
                    >
                        Add Entry
                    </AppButton>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <StatsCard
                        label="Total Revenue"
                        value={`$${Number(summary.total_revenue).toFixed(2)}`}
                        icon={DollarSign}
                        trendUp
                    />
                    <StatsCard
                        label="Total Sales"
                        value={summary.total_sales.toLocaleString()}
                        icon={DollarSign}
                    />
                </div>

                {/* Chart */}
                <RevenueChart data={chartData} />

                {/* Entries table */}
                <AppCard padding="none" className="overflow-hidden">
                    <div className="grid grid-cols-12 border-b border-kyro-border bg-kyro-surface px-6 py-3 text-xs font-semibold uppercase tracking-widest text-kyro-cyan">
                        <span className="col-span-3">Source</span>
                        <span className="col-span-2">Amount</span>
                        <span className="col-span-4">Transaction Ref</span>
                        <span className="col-span-3">Recorded At</span>
                    </div>

                    {entries.length === 0 ? (
                        <div className="px-6 py-12 text-center">
                            <p className="text-sm text-kyro-muted">No revenue entries yet.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-kyro-border/50">
                            {entries.map((entry) => (
                                <div key={entry.id} className="grid grid-cols-12 items-center px-6 py-3 hover:bg-kyro-surface/50 transition-colors">
                                    <span className="col-span-3 text-sm text-kyro-muted">
                                        {sourceLabel[entry.source] ?? entry.source}
                                    </span>
                                    <span className="col-span-2 font-mono text-sm font-bold text-kyro-cyan">
                                        ${Number(entry.amount_usd).toFixed(2)}
                                    </span>
                                    <span className="col-span-4 text-xs text-kyro-muted truncate">
                                        {entry.transaction_ref ?? '—'}
                                    </span>
                                    <span className="col-span-3 text-xs text-kyro-muted">
                                        {new Date(entry.recorded_at).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </AppCard>
            </div>

            {/* Add entry modal */}
            <AnimatePresence>
                {addOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                            onClick={() => setAddOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2"
                        >
                            <div className="glass-card glow-border rounded-2xl p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-heading text-xl font-bold text-kyro-primary">Add Revenue Entry</h2>
                                    <button onClick={() => setAddOpen(false)} className="text-kyro-muted hover:text-kyro-primary">
                                        <X size={20} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className={labelClass}>Source *</label>
                                        <select className={fieldClass} value={data.source} onChange={(e) => setData('source', e.target.value)}>
                                            <option value="ios_iap">App Store IAP</option>
                                            <option value="android_iap">Google Play IAP</option>
                                            <option value="manual">Manual Entry</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Amount (USD) *</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0.01"
                                            className={fieldClass}
                                            placeholder="4.99"
                                            value={data.amount_usd}
                                            onChange={(e) => setData('amount_usd', e.target.value)}
                                        />
                                        {errors.amount_usd && <p className={errorClass}>{errors.amount_usd}</p>}
                                    </div>

                                    <div>
                                        <label className={labelClass}>Transaction Reference</label>
                                        <input
                                            type="text"
                                            className={fieldClass}
                                            placeholder="Optional store transaction ID"
                                            value={data.transaction_ref}
                                            onChange={(e) => setData('transaction_ref', e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>Note</label>
                                        <input
                                            type="text"
                                            className={fieldClass}
                                            placeholder="Optional note"
                                            value={data.note}
                                            onChange={(e) => setData('note', e.target.value)}
                                        />
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <AppButton type="submit" variant="primary" size="md" className="flex-1 justify-center" disabled={processing}>
                                            {processing ? 'Saving…' : 'Save Entry'}
                                        </AppButton>
                                        <AppButton type="button" variant="outline" size="md" onClick={() => setAddOpen(false)}>
                                            Cancel
                                        </AppButton>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </AdminLayout>
    );
}
