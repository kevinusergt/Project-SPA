import { renderRouter } from "../../router/router";
import { getSession, sessionLogout } from "../../services/auth.service";
import { renderAllTasks, renderFilterTasks } from "../../services/task.service";
import { issuesFetchTask, logoutNoti } from "../../utils/notifications";

export function renderDashboard() {
  return `
      <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a class="text-xl font-black text-blue-900" href="/">TaskFlowSPA</a>
        <nav class="hidden gap-3 md:flex">
          <a class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/dashboard">Dashboard</a>
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/tasks">Tareas</a>
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/profile">Perfil</a>
          <a id = "admin" class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/admin">Admin</a>
          <a id = "logout" class="rounded-full px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" href="/login">Logout</a>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-10">
      <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white shadow-xl shadow-blue-100">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Dashboard principal</p>
        <h1 id = "welcome-user" class="mt-3 text-4xl font-black tracking-tight">Bienvenida, Ana.</h1>
        <p class="mt-4 max-w-2xl text-blue-50">Resumen general del trabajo del usuario, accesos rapidos y estado actual de productividad.</p>
      </section>

      <section class="mt-8 grid gap-4 md:grid-cols-3">
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <p class="text-sm text-slate-500">Tareas activas</p>
          <p id= "active-tasks" class="mt-3 text-4xl font-black text-blue-700">12</p>
        </article>
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <p class="text-sm text-slate-500">Completadas</p>
          <p id= "completed-tasks" class="mt-3 text-4xl font-black text-blue-700">28</p>
        </article>
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <p class="text-sm text-slate-500">Pendientes hoy</p>
          <p id= "pending-tasks" class="mt-3 text-4xl font-black text-blue-700">4</p>
        </article>
      </section>

      <section class="mt-8">
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-slate-900">Accesos rapidos</h2>
            <a class="text-sm font-semibold text-blue-700 hover:text-blue-600" href="/tasks">Ver tareas</a>
          </div>
          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <a id="create-task" class="rounded-3xl bg-blue-50 p-5 hover:bg-blue-100" href="/task-form">
              <p class="text-sm font-semibold text-blue-600">Crear</p>
              <h3 class="mt-2 text-lg font-bold text-slate-900">Nueva tarea</h3>
            </a>
            <a class="rounded-3xl bg-blue-50 p-5 hover:bg-blue-100" href="/profile">
              <p class="text-sm font-semibold text-blue-600">Cuenta</p>
              <h3 class="mt-2 text-lg font-bold text-slate-900">Editar perfil</h3>
            </a>
          </div>
        </article>
      </section>
    </main>
    `
}

export async function setupDashboard() {
  const createTask = document.getElementById("create-task");
  const activeTask = document.getElementById("active-tasks");
  const pendingTask = document.getElementById("pending-tasks");
  const completedTask = document.getElementById("completed-tasks")
  const admin = document.getElementById("admin");
  const welcomeUser = document.getElementById("welcome-user");
  const logout = document.getElementById("logout");
  const currentSession = getSession();
  const userRole = currentSession.role[0];

  createTask.addEventListener("click", () => {
    sessionStorage.removeItem("taskId")
  })

  logout.addEventListener("click", async (e) => {
    
    e.preventDefault();

    e.stopPropagation();

    const confirm = await logoutNoti();

    if (confirm.isConfirmed) {
      console.log("adios")
      sessionLogout();
      sessionStorage.removeItem("taskId")
      window.history.pushState({},"", "/login")
      renderRouter()
    }

  })

  if (userRole === "USER") {
    admin.classList.add("hidden")
    welcomeUser.textContent = `Bienvenido, ${currentSession.name}`

    const userTasks = await renderFilterTasks(currentSession.id);
    console.log(userTasks)

    if (!userTasks) {
      issuesFetchTask();
    }

    const inProgressTasks = userTasks.filter(task => task.state === "en progreso")
    const completedTasks = userTasks.filter(task => task.state === "completada")
    const pendingTasks = userTasks.filter(task => task.state === "pendiente")

    activeTask.textContent = inProgressTasks.length;
    pendingTask.textContent = pendingTasks.length;
    completedTask.textContent = completedTasks.length;


  }
  if (userRole === "ADMIN") {

    welcomeUser.textContent = `Bienvenido, ${currentSession.name}`

    const usersTasks = await renderAllTasks();

    if (!usersTasks) {
      issuesFetchTask();
    }

    const inProgressTasks = usersTasks.filter(task => task.state === "en progreso")
    const completedTasks = usersTasks.filter(task => task.state === "completada")
    const pendingTasks = usersTasks.filter(task => task.state === "pendiente")

    activeTask.textContent = inProgressTasks.length;
    pendingTask.textContent = pendingTasks.length;
    completedTask.textContent = completedTasks.length;
  }
}