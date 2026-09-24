<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RevenueEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'source',
        'amount_usd',
        'transaction_ref',
        'note',
        'recorded_at',
    ];

    protected $casts = [
        'amount_usd'  => 'decimal:2',
        'recorded_at' => 'datetime',
    ];
}
