<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Project;
use App\Models\Task;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        $user = Auth::user();

        $projectsCount = Project::where('user_id', $user->id)->count();
        $userProjectIds = Project::where('user_id', $user->id)->pluck('id');
        
        $totalTasksCount = Task::whereIn('project_id', $userProjectIds)->count();
        $completedTasksCount = Task::whereIn('project_id', $userProjectIds)
            ->where('status', 'completed')
            ->count();
        $pendingTasksCount = $totalTasksCount - $completedTasksCount;

        return Inertia::render('Profile/Edit', [
            'user' => $user,
            'stats' => [
                'projects_count' => $projectsCount,
                'total_tasks' => $totalTasksCount,
                'completed_tasks' => $completedTasksCount,
                'pending_tasks' => $pendingTasksCount,
            ],
        ]);
    }

    public function updateInformation(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ], [
            'name.required' => 'O nome é obrigatório.',
        ]);

        $user->update([
            'name' => $validated['name'],
        ]);

        return redirect()->route('profile.edit')->with('success', 'Nome atualizado com sucesso!');
    }
    
    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ], [
            'current_password.required' => 'Informe sua senha atual.',
            'current_password.current_password' => 'A senha atual está incorreta.',
            'password.required' => 'Informe a nova senha.',
            'password.confirmed' => 'A confirmação da nova senha não confere.',
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->route('profile.edit')->with('success', 'Senha alterada com sucesso!');
    }
}
