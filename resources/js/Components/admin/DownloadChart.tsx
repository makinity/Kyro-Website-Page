import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid,
} from 'recharts';
import AppCard from '@/Components/shared/AppCard';

interface ChartEntry {
    date: string;
    platform: string;
    total: number;
}

interface DownloadChartProps {
    data: ChartEntry[];
}

// Recharts requires data in { date, windows, ios, android, apk } shape
function reshapeData(raw: ChartEntry[]) {
    const map: Record<string, Record<string, number | string>> = {};

    for (const entry of raw) {
        if (!map[entry.date]) map[entry.date] = { date: entry.date };
        map[entry.date][entry.platform] = Number(entry.total);
    }

    return Object.values(map);
}

const COLORS: Record<string, string> = {
    windows: '#00e5ff',
    ios:     '#7c3aed',
    android: '#10b981',
    apk:     '#f59e0b',
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-lg border border-kyro-border bg-kyro-card p-3 shadow-card text-xs">
            <p className="font-semibold text-kyro-primary mb-2">{label}</p>
            {payload.map((entry: any) => (
                <div key={entry.dataKey} className="flex items-center justify-between gap-4">
                    <span style={{ color: entry.fill }}>{entry.dataKey}</span>
                    <span className="text-kyro-primary font-medium">{entry.value}</span>
                </div>
            ))}
        </div>
    );
};

export default function DownloadChart({ data }: DownloadChartProps) {
    const shaped = reshapeData(data);

    return (
        <AppCard padding="lg">
            <h3 className="font-heading text-base font-semibold text-kyro-primary mb-6">
                Downloads — Last 30 Days
            </h3>

            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={shaped} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: '#7a8a9a', fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => v.slice(5)} // show MM-DD
                    />
                    <YAxis
                        tick={{ fill: '#7a8a9a', fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,229,255,0.05)' }} />
                    <Legend
                        wrapperStyle={{ fontSize: '12px', color: '#7a8a9a', paddingTop: '12px' }}
                    />
                    {Object.entries(COLORS).map(([platform, color]) => (
                        <Bar key={platform} dataKey={platform} fill={color} radius={[3, 3, 0, 0]} maxBarSize={20} />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </AppCard>
    );
}
