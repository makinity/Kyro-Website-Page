<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\DownloadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DownloadController extends Controller
{
    public function __construct(
        private readonly DownloadService $downloadService,
    ) {}

    /**
     * Admin: download analytics page.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Downloads', [
            'byPlatform' => $this->downloadService->getDownloadsByPlatform(),
            'chartData'  => $this->downloadService->getDailyChartData(30),
            'total'      => $this->downloadService->getTotalDownloads(),
        ]);
    }

    /**
     * Public: track a download click from the landing page.
     */
    public function track(Request $request): JsonResponse
    {
        $request->validate([
            'platform'   => ['required', 'string', 'in:windows,ios,android,apk'],
            'release_id' => ['nullable', 'integer', 'exists:releases,id'],
        ]);

        $this->downloadService->trackDownload(
            $request,
            $request->input('platform'),
            $request->input('release_id'),
        );

        return response()->json(['success' => true]);
    }
}
