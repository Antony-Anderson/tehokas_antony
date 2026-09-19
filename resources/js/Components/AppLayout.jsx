import { Link, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    FolderKanban,
    LogOut,
    Menu,
    X,
} from 'lucide-react';

export default function AppLayout({ children, title }) {
    const { auth, flash } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);
    const [flashVisible, setFlashVisible] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            setFlashVisible(true);
            const t = setTimeout(() => setFlashVisible(false), 4000);
            return () => clearTimeout(t);
        }
    }, [flash?.success]);

    function logout(e) {
        e.preventDefault();
        router.post('/logout');
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            {/* Navbar */}
            <header className="fixed top-0 inset-x-0 z-40 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/projects" className="flex items-center gap-2.5 group">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all">
                                <FolderKanban className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                                TaskFlow
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-1">
                            <Link
                                href="/projects"
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all"
                            >
                                <FolderKanban className="w-4 h-4" />
                                Projetos
                            </Link>
                        </nav>

                        {/* User Menu */}
                        <div className="hidden md:flex items-center gap-3">
                            <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-slate-200">{auth?.user?.name}</p>
                                    <p className="text-xs text-slate-500">{auth?.user?.email}</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold">
                                    {auth?.user?.name?.charAt(0)?.toUpperCase()}
                                </div>
                            </div>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-white/5"
                        >
                            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-xl px-4 py-3 space-y-1">
                        <Link
                            href="/projects"
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-slate-100 hover:bg-white/5"
                            onClick={() => setMenuOpen(false)}
                        >
                            <FolderKanban className="w-4 h-4" />
                            Projetos
                        </Link>
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10 mt-2"
                        >
                            <LogOut className="w-4 h-4" />
                            Sair
                        </button>
                    </div>
                )}
            </header>

            {/* Flash Message */}
            {flash?.success && flashVisible && (
                <div className="fixed top-20 right-4 z-50">
                    <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-2xl shadow-xl backdrop-blur-xl">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-sm font-medium">{flash.success}</span>
                        <button onClick={() => setFlashVisible(false)} className="ml-2 text-emerald-500 hover:text-emerald-300">
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="pt-16 min-h-screen">
                {title && (
                    <div className="border-b border-white/5 bg-slate-950/50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                            <h1 className="text-2xl font-bold text-slate-100">{title}</h1>
                        </div>
                    </div>
                )}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
