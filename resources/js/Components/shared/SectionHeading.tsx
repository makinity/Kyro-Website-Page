import React from 'react';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
    className?: string;
}

export default function SectionHeading({
    eyebrow,
    title,
    subtitle,
    align = 'center',
    className,
}: SectionHeadingProps) {
    return (
        <div className={cn('mb-12', align === 'center' && 'text-center', className)}>
            {eyebrow && (
                <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-kyro-cyan">
                    {eyebrow}
                </p>
            )}
            <h2 className="font-heading text-3xl font-bold text-kyro-primary md:text-4xl lg:text-5xl">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-4 max-w-2xl text-base text-kyro-muted md:text-lg mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
