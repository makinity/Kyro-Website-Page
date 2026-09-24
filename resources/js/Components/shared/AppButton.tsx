import React from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    as?: 'button' | 'a';
    href?: string;
    target?: string;
    rel?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const sizeClasses: Record<Size, string> = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
};

const variantClasses: Record<Variant, string> = {
    primary: 'bg-kyro-cyan text-kyro-bg font-semibold hover:bg-kyro-cyan-dim hover:shadow-cyan-md active:scale-95',
    outline: 'border border-kyro-cyan text-kyro-cyan bg-transparent hover:bg-kyro-cyan-glow hover:shadow-cyan-sm active:scale-95',
    ghost:   'text-kyro-muted hover:text-kyro-cyan hover:bg-kyro-card active:scale-95',
};

export default function AppButton({
    variant = 'primary',
    size = 'md',
    as = 'button',
    href,
    target,
    rel,
    leftIcon,
    rightIcon,
    className,
    children,
    ...props
}: AppButtonProps) {
    const baseClasses = cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 cursor-pointer select-none',
        sizeClasses[size],
        variantClasses[variant],
        className,
    );

    if (as === 'a' && href) {
        return (
            <a href={href} target={target} rel={rel} className={baseClasses}>
                {leftIcon && <span className="shrink-0">{leftIcon}</span>}
                {children}
                {rightIcon && <span className="shrink-0">{rightIcon}</span>}
            </a>
        );
    }

    return (
        <button className={baseClasses} {...props}>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </button>
    );
}
