<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $amount = $this->faker->numberBetween(1000000, 25000000); // 1M - 25M IDR
        $taxAmount = $amount * 0.11; // 11% tax
        $totalAmount = $amount + $taxAmount;

        return [
            'invoice_number' => 'INV-' . $this->faker->unique()->numerify('####'),
            'project_id' => $this->faker->boolean(80) ? Project::factory() : null,
            'client_id' => User::factory(),
            'created_by' => User::factory()->state(['role' => 'project_manager']),
            'amount' => $amount,
            'tax_amount' => $taxAmount,
            'total_amount' => $totalAmount,
            'status' => $this->faker->randomElement(['draft', 'sent', 'paid', 'overdue', 'cancelled']),
            'due_date' => $this->faker->dateTimeBetween('now', '+1 month'),
            'paid_at' => $this->faker->boolean(30) ? $this->faker->dateTimeBetween('-1 month', 'now') : null,
            'payment_details' => null,
        ];
    }
}