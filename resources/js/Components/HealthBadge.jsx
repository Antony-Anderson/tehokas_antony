import { ShieldAlert, ShieldCheck } from 'lucide-react';

export default function HealthBadge({ status }) {
    if (status === 'alert') {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/20">
                <ShieldAlert className="w-3 h-3" />
                Em Alerta
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-3 h-3" />
            Saudável
        </span>
    );
}
