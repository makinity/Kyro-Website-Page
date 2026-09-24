import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import AppButton from '@/Components/shared/AppButton';
import AppCard from '@/Components/shared/AppCard';
import GlowBadge from '@/Components/shared/GlowBadge';
import ReleaseForm from '@/Components/admin/ReleaseForm';

interface Release {
    id: number;
    version: string;
    platform: string;
    download_url: string;
    release_notes: string;
    is_latest: boolean;
    published_at: string | null;
}

interface ReleasesProps {
    releases: Release[];
}

const platformLabel: Record<string, string> = {
    windows: '🪟 Windows',
    ios:     '🍏 iOS',
    android: '🤖 Android',
};

export default function Releases({ releases }: ReleasesProps) {
    const [formOpen, setFormOpen] = useState(false);

    const handleDelete = (id: number) => {
        if (!confirm('Delete this release? This cannot be undone.')) return;
        router.delete(route('admin.releases.destroy', id));
    };

    return (
        <AdminLayout title="Releases — KyroPad Admin">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-heading text-2xl font-bold text-kyro-primary">Releases</h1>
                        <p className="mt-1 text-sm text-kyro-muted">Manage published KyroPad versions.</p>
                    </div>
                    <AppButton
                        variant="primary"
                        size="sm"
                        leftIcon={<Plus size={15} />}
                        onClick={() => setFormOpen(true)}
                    >
                        New Release
                    </AppButton>
                </div>

                {/* Releases table */}
                <AppCard padding="none" className="overflow-hidden">
                    {/* Table header */}
                    <div className="grid grid-cols-12 border-b border-kyro-border bg-kyro-surface px-6 py-3 text-xs font-semibold uppercase tracking-widest text-kyro-cyan">
                        <span className="col-span-2">Platform</span>
                        <span className="col-span-2">Version</span>
                        <span className="col-span-5">Release Notes</span>
                        <span className="col-span-2">Published</span>
                        <span className="col-span-1 text-right">Actions</span>
                    </div>

                    {releases.length === 0 ? (
                        <div className="px-6 py-12 text-center">
                            <p className="text-sm text-kyro-muted">No releases yet.</p>
                            <button
                                onClick={() => setFormOpen(true)}
                                className="mt-2 text-sm text-kyro-cyan hover:underline"
                            >
                                Publish the first release →
                            </button>
                        </div>
                    ) : (
                        <div className="divide-y divide-kyro-border/50">
                            {releases.map((release) => (
                                <div
                                    key={release.id}
                                    className="grid grid-cols-12 items-center px-6 py-4 hover:bg-kyro-surface/50 transition-colors"
                                >
                                    <div className="col-span-2 flex items-center gap-2">
                                        <span className="text-sm text-kyro-muted">
                                            {platformLabel[release.platform] ?? release.platform}
                                        </span>
                                    </div>

                                    <div className="col-span-2 flex items-center gap-2">
                                        <span className="font-mono text-sm font-semibold text-kyro-primary">
                                            v{release.version}
                                        </span>
                                        {release.is_latest && (
                                            <GlowBadge variant="cyan">latest</GlowBadge>
                                        )}
                                    </div>

                                    <div className="col-span-5">
                                        <p className="text-sm text-kyro-muted truncate max-w-xs">
                                            {release.release_notes}
                                        </p>
                                    </div>

                                    <div className="col-span-2">
                                        <span className="text-xs text-kyro-muted">
                                            {release.published_at
                                                ? new Date(release.published_at).toLocaleDateString()
                                                : '—'}
                                        </span>
                                    </div>

                                    <div className="col-span-1 flex items-center justify-end gap-2">
                                        <a
                                            href={release.download_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-kyro-muted hover:text-kyro-cyan transition-colors"
                                            title="View download URL"
                                        >
                                            <ExternalLink size={14} />
                                        </a>
                                        <button
                                            onClick={() => handleDelete(release.id)}
                                            className="text-kyro-muted hover:text-kyro-danger transition-colors"
                                            title="Delete release"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </AppCard>
            </div>

            {/* New release modal */}
            <ReleaseForm isOpen={formOpen} onClose={() => setFormOpen(false)} />
        </AdminLayout>
    );
}
