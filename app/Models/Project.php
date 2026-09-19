<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'title',
        'description',
    ];

    protected $appends = [
        'health_status',
        'tasks_count',
        'overdue_count',
        'completed_count',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    /**
     * Indicador de Saude:
     * Se mais de 20% das tarefas estiverem atrasadas, retorna "alert".
     */
    public function getHealthStatusAttribute(): string
    {
        $total = $this->tasks->count();

        if ($total === 0) {
            return 'healthy';
        }

        $overdue = $this->tasks->filter(fn($task) => $task->is_overdue)->count();

        return ($overdue / $total) > 0.20 ? 'alert' : 'healthy';
    }

    public function getTasksCountAttribute(): int
    {
        return $this->tasks->count();
    }

    public function getOverdueCountAttribute(): int
    {
        return $this->tasks->filter(fn($task) => $task->is_overdue)->count();
    }

    public function getCompletedCountAttribute(): int
    {
        return $this->tasks->where('status', 'completed')->count();
    }
}
