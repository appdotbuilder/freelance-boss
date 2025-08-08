<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use App\Models\Invoice;
use App\Models\Proposal;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        $stats = [];

        if ($user->isAdmin()) {
            $stats = [
                'total_projects' => Project::count(),
                'active_projects' => Project::where('status', 'active')->count(),
                'total_tasks' => Task::count(),
                'pending_tasks' => Task::where('status', 'pending')->count(),
                'total_users' => User::count(),
                'total_proposals' => Proposal::count(),
                'total_invoices' => Invoice::count(),
                'pending_invoices' => Invoice::where('status', 'sent')->count(),
            ];
            
            $recent_projects = Project::with(['client', 'projectManager'])->latest()->take(5)->get();
            $recent_tasks = Task::with(['project', 'assignee'])->latest()->take(5)->get();
            
        } elseif ($user->isProjectManager()) {
            $stats = [
                'managed_projects' => Project::where('project_manager_id', $user->id)->count(),
                'active_projects' => Project::where('project_manager_id', $user->id)->where('status', 'active')->count(),
                'total_tasks' => Task::whereHas('project', function ($q) use ($user) {
                    $q->where('project_manager_id', $user->id);
                })->count(),
                'pending_tasks' => Task::whereHas('project', function ($q) use ($user) {
                    $q->where('project_manager_id', $user->id);
                })->where('status', 'pending')->count(),
            ];
            
            $recent_projects = Project::with(['client', 'projectManager'])
                ->where('project_manager_id', $user->id)
                ->latest()->take(5)->get();
                
            $recent_tasks = Task::with(['project', 'assignee'])
                ->whereHas('project', function ($q) use ($user) {
                    $q->where('project_manager_id', $user->id);
                })
                ->latest()->take(5)->get();
                
        } else { // Freelancer
            $stats = [
                'assigned_tasks' => Task::where('assigned_to', $user->id)->count(),
                'pending_tasks' => Task::where('assigned_to', $user->id)->where('status', 'pending')->count(),
                'in_progress_tasks' => Task::where('assigned_to', $user->id)->where('status', 'in_progress')->count(),
                'completed_tasks' => Task::where('assigned_to', $user->id)->where('status', 'completed')->count(),
            ];
            
            $recent_projects = Project::whereHas('tasks', function ($q) use ($user) {
                $q->where('assigned_to', $user->id);
            })->with(['client', 'projectManager'])->latest()->take(5)->get();
            
            $recent_tasks = Task::with(['project', 'assignee'])
                ->where('assigned_to', $user->id)
                ->latest()->take(5)->get();
        }

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recent_projects' => $recent_projects,
            'recent_tasks' => $recent_tasks,
            'user_role' => $user->role,
        ]);
    }
}