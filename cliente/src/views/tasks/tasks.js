import { renderRouter } from "../../router/router";
import { getSession } from "../../services/auth.service";
import { deleteTask, renderAllTasks, renderFilterTasks } from "../../services/task.service";
import { deleteTaskNoti, issuesFetchTask } from "../../utils/notifications";

export function renderTasks() {
  return `
      <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a class="text-xl font-black text-blue-900" href="/">TaskFlowSPA</a>
        <nav class="hidden gap-3 md:flex">
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/dashboard">Dashboard</a>
          <a class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/tasks">Tareas</a>
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/profile">Perfil</a>
          <a id= "admin" class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/admin">Admin</a>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-10">
      <section class="flex flex-col gap-4 rounded-[2rem] bg-blue-600 px-8 py-10 text-white md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">CRUD de tareas</p>
          <h1 class="mt-3 text-4xl font-black tracking-tight">Mis tareas</h1>
          <p class="mt-4 max-w-2xl text-blue-50">Vista principal para listar, editar y eliminar las tareas del usuario autenticado.</p>
        </div>
        <a id="create-task" class="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50" href="/task-form">
          Crear tarea
        </a>
      </section>

      <section id= "container" class="mt-8 grid gap-4">
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">Completada</p>
              <h2 class="mt-2 text-2xl font-bold text-slate-900">Definir arquitectura inicial</h2>
              <p class="mt-3 max-w-2xl text-slate-600">Documentar la estructura por capas y dejar claro el alcance base del proyecto.</p>
            </div>
            <div class="flex gap-3">
              <a class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" href="/task-form">Editar</a>
              <a class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" href="/tasks">Eliminar</a>
            </div>
          </div>
        </article>

        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">En progreso</p>
              <h2 class="mt-2 text-2xl font-bold text-slate-900">Construir vistas iniciales</h2>
              <p class="mt-3 max-w-2xl text-slate-600">Crear las pantallas base del proyecto para explicar la futura navegacion SPA.</p>
            </div>
            <div class="flex gap-3">
              <a class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" href="/task-form">Editar</a>
              <a class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" href="/tasks">Eliminar</a>
            </div>
          </div>
        </article>
      </section>
    </main>
    `
}

export async function setupTasks() {
  const createTask = document.getElementById("create-task")
  const container = document.getElementById("container")
  const navAdmin = document.getElementById("admin");
  const currentSession = getSession();
  const userRole = currentSession.role[0];

  createTask.addEventListener("click",()=>{
    sessionStorage.removeItem("taskId")
  })

  if (userRole === "USER") {
    navAdmin.classList.add("hidden")
    const tasks = await renderFilterTasks(currentSession.id);

    if (!tasks) {
      issuesFetchTask();
      container.innerHTML = "<p>No tienes tareas aun</p>"
    }
    container.innerHTML = "";

    tasks.forEach(task => {
      container.innerHTML += `
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">${task.state}</p>
              <h2 class="mt-2 text-2xl font-bold text-slate-900">${task.title}</h2>
              <p class="mt-3 max-w-2xl text-slate-600">${task.description !== "" ? task.description : "Sin descripcion..."}</p>
            </div>
            <div class="flex gap-3">
              <a data-id="${task.id}" class="edit-btn rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" href="/task-form">Editar</a>
              <a class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" href="/tasks">Eliminar</a>
            </div>
          </div>
        </article>
    `
    });

    const allDelButton = document.querySelectorAll(".del-btn")

    allDelButton.forEach(btn => {
      btn.addEventListener("click", async () => {
        const confirm = await deleteTaskNoti();

        if (confirm.isConfirmed) {
          await deleteTask(btn.dataset.id)
          renderRouter();
        }
      })
    })

    const allEditButton = container.querySelectorAll(".edit-btn")

    allEditButton.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        sessionStorage.setItem("taskId", btn.dataset.id)
        window.history.pushState({}, "", "/task-form")
        renderRouter()

      });
    });
  }

  if (userRole === "ADMIN") {
    const allTasks = await renderAllTasks();

    if (!allTasks) {
      issuesFetchTask();
      container.innerHTML = "<p>No tienes tareas aun</p>"
    }
    console.log(allTasks)

    container.innerHTML = "";

    allTasks.forEach(userTasks => {
      container.innerHTML += `
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">${userTasks.state}</p>
              <h2 class="mt-2 text-2xl font-bold text-slate-900">${userTasks.title}</h2>
              <p class="mt-3 max-w-2xl text-slate-600">${userTasks.description !== "" ? userTasks.description : "Sin descripcion..."}</p>
            </div>
            <div class="flex gap-3">
              <a data-id="${userTasks.id}" class="edit-btn rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" href="/task-form">Editar</a>
              <button data-id="${userTasks.id}" class="del-btn rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" href="/tasks">Eliminar</button>
            </div>
          </div>
        </article> `
    })

    const allDelButton = document.querySelectorAll(".del-btn")

    allDelButton.forEach(btn => {
      btn.addEventListener("click", async () => {
        const confirm = await deleteTaskNoti();

        if (confirm.isConfirmed) {
          await deleteTask(btn.dataset.id)
          renderRouter();
        }
      })
    })

    const allEditButton = container.querySelectorAll(".edit-btn")

    allEditButton.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        sessionStorage.setItem("taskId", btn.dataset.id)
        window.history.pushState({}, "", "/task-form")
        renderRouter()

      });
    });

  }



}
