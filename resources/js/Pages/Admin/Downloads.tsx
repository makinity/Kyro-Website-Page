import React from 'react';
import { Download } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import DownloadChart from '@/Components/admin/DownloadChart';
import StatsCard from '@/Components/admin/StatsCard';

interface PlatformCount {
    platform: string;
    total: number;
}

interface ChartEntry {
    date: string;
    platform: string;
    total: number;
}

interface DownloadsProps {
    byPlatform: PlatformCount[];
    chartData: ChartEntry[];
    total: number;
}

const platformEmoji: Record<string, string> = {
    windows: '🪟',
    ios:     '🍏',
    android: '🤖',
    apk:     '📦',
};

export default function Downloads({ byPlatform, chartData, total }: DownloadsProps) {
    return (
        <AdminLayout title="Downloads — KyroPad Admin">
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="font-heading text-2xl font-bold text-kyro-primary">Downloads</h1>
                    <p className="mt-1 text-sm text-kyro-muted">Download events tracked from the landing page.</p>
                </div>

                {/* Platform breakdown */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <StatsCard
                        label="Total Downloads"
                        value={total.toLocaleString()}
                        icon={Download}
                        className="col-span-2 sm:col-span-1"
                    />
                    {byPlatform.map((p) => (
                        <StatsCard
                            key={p.platform}
                            label={`${platformEmoji[p.platform] ?? ''} ${p.platform}`}
                            value={p.total.toLocaleString()}
                            icon={Download}
                        />
                    ))}
                </div>

                {/* Chart */}
                <DownloadChart data={chartData} />
            </div>
        </AdminLayout>
    );
}
