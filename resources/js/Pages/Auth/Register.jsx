import React, { useEffect, useState } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { Mail, Lock, User, UserPlus, Loader2, ArrowRight, CheckCircle, Sun, Moon } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        }
        return 'light';
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    function toggleTheme() {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    }

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    const passwordStrength = () => {
        const p = data.password;
        if (!p) return null;
        if (p.length < 6) return { level: 1, label: 'Fraca', color: 'bg-rose-500' };
        if (p.length < 10) return { level: 2, label: 'Média', color: 'bg-amber-500' };
        return { level: 3, label: 'Forte', color: 'bg-emerald-500' };
    };

    const strength = passwordStrength();

    return (
        <>
            <Head title="Criar Conta" />
            <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-200">

                {/* Theme toggle top right */}
                <div className="absolute top-4 right-4 z-20">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="p-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 shadow-md backdrop-blur-md transition-all cursor-pointer"
                        title={theme === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-5 h-5 text-amber-400" />
                        ) : (
                            <Moon className="w-5 h-5 text-indigo-600" />
                        )}
                    </button>
                </div>

                {/* Background blobs */}
                <div className="absolute top-[-15%] right-[-5%] w-[45%] h-[45%] rounded-full bg-violet-500/15 dark:bg-violet-600/20 blur-[130px] pointer-events-none"></div>
                <div className="absolute bottom-[-15%] left-[-5%] w-[45%] h-[45%] rounded-full bg-indigo-500/15 dark:bg-indigo-600/20 blur-[130px] pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] rounded-full bg-fuchsia-500/10 dark:bg-fuchsia-700/10 blur-[100px] pointer-events-none"></div>

                <div className="w-full max-w-md relative z-10 py-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 mb-6 shadow-lg shadow-violet-500/30 ring-1 ring-white/10">
                            <UserPlus className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Criar Conta</h1>
                        <p className="text-slate-500 dark:text-slate-400">Junte-se e comece sua jornada agora</p>
                    </div>

                    {/* Card */}
                    <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-2xl">
                        <form onSubmit={submit} className="space-y-5">

                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1 block" htmlFor="name">
                                    Nome Completo
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500 group-focus-within:text-violet-600 dark:group-focus-within:text-violet-400 transition-colors duration-200">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="w-full bg-slate-100/70 dark:bg-slate-950/50 border border-slate-300 dark:border-white/10 rounded-2xl py-3 pl-12 pr-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all duration-300"
                                        placeholder="Seu nome completo"
                                        autoComplete="name"
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-rose-500 dark:text-rose-400 text-sm mt-1 ml-1">{errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1 block" htmlFor="email">
                                    Email
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500 group-focus-within:text-violet-600 dark:group-focus-within:text-violet-400 transition-colors duration-200">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="w-full bg-slate-100/70 dark:bg-slate-950/50 border border-slate-300 dark:border-white/10 rounded-2xl py-3 pl-12 pr-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all duration-300"
                                        placeholder="voce@exemplo.com"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-rose-500 dark:text-rose-400 text-sm mt-1 ml-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1 block" htmlFor="password">
                                    Senha
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500 group-focus-within:text-violet-600 dark:group-focus-within:text-violet-400 transition-colors duration-200">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="w-full bg-slate-100/70 dark:bg-slate-950/50 border border-slate-300 dark:border-white/10 rounded-2xl py-3 pl-12 pr-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all duration-300"
                                        placeholder="Mínimo 8 caracteres"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                </div>

                                {/* Password strength bar */}
                                {strength && (
                                    <div className="mt-2 space-y-1.5">
                                        <div className="flex gap-1.5">
                                            {[1, 2, 3].map((i) => (
                                                <div
                                                    key={i}
                                                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                                        i <= strength.level ? strength.color : 'bg-slate-200 dark:bg-slate-800'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-xs text-slate-500 ml-1">
                                            Força da senha: <span className={`font-medium ${
                                                strength.level === 1 ? 'text-rose-500 dark:text-rose-400' :
                                                strength.level === 2 ? 'text-amber-500 dark:text-amber-400' : 'text-emerald-500 dark:text-emerald-400'
                                            }`}>{strength.label}</span>
                                        </p>
                                    </div>
                                )}

                                {errors.password && (
                                    <p className="text-rose-500 dark:text-rose-400 text-sm mt-1 ml-1">{errors.password}</p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1 block" htmlFor="password_confirmation">
                                    Confirmar Senha
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500 group-focus-within:text-violet-600 dark:group-focus-within:text-violet-400 transition-colors duration-200">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="w-full bg-slate-100/70 dark:bg-slate-950/50 border border-slate-300 dark:border-white/10 rounded-2xl py-3 pl-12 pr-14 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all duration-300"
                                        placeholder="Repita sua senha"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                    {/* Match indicator */}
                                    {data.password_confirmation && (
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                            {data.password === data.password_confirmation ? (
                                                <CheckCircle className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                                            ) : (
                                                <span className="text-rose-500 dark:text-rose-400 text-xs font-medium">≠</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {errors.password_confirmation && (
                                    <p className="text-rose-500 dark:text-rose-400 text-sm mt-1 ml-1">{errors.password_confirmation}</p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full relative group mt-2 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></div>
                                <span className="relative flex items-center justify-center gap-2">
                                    {processing ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Criando conta...
                                        </>
                                    ) : (
                                        <>
                                            Criar conta
                                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>

                        {/* Terms notice */}
                        <p className="mt-5 text-center text-xs text-slate-500 dark:text-slate-600">
                            Ao criar uma conta, você concorda com nossos{' '}
                            <a href="#" className="text-slate-600 dark:text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors underline underline-offset-2">
                                Termos de Uso
                            </a>{' '}
                            e{' '}
                            <a href="#" className="text-slate-600 dark:text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors underline underline-offset-2">
                                Política de Privacidade
                            </a>
                        </p>

                        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-500">
                            Já tem uma conta?{' '}
                            <Link href="/login" className="font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-colors">
                                Entrar agora
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
