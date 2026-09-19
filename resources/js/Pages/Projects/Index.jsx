import { Head, Link } from '@inertiajs/react';
import { Plus, FolderOpen, Search } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '../../Components/AppLayout';
import ProjectCard from '../../Components/ProjectCard';

export default function Index({ projects }) {
    const [search, setSearch] = useState('');

    const filtered = projects.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.description ?? '').toLowerCase().includes(search.toLowerCase())
    );

    const alertCount = projects.filter(p => p.health_status === 'alert').length;

    return (
        <AppLayout title="Meus Projetos">
            <Head title="Projetos" />

            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {/* Search */}
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                        <Search className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Buscar projetos..."
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm"
                    />
                </div>

                <Link
                    href="/projects/create"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    Novo Projeto
                </Link>
            </div>

            {/* Alert Banner */}
            {alertCount > 0 && (
                <div className="mb-6 flex items-center gap-3 bg-rose-500/10 border border-rose-500/20 rounded-2xl px-4 py-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                    <p className="text-sm text-rose-300">
                        <span className="font-semibold">{alertCount} {alertCount === 1 ? 'projeto' : 'projetos'}</span>
                        {alertCount === 1 ? ' está' : ' estão'} em alerta — mais de 20% das tarefas estão atrasadas.
                    </p>
                </div>
            )}

            {/* Projects Grid */}
            {filtered.length === 0 ? (
                <div className="text-center py-24">
                    <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center mx-auto mb-4">
                        <FolderOpen className="w-8 h-8 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-400 mb-2">
                        {search ? 'Nenhum projeto encontrado' : 'Nenhum projeto ainda'}
                    </h3>
                    <p className="text-sm text-slate-600 mb-6">
                        {search ? 'Tente buscar por outro termo.' : 'Crie seu primeiro projeto para começar.'}
                    </p>
                    {!search && (
                        <Link
                            href="/projects/create"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            Criar Projeto
                        </Link>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </AppLayout>
    );
}
