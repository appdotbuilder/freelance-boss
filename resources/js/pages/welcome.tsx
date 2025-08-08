import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';



export default function Welcome() {
    const features = [
        {
            icon: '📊',
            title: 'Project Management',
            description: 'Create, track, and manage all your freelance projects in one place with comprehensive project oversight.'
        },
        {
            icon: '✅',
            title: 'Task Management',
            description: 'Break down projects into manageable tasks, assign to team members, and track progress in real-time.'
        },
        {
            icon: '👥',
            title: 'Role-Based Access',
            description: 'Secure access control with Admin, Project Manager, and Freelancer roles for proper workflow management.'
        },
        {
            icon: '💰',
            title: 'Proposal & Invoicing',
            description: 'Generate professional proposals with AI assistance and manage invoices with integrated payment processing.'
        },
        {
            icon: '🚀',
            title: 'Performance Optimized',
            description: 'Built with caching and optimization features to ensure smooth operation even with large datasets.'
        },
        {
            icon: '🔐',
            title: 'Secure & Reliable',
            description: 'Enterprise-grade security with role-based permissions and secure payment integration via Midtrans.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center space-x-3">
                            <div className="text-3xl">💼</div>
                            <h1 className="text-2xl font-bold text-gray-900">FreelanceHub</h1>
                        </div>
                        <div className="space-x-4">
                            <Link href={route('login')}>
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link href={route('register')}>
                                <Button>Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
                        🚀 Professional Freelancer
                        <span className="block text-blue-600">Project Management</span>
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Streamline your freelance business with our comprehensive project management platform. 
                        From proposals to payments, manage everything with enterprise-grade tools and intuitive design.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href={route('register')}>
                            <Button size="lg" className="px-8 py-3 text-lg">
                                🎯 Start Managing Projects
                            </Button>
                        </Link>
                        <Link href={route('login')}>
                            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                                👤 Login to Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">✨ Everything You Need</h3>
                    <p className="text-lg text-gray-600">Comprehensive tools for modern freelance project management</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                            <CardHeader>
                                <div className="text-4xl mb-2">{feature.icon}</div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Demo Section */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">📱 Administrative Interface</h3>
                        <p className="text-lg text-gray-600">Filament-style admin interface for powerful project management</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-xl p-8">
                        <div className="grid md:grid-cols-3 gap-6 text-center">
                            <div className="p-6 border rounded-lg">
                                <div className="text-3xl mb-3">🎯</div>
                                <h4 className="font-semibold text-lg mb-2">Project Dashboard</h4>
                                <p className="text-gray-600">Overview of all projects, status tracking, and key metrics</p>
                            </div>
                            <div className="p-6 border rounded-lg">
                                <div className="text-3xl mb-3">📋</div>
                                <h4 className="font-semibold text-lg mb-2">Task Management</h4>
                                <p className="text-gray-600">Assign tasks, track progress, and manage deadlines efficiently</p>
                            </div>
                            <div className="p-6 border rounded-lg">
                                <div className="text-3xl mb-3">💳</div>
                                <h4 className="font-semibold text-lg mb-2">Financial Tools</h4>
                                <p className="text-gray-600">Generate invoices, proposals, and process payments seamlessly</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="bg-blue-600 rounded-2xl p-12 text-center text-white">
                    <h3 className="text-3xl font-bold mb-4">🚀 Ready to Transform Your Freelance Business?</h3>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of freelancers who have streamlined their workflow with our platform
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href={route('register')}>
                            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
                                🎉 Create Free Account
                            </Button>
                        </Link>
                        <Link href={route('login')}>
                            <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-blue-600">
                                💼 Access Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="text-2xl">💼</div>
                            <h4 className="text-xl font-bold">FreelanceHub</h4>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Professional project management platform for modern freelancers
                        </p>
                        <div className="flex justify-center space-x-6">
                            <span className="text-gray-400">🔐 Secure</span>
                            <span className="text-gray-400">⚡ Fast</span>
                            <span className="text-gray-400">🛠️ Comprehensive</span>
                            <span className="text-gray-400">💰 Payment Ready</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}