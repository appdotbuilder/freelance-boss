import React from 'react';
import { AppShell } from '@/components/app-shell';

import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Task {
    id: number;
    title: string;
    description?: string;
    status: string;
    priority: string;
    estimated_hours?: number;
    actual_hours?: number;
    due_date?: string;
    project: { name: string };
    assignee?: { name: string };
    created_at: string;
}

interface Props {
    tasks: {
        data: Task[];
        current_page: number;
        last_page: number;
        total: number;
    };
    [key: string]: unknown;
}



export default function TasksIndex({ tasks }: Props) {
    const getStatusBadge = (status: string) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            in_progress: 'bg-blue-100 text-blue-800',
            review: 'bg-purple-100 text-purple-800',
            completed: 'bg-green-100 text-green-800',
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

    const getPriorityIcon = (priority: string) => {
        const icons = {
            low: '🔽',
            medium: '➡️',
            high: '🔺',
            urgent: '🚨',
        };
        return icons[priority as keyof typeof icons] || '➡️';
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString();
    };

    const getStatusIcon = (status: string) => {
        const icons = {
            pending: '⏳',
            in_progress: '🔄',
            review: '👀',
            completed: '✅',
        };
        return icons[status as keyof typeof icons] || '📝';
    };

    return (
        <AppShell>
            <Head title="Tasks" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">✅ Tasks</h1>
                        <p className="text-gray-600">Manage and track your tasks</p>
                    </div>
                    <Link href={route('tasks.create')}>
                        <Button className="flex items-center gap-2">
                            <span>➕</span>
                            New Task
                        </Button>
                    </Link>
                </div>

                {/* Tasks List */}
                <div className="space-y-4">
                    {tasks.data.length > 0 ? tasks.data.map((task) => (
                        <Card key={task.id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xl">{getStatusIcon(task.status)}</span>
                                            <CardTitle className="text-lg">{task.title}</CardTitle>
                                        </div>
                                        <CardDescription className="mb-3">
                                            {task.description ? 
                                                (task.description.length > 150 ? 
                                                    task.description.substring(0, 150) + '...' : 
                                                    task.description) 
                                                : 'No description provided'
                                            }
                                        </CardDescription>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                            <span className="flex items-center gap-1">
                                                📊 <span className="font-medium">{task.project.name}</span>
                                            </span>
                                            {task.assignee && (
                                                <span className="flex items-center gap-1">
                                                    👤 <span className="font-medium">{task.assignee.name}</span>
                                                </span>
                                            )}
                                            {task.due_date && (
                                                <span className="flex items-center gap-1">
                                                    📅 <span className="font-medium">{formatDate(task.due_date)}</span>
                                                </span>
                                            )}
                                            {task.estimated_hours && (
                                                <span className="flex items-center gap-1">
                                                    ⏱️ <span className="font-medium">{task.estimated_hours}h estimated</span>
                                                </span>
                                            )}
                                            {task.actual_hours && (
                                                <span className="flex items-center gap-1">
                                                    ✅ <span className="font-medium">{task.actual_hours}h actual</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 items-end">
                                        <div className="flex gap-2">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(task.status)}`}>
                                                {task.status.replace('_', ' ')}
                                            </span>
                                            <span className={`px-2 py-1 text-xs rounded-full ${getPriorityBadge(task.priority)} flex items-center gap-1`}>
                                                {getPriorityIcon(task.priority)} {task.priority}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link href={route('tasks.show', task.id)}>
                                                <Button variant="outline" size="sm">
                                                    View
                                                </Button>
                                            </Link>
                                            <Link href={route('tasks.edit', task.id)}>
                                                <Button variant="outline" size="sm">
                                                    ✏️
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )) : (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <div className="text-6xl mb-4">📝</div>
                                <h3 className="text-lg font-medium mb-2">No Tasks Yet</h3>
                                <p className="text-gray-600 mb-6 text-center">
                                    Create your first task to start tracking your work
                                </p>
                                <Link href={route('tasks.create')}>
                                    <Button className="flex items-center gap-2">
                                        <span>➕</span>
                                        Create Your First Task
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Pagination */}
                {tasks.total > 10 && (
                    <div className="flex justify-center items-center gap-2 mt-6">
                        <span className="text-sm text-gray-600">
                            Showing {tasks.data.length} of {tasks.total} tasks
                        </span>
                    </div>
                )}
            </div>
        </AppShell>
    );
}