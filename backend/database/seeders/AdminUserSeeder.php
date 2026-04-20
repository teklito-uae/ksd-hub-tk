<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@kasaragodhub.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('Admin@KSD#2026!'),
                'role' => 'admin',
                'phone_number' => '9995550000',
            ]
        );
    }
}
