<?php

namespace App\Services;

use App\Models\RevenueEntry;
use App\Repositories\RevenueRepository;
use Illuminate\Database\Eloquent\Collection;

class RevenueService
{
    public function __construct(
        private readonly RevenueRepository $repository,
    ) {}

    public function getAllEntries(): Collection
    {
        return $this->repository->all();
    }

    public function createEntry(array $data): RevenueEntry
    {
        return $this->repository->create($data);
    }

    public function getSummary(): array
    {
        return [
            'total_revenue' => $this->repository->totalRevenue(),
            'total_sales'   => $this->repository->totalSalesCount(),
        ];
    }

    public function getMonthlyChartData(int $months = 12): \Illuminate\Support\Collection
    {
        return $this->repository->monthlyTotals($months);
    }
}
