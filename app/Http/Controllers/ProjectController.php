<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Models\User;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $query = Project::with(['client', 'projectManager']);

        // Filter projects based on user role
        if ($user->isFreelancer()) {
            // Freelancers can only see projects with tasks assigned to them
            $query->whereHas('tasks', function ($q) use ($user) {
                $q->where('assigned_to', $user->id);
            });
        } elseif ($user->isProjectManager()) {
            // Project managers can see projects they manage
            $query->where('project_manager_id', $user->id);
        }
        // Admins can see all projects (no filter)

        $projects = $query->latest()->paginate(10);
        
        return Inertia::render('projects/index', [
            'projects' => $projects,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $clients = User::where('role', '!=', 'admin')->get(['id', 'name', 'role']);
        $projectManagers = User::where('role', 'project_manager')->get(['id', 'name']);
        
        return Inertia::render('projects/create', [
            'clients' => $clients,
            'projectManagers' => $projectManagers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $project = Project::create($request->validated());

        return redirect()->route('projects.show', $project)
            ->with('success', 'Project created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $project->load(['client', 'projectManager', 'tasks.assignee']);
        
        return Inertia::render('projects/show', [
            'project' => $project,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $clients = User::where('role', '!=', 'admin')->get(['id', 'name', 'role']);
        $projectManagers = User::where('role', 'project_manager')->get(['id', 'name']);
        
        return Inertia::render('projects/edit', [
            'project' => $project->load(['client', 'projectManager']),
            'clients' => $clients,
            'projectManagers' => $projectManagers,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $project->update($request->validated());

        return redirect()->route('projects.show', $project)
            ->with('success', 'Project updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('projects.index')
            ->with('success', 'Project deleted successfully.');
    }
}