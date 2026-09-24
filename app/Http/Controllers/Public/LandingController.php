<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\ReleaseService;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function __construct(
        private readonly ReleaseService $releaseService,
    ) {}

    public function index(): Response
    {
        $latestReleases = $this->releaseService->getLatestReleases();

        return Inertia::render('Landing', [
            'latestReleases' => $latestReleases,
        ]);
    }
}
