<?php

namespace App\Repositories;

use App\Models\Release;
use Illuminate\Database\Eloquent\Collection;

class ReleaseRepository
{
    public function all(): Collection
    {
        return Release::orderByDesc('published_at')->get();
    }

    public function latestPerPlatform(): Collection
    {
        return Release::where('is_latest', true)
            ->orderByDesc('published_at')
            ->get();
    }

    public function findById(int $id): ?Release
    {
        return Release::find($id);
    }

    public function create(array $data): Release
    {
        return Release::create($data);
    }

    public function update(Release $release, array $data): Release
    {
        $release->update($data);
        return $release->fresh();
    }

    public function delete(Release $release): void
    {
        $release->delete();
    }

    /**
     * Unset is_latest for all releases on the same platform before setting a new one.
     */
    public function clearLatestForPlatform(string $platform): void
    {
        Release::where('platform', $platform)
            ->where('is_latest', true)
            ->update(['is_latest' => false]);
    }
}
