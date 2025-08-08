import React from 'react';
import { AppShell } from '@/components/app-shell';

import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface User {
    id: number;
    name: string;
    role?: string;
}

interface ProjectFormData {
    name: string;
    description: string;
    client_id: string;
    project_manager_id: string;
    budget: string;
    status: string;
    start_date: string;
    end_date: string;
    [key: string]: string;
}

interface Props {
    clients: User[];
    projectManagers: User[];
    [key: string]: unknown;
}



export default function CreateProject({ clients, projectManagers }: Props) {
    const { data, setData, post, processing, errors } = useForm<ProjectFormData>({
        name: '',
        description: '',
        client_id: '',
        project_manager_id: '',
        budget: '',
        status: 'pending',
        start_date: '',
        end_date: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('projects.store'));
    };

    return (
        <AppShell>
            <Head title="Create Project" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">📊 Create New Project</h1>
                    <p className="text-gray-600">Set up a new project for your client</p>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span>✨</span>
                            Project Details
                        </CardTitle>
                        <CardDescription>
                            Fill in the information below to create a new project
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <Label htmlFor="name">Project Name *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter project name"
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Describe the project goals and requirements"
                                        rows={4}
                                        className={errors.description ? 'border-red-500' : ''}
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="client_id">Client *</Label>
                                        <Select onValueChange={(value) => setData('client_id', value)}>
                                            <SelectTrigger className={errors.client_id ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Select client" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {clients.map((client) => (
                                                    <SelectItem key={client.id} value={client.id.toString()}>
                                                        {client.name} {client.role && `(${client.role})`}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.client_id && (
                                            <p className="text-red-500 text-sm mt-1">{errors.client_id}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="project_manager_id">Project Manager *</Label>
                                        <Select onValueChange={(value) => setData('project_manager_id', value)}>
                                            <SelectTrigger className={errors.project_manager_id ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Select PM" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {projectManagers.map((pm) => (
                                                    <SelectItem key={pm.id} value={pm.id.toString()}>
                                                        {pm.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.project_manager_id && (
                                            <p className="text-red-500 text-sm mt-1">{errors.project_manager_id}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="budget">Budget (IDR)</Label>
                                        <Input
                                            id="budget"
                                            type="number"
                                            value={data.budget}
                                            onChange={(e) => setData('budget', e.target.value)}
                                            placeholder="0"
                                            min="0"
                                            step="1000"
                                            className={errors.budget ? 'border-red-500' : ''}
                                        />
                                        {errors.budget && (
                                            <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="status">Status</Label>
                                        <Select onValueChange={(value) => setData('status', value)} defaultValue="pending">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="on_hold">On Hold</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.status && (
                                            <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="start_date">Start Date</Label>
                                        <Input
                                            id="start_date"
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) => setData('start_date', e.target.value)}
                                            className={errors.start_date ? 'border-red-500' : ''}
                                        />
                                        {errors.start_date && (
                                            <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="end_date">End Date</Label>
                                        <Input
                                            id="end_date"
                                            type="date"
                                            value={data.end_date}
                                            onChange={(e) => setData('end_date', e.target.value)}
                                            className={errors.end_date ? 'border-red-500' : ''}
                                        />
                                        {errors.end_date && (
                                            <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" disabled={processing} className="flex items-center gap-2">
                                    {processing ? '⏳' : '✨'}
                                    {processing ? 'Creating...' : 'Create Project'}
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