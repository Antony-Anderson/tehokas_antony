import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function Dashboard() {
    useEffect(() => {
        router.visit('/projects');
    }, []);

    return (
        <>
            <Head title="Dashboard" />
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-slate-500 text-sm">Redirecionando...</div>
            </div>
        </>
    );
}
