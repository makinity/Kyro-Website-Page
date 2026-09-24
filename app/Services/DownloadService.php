<?php

namespace App\Services;

use App\Models\DownloadEvent;
use App\Repositories\DownloadRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class DownloadService
{
    public function __construct(
        private readonly DownloadRepository $repository,
    ) {}

    /**
     * Record a download click event from the landing page.
     */
    public function trackDownload(Request $request, string $platform, ?int $releaseId = null): DownloadEvent
    {
        return $this->repository->create([
            'platform'      => $platform,
            'release_id'    => $releaseId,
            'ip_hash'       => hash('sha256', $request->ip()),
            'user_agent'    => substr($request->userAgent() ?? '', 0, 300),
            'downloaded_at' => now(),
        ]);
    }

    public function getTotalDownloads(): int
    {
        return $this->repository->totalCount();
    }

    public function getDownloadsByPlatform(): Collection
    {
        return $this->repository->countByPlatform();
    }

    public function getDailyChartData(int $days = 30): Collection
    {
        return $this->repository->dailyCountsForDays($days);
    }
}
