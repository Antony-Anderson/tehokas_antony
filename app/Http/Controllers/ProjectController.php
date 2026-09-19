<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\StoreRequest;
use App\Http\Requests\Project\UpdateRequest;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $projects = Auth::user()
            ->projects()
            ->with('tasks')
            ->latest()
            ->get();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Projects/Create');
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $project = Auth::user()
            ->projects()
            ->create($request->validated());

        return redirect()
            ->route('projects.show', $project)
            ->with('success', 'Projeto criado com sucesso!');
    }

    public function show(Project $project): Response
    {
        Gate::authorize('view', $project);

        $project->load('tasks');

        return Inertia::render('Projects/Show', [
            'project' => $project,
            'columns' => [
                'pending' => $project->tasks
                    ->where('status', 'pending')
                    ->values(),

                'in_progress' => $project->tasks
                    ->where('status', 'in_progress')
                    ->values(),

                'completed' => $project->tasks
                    ->where('status', 'completed')
                    ->values(),
            ],
        ]);
    }

    public function update(
        UpdateRequest $request,
        Project $project
    ): RedirectResponse {
        Gate::authorize('update', $project);

        $project->update($request->validated());

        return redirect()
            ->route('projects.show', $project)
            ->with('success', 'Projeto atualizado com sucesso!');
    }

    public function destroy(Project $project): RedirectResponse
    {
        Gate::authorize('delete', $project);

        $project->delete();

        return redirect()
            ->route('projects.index')
            ->with('success', 'Projeto excluido com sucesso!');
    }
}