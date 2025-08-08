<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && (auth()->user()->isAdmin() || auth()->user()->isProjectManager());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'client_id' => 'required|exists:users,id',
            'project_manager_id' => 'required|exists:users,id',
            'budget' => 'nullable|numeric|min:0',
            'status' => 'required|in:pending,active,on_hold,completed,cancelled',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Project name is required.',
            'client_id.required' => 'Please select a client.',
            'client_id.exists' => 'Selected client is not valid.',
            'project_manager_id.required' => 'Please assign a project manager.',
            'project_manager_id.exists' => 'Selected project manager is not valid.',
            'end_date.after_or_equal' => 'End date must be after or equal to start date.',
        ];
    }
}