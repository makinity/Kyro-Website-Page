<?php

namespace App\Services;

use App\Models\Release;
use App\Repositories\ReleaseRepository;
use Illuminate\Database\Eloquent\Collection;

class ReleaseService
{
    public function __construct(
        private readonly ReleaseRepository $repository,
    ) {}

    public function getAllReleases(): Collection
    {
        return $this->repository->all();
    }

    public function getLatestReleases(): Collection
    {
        return $this->repository->latestPerPlatform();
    }

    public function createRelease(array $data): Release
    {
        // If this is marked as latest, demote all others for the same platform first
        if (! empty($data['is_latest'])) {
            $this->repository->clearLatestForPlatform($data['platform']);
        }

        return $this->repository->create($data);
    }

    public function updateRelease(Release $release, array $data): Release
    {
        if (! empty($data['is_latest'])) {
            $this->repository->clearLatestForPlatform($data['platform'] ?? $release->platform);
        }

        return $this->repository->update($release, $data);
    }

    public function deleteRelease(Release $release): void
    {
        $this->repository->delete($release);
    }
}
