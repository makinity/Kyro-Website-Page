<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DownloadController;
use App\Http\Controllers\Admin\ReleaseController;
use App\Http\Controllers\Admin\RevenueController;
use Illuminate\Support\Facades\Route;

// ─── Admin Routes (auth-guarded) ──────────────────────────────────────────────
// All /admin/** routes require authentication via Laravel Breeze.
// The single admin user is seeded via AdminSeeder from .env credentials.

Route::prefix('admin')
    ->middleware(['auth', 'verified'])
    ->name('admin.')
    ->group(function () {

        // Dashboard
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        // Downloads
        Route::get('/downloads', [DownloadController::class, 'index'])->name('downloads.index');

        // Releases
        Route::get('/releases', [ReleaseController::class, 'index'])->name('releases.index');
        Route::post('/releases', [ReleaseController::class, 'store'])->name('releases.store');
        Route::put('/releases/{release}', [ReleaseController::class, 'update'])->name('releases.update');
        Route::delete('/releases/{release}', [ReleaseController::class, 'destroy'])->name('releases.destroy');

        // Revenue
        Route::get('/revenue', [RevenueController::class, 'index'])->name('revenue.index');
        Route::post('/revenue', [RevenueController::class, 'store'])->name('revenue.store');
    });
