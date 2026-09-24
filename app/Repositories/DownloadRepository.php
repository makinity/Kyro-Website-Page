<?php

namespace App\Repositories;

use App\Models\DownloadEvent;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class DownloadRepository
{
    public function create(array $data): DownloadEvent
    {
        return DownloadEvent::create($data);
    }

    public function totalCount(): int
    {
        return DownloadEvent::count();
    }

    public function countByPlatform(): Collection
    {
        return DownloadEvent::select('platform', DB::raw('count(*) as total'))
            ->groupBy('platform')
            ->get();
    }

    /**
     * Returns daily download counts for the last N days, grouped by platform.
     */
    public function dailyCountsForDays(int $days = 30): Collection
    {
        return DownloadEvent::select(
                'platform',
                DB::raw('DATE(downloaded_at) as date'),
                DB::raw('count(*) as total')
            )
            ->where('downloaded_at', '>=', now()->subDays($days))
            ->groupBy('platform', 'date')
            ->orderBy('date')
            ->get();
    }
}
