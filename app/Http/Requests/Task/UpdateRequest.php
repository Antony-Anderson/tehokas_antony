<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'       => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'status'      => ['sometimes', 'required', Rule::in(['pending', 'in_progress', 'completed'])],
            'priority'    => ['sometimes', 'required', Rule::in(['low', 'medium', 'high'])],
            'deadline'    => ['nullable', 'date'],
        ];
    }
}
