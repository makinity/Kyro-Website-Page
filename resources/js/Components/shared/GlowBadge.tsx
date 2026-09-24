import React from 'react';
import { cn } from '@/lib/cn';

type BadgeVariant = 'cyan' | 'pro' | 'success' | 'warning' | 'danger' | 'muted';

interface GlowBadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
    cyan:    'bg-kyro-cyan/10 text-kyro-cyan border-kyro-cyan/30',
    pro:     'bg-kyro-pro/10 text-kyro-pro border-kyro-pro/30',
    success: 'bg-kyro-success/10 text-kyro-success border-kyro-success/30',
    warning: 'bg-kyro-warning/10 text-kyro-warning border-kyro-warning/30',
    danger:  'bg-kyro-danger/10 text-kyro-danger border-kyro-danger/30',
    muted:   'bg-kyro-subtle/20 text-kyro-muted border-kyro-border/50',
};

export default function GlowBadge({ children, variant = 'cyan', className }: GlowBadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border',
                variantClasses[variant],
                className,
            )}
        >
            {children}
        </span>
    );
}
