import React from 'react';
import { AppShell } from '@/components/app-shell';

import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Project {
    id: number;
    name: string;
    description?: string;
    status: string;
    budget?: number;
    start_date?: string;
    end_date?: string;
    client: { name: string };
    project_manager: { name: string };
    created_at: string;
}

interface Props {
    projects: {
        data: Project[];
        current_page: number;
        last_page: number;
        total: number;
    };
    [key: string]: unknown;
}



export default function ProjectsIndex({ projects }: Props) {
    const getStatusBadge = (status: string) => {
        const colors = {
            active: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            completed: 'bg-blue-100 text-blue-800',
            on_hold: 'bg-gray-100 text-gray-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString();
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(amount);
    };

    return (
        <AppShell>
            <Head title="Projects" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📊 Projects</h1>
                        <p className="text-gray-600">Manage your freelance projects</p>
                    </div>
                    <Link href={route('projects.create')}>
                        <Button className="flex items-center gap-2">
                            <span>➕</span>
                            New Project
                        </Button>
                    </Link>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.data.length > 0 ? projects.data.map((project) => (
                        <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg mb-1">{project.name}</CardTitle>
                                        <CardDescription className="text-sm">
                                            {project.description ? 
                                                (project.description.length > 100 ? 
                                                    project.description.substring(0, 100) + '...' : 
                                                    project.description) 
                                                : 'No description'
                                            }
                                        </CardDescription>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(project.status)}`}>
                                        {project.status}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex justify-between">
                                        <span>👤 Client:</span>
                                        <span className="font-medium">{project.client.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>👨‍💼 PM:</span>
                                        <span className="font-medium">{project.project_manager.name}</span>
                                    </div>
                                    {project.budget && (
                                        <div className="flex justify-between">
                                            <span>💰 Budget:</span>
                                            <span className="font-medium text-green-600">
                                                {formatCurrency(project.budget)}
                                            </span>
                                        </div>
                                    )}
                                    {project.start_date && (
                                        <div className="flex justify-between">
                                            <span>📅 Start:</span>
                                            <span>{formatDate(project.start_date)}</span>
                                        </div>
                                    )}
                                    {project.end_date && (
                                        <div className="flex justify-between">
                                            <span>🏁 End:</span>
                                            <span>{formatDate(project.end_date)}</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex gap-2 mt-4">
                                    <Link href={route('projects.show', project.id)} className="flex-1">
                                        <Button variant="outline" size="sm" className="w-full">
                                            View Details
                                        </Button>
                                    </Link>
                                    <Link href={route('projects.edit', project.id)}>
                                        <Button variant="outline" size="sm">
                                            ✏️
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    )) : (
                        <Card className="col-span-full">
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <div className="text-6xl mb-4">📊</div>
                                <h3 className="text-lg font-medium mb-2">No Projects Yet</h3>
                                <p className="text-gray-600 mb-6 text-center">
                                    Create your first project to start managing your freelance work
                                </p>
                                <Link href={route('projects.create')}>
                                    <Button className="flex items-center gap-2">
                                        <span>➕</span>
                                        Create Your First Project
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Pagination */}
                {projects.total > 10 && (
                    <div className="flex justify-center items-center gap-2 mt-6">
                        <span className="text-sm text-gray-600">
                            Showing {projects.data.length} of {projects.total} projects
                        </span>
                    </div>
                )}
            </div>
        </AppShell>
    );
}