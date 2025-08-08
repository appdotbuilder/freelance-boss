import React from 'react';
import { AppShell } from '@/components/app-shell';

import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Props {
    stats: Record<string, number>;
    recent_projects: Array<{
        id: number;
        name: string;
        status: string;
        client: { name: string };
        project_manager: { name: string };
        created_at: string;
    }>;
    recent_tasks: Array<{
        id: number;
        title: string;
        status: string;
        priority: string;
        project: { name: string };
        assignee?: { name: string };
        due_date?: string;
    }>;
    user_role: string;
    [key: string]: unknown;
}



export default function Dashboard({ stats, recent_projects, recent_tasks, user_role }: Props) {
    const getStatusBadge = (status: string) => {
        const colors = {
            active: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            completed: 'bg-blue-100 text-blue-800',
            on_hold: 'bg-gray-100 text-gray-800',
            cancelled: 'bg-red-100 text-red-800',
            in_progress: 'bg-blue-100 text-blue-800',
            review: 'bg-purple-100 text-purple-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const getPriorityBadge = (priority: string) => {
        const colors = {
            low: 'bg-gray-100 text-gray-800',
            medium: 'bg-yellow-100 text-yellow-800',
            high: 'bg-orange-100 text-orange-800',
            urgent: 'bg-red-100 text-red-800',
        };
        return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString();
    };

    return (
        <AppShell>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Welcome Section */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        🏠 Welcome to Your Dashboard
                    </h1>
                    <p className="text-gray-600 text-lg">
                        {user_role === 'admin' && '🔧 Admin Dashboard - Full system overview'}
                        {user_role === 'project_manager' && '📊 Project Manager Dashboard - Your projects and teams'}
                        {user_role === 'freelancer' && '💼 Freelancer Dashboard - Your tasks and assignments'}
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {Object.entries(stats).map(([key, value]) => (
                        <Card key={key} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-2">
                                <CardDescription className="text-sm font-medium">
                                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </CardDescription>
                                <CardTitle className="text-3xl font-bold text-blue-600">
                                    {value}
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Projects */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-xl">📊 Recent Projects</CardTitle>
                                <CardDescription>Latest project updates</CardDescription>
                            </div>
                            <Link href={route('projects.index')}>
                                <Button variant="outline" size="sm">View All</Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recent_projects.length > 0 ? recent_projects.map((project) => (
                                    <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">{project.name}</h4>
                                            <p className="text-sm text-gray-600">
                                                Client: {project.client.name} | PM: {project.project_manager.name}
                                            </p>
                                            <p className="text-xs text-gray-400">{formatDate(project.created_at)}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(project.status)}`}>
                                            {project.status}
                                        </span>
                                    </div>
                                )) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <p>📋 No projects yet</p>
                                        <p className="text-sm">Create your first project to get started</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Tasks */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-xl">✅ Recent Tasks</CardTitle>
                                <CardDescription>Latest task updates</CardDescription>
                            </div>
                            <Link href={route('tasks.index')}>
                                <Button variant="outline" size="sm">View All</Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recent_tasks.length > 0 ? recent_tasks.map((task) => (
                                    <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">{task.title}</h4>
                                            <p className="text-sm text-gray-600">
                                                Project: {task.project.name}
                                                {task.assignee && ` | Assigned to: ${task.assignee.name}`}
                                            </p>
                                            {task.due_date && (
                                                <p className="text-xs text-gray-400">Due: {formatDate(task.due_date)}</p>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(task.status)}`}>
                                                {task.status}
                                            </span>
                                            <span className={`px-2 py-1 text-xs rounded-full ${getPriorityBadge(task.priority)}`}>
                                                {task.priority}
                                            </span>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <p>📝 No tasks yet</p>
                                        <p className="text-sm">Tasks will appear here once created</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle className="text-xl">🚀 Quick Actions</CardTitle>
                        <CardDescription>Common actions based on your role</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {(user_role === 'admin' || user_role === 'project_manager') && (
                                <>
                                    <Link href={route('projects.create')}>
                                        <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                                            <span className="text-2xl">📊</span>
                                            <span>New Project</span>
                                        </Button>
                                    </Link>
                                    <Link href={route('tasks.create')}>
                                        <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                                            <span className="text-2xl">✅</span>
                                            <span>New Task</span>
                                        </Button>
                                    </Link>
                                </>
                            )}
                            <Link href={route('projects.index')}>
                                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                                    <span className="text-2xl">📋</span>
                                    <span>View Projects</span>
                                </Button>
                            </Link>
                            <Link href={route('tasks.index')}>
                                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                                    <span className="text-2xl">📝</span>
                                    <span>View Tasks</span>
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}
