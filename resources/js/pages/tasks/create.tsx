import React from 'react';
import { AppShell } from '@/components/app-shell';

import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Project {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
}

interface TaskFormData {
    title: string;
    description: string;
    project_id: string;
    assigned_to: string;
    status: string;
    priority: string;
    estimated_hours: string;
    actual_hours: string;
    due_date: string;
    [key: string]: string;
}

interface Props {
    projects: Project[];
    freelancers: User[];
    [key: string]: unknown;
}



export default function CreateTask({ projects, freelancers }: Props) {
    const { data, setData, post, processing, errors } = useForm<TaskFormData>({
        title: '',
        description: '',
        project_id: '',
        assigned_to: '',
        status: 'pending',
        priority: 'medium',
        estimated_hours: '',
        actual_hours: '',
        due_date: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('tasks.store'));
    };



    return (
        <AppShell>
            <Head title="Create Task" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">✅ Create New Task</h1>
                    <p className="text-gray-600">Create a new task and assign it to a team member</p>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span>📝</span>
                            Task Details
                        </CardTitle>
                        <CardDescription>
                            Fill in the information below to create a new task
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <Label htmlFor="title">Task Title *</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Enter task title"
                                        className={errors.title ? 'border-red-500' : ''}
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Describe the task requirements and acceptance criteria"
                                        rows={4}
                                        className={errors.description ? 'border-red-500' : ''}
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="project_id">Project *</Label>
                                    <Select onValueChange={(value) => setData('project_id', value)}>
                                        <SelectTrigger className={errors.project_id ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select project" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {projects.map((project) => (
                                                <SelectItem key={project.id} value={project.id.toString()}>
                                                    {project.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.project_id && (
                                        <p className="text-red-500 text-sm mt-1">{errors.project_id}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="assigned_to">Assign To</Label>
                                        <Select onValueChange={(value) => setData('assigned_to', value)}>
                                            <SelectTrigger className={errors.assigned_to ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Select freelancer" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">Unassigned</SelectItem>
                                                {freelancers.map((freelancer) => (
                                                    <SelectItem key={freelancer.id} value={freelancer.id.toString()}>
                                                        {freelancer.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.assigned_to && (
                                            <p className="text-red-500 text-sm mt-1">{errors.assigned_to}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="due_date">Due Date</Label>
                                        <Input
                                            id="due_date"
                                            type="date"
                                            value={data.due_date}
                                            onChange={(e) => setData('due_date', e.target.value)}
                                            className={errors.due_date ? 'border-red-500' : ''}
                                        />
                                        {errors.due_date && (
                                            <p className="text-red-500 text-sm mt-1">{errors.due_date}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="status">Status</Label>
                                        <Select onValueChange={(value) => setData('status', value)} defaultValue="pending">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">⏳ Pending</SelectItem>
                                                <SelectItem value="in_progress">🔄 In Progress</SelectItem>
                                                <SelectItem value="review">👀 Review</SelectItem>
                                                <SelectItem value="completed">✅ Completed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.status && (
                                            <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="priority">Priority</Label>
                                        <Select onValueChange={(value) => setData('priority', value)} defaultValue="medium">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">🔽 Low</SelectItem>
                                                <SelectItem value="medium">➡️ Medium</SelectItem>
                                                <SelectItem value="high">🔺 High</SelectItem>
                                                <SelectItem value="urgent">🚨 Urgent</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.priority && (
                                            <p className="text-red-500 text-sm mt-1">{errors.priority}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="estimated_hours">Estimated Hours</Label>
                                        <Input
                                            id="estimated_hours"
                                            type="number"
                                            value={data.estimated_hours}
                                            onChange={(e) => setData('estimated_hours', e.target.value)}
                                            placeholder="0"
                                            min="0"
                                            step="0.5"
                                            className={errors.estimated_hours ? 'border-red-500' : ''}
                                        />
                                        {errors.estimated_hours && (
                                            <p className="text-red-500 text-sm mt-1">{errors.estimated_hours}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="actual_hours">Actual Hours</Label>
                                        <Input
                                            id="actual_hours"
                                            type="number"
                                            value={data.actual_hours}
                                            onChange={(e) => setData('actual_hours', e.target.value)}
                                            placeholder="0"
                                            min="0"
                                            step="0.5"
                                            className={errors.actual_hours ? 'border-red-500' : ''}
                                        />
                                        {errors.actual_hours && (
                                            <p className="text-red-500 text-sm mt-1">{errors.actual_hours}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" disabled={processing} className="flex items-center gap-2">
                                    {processing ? '⏳' : '✨'}
                                    {processing ? 'Creating...' : 'Create Task'}
                                </Button>
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}