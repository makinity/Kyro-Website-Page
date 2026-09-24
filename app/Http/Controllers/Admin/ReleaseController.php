<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReleaseRequest;
use App\Models\Release;
use App\Services\ReleaseService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ReleaseController extends Controller
{
    public function __construct(
        private readonly ReleaseService $releaseService,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Releases', [
            'releases' => $this->releaseService->getAllReleases(),
        ]);
    }

    public function store(StoreReleaseRequest $request): RedirectResponse
    {
        $this->releaseService->createRelease($request->validated());

        return redirect()->route('admin.releases.index')
            ->with('success', 'Release published successfully.');
    }

    public function update(StoreReleaseRequest $request, Release $release): RedirectResponse
    {
        $this->releaseService->updateRelease($release, $request->validated());

        return redirect()->route('admin.releases.index')
            ->with('success', 'Release updated successfully.');
    }

    public function destroy(Release $release): RedirectResponse
    {
        $this->releaseService->deleteRelease($release);

        return redirect()->route('admin.releases.index')
            ->with('success', 'Release deleted.');
    }
}
