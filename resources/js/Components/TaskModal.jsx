import { useForm } from '@inertiajs/react';
import { X, AlignLeft, Tag, Flag, Calendar } from 'lucide-react';
import { useEffect } from 'react';

export default function TaskModal({ projectId, task, defaultStatus, onClose }) {
    const isEditing = !!task;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: task?.title ?? '',
        description: task?.description ?? '',
        status: task?.status ?? defaultStatus ?? 'pending',
        priority: task?.priority ?? 'medium',
        deadline: task?.deadline ? task.deadline.split('T')[0] : '',
    });

    useEffect(() => {
        function onKey(e) {
            if (e.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        if (isEditing) {
            put(`/projects/${projectId}/tasks/${task.id}`, {
                onSuccess: () => onClose(),
                preserveScroll: true,
            });
        } else {
            post(`/projects/${projectId}/tasks`, {
                onSuccess: () => { reset(); onClose(); },
                preserveScroll: true,
            });
        }
    }

    const inputClass = "w-full bg-white dark:bg-slate-950/50 border border-slate-300 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm shadow-sm";
    const labelClass = "block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl shadow-slate-900/10 dark:shadow-black/50">
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/5">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                            {isEditing ? 'Editar Tarefa' : 'Nova Tarefa'}
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                            {isEditing ? 'Altere os dados da tarefa' : 'Adicione uma nova tarefa ao projeto'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className={labelClass}>Título *</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            className={inputClass}
                            placeholder="Ex: Criar tela de login"
                            autoFocus
                        />
                        {errors.title && <p className="text-rose-500 dark:text-rose-400 text-xs mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label className={labelClass}>
                            <span className="flex items-center gap-1.5"><AlignLeft className="w-3 h-3" /> Descrição</span>
                        </label>
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            className={`${inputClass} resize-none`}
                            rows={3}
                            placeholder="Detalhes da tarefa..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>
                                <span className="flex items-center gap-1.5"><Tag className="w-3 h-3" /> Status</span>
                            </label>
                            <select
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                                className={`${inputClass} cursor-pointer`}
                            >
                                <option value="pending">Pendente</option>
                                <option value="in_progress">Em Andamento</option>
                                <option value="completed">Concluída</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>
                                <span className="flex items-center gap-1.5"><Flag className="w-3 h-3" /> Prioridade</span>
                            </label>
                            <select
                                value={data.priority}
                                onChange={e => setData('priority', e.target.value)}
                                className={`${inputClass} cursor-pointer`}
                            >
                                <option value="low">Baixa</option>
                                <option value="medium">Média</option>
                                <option value="high">Alta</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>
                            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Prazo (Deadline)</span>
                        </label>
                        <input
                            type="date"
                            value={data.deadline}
                            onChange={e => setData('deadline', e.target.value)}
                            className={`${inputClass} dark:[color-scheme:dark]`}
                        />
                        {errors.deadline && <p className="text-rose-500 dark:text-rose-400 text-xs mt-1">{errors.deadline}</p>}
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60"
                        >
                            {processing ? 'Salvando...' : isEditing ? 'Salvar' : 'Criar Tarefa'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
