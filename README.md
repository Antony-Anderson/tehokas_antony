# 🚀 TaskFlow - Gestão de Tarefas de Projetos (MVP)

> **Desafio Técnico Tehokas** - Desenvolvedor Full Stack  
> Aplicação Web para gestão eficiente de projetos e tarefas com monitoramento automatizado do **Indicador de Saúde do Projeto**.

---

## 📋 Sobre o Projeto

O **TaskFlow** é uma ferramenta intuitiva desenvolvida para auxiliar consultores e equipes a organizarem seus projetos e acompanharem o andamento de etapas críticas. 

Um dos principais diferenciais da aplicação é a análise preditiva da saúde dos projetos: quando mais de **20% das tarefas estão atrasadas** em relação ao deadline estipulado, o projeto entra automaticamente em estado de **"Em Alerta"**, permitindo ação rápida da equipe antes que o processo falhe.

---

## ✨ Funcionalidades

- 🔒 **Autenticação Completa**: Cadastro de usuário, Login, Logout e proteção de rotas via Middleware.
- 📊 **Dashboard de Projetos**: Listagem geral de projetos com contadores, busca em tempo real e destaque para projetos em alerta.
- 📋 **Quadro Kanban Interativo**: Visualização de tarefas divididas em 3 colunas (*Pendente*, *Em Andamento*, *Concluída*) com suporte a interações fluidas e atualização em tempo real.
- 🚨 **Indicador de Saúde Automatizado**:
  $$\text{Se } \frac{\text{Tarefas Atrasadas}}{\text{Total de Tarefas}} > 20\% \implies \text{Status: "Em Alerta" (Alert)}$$
- 🔍 **Filtros e Priorização**: Filtragem avançada de tarefas por prioridade (*Baixa*, *Média*, *Alta*).
- 🌓 **Modo Claro & Escuro (Light / Dark Mode)**: Alternador visual na barra superior e na página de perfil com persistência em `localStorage`.
- 👤 **Gestão de Perfil**: Visualização de métricas pessoais, alteração do nome de exibição e troca de senha segura.

---

## 🛠️ Tecnologias Utilizadas

### **Backend**
- **PHP 8.3+** & **Laravel 13**
- **Eloquent ORM** (Relacionamentos `Project` $\to$ `Task`, Accessors dinâmicos para regras de negócio)
- **Inertia.js** (Integração sem costura entre Laravel e SPA React)

### **Frontend**
- **React.js** (Comunicação com Inertia)
- **Tailwind CSS** (Design responsivo, moderno e suporte a Dark Mode)
- **Lucide React** (Ícones modernos)

### **Ambiente & Banco de Dados**
- **Docker & Docker Compose**
- **MySQL / SQLite**

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) e Docker Compose **OU** PHP 8.2+ & Composer instalados localmente.

---

### Opção A: Execução com Docker (Recomendado)

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/Antony-Anderson/tehokas_antony.git
   cd tehokas_antony
   ```

2. **Subir os containers com Docker Compose:**
   ```bash
   docker compose up -d --build
   ```

3. **Instalar dependências e executar as migrations:**
   ```bash
   docker compose exec app composer install
   docker compose exec app php artisan key:generate
   docker compose exec app php artisan migrate --seed
   ```

4. **Compilar os ativos do frontend:**
   ```bash
   docker compose exec app npm install
   docker compose exec app npm run dev
   ```

5. **Acessar a aplicação:**
   Abra no navegador em `http://localhost:8000` (ou porta configurada no seu Docker).

---

## 📂 Estrutura de Diretórios Principais

```
tehokas_antony/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php      # Autenticação de Usuários
│   │   │   ├── ProjectController.php   # CRUD e Estatísticas de Projetos
│   │   │   ├── TaskController.php      # Gestão do Kanban e Status das Tarefas
│   │   │   └── ProfileController.php   # Perfil e Alteração de Senha
│   ├── Models/
│   │   ├── Project.php                 # Modelo Project e cálculo da Saúde
│   │   ├── Task.php                    # Modelo Task e cálculo de Atrasos
│   │   └── User.php                    # Modelo de Autenticação
├── database/
│   └── migrations/                     # Migrações das tabelas Projects e Tasks
├── resources/
│   ├── js/
│   │   ├── Components/                 # Componentes reutilizáveis (AppLayout, KanbanColumn, TaskCard)
│   │   └── Pages/
│   │       ├── Auth/                   # Login e Registro
│   │       ├── Projects/               # Dashboard e Quadro Kanban
│   │       └── Profile/                # Edição de Perfil e Senha
└── routes/
    └── web.php                         # Rotas da aplicação protegidas por Auth
```

---

## ⚖️ Regra de Negócio: Cálculo do Indicador de Saúde

No arquivo [`app/Models/Project.php`](file:///home/antony/tehokas_antony/app/Models/Project.php), a regra de saúde é calculada dinamicamente via Accessor do Eloquent:

```php
public function getHealthStatusAttribute(): string
{
    $total = $this->tasks->count();

    if ($total === 0) {
        return 'healthy';
    }

    $overdue = $this->tasks->filter(fn($task) => $task->is_overdue)->count();

    return ($overdue / $total) > 0.20 ? 'alert' : 'healthy';
}
```

Uma tarefa é considerada atrasada quando sua data limite (`deadline`) é menor que a data atual e seu status não é `completed` (Concluída).

---
