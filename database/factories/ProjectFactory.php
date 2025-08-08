<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'client_id' => User::factory(),
            'project_manager_id' => User::factory()->state(['role' => 'project_manager']),
            'budget' => $this->faker->numberBetween(10000000, 100000000), // 10M - 100M IDR
            'status' => $this->faker->randomElement(['pending', 'active', 'on_hold', 'completed', 'cancelled']),
            'start_date' => $this->faker->dateTimeBetween('-1 month', '+1 month'),
            'end_date' => $this->faker->dateTimeBetween('+1 month', '+3 months'),
        ];
    }
}