<?php

use App\Http\Controllers\Admin\DownloadController;
use App\Http\Controllers\Public\LandingController;
use Illuminate\Support\Facades\Route;

// ─── Public Routes ────────────────────────────────────────────────────────────

Route::get('/', [LandingController::class, 'index'])->name('landing');

// Download click tracking (called from landing page JS)
Route::post('/track', [DownloadController::class, 'track'])->name('downloads.track');

// ─── Auth Routes (Breeze) ─────────────────────────────────────────────────────
require __DIR__ . '/auth.php';

// ─── Admin Routes ─────────────────────────────────────────────────────────────
require __DIR__ . '/admin.php';
