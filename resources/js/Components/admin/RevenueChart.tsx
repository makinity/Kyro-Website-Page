import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import AppCard from '@/Components/shared/AppCard';

interface MonthlyEntry {
    month: string;
    total: number;
}

interface RevenueChartProps {
    data: MonthlyEntry[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-lg border border-kyro-border bg-kyro-card p-3 shadow-card text-xs">
            <p className="font-semibold text-kyro-primary mb-1">{label}</p>
            <p className="text-kyro-cyan font-bold">${Number(payload[0]?.value ?? 0).toFixed(2)}</p>
        </div>
    );
};

export default function RevenueChart({ data }: RevenueChartProps) {
    return (
        <AppCard padding="lg">
            <h3 className="font-heading text-base font-semibold text-kyro-primary mb-6">
                Revenue — Last 12 Months
            </h3>

            <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={data} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                    <defs>
                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor="#00e5ff" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#00e5ff" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey="month"
                        tick={{ fill: '#7a8a9a', fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fill: '#7a8a9a', fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `$${v}`}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(0,229,255,0.2)' }} />
                    <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#00e5ff"
                        strokeWidth={2}
                        fill="url(#revenueGrad)"
                        dot={{ fill: '#00e5ff', r: 3 }}
                        activeDot={{ r: 5, fill: '#00e5ff' }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </AppCard>
    );
}
