<?php

namespace App\Http\Controllers;

use App\Http\Requests\Task\StoreRequest;
use App\Http\Requests\Task\UpdateRequest;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;

class TaskController extends Controller
{
    public function store(StoreRequest $request, Project $project): RedirectResponse
    {
        Gate::authorize('update', $project);

        $project->tasks()->create($request->validated());

        return redirect()
            ->route('projects.show', $project)
            ->with('success', 'Tarefa criada com sucesso!');
    }

    public function update(
        UpdateRequest $request,
        Project $project,
        Task $task
    ): RedirectResponse {
        Gate::authorize('update', $project);

        $task->update($request->validated());

        return redirect()
            ->route('projects.show', $project)
            ->with('success', 'Tarefa atualizada com sucesso!');
    }

    public function destroy(Project $project, Task $task): RedirectResponse
    {
        Gate::authorize('update', $project);

        $task->delete();

        return redirect()
            ->route('projects.show', $project)
            ->with('success', 'Tarefa excluida com sucesso!');
    }
}