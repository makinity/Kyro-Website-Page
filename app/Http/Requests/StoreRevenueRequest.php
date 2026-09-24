<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRevenueRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Gate already enforced at route level via auth middleware
    }

    public function rules(): array
    {
        return [
            'source'          => ['required', 'string', 'in:ios_iap,android_iap,manual'],
            'amount_usd'      => ['required', 'numeric', 'min:0.01', 'max:99999.99'],
            'transaction_ref' => ['nullable', 'string', 'max:200'],
            'note'            => ['nullable', 'string'],
            'recorded_at'     => ['nullable', 'date'],
        ];
    }

    public function messages(): array
    {
        return [
            'source.in'          => 'Source must be ios_iap, android_iap, or manual.',
            'amount_usd.numeric' => 'Amount must be a valid number.',
            'amount_usd.min'     => 'Amount must be at least $0.01.',
        ];
    }
}
