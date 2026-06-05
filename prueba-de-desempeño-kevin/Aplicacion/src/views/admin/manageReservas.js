import { getReservas } from "../../services/reservas.service";
import { fetchUsers } from "../../services/users.service"

export function renderManageReservas(){
    return `
        <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        <nav class="hidden gap-3 md:flex">
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/home">Home</a>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-7xl px-6 py-10">
      <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white shadow-xl shadow-blue-100">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Rol administrador</p>
        <h1 class="mt-3 text-4xl font-black tracking-tight">Panel administrativo</h1>
        <p class="mt-4 max-w-2xl text-blue-50">Vista reservada para gestionar reservas.</p>
      </section>

      <section class="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <h2 class="text-xl font-bold text-slate-900">Acciones rapidas</h2>
          <div class="mt-5 grid gap-4">
            <a class="rounded-2xl bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700 hover:bg-blue-100" href="/manageReservas">Gestionar reservas</a>
            <a class="rounded-2xl bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700 hover:bg-blue-100" href="/home">Volver a home</a>
          </div>
        </article>

        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-slate-900">Reservas</h2>
            <span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">Mockup</span>
          </div>
          <div id="container"class="mt-5 space-y-4">
            <div class="rounded-2xl bg-blue-50 p-4">
              <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div class= "users">
                  <p class="font-bold text-slate-900">Ana Torres</p>
                  <p class="text-sm text-slate-500">ana@taskflow.com</p>
                </div>
                <div class="flex gap-2">
                  <span class="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">USER</span>
                  <a class="rounded-full border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-white" href="/admin">Editar rol</a>
                </div>
              </div>
            </div>
            <div class="rounded-2xl bg-blue-50 p-4">
              <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p class="font-bold text-slate-900">Carlos Ruiz</p>
                  <p class="text-sm text-slate-500">carlos@taskflow.com</p>
                </div>
                <div class="flex gap-2">
                  <span class="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">ADMIN</span>
                  <a class="rounded-full border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-white" href="/admin">Editar rol</a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
    `
}

export async function setupManageReservas(){
    const container = document.getElementById("container");

    const allReservas = await getReservas();
    container.innerHTML = "";
    console.log(allReservas)

    allReservas.forEach(reserva => {
        container.innerHTML += `
             <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div class= "reservas">
                  <p class="font-bold text-slate-900">${reserva.workspace}</p>
                  <p class="font-bold text-slate-900">${reserva.date}</p>
                  <p class="font-bold text-slate-900">${reserva.startHour}</p>
                  <p class="font-bold text-slate-900">${reserva.endHour}</p>
                  <p class="font-bold text-slate-900">${reserva.status}</p>
                  <p class="text-sm text-slate-500">${reserva.reason}</p>
                </div>
                <div class="flex gap-2">
                  <span class="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">USER</span>
                  <a class="rounded-full border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-white" href="/admin">Editar reserva</a>
                </div>
              </div>
        `
    });

}