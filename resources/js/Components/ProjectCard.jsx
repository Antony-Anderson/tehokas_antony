import { Link } from '@inertiajs/react';
import { CheckCircle2, AlertTriangle, ChevronRight, ListTodo } from 'lucide-react';
import HealthBadge from './HealthBadge';

export default function ProjectCard({ project }) {
    const progress = project.tasks_count > 0
        ? Math.round((project.completed_count / project.tasks_count) * 100)
        : 0;

    return (
        <Link
            href={`/projects/${project.id}`}
            className="group block bg-slate-900/50 border border-white/5 rounded-2xl p-6 hover:bg-slate-900 hover:border-white/10 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-100 text-lg truncate group-hover:text-white transition-colors">
                        {project.title}
                    </h3>
                    {project.description && (
                        <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                            {project.description}
                        </p>
                    )}
                </div>
                <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all ml-3 mt-0.5 shrink-0" />
            </div>

            {/* Health Badge */}
            <div className="mb-4">
                <HealthBadge status={project.health_status} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-slate-950/50 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
                        <ListTodo className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xl font-bold text-slate-200">{project.tasks_count}</p>
                    <p className="text-xs text-slate-600">Total</p>
                </div>
                <div className="bg-slate-950/50 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-emerald-400 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xl font-bold text-emerald-400">{project.completed_count}</p>
                    <p className="text-xs text-slate-600">Concluídas</p>
                </div>
                <div className="bg-slate-950/50 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-rose-400 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xl font-bold text-rose-400">{project.overdue_count}</p>
                    <p className="text-xs text-slate-600">Atrasadas</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div>
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-slate-500">Progresso</span>
                    <span className="text-xs font-medium text-slate-400">{progress}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </Link>
    );
}
