<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Models\Project;
use App\Models\User;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $query = Task::with(['project', 'assignee']);

        // Filter tasks based on user role
        if ($user->isFreelancer()) {
            // Freelancers can only see tasks assigned to them
            $query->where('assigned_to', $user->id);
        } elseif ($user->isProjectManager()) {
            // Project managers can see tasks from their projects
            $query->whereHas('project', function ($q) use ($user) {
                $q->where('project_manager_id', $user->id);
            });
        }
        // Admins can see all tasks (no filter)

        $tasks = $query->latest()->paginate(10);
        
        return Inertia::render('tasks/index', [
            'tasks' => $tasks,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = auth()->user();
        $projects = collect();
        
        if ($user->isAdmin()) {
            $projects = Project::get(['id', 'name']);
        } elseif ($user->isProjectManager()) {
            $projects = Project::where('project_manager_id', $user->id)->get(['id', 'name']);
        }
        
        $freelancers = User::where('role', 'freelancer')->get(['id', 'name']);
        
        return Inertia::render('tasks/create', [
            'projects' => $projects,
            'freelancers' => $freelancers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $task = Task::create($request->validated());

        return redirect()->route('tasks.show', $task)
            ->with('success', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $task->load(['project', 'assignee']);
        
        return Inertia::render('tasks/show', [
            'task' => $task,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $user = auth()->user();
        $projects = collect();
        
        if ($user->isAdmin()) {
            $projects = Project::get(['id', 'name']);
        } elseif ($user->isProjectManager()) {
            $projects = Project::where('project_manager_id', $user->id)->get(['id', 'name']);
        }
        
        $freelancers = User::where('role', 'freelancer')->get(['id', 'name']);
        
        return Inertia::render('tasks/edit', [
            'task' => $task->load(['project', 'assignee']),
            'projects' => $projects,
            'freelancers' => $freelancers,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());

        return redirect()->route('tasks.show', $task)
            ->with('success', 'Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()->route('tasks.index')
            ->with('success', 'Task deleted successfully.');
    }
}