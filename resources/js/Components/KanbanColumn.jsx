import { Plus } from 'lucide-react';
import { useState } from 'react';
import TaskCard from './TaskCard';

const COLUMN_CONFIG = {
    pending: {
        label: 'Pendente',
        border: 'border-slate-300 dark:border-slate-500/20',
        dot: 'bg-slate-400 dark:bg-slate-400',
        countBg: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
        dropHighlight: 'border-slate-400/60 bg-slate-400/10 dark:border-slate-400/40 dark:bg-slate-400/5',
    },
    in_progress: {
        label: 'Em Andamento',
        border: 'border-indigo-300 dark:border-indigo-500/20',
        dot: 'bg-indigo-500 dark:bg-indigo-400',
        countBg: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400',
        dropHighlight: 'border-indigo-400/60 bg-indigo-400/10 dark:border-indigo-400/40 dark:bg-indigo-400/5',
    },
    completed: {
        label: 'Concluída',
        border: 'border-emerald-300 dark:border-emerald-500/20',
        dot: 'bg-emerald-500 dark:bg-emerald-400',
        countBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400',
        dropHighlight: 'border-emerald-400/60 bg-emerald-400/10 dark:border-emerald-400/40 dark:bg-emerald-400/5',
    },
};

export default function KanbanColumn({ status, tasks, projectId, onAddTask, onEditTask, onDrop, isDragActive }) {
    const config = COLUMN_CONFIG[status];
    const [isDragOver, setIsDragOver] = useState(false);

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setIsDragOver(true);
    }

    function handleDragLeave(e) {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsDragOver(false);
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        setIsDragOver(false);

        const taskId = parseInt(e.dataTransfer.getData('taskId'), 10);
        const currentStatus = e.dataTransfer.getData('currentStatus');

        if (currentStatus === status) return;

        if (onDrop) onDrop(taskId, status);
    }

    const isHighlighted = isDragOver && isDragActive;

    return (
        <div className="flex flex-col min-w-0">
            <div className={`flex items-center justify-between mb-4 pb-3 border-b ${config.border}`}>
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${config.dot}`} />
                    <h3 className="font-semibold text-sm text-slate-700 dark:text-slate-300">{config.label}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${config.countBg}`}>
                        {tasks.length}
                    </span>
                </div>
                <button
                    onClick={onAddTask}
                    className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 dark:text-slate-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all"
                    title="Adicionar tarefa"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex-1 rounded-xl transition-all duration-200 ${
                    isHighlighted
                        ? `border-2 border-dashed ${config.dropHighlight} p-1`
                        : isDragActive
                            ? 'border-2 border-dashed border-slate-300 dark:border-white/5 p-1'
                            : 'border-2 border-transparent'
                }`}
            >
                <div className="space-y-3">
                    {tasks.length === 0 ? (
                        <div className={`text-center py-8 rounded-xl transition-all ${
                            isHighlighted
                                ? 'border border-dashed border-slate-400 dark:border-white/20'
                                : 'border border-dashed border-slate-300/80 dark:border-white/5'
                        }`}>
                            {isDragActive ? (
                                <p className={`text-xs ${isHighlighted ? 'text-slate-600 dark:text-slate-400' : 'text-slate-400 dark:text-slate-600'}`}>
                                    {isHighlighted ? '✦ Soltar aqui' : 'Nenhuma tarefa'}
                                </p>
                            ) : (
                                <p className="text-xs text-slate-400 dark:text-slate-600">Nenhuma tarefa</p>
                            )}
                        </div>
                    ) : (
                        tasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                projectId={projectId}
                                onEdit={onEditTask}
                            />
                        ))
                    )}

                    {isHighlighted && tasks.length > 0 && (
                        <div className="h-1.5 rounded-full bg-gradient-to-r from-transparent via-current to-transparent opacity-30 animate-pulse" />
                    )}
                </div>
            </div>

            <button
                onClick={onAddTask}
                className="mt-3 w-full py-2.5 rounded-xl border border-dashed border-slate-300 dark:border-white/10 text-xs text-slate-500 dark:text-slate-600 hover:text-slate-800 dark:hover:text-slate-400 hover:border-slate-400 dark:hover:border-white/20 transition-all flex items-center justify-center gap-1.5"
            >
                <Plus className="w-3.5 h-3.5" />
                Adicionar tarefa
            </button>
        </div>
    );
}
