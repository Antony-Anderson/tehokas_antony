import { router } from '@inertiajs/react';
import { Calendar, Pencil, Trash2, AlertCircle, GripVertical } from 'lucide-react';
import { useState } from 'react';
import PriorityBadge from './PriorityBadge';

export default function TaskCard({ task, projectId, onEdit, onDragStart, onDragEnd }) {
    const [isDragging, setIsDragging] = useState(false);
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

    function handleDragStart(e) {
        setIsDragging(true);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('taskId', String(task.id));
        e.dataTransfer.setData('projectId', String(projectId));
        e.dataTransfer.setData('currentStatus', task.status);
        if (onDragStart) onDragStart(task);
    }

    function handleDragEnd() {
        setIsDragging(false);
        if (onDragEnd) onDragEnd();
    }

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className={`group bg-slate-950/60 border rounded-xl p-4 transition-all hover:shadow-lg cursor-grab active:cursor-grabbing select-none ${
                isDragging ? 'opacity-40 scale-95 ring-1 ring-indigo-500/40' : ''
            } ${
                isOverdue
                    ? 'border-rose-500/30 hover:border-rose-500/50 hover:shadow-rose-500/5'
                    : 'border-white/5 hover:border-white/10 hover:shadow-indigo-500/5'
            }`}
        >
            {isOverdue && (
                <div className="flex items-center gap-1.5 text-rose-400 text-xs font-medium mb-2">
                    <AlertCircle className="w-3 h-3" />
                    Atrasada
                </div>
            )}

            <div className="flex items-start gap-1.5 mb-2">
                <GripVertical className="w-3.5 h-3.5 text-slate-700 mt-0.5 shrink-0 group-hover:text-slate-500 transition-colors" />
                <p className="text-sm font-medium text-slate-200 leading-snug">{task.title}</p>
            </div>

            {task.description && (
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">{task.description}</p>
            )}

            <div className="flex items-center gap-2 mb-3 flex-wrap">
                <PriorityBadge priority={task.priority} />
                {deadlineText && (
                    <span className={`inline-flex items-center gap-1 text-xs ${isOverdue ? 'text-rose-400' : 'text-slate-500'}`}>
                        <Calendar className="w-3 h-3" />
                        {deadlineText}
                    </span>
                )}
            </div>

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
