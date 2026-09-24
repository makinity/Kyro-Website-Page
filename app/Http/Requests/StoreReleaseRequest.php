<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReleaseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Gate already enforced at route level via auth middleware
    }

    public function rules(): array
    {
        return [
            'version'       => ['required', 'string', 'max:20'],
            'platform'      => ['required', 'string', 'in:windows,ios,android'],
            'release_notes' => ['required', 'string'],
            'download_url'  => ['required', 'url', 'max:500'],
            'is_latest'     => ['boolean'],
            'published_at'  => ['nullable', 'date'],
        ];
    }

    public function messages(): array
    {
        return [
            'version.required'       => 'A version number is required (e.g. 1.0.0).',
            'platform.in'            => 'Platform must be windows, ios, or android.',
            'download_url.url'       => 'Download URL must be a valid URL.',
            'release_notes.required' => 'Release notes are required.',
        ];
    }
}
