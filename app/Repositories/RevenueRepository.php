<?php

namespace App\Repositories;

use App\Models\RevenueEntry;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class RevenueRepository
{
    public function all(): Collection
    {
        return RevenueEntry::orderByDesc('recorded_at')->get();
    }

    public function create(array $data): RevenueEntry
    {
        return RevenueEntry::create($data);
    }

    public function totalRevenue(): float
    {
        return (float) RevenueEntry::sum('amount_usd');
    }

    public function totalSalesCount(): int
    {
        return RevenueEntry::count();
    }

    /**
     * Monthly revenue totals for the last N months.
     */
    public function monthlyTotals(int $months = 12): \Illuminate\Support\Collection
    {
        return RevenueEntry::select(
                DB::raw("DATE_FORMAT(recorded_at, '%Y-%m') as month"),
                DB::raw('SUM(amount_usd) as total')
            )
            ->where('recorded_at', '>=', now()->subMonths($months))
            ->groupBy('month')
            ->orderBy('month')
            ->get();
    }
}
