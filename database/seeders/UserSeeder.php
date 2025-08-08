<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@freelancehub.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'is_active' => true,
        ]);

        // Create project managers
        User::create([
            'name' => 'John Manager',
            'email' => 'pm1@freelancehub.com',
            'password' => Hash::make('password'),
            'role' => 'project_manager',
            'is_active' => true,
        ]);

        User::create([
            'name' => 'Sarah Thompson',
            'email' => 'pm2@freelancehub.com',
            'password' => Hash::make('password'),
            'role' => 'project_manager',
            'is_active' => true,
        ]);

        // Create freelancers
        User::create([
            'name' => 'Alex Developer',
            'email' => 'freelancer1@freelancehub.com',
            'password' => Hash::make('password'),
            'role' => 'freelancer',
            'is_active' => true,
        ]);

        User::create([
            'name' => 'Maria Designer',
            'email' => 'freelancer2@freelancehub.com',
            'password' => Hash::make('password'),
            'role' => 'freelancer',
            'is_active' => true,
        ]);

        User::create([
            'name' => 'David Writer',
            'email' => 'freelancer3@freelancehub.com',
            'password' => Hash::make('password'),
            'role' => 'freelancer',
            'is_active' => true,
        ]);

        // Create clients
        User::create([
            'name' => 'ABC Corporation',
            'email' => 'client1@company.com',
            'password' => Hash::make('password'),
            'role' => 'freelancer', // Using freelancer role as client for now
            'is_active' => true,
        ]);

        User::create([
            'name' => 'XYZ Startup',
            'email' => 'client2@startup.com',
            'password' => Hash::make('password'),
            'role' => 'freelancer', // Using freelancer role as client for now
            'is_active' => true,
        ]);
    }
}