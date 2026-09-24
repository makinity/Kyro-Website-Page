import React from 'react';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

interface StatsCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    className?: string;
}

export default function StatsCard({ label, value, icon: Icon, trend, trendUp, className }: StatsCardProps) {
    return (
        <div className={cn('glass-card rounded-xl p-6 border border-kyro-border', className)}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-kyro-muted mb-1">
                        {label}
                    </p>
                    <p className="font-heading text-3xl font-bold text-kyro-primary">
                        {value}
                    </p>
                    {trend && (
                        <p className={cn('mt-1 text-xs', trendUp ? 'text-kyro-success' : 'text-kyro-muted')}>
                            {trend}
                        </p>
                    )}
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-kyro-cyan/10 border border-kyro-cyan/20">
                    <Icon size={18} className="text-kyro-cyan" />
                </div>
            </div>
        </div>
    );
}
