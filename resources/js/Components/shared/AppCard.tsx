import React from 'react';
import { cn } from '@/lib/cn';

interface AppCardProps {
    children: React.ReactNode;
    className?: string;
    glow?: boolean;
    hover?: boolean;
    padding?: 'sm' | 'md' | 'lg' | 'none';
}

const paddingClasses = {
    none: '',
    sm:   'p-4',
    md:   'p-6',
    lg:   'p-8',
};

export default function AppCard({
    children,
    className,
    glow = false,
    hover = false,
    padding = 'md',
}: AppCardProps) {
    return (
        <div
            className={cn(
                'glass-card rounded-xl',
                paddingClasses[padding],
                glow && 'glow-border',
                hover && 'transition-all duration-300 hover:border-kyro-cyan/40 hover:shadow-cyan-sm hover:-translate-y-1',
                className,
            )}
        >
            {children}
        </div>
    );
}
