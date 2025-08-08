<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Proposal>
 */
class ProposalFactory extends Factory
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
            'content' => $this->faker->paragraphs(3, true),
            'client_id' => User::factory(),
            'created_by' => User::factory()->state(['role' => 'project_manager']),
            'amount' => $this->faker->numberBetween(5000000, 50000000), // 5M - 50M IDR
            'status' => $this->faker->randomElement(['draft', 'sent', 'accepted', 'rejected']),
            'valid_until' => $this->faker->dateTimeBetween('+1 week', '+1 month'),
        ];
    }
}