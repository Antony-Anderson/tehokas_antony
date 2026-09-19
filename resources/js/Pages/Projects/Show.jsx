import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus, Trash2, Pencil, Filter, X } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '../../Components/AppLayout';
import KanbanColumn from '../../Components/KanbanColumn';
import TaskModal from '../../Components/TaskModal';
import HealthBadge from '../../Components/HealthBadge';

const STATUSES = ['pending', 'in_progress', 'completed'];

export default function Show({ project, columns }) {
    const [taskModal, setTaskModal] = useState(null);
    const [filterPriority, setFilterPriority] = useState('all');
    const [editingProject, setEditingProject] = useState(false);
    const [isDragActive, setIsDragActive] = useState(false);

    const { data, setData, put, processing } = useForm({
        title: project.title,
        description: project.description ?? '',
    });

    function handleDeleteProject() {
        if (!confirm('Excluir projeto e todas as suas tarefas?')) return;
        router.delete(`/projects/${project.id}`);
    }

    function handleEditProject(e) {
        e.preventDefault();
        put(`/projects/${project.id}`, { onSuccess: () => setEditingProject(false) });
    }

    function openAddTask(status = 'pending') {
        setTaskModal({ status });
    }

    function openEditTask(task) {
        setTaskModal({ task });
    }

    function filterTasks(tasks) {
        return tasks.filter(t => {
            return filterPriority === 'all' || t.priority === filterPriority;
        });
    }

    function handleDrop(taskId, newStatus) {
        router.put(`/projects/${project.id}/tasks/${taskId}`, {
            status: newStatus,
        }, { preserveScroll: true });
    }

    const filteredColumns = {
        pending: filterTasks(columns.pending ?? []),
        in_progress: filterTasks(columns.in_progress ?? []),
        completed: filterTasks(columns.completed ?? []),
    };

    const totalTasks = project.tasks_count;
    const hasFilters = filterPriority !== 'all';

    return (
        <AppLayout>
            <Head title={project.title} />

            {/* Project Header */}
            <div className="mb-6">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar para projetos
                </Link>

                {editingProject ? (
                    <form onSubmit={handleEditProject} className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl p-6 mb-4 max-w-2xl shadow-sm">
                        <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-4">Editar Projeto</h3>
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-300 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
                                placeholder="Título do projeto"
                            />
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-300 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm resize-none"
                                rows={2}
                                placeholder="Descrição"
                            />
                            <div className="flex gap-2">
                                <button type="button" onClick={() => setEditingProject(false)} className="px-4 py-2 rounded-xl border border-slate-300 dark:border-white/10 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
                                    Cancelar
                                </button>
                                <button type="submit" disabled={processing} className="px-4 py-2 rounded-xl bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-500 transition-all disabled:opacity-60">
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{project.title}</h1>
                                <HealthBadge status={project.health_status} />
                            </div>
                            {project.description && (
                                <p className="text-sm text-slate-600 dark:text-slate-500 max-w-2xl">{project.description}</p>
                            )}
                            <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-600">
                                <span>{totalTasks} {totalTasks === 1 ? 'tarefa' : 'tarefas'}</span>
                                <span>{project.completed_count} concluídas</span>
                                {project.overdue_count > 0 && (
                                    <span className="text-rose-600 dark:text-rose-400 font-medium">{project.overdue_count} atrasadas</span>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                onClick={() => setEditingProject(true)}
                                className="p-2 rounded-xl text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all"
                                title="Editar projeto"
                            >
                                <Pencil className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleDeleteProject}
                                className="p-2 rounded-xl text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
                                title="Excluir projeto"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => openAddTask('pending')}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all"
                            >
                                <Plus className="w-4 h-4" />
                                Nova Tarefa
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
                <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span className="text-xs text-slate-500 dark:text-slate-500">Filtrar por prioridade:</span>
                </div>

                <select
                    value={filterPriority}
                    onChange={e => setFilterPriority(e.target.value)}
                    className="text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-lg py-1.5 px-3 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 cursor-pointer shadow-sm"
                >
                    <option value="all">Todas</option>
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                </select>

                {hasFilters && (
                    <button
                        onClick={() => setFilterPriority('all')}
                        className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors"
                    >
                        <X className="w-3 h-3" />
                        Limpar filtro
                    </button>
                )}
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {STATUSES.map(status => (
                    <KanbanColumn
                        key={status}
                        status={status}
                        tasks={filteredColumns[status] ?? []}
                        projectId={project.id}
                        onAddTask={() => openAddTask(status)}
                        onEditTask={openEditTask}
                        onDrop={handleDrop}
                        isDragActive={isDragActive}
                    />
                ))}
            </div>

            {/* Task Modal */}
            {taskModal !== null && (
                <TaskModal
                    projectId={project.id}
                    task={taskModal.task ?? null}
                    defaultStatus={taskModal.status ?? 'pending'}
                    onClose={() => setTaskModal(null)}
                />
            )}
        </AppLayout>
    );
}
