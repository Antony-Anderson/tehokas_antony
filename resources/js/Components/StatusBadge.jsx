export default function StatusBadge({ status }) {
    const config = {
        pending: {
            label: 'Pendente',
            className: 'bg-slate-500/15 text-slate-400 border-slate-500/20',
        },
        in_progress: {
            label: 'Em Andamento',
            className: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20',
        },
        completed: {
            label: 'Concluída',
            className: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
        },
    };

    const { label, className } = config[status] ?? { label: status, className: 'bg-slate-700 text-slate-300' };

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${className}`}>
            {label}
        </span>
    );
}
