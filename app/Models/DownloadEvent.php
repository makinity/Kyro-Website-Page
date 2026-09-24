<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DownloadEvent extends Model
{
    use HasFactory;

    // No updated_at — only downloaded_at is tracked
    public $timestamps = false;

    protected $fillable = [
        'platform',
        'release_id',
        'ip_hash',
        'user_agent',
        'downloaded_at',
    ];

    protected $casts = [
        'downloaded_at' => 'datetime',
    ];

    public function release(): BelongsTo
    {
        return $this->belongsTo(Release::class);
    }
}
