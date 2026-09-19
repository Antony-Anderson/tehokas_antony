import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';

const COLUMN_CONFIG = {
    pending: {
        label: 'Pendente',
        border: 'border-slate-500/20',
        dot: 'bg-slate-400',
        countBg: 'bg-slate-800 text-slate-400',
    },
    in_progress: {
        label: 'Em Andamento',
        border: 'border-indigo-500/20',
        dot: 'bg-indigo-400',
        countBg: 'bg-indigo-500/15 text-indigo-400',
    },
    completed: {
        label: 'Concluída',
        border: 'border-emerald-500/20',
        dot: 'bg-emerald-400',
        countBg: 'bg-emerald-500/15 text-emerald-400',
    },
};

export default function KanbanColumn({ status, tasks, projectId, onAddTask, onEditTask }) {
    const config = COLUMN_CONFIG[status];

    return (
        <div className="flex flex-col min-w-0">
            {/* Column Header */}
            <div className={`flex items-center justify-between mb-4 pb-3 border-b ${config.border}`}>
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${config.dot}`} />
                    <h3 className="font-semibold text-sm text-slate-300">{config.label}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${config.countBg}`}>
                        {tasks.length}
                    </span>
                </div>
                <button
                    onClick={onAddTask}
                    className="p-1 rounded-lg text-slate-600 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"
                    title="Adicionar tarefa"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Cards */}
            <div className="space-y-3 flex-1">
                {tasks.length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-white/5 rounded-xl">
                        <p className="text-xs text-slate-600">Nenhuma tarefa</p>
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
            </div>

            {/* Add Task Button (bottom) */}
            <button
                onClick={onAddTask}
                className="mt-3 w-full py-2.5 rounded-xl border border-dashed border-white/10 text-xs text-slate-600 hover:text-slate-400 hover:border-white/20 transition-all flex items-center justify-center gap-1.5"
            >
                <Plus className="w-3.5 h-3.5" />
                Adicionar tarefa
            </button>
        </div>
    );
}
