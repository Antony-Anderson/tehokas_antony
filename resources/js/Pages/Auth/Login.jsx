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
                
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/20 blur-[120px] pointer-events-none"></div>

                <div className="w-full max-w-md relative z-10">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 mb-6 shadow-lg shadow-indigo-500/30 ring-1 ring-white/10">
                            <LogIn className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Bem vindo de volta!</h1>
                        <p className="text-slate-400">Entre na sua conta para continuar</p>
                    </div>

                    <div className="backdrop-blur-xl bg-slate-900/50 p-8 rounded-3xl border border-white/5 shadow-2xl">
                        <form onSubmit={submit} className="space-y-5">
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 ml-1 block" htmlFor="email">
                                    Email
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

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm font-medium text-slate-300" htmlFor="password">
                                        Senha
                                    </label>
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
                                    <span className="ml-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Lembrar de mim</span>
                                </label>
                            </div>

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
                                            Entrando
                                        </>
                                    ) : (
                                        <>
                                            Entrar
                                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-slate-500">
                            Não tem uma conta?{' '}
                            <Link href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                                Criar
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
