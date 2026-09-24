import React from 'react';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import AppButton from '@/Components/shared/AppButton';
import { motion, AnimatePresence } from 'framer-motion';

interface ReleaseFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ReleaseForm({ isOpen, onClose }: ReleaseFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        version:       '',
        platform:      'windows',
        release_notes: '',
        download_url:  '',
        is_latest:     false as boolean,
        published_at:  '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.releases.store'), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const fieldClass = 'w-full rounded-lg border border-kyro-border bg-kyro-bg px-4 py-2.5 text-sm text-kyro-primary placeholder-kyro-subtle focus:border-kyro-cyan focus:outline-none focus:ring-1 focus:ring-kyro-cyan/30 transition-colors';
    const labelClass = 'block mb-1.5 text-xs font-medium text-kyro-muted';
    const errorClass = 'mt-1 text-xs text-kyro-danger';

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="glass-card glow-border rounded-2xl p-8 max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-heading text-xl font-bold text-kyro-primary">
                                    Publish New Release
                                </h2>
                                <button onClick={onClose} className="text-kyro-muted hover:text-kyro-primary">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Version */}
                                <div>
                                    <label className={labelClass}>Version *</label>
                                    <input
                                        type="text"
                                        className={fieldClass}
                                        placeholder="e.g. 1.2.0"
                                        value={data.version}
                                        onChange={(e) => setData('version', e.target.value)}
                                    />
                                    {errors.version && <p className={errorClass}>{errors.version}</p>}
                                </div>

                                {/* Platform */}
                                <div>
                                    <label className={labelClass}>Platform *</label>
                                    <select
                                        className={fieldClass}
                                        value={data.platform}
                                        onChange={(e) => setData('platform', e.target.value)}
                                    >
                                        <option value="windows">Windows</option>
                                        <option value="ios">iOS</option>
                                        <option value="android">Android</option>
                                    </select>
                                    {errors.platform && <p className={errorClass}>{errors.platform}</p>}
                                </div>

                                {/* Download URL */}
                                <div>
                                    <label className={labelClass}>Download URL *</label>
                                    <input
                                        type="url"
                                        className={fieldClass}
                                        placeholder="https://github.com/.../releases/..."
                                        value={data.download_url}
                                        onChange={(e) => setData('download_url', e.target.value)}
                                    />
                                    {errors.download_url && <p className={errorClass}>{errors.download_url}</p>}
                                </div>

                                {/* Published At */}
                                <div>
                                    <label className={labelClass}>Published At</label>
                                    <input
                                        type="datetime-local"
                                        className={fieldClass}
                                        value={data.published_at}
                                        onChange={(e) => setData('published_at', e.target.value)}
                                    />
                                </div>

                                {/* Release notes */}
                                <div>
                                    <label className={labelClass}>Release Notes *</label>
                                    <textarea
                                        rows={4}
                                        className={fieldClass + ' resize-none'}
                                        placeholder="What's new in this release..."
                                        value={data.release_notes}
                                        onChange={(e) => setData('release_notes', e.target.value)}
                                    />
                                    {errors.release_notes && <p className={errorClass}>{errors.release_notes}</p>}
                                </div>

                                {/* Is Latest */}
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-kyro-border bg-kyro-bg text-kyro-cyan focus:ring-kyro-cyan/30"
                                        checked={data.is_latest}
                                        onChange={(e) => setData('is_latest', e.target.checked)}
                                    />
                                    <span className="text-sm text-kyro-muted">
                                        Mark as latest release for this platform
                                    </span>
                                </label>

                                {/* Actions */}
                                <div className="flex gap-3 pt-2">
                                    <AppButton
                                        type="submit"
                                        variant="primary"
                                        size="md"
                                        className="flex-1 justify-center"
                                        disabled={processing}
                                    >
                                        {processing ? 'Publishing…' : 'Publish Release'}
                                    </AppButton>
                                    <AppButton
                                        type="button"
                                        variant="outline"
                                        size="md"
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </AppButton>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
