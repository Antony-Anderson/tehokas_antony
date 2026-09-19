import { useState, useEffect } from 'react';
import { useForm, usePage, Head } from '@inertiajs/react';
import AppLayout from '@/Components/AppLayout';
import {
    User,
    Mail,
    Lock,
    Shield,
    Sun,
    Moon,
    CheckCircle2,
    KeyRound,
    FolderKanban,
    CheckSquare,
    Clock,
    Sparkles,
    Eye,
    EyeOff,
    Save,
    Calendar,
    Smartphone
} from 'lucide-react';

export default function Edit({ user, stats }) {
    const { flash } = usePage().props;

    // Theme Selector State (light | dark)
    const [selectedTheme, setSelectedTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        }
        return 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (selectedTheme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [selectedTheme]);

    // Password Visibility toggles
    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    // Profile Info Form (Only Name is editable)
    const infoForm = useForm({
        name: user.name || '',
    });

    function handleInfoSubmit(e) {
        e.preventDefault();
        infoForm.patch('/profile', {
            preserveScroll: true,
        });
    }

    // Password Update Form
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    function handlePasswordSubmit(e) {
        e.preventDefault();
        passwordForm.put('/profile/password', {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
        });
    }

    // Password Strength Calculation
    const getPasswordStrength = (pass) => {
        if (!pass) return { score: 0, text: '', color: 'bg-slate-200 dark:bg-slate-700' };
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;

        if (score <= 1) return { score: 25, text: 'Fraca', color: 'bg-rose-500' };
        if (score === 2) return { score: 50, text: 'Média', color: 'bg-amber-500' };
        if (score === 3) return { score: 75, text: 'Boa', color: 'bg-blue-500' };
        return { score: 100, text: 'Forte', color: 'bg-emerald-500' };
    };

    const passStrength = getPasswordStrength(passwordForm.data.password);

    const formattedDate = user.created_at
        ? new Date(user.created_at).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        })
        : 'Desconhecido';

    return (
        <AppLayout title="Meu Perfil">
            <Head title="Meu Perfil" />

            <div className="max-w-6xl mx-auto space-y-8 pb-12">
                {/* Profile Header Hero Card */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-700 p-6 md:p-8 text-white shadow-2xl shadow-indigo-500/20">
                    <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute top-0 right-1/3 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-4xl font-extrabold text-white shadow-inner tracking-wider">
                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Conta Ativa">
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center justify-center md:justify-start gap-2">
                                    <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{user.name}</h1>
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md border border-white/20">
                                        Membro
                                    </span>
                                </div>
                                <p className="text-indigo-100 text-sm flex items-center justify-center md:justify-start gap-1.5">
                                    <Mail className="w-4 h-4 opacity-80" />
                                    {user.email}
                                </p>
                                <p className="text-indigo-200/80 text-xs flex items-center justify-center md:justify-start gap-1.5 pt-1">
                                    <Calendar className="w-3.5 h-3.5 opacity-70" />
                                    Cadastrado em {formattedDate}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                                <FolderKanban className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total de Projetos</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.projects_count}</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                <CheckSquare className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Tarefas Concluídas</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.completed_tasks}</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Tarefas Pendentes</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.pending_tasks}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* THEME SELECTION SECTION - Light Mode & Dark Mode only */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-indigo-500" />
                                Tema da Interface
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Alterne de forma clara entre o Modo Claro e o Modo Escuro.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Light Mode Card */}
                        <button
                            type="button"
                            onClick={() => setSelectedTheme('light')}
                            className={`relative text-left p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between h-44 overflow-hidden group ${selectedTheme === 'light'
                                ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-500/20'
                                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                                    <Sun className="w-5 h-5" />
                                </div>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedTheme === 'light' ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 dark:border-slate-600'
                                    }`}>
                                    {selectedTheme === 'light' && <CheckCircle2 className="w-3.5 h-3.5" />}
                                </div>
                            </div>

                            <div className="mt-3 p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1.5">
                                <div className="h-2 w-16 bg-slate-300 rounded" />
                                <div className="h-1.5 w-24 bg-slate-200 rounded" />
                                <div className="flex gap-1 pt-1">
                                    <div className="h-3 w-8 bg-indigo-500 rounded" />
                                    <div className="h-3 w-6 bg-slate-200 rounded" />
                                </div>
                            </div>

                            <div className="pt-2">
                                <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Modo Claro (White Mode)</p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400">Visual claro, limpo e com alta legibilidade.</p>
                            </div>
                        </button>

                        {/* Dark Mode Card */}
                        <button
                            type="button"
                            onClick={() => setSelectedTheme('dark')}
                            className={`relative text-left p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between h-44 overflow-hidden group ${selectedTheme === 'dark'
                                ? 'border-indigo-500 bg-slate-800/80 shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-500/20'
                                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-xl bg-indigo-900/50 text-indigo-400 flex items-center justify-center font-bold">
                                    <Moon className="w-5 h-5" />
                                </div>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedTheme === 'dark' ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-slate-300 dark:border-slate-600'
                                    }`}>
                                    {selectedTheme === 'dark' && <CheckCircle2 className="w-3.5 h-3.5" />}
                                </div>
                            </div>

                            <div className="mt-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800 shadow-sm space-y-1.5">
                                <div className="h-2 w-16 bg-slate-700 rounded" />
                                <div className="h-1.5 w-24 bg-slate-800 rounded" />
                                <div className="flex gap-1 pt-1">
                                    <div className="h-3 w-8 bg-indigo-500 rounded" />
                                    <div className="h-3 w-6 bg-slate-800 rounded" />
                                </div>
                            </div>

                            <div className="pt-2">
                                <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Modo Escuro (Dark Mode)</p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400">Design escuro com tons indigo e menos esforço visual.</p>
                            </div>
                        </button>
                    </div>
                </div>

                {/* MAIN CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* LEFT COLUMN: Personal Info + Security Info */}
                    <div className="space-y-8">
                        {/* Personal Info Card */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Informações Pessoais</h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Atualize seu nome de exibição no sistema.</p>
                                </div>
                            </div>

                            <form onSubmit={handleInfoSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                        Nome Completo
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="text"
                                            value={infoForm.data.name}
                                            onChange={(e) => infoForm.setData('name', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                            placeholder="Seu nome"
                                            required
                                        />
                                    </div>
                                    {infoForm.errors.name && (
                                        <p className="text-xs text-rose-500 mt-1 font-medium">{infoForm.errors.name}</p>
                                    )}
                                </div>

                                <div className="pt-2 flex items-center justify-end">
                                    <button
                                        type="submit"
                                        disabled={infoForm.processing}
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4" />
                                        {infoForm.processing ? 'Salvando...' : 'Salvar Nome'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Security Section (Dispositivo Conectado) */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-5 shadow-sm">
                            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Segurança da Sessão</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Informações sobre o seu dispositivo conectado.</p>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                                        <Smartphone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Dispositivo Atual</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Navegador Web Ativo</p>
                                    </div>
                                </div>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    Sessão Ativa
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Password Update */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
                            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                <KeyRound className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Alterar Senha</h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Garanta que sua conta esteja protegida com uma senha forte.</p>
                            </div>
                        </div>

                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            {/* Current Password */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                    Senha Atual
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                        <Lock className="w-4 h-4" />
                                    </div>
                                    <input
                                        type={showCurrentPass ? 'text' : 'password'}
                                        value={passwordForm.data.current_password}
                                        onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                    >
                                        {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {passwordForm.errors.current_password && (
                                    <p className="text-xs text-rose-500 mt-1 font-medium">{passwordForm.errors.current_password}</p>
                                )}
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                    Nova Senha
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                        <Lock className="w-4 h-4" />
                                    </div>
                                    <input
                                        type={showNewPass ? 'text' : 'password'}
                                        value={passwordForm.data.password}
                                        onChange={(e) => passwordForm.setData('password', e.target.value)}
                                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPass(!showNewPass)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                    >
                                        {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {passwordForm.errors.password && (
                                    <p className="text-xs text-rose-500 mt-1 font-medium">{passwordForm.errors.password}</p>
                                )}

                                {passwordForm.data.password && (
                                    <div className="mt-2 space-y-1">
                                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-300 ${passStrength.color}`}
                                                style={{ width: `${passStrength.score}%` }}
                                            />
                                        </div>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 flex justify-between">
                                            <span>Força da Senha:</span>
                                            <span className="font-semibold">{passStrength.text}</span>
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Confirm New Password */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                    Confirmar Nova Senha
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                        <Lock className="w-4 h-4" />
                                    </div>
                                    <input
                                        type={showConfirmPass ? 'text' : 'password'}
                                        value={passwordForm.data.password_confirmation}
                                        onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                    >
                                        {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {passwordForm.errors.password_confirmation && (
                                    <p className="text-xs text-rose-500 mt-1 font-medium">{passwordForm.errors.password_confirmation}</p>
                                )}
                            </div>

                            <div className="pt-3 flex items-center justify-end">
                                <button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 transition-all cursor-pointer disabled:opacity-50"
                                >
                                    <KeyRound className="w-4 h-4" />
                                    {passwordForm.processing ? 'Atualizando...' : 'Atualizar Senha'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
