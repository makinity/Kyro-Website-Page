import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminSidebar from '@/Components/admin/AdminSidebar';
import AdminHeader from '@/Components/admin/AdminHeader';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title = 'Admin — KyroPad' }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Head title={title} />

            <div className="flex min-h-screen bg-kyro-bg text-kyro-primary">
                {/* Sidebar */}
                <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                {/* Main content area */}
                <div className="flex flex-1 flex-col lg:ml-64">
                    <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

                    <main className="flex-1 p-6 lg:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
