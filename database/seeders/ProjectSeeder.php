<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $clients = User::where('role', 'freelancer')->take(2)->get();
        $projectManagers = User::where('role', 'project_manager')->get();

        if ($clients->count() < 2 || $projectManagers->count() < 1) {
            return; // Skip if not enough users
        }

        // Project 1: E-commerce Website
        Project::create([
            'name' => 'E-commerce Website Development',
            'description' => 'Complete e-commerce platform with product catalog, shopping cart, payment integration, and admin panel. Modern responsive design with mobile optimization.',
            'client_id' => $clients[0]->id,
            'project_manager_id' => $projectManagers[0]->id,
            'budget' => 50000000, // 50 million IDR
            'status' => 'active',
            'start_date' => Carbon::now()->subDays(10),
            'end_date' => Carbon::now()->addDays(45),
        ]);

        // Project 2: Mobile App Development
        Project::create([
            'name' => 'Food Delivery Mobile App',
            'description' => 'Cross-platform mobile application for food delivery service with real-time tracking, payment gateway, and restaurant management system.',
            'client_id' => $clients[1]->id,
            'project_manager_id' => $projectManagers->count() > 1 ? $projectManagers[1]->id : $projectManagers[0]->id,
            'budget' => 75000000, // 75 million IDR
            'status' => 'active',
            'start_date' => Carbon::now()->subDays(5),
            'end_date' => Carbon::now()->addDays(60),
        ]);

        // Project 3: Corporate Website
        Project::create([
            'name' => 'Corporate Website Redesign',
            'description' => 'Modern corporate website with CMS, blog functionality, contact forms, and SEO optimization. Professional branding and content strategy.',
            'client_id' => $clients[0]->id,
            'project_manager_id' => $projectManagers[0]->id,
            'budget' => 25000000, // 25 million IDR
            'status' => 'pending',
            'start_date' => Carbon::now()->addDays(5),
            'end_date' => Carbon::now()->addDays(35),
        ]);

        // Project 4: Completed Project
        Project::create([
            'name' => 'Portfolio Website',
            'description' => 'Personal portfolio website for creative professional with gallery, testimonials, and contact integration.',
            'client_id' => $clients[1]->id,
            'project_manager_id' => $projectManagers[0]->id,
            'budget' => 15000000, // 15 million IDR
            'status' => 'completed',
            'start_date' => Carbon::now()->subDays(30),
            'end_date' => Carbon::now()->subDays(5),
        ]);
    }
}