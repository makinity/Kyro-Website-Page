<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\DownloadService;
use App\Services\ReleaseService;
use App\Services\RevenueService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        private readonly DownloadService $downloadService,
        private readonly ReleaseService  $releaseService,
        private readonly RevenueService  $revenueService,
    ) {}

    public function index(): Response
    {
        $revenueSummary = $this->revenueService->getSummary();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_downloads' => $this->downloadService->getTotalDownloads(),
                'total_revenue'   => $revenueSummary['total_revenue'],
                'total_sales'     => $revenueSummary['total_sales'],
                'latest_releases' => $this->releaseService->getLatestReleases(),
            ],
        ]);
    }
}
