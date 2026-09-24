<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRevenueRequest;
use App\Services\EmailService;
use App\Services\RevenueService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class RevenueController extends Controller
{
    public function __construct(
        private readonly RevenueService $revenueService,
        private readonly EmailService   $emailService,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Revenue', [
            'entries'   => $this->revenueService->getAllEntries(),
            'summary'   => $this->revenueService->getSummary(),
            'chartData' => $this->revenueService->getMonthlyChartData(12),
        ]);
    }

    public function store(StoreRevenueRequest $request): RedirectResponse
    {
        $entry = $this->revenueService->createEntry($request->validated());

        // Notify admin via email (Brevo)
        $this->emailService->notifyNewRevenue(
            amount: (float) $entry->amount_usd,
            source: $entry->source,
        );

        return redirect()->route('admin.revenue.index')
            ->with('success', 'Revenue entry recorded.');
    }
}
