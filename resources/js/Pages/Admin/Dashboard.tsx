import React from 'react';
import { Download, DollarSign, Tag, TrendingUp } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatsCard from '@/Components/admin/StatsCard';
import AppCard from '@/Components/shared/AppCard';
import GlowBadge from '@/Components/shared/GlowBadge';

interface Release {
    id: number;
    version: string;
    platform: string;
    published_at: string | null;
    is_latest: boolean;
}

interface Stats {
    total_downloads: number;
    total_revenue: number;
    total_sales: number;
    latest_releases: Release[];
}

interface DashboardProps {
    stats: Stats;
}

const platformLabel: Record<string, string> = {
    windows: '🪟 Windows',
    ios:     '🍏 iOS',
    android: '🤖 Android',
};

export default function Dashboard({ stats }: DashboardProps) {
    return (
        <AdminLayout title="Dashboard — KyroPad Admin">
            <div className="space-y-8">
                {/* Page header */}
                <div>
                    <h1 className="font-heading text-2xl font-bold text-kyro-primary">Dashboard</h1>
                    <p className="mt-1 text-sm text-kyro-muted">Overview of KyroPad downloads, releases, and revenue.</p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        label="Total Downloads"
                        value={stats.total_downloads.toLocaleString()}
                        icon={Download}
                    />
                    <StatsCard
                        label="Total Revenue"
                        value={`$${Number(stats.total_revenue).toFixed(2)}`}
                        icon={DollarSign}
                        trendUp
                    />
                    <StatsCard
                        label="Pro Sales"
                        value={stats.total_sales.toLocaleString()}
                        icon={TrendingUp}
                        trendUp
                    />
                    <StatsCard
                        label="Active Releases"
                        value={stats.latest_releases.length}
                        icon={Tag}
                    />
                </div>

                {/* Latest releases */}
                <AppCard padding="lg">
                    <h2 className="font-heading text-base font-semibold text-kyro-primary mb-4">
                        Latest Releases
                    </h2>

                    {stats.latest_releases.length === 0 ? (
                        <p className="text-sm text-kyro-muted py-4 text-center">
                            No releases published yet.{' '}
                            <a href="/admin/releases" className="text-kyro-cyan hover:underline">
                                Publish the first one →
                            </a>
                        </p>
                    ) : (
                        <div className="divide-y divide-kyro-border">
                            {stats.latest_releases.map((release) => (
                                <div key={release.id} className="flex items-center justify-between py-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-kyro-muted">
                                            {platformLabel[release.platform] ?? release.platform}
                                        </span>
                                        <span className="font-mono text-sm font-semibold text-kyro-primary">
                                            v{release.version}
                                        </span>
                                        {release.is_latest && (
                                            <GlowBadge variant="cyan">latest</GlowBadge>
                                        )}
                                    </div>
                                    <span className="text-xs text-kyro-muted">
                                        {release.published_at
                                            ? new Date(release.published_at).toLocaleDateString()
                                            : '—'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </AppCard>
            </div>
        </AdminLayout>
    );
}
