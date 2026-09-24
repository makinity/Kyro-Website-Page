import React from 'react';
import { Head } from '@inertiajs/react';

interface PublicLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

export default function PublicLayout({
    children,
    title = 'KyroPad — Precision Wireless Trackpad for Windows 11',
    description = 'Turn your phone into a high-precision trackpad, macro deck, and live screen mirror for Windows 11. Free to download.',
}: PublicLayoutProps) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="theme-color" content="#00e5ff" />
                <link rel="icon" href="/assets/icon.png" />
            </Head>

            <div className="min-h-screen bg-kyro-bg text-kyro-primary">
                {children}
            </div>
        </>
    );
}
