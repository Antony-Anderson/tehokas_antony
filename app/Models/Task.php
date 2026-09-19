<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'project_id',
        'title',
        'description',
        'status',
        'priority',
        'deadline',
    ];

    protected $casts = [
        'deadline' => 'date',
    ];

    protected $appends = [
        'is_overdue',
        'status_label',
        'priority_label',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Verifica se a tarefa esta atrasada:
     * tem deadline no passado e nao esta concluida.
     */
    public function getIsOverdueAttribute(): bool
    {
        if (! $this->deadline) {
            return false;
        }

        return $this->deadline->isPast() && $this->status !== 'completed';
    }

    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            'pending'     => 'Pendente',
            'in_progress' => 'Em Andamento',
            'completed'   => 'Concluida',
            default       => $this->status,
        };
    }

    public function getPriorityLabelAttribute(): string
    {
        return match($this->priority) {
            'low'    => 'Baixa',
            'medium' => 'Media',
            'high'   => 'Alta',
            default  => $this->priority,
        };
    }
}
