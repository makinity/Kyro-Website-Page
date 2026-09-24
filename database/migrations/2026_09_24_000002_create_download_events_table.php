<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('download_events', function (Blueprint $table) {
            $table->id();
            $table->enum('platform', ['windows', 'ios', 'android', 'apk']);
            $table->foreignId('release_id')->nullable()->constrained('releases')->nullOnDelete();
            $table->string('ip_hash', 64)->nullable(); // SHA-256 hashed for privacy
            $table->string('user_agent', 300)->nullable();
            $table->timestamp('downloaded_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('download_events');
    }
};
