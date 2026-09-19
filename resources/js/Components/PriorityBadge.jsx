export default function PriorityBadge({ priority }) {
    const config = {
        low: {
            label: 'Baixa',
            className: 'bg-slate-500/15 text-slate-400 border-slate-500/20',
            dot: 'bg-slate-400',
        },
        medium: {
            label: 'Média',
            className: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
            dot: 'bg-amber-400',
        },
        high: {
            label: 'Alta',
            className: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
            dot: 'bg-rose-400',
        },
    };

    const { label, className, dot } = config[priority] ?? { label: priority, className: '', dot: '' };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${className}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
            {label}
        </span>
    );
}
