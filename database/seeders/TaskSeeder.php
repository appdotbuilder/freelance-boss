<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $projects = Project::all();
        $freelancers = User::where('role', 'freelancer')->get();

        if ($projects->isEmpty() || $freelancers->isEmpty()) {
            return; // Skip if no projects or freelancers
        }

        // Tasks for E-commerce Website (first project)
        if ($projects->count() > 0) {
            $ecommerceProject = $projects[0];
            
            Task::create([
                'title' => 'Database Design & Setup',
                'description' => 'Design and implement the database schema for products, users, orders, and inventory management.',
                'project_id' => $ecommerceProject->id,
                'assigned_to' => $freelancers[0]->id ?? null,
                'status' => 'completed',
                'priority' => 'high',
                'estimated_hours' => 16,
                'actual_hours' => 18,
                'due_date' => Carbon::now()->subDays(5),
            ]);

            Task::create([
                'title' => 'User Authentication System',
                'description' => 'Implement secure user registration, login, password reset, and profile management functionality.',
                'project_id' => $ecommerceProject->id,
                'assigned_to' => $freelancers[0]->id ?? null,
                'status' => 'in_progress',
                'priority' => 'high',
                'estimated_hours' => 20,
                'actual_hours' => 12,
                'due_date' => Carbon::now()->addDays(3),
            ]);

            Task::create([
                'title' => 'Product Catalog UI',
                'description' => 'Design and develop the product listing pages, search functionality, and filtering options.',
                'project_id' => $ecommerceProject->id,
                'assigned_to' => $freelancers[1]->id ?? null,
                'status' => 'in_progress',
                'priority' => 'medium',
                'estimated_hours' => 24,
                'actual_hours' => 8,
                'due_date' => Carbon::now()->addDays(7),
            ]);

            Task::create([
                'title' => 'Shopping Cart Implementation',
                'description' => 'Build shopping cart functionality with add/remove items, quantity updates, and price calculations.',
                'project_id' => $ecommerceProject->id,
                'assigned_to' => null,
                'status' => 'pending',
                'priority' => 'medium',
                'estimated_hours' => 18,
                'actual_hours' => null,
                'due_date' => Carbon::now()->addDays(10),
            ]);

            Task::create([
                'title' => 'Payment Gateway Integration',
                'description' => 'Integrate Midtrans payment system for secure online transactions and order processing.',
                'project_id' => $ecommerceProject->id,
                'assigned_to' => null,
                'status' => 'pending',
                'priority' => 'urgent',
                'estimated_hours' => 22,
                'actual_hours' => null,
                'due_date' => Carbon::now()->addDays(15),
            ]);
        }

        // Tasks for Mobile App (second project)
        if ($projects->count() > 1) {
            $mobileProject = $projects[1];
            
            Task::create([
                'title' => 'App Architecture Planning',
                'description' => 'Define the overall app architecture, technology stack, and development approach.',
                'project_id' => $mobileProject->id,
                'assigned_to' => $freelancers[0]->id ?? null,
                'status' => 'completed',
                'priority' => 'high',
                'estimated_hours' => 12,
                'actual_hours' => 10,
                'due_date' => Carbon::now()->subDays(3),
            ]);

            Task::create([
                'title' => 'User Interface Design',
                'description' => 'Create wireframes and UI designs for all app screens following mobile design best practices.',
                'project_id' => $mobileProject->id,
                'assigned_to' => $freelancers[1]->id ?? null,
                'status' => 'review',
                'priority' => 'high',
                'estimated_hours' => 32,
                'actual_hours' => 30,
                'due_date' => Carbon::now()->addDays(2),
            ]);

            Task::create([
                'title' => 'Restaurant Management Module',
                'description' => 'Develop restaurant dashboard for menu management, order tracking, and analytics.',
                'project_id' => $mobileProject->id,
                'assigned_to' => $freelancers[2]->id ?? null,
                'status' => 'pending',
                'priority' => 'medium',
                'estimated_hours' => 28,
                'actual_hours' => null,
                'due_date' => Carbon::now()->addDays(14),
            ]);
        }

        // Tasks for Corporate Website (third project)
        if ($projects->count() > 2) {
            $corporateProject = $projects[2];
            
            Task::create([
                'title' => 'Content Strategy & Planning',
                'description' => 'Develop content strategy, site map, and information architecture for the corporate website.',
                'project_id' => $corporateProject->id,
                'assigned_to' => $freelancers[2]->id ?? null,
                'status' => 'pending',
                'priority' => 'high',
                'estimated_hours' => 16,
                'actual_hours' => null,
                'due_date' => Carbon::now()->addDays(8),
            ]);

            Task::create([
                'title' => 'Homepage Design',
                'description' => 'Design and develop the homepage with hero section, company overview, and call-to-action elements.',
                'project_id' => $corporateProject->id,
                'assigned_to' => null,
                'status' => 'pending',
                'priority' => 'medium',
                'estimated_hours' => 20,
                'actual_hours' => null,
                'due_date' => Carbon::now()->addDays(12),
            ]);
        }
    }
}