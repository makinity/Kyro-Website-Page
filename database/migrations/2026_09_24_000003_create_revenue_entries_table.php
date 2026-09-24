<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('revenue_entries', function (Blueprint $table) {
            $table->id();
            $table->enum('source', ['ios_iap', 'android_iap', 'manual']);
            $table->decimal('amount_usd', 10, 2);
            $table->string('transaction_ref', 200)->nullable();
            $table->text('note')->nullable();
            $table->timestamp('recorded_at')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('revenue_entries');
    }
};
