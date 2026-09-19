import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, FolderPlus } from 'lucide-react';
import AppLayout from '../../Components/AppLayout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/projects');
    }

    const inputClass = "w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm";
    const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2";

    return (
        <AppLayout title="Novo Projeto">
            <Head title="Novo Projeto" />

            <div className="max-w-2xl">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar para projetos
                </Link>

                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-600/20 border border-indigo-500/20 flex items-center justify-center">
                            <FolderPlus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-slate-900 dark:text-slate-100">Criar novo projeto</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-500">Preencha as informações do projeto</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className={labelClass} htmlFor="title">Título *</label>
                            <input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className={inputClass}
                                placeholder="Nome do projeto"
                                autoFocus
                            />
                            {errors.title && <p className="text-rose-500 dark:text-rose-400 text-sm mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className={labelClass} htmlFor="description">Descrição</label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className={`${inputClass} resize-none`}
                                rows={4}
                                placeholder="Descreva o objetivo deste projeto..."
                            />
                            {errors.description && <p className="text-rose-500 dark:text-rose-400 text-sm mt-1">{errors.description}</p>}
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <Link
                                href="/projects"
                                className="flex-1 text-center py-3 rounded-xl border border-slate-300 dark:border-white/10 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                            >
                                Cancelar
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-60"
                            >
                                {processing ? 'Criando...' : 'Criar Projeto'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
