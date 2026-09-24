<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Release extends Model
{
    use HasFactory;

    protected $fillable = [
        'version',
        'platform',
        'release_notes',
        'download_url',
        'is_latest',
        'published_at',
    ];

    protected $casts = [
        'is_latest'    => 'boolean',
        'published_at' => 'datetime',
    ];

    public function downloadEvents(): HasMany
    {
        return $this->hasMany(DownloadEvent::class);
    }
}
