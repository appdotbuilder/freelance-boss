<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->paragraph(),
            'project_id' => Project::factory(),
            'assigned_to' => $this->faker->boolean(70) ? User::factory()->state(['role' => 'freelancer']) : null,
            'status' => $this->faker->randomElement(['pending', 'in_progress', 'review', 'completed']),
            'priority' => $this->faker->randomElement(['low', 'medium', 'high', 'urgent']),
            'estimated_hours' => $this->faker->numberBetween(1, 40),
            'actual_hours' => $this->faker->boolean(50) ? $this->faker->numberBetween(1, 45) : null,
            'due_date' => $this->faker->dateTimeBetween('now', '+2 months'),
        ];
    }
}