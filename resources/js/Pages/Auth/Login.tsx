import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Zap, LogIn } from 'lucide-react';
import AppButton from '@/Components/shared/AppButton';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors } = useForm({
        email:    '',
        password: '',
        remember: false as boolean,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login'));
    };

    const fieldClass =
        'w-full rounded-lg border border-kyro-border bg-kyro-bg px-4 py-3 text-sm text-kyro-primary placeholder-kyro-subtle focus:border-kyro-cyan focus:outline-none focus:ring-1 focus:ring-kyro-cyan/30 transition-colors';
    const labelClass = 'block mb-1.5 text-xs font-medium text-kyro-muted';
    const errorClass = 'mt-1 text-xs text-kyro-danger';

    return (
        <>
            <Head title="Admin Login — KyroPad" />

            <div className="flex min-h-screen items-center justify-center bg-kyro-bg px-4">
                {/* Grid background */}
                <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
                {/* Hero glow */}
                <div className="absolute inset-0 bg-hero-glow pointer-events-none" />

                <div className="relative w-full max-w-md">
                    {/* Logo */}
                    <div className="mb-8 flex flex-col items-center gap-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-kyro-cyan/10 border border-kyro-cyan/30 shadow-cyan-sm">
                            <Zap size={28} className="text-kyro-cyan" />
                        </div>
                        <div className="text-center">
                            <h1 className="font-heading text-2xl font-bold text-kyro-primary">
                                Kyro<span className="text-kyro-cyan">Pad</span>
                            </h1>
                            <p className="mt-1 text-sm text-kyro-muted">Admin Panel</p>
                        </div>
                    </div>

                    {/* Card */}
                    <div className="glass-card glow-border rounded-2xl p-8">
                        {status && (
                            <div className="mb-4 rounded-lg border border-kyro-success/30 bg-kyro-success/10 px-4 py-3 text-sm text-kyro-success">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className={labelClass}>
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className={fieldClass}
                                    placeholder="admin@kyropad.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    autoComplete="username"
                                    autoFocus
                                />
                                {errors.email && <p className={errorClass}>{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label htmlFor="password" className={labelClass + ' mb-0'}>
                                        Password
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-xs text-kyro-muted hover:text-kyro-cyan transition-colors"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    className={fieldClass}
                                    placeholder="••••••••"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    autoComplete="current-password"
                                />
                                {errors.password && <p className={errorClass}>{errors.password}</p>}
                            </div>

                            {/* Remember me */}
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-kyro-border bg-kyro-bg text-kyro-cyan focus:ring-kyro-cyan/30"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="text-sm text-kyro-muted">Remember me</span>
                            </label>

                            {/* Submit */}
                            <AppButton
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-full justify-center"
                                disabled={processing}
                                rightIcon={<LogIn size={16} />}
                            >
                                {processing ? 'Signing in…' : 'Sign In'}
                            </AppButton>
                        </form>
                    </div>

                    {/* Back to site */}
                    <p className="mt-6 text-center text-sm text-kyro-muted">
                        <Link href="/" className="hover:text-kyro-cyan transition-colors">
                            ← Back to KyroPad website
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
