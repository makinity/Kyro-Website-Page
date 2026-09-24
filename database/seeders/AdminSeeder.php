<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Seed the single admin user from .env credentials.
     * Safe to run multiple times — uses updateOrCreate.
     */
    public function run(): void
    {
        $email    = env('ADMIN_EMAIL', 'admin@kyropad.com');
        $password = env('ADMIN_PASSWORD');
        $name     = env('ADMIN_NAME', 'KyroPad Admin');

        if (! $password) {
            $this->command->error('ADMIN_PASSWORD is not set in .env — skipping admin seeder.');
            return;
        }

        User::updateOrCreate(
            ['email' => $email],
            [
                'name'              => $name,
                'password'          => Hash::make($password),
                'email_verified_at' => now(),
            ]
        );

        $this->command->info("Admin user seeded: {$email}");
    }
}
