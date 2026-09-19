import { Link, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    FolderKanban,
    LogOut,
    Menu,
    X,
    Sun,
    Moon,
} from 'lucide-react';

export default function AppLayout({ children, title }) {
    const { auth, flash } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);
    const [flashVisible, setFlashVisible] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

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
        if (flash?.success) {
            setFlashVisible(true);
            const t = setTimeout(() => setFlashVisible(false), 4000);
            return () => clearTimeout(t);
        }
    }, [flash?.success]);

    function handleLogoutClick(e) {
        if (e) e.preventDefault();
        setMenuOpen(false);
        setShowLogoutModal(true);
    }

    function confirmLogout() {
        router.post('/logout');
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
            <header className="fixed top-0 inset-x-0 z-40 border-b border-slate-200/80 dark:border-white/5 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/projects" className="flex items-center gap-2.5 group">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all">
                                <FolderKanban className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                                TaskFlow
                            </span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-1">
                            <Link
                                href="/projects"
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                            >
                                <FolderKanban className="w-4 h-4" />
                                Projetos
                            </Link>
                        </nav>

                        <div className="hidden md:flex items-center gap-3">
                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5 transition-all flex items-center justify-center cursor-pointer"
                                title={theme === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
                                aria-label="Alternar tema"
                            >
                                {theme === 'dark' ? (
                                    <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform" />
                                ) : (
                                    <Moon className="w-5 h-5 text-indigo-600 hover:-rotate-12 transition-transform" />
                                )}
                            </button>

                            <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-white/10">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{auth?.user?.name}</p>
                                    <p className="text-xs text-slate-500">{auth?.user?.email}</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-indigo-500/20">
                                    {auth?.user?.name?.charAt(0)?.toUpperCase()}
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleLogoutClick}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all cursor-pointer"
                                title="Sair"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2 md:hidden">
                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                                title="Alternar tema"
                            >
                                {theme === 'dark' ? (
                                    <Sun className="w-5 h-5 text-amber-400" />
                                ) : (
                                    <Moon className="w-5 h-5 text-indigo-600" />
                                )}
                            </button>
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5"
                            >
                                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {menuOpen && (
                    <div className="md:hidden border-t border-slate-200 dark:border-white/5 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-3 space-y-1">
                        <Link
                            href="/projects"
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5"
                            onClick={() => setMenuOpen(false)}
                        >
                            <FolderKanban className="w-4 h-4" />
                            Projetos
                        </Link>
                        <button
                            type="button"
                            onClick={handleLogoutClick}
                            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 mt-2 cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" />
                            Sair
                        </button>
                    </div>
                )}
            </header>

            {flash?.success && flashVisible && (
                <div className="fixed top-20 right-4 z-50">
                    <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-4 py-3 rounded-2xl shadow-xl backdrop-blur-xl">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                        <span className="text-sm font-medium">{flash.success}</span>
                        <button onClick={() => setFlashVisible(false)} className="ml-2 text-emerald-600 dark:text-emerald-500 hover:text-emerald-800 dark:hover:text-emerald-300">
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            )}

            <main className="pt-16 min-h-screen">
                {title && (
                    <div className="border-b border-slate-200/80 dark:border-white/5 bg-white/50 dark:bg-slate-950/50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{title}</h1>
                        </div>
                    </div>
                )}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </div>
            </main>

            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm"
                        onClick={() => setShowLogoutModal(false)}
                    />
                    <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-2xl text-center space-y-4 z-10 animate-in fade-in zoom-in-95 duration-150">
                        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
                            <LogOut className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Deseja realmente sair?</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Você precisará fazer login novamente para acessar seus projetos.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowLogoutModal(false)}
                                className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={confirmLogout}
                                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-sm font-semibold text-white shadow-lg shadow-rose-500/25 transition-all"
                            >
                                Sair da Conta
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
