import { router } from '@inertiajs/react';
import { Calendar, Pencil, Trash2, AlertCircle } from 'lucide-react';
import PriorityBadge from './PriorityBadge';

export default function TaskCard({ task, projectId, onEdit }) {
    const isOverdue = task.is_overdue;

    function handleDelete() {
        if (!confirm('Excluir esta tarefa?')) return;
        router.delete(`/projects/${projectId}/tasks/${task.id}`, { preserveScroll: true });
    }

    function handleStatusChange(e) {
        router.put(`/projects/${projectId}/tasks/${task.id}`, {
            status: e.target.value,
        }, { preserveScroll: true });
    }

    const deadlineText = task.deadline
        ? new Date(task.deadline + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
        : null;

    return (
        <div className={`group bg-slate-950/60 border rounded-xl p-4 transition-all hover:shadow-lg ${
            isOverdue
                ? 'border-rose-500/30 hover:border-rose-500/50 hover:shadow-rose-500/5'
                : 'border-white/5 hover:border-white/10 hover:shadow-indigo-500/5'
        }`}>
            {/* Overdue banner */}
            {isOverdue && (
                <div className="flex items-center gap-1.5 text-rose-400 text-xs font-medium mb-2">
                    <AlertCircle className="w-3 h-3" />
                    Atrasada
                </div>
            )}

            {/* Title */}
            <p className="text-sm font-medium text-slate-200 mb-2 leading-snug">{task.title}</p>

            {/* Description */}
            {task.description && (
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">{task.description}</p>
            )}

            {/* Priority + Deadline */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
                <PriorityBadge priority={task.priority} />
                {deadlineText && (
                    <span className={`inline-flex items-center gap-1 text-xs ${isOverdue ? 'text-rose-400' : 'text-slate-500'}`}>
                        <Calendar className="w-3 h-3" />
                        {deadlineText}
                    </span>
                )}
            </div>

            {/* Status Select + Actions */}
            <div className="flex items-center gap-2">
                <select
                    value={task.status}
                    onChange={handleStatusChange}
                    className="flex-1 text-xs bg-slate-900 border border-white/10 rounded-lg py-1.5 px-2 text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 cursor-pointer transition-all"
                >
                    <option value="pending">Pendente</option>
                    <option value="in_progress">Em Andamento</option>
                    <option value="completed">Concluída</option>
                </select>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"
                        title="Editar tarefa"
                    >
                        <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                        title="Excluir tarefa"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
