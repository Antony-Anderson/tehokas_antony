import React, { useEffect } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { Mail, Lock, LogIn, Loader2, ArrowRight } from 'lucide-react';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <>
            <Head title="Log in" />
            <div className="min-h-screen bg-[#0f172a] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
                
                {/* Background decorative elements */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/20 blur-[120px] pointer-events-none"></div>

                <div className="w-full max-w-md relative z-10">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 mb-6 shadow-lg shadow-indigo-500/30 ring-1 ring-white/10">
                            <LogIn className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome Back</h1>
                        <p className="text-slate-400">Sign in to your account to continue</p>
                    </div>

                    <div className="backdrop-blur-xl bg-slate-900/50 p-8 rounded-3xl border border-white/5 shadow-2xl">
                        <form onSubmit={submit} className="space-y-5">
                            
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 ml-1 block" htmlFor="email">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
                                        placeholder="you@example.com"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-rose-400 text-sm mt-1 ml-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm font-medium text-slate-300" htmlFor="password">
                                        Password
                                    </label>
                                    <a href="#" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-rose-400 text-sm mt-1 ml-1">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center pt-2">
                                <label className="flex items-center cursor-pointer group">
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            name="remember"
                                            className="peer sr-only"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                        />
                                        <div className="w-5 h-5 border-2 border-slate-600 rounded bg-slate-900/50 peer-checked:bg-indigo-500 peer-checked:border-indigo-500 transition-all duration-200"></div>
                                        <svg className="absolute w-3.5 h-3.5 text-white scale-0 peer-checked:scale-100 transition-transform duration-200 pointer-events-none" viewBox="0 0 14 10" fill="none">
                                            <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <span className="ml-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full relative group mt-2 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></div>
                                <span className="relative flex items-center justify-center gap-2">
                                    {processing ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign in
                                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>

                        {/* Social Login */}
                        <div className="mt-8 pt-6 border-t border-white/5">
                            <div className="text-center text-sm text-slate-500 mb-4">Or continue with</div>
                            <div className="grid grid-cols-2 gap-4">
                                <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800/50 border border-white/5 text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    <span>GitHub</span>
                                </button>
                                <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800/50 border border-white/5 text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                                    <span>Twitter</span>
                                </button>
                            </div>
                        </div>

                        <p className="mt-8 text-center text-sm text-slate-500">
                            Don't have an account?{' '}
                            <Link href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
