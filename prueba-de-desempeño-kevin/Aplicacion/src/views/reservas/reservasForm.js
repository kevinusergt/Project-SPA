import { getSession } from "../../services/auth.service";
import { createReserva } from "../../services/reservas.service";
import { emptyReservaForm } from "../../utils/notifications";

export function renderReservasForm() {
  return `
        <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <nav class="hidden gap-3 md:flex">
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/home">home</a>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-6 py-10">
      <section class="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-50">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Formulario</p>
        <h1 class="mt-3 text-4xl font-black tracking-tight text-slate-900">Crear o editar reserva</h1>
        <p class="mt-4 max-w-2xl text-slate-600">Vista base para registrar una reserva nueva o actualizar una existente.</p>

        <form class="mt-8 grid gap-5">
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700" for="razon">Reason</label>
            <input id="razon" type="text" placeholder="Ej. sprint planning" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
          </div>

          <div class="grid gap-5 md:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="workspace">workspace</label>
              <select id="workspace" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none">
                <option>Sala A</option>
                <option>Sala B</option>
                <option>Sala C</option>
              </select>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="hourStart">Hora de inicio</label>
              <input id="hourStart" type="time" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="hourEnd">Hora de fin</label>
              <input id="hourEnd" type="time" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
            </div>
          </div>
          <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="date">Fecha</label>
              <input id="date" type="date" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
            </div>

          <div class="flex flex-col gap-3 pt-2 sm:flex-row">
            <a id= "save-reserva"class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500" href="/home">Guardar tarea</a>
            <a id= "abort" class="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50" href="/home">Cancelar</a>
          </div>
          
        </form>
      </section>
    </main>
    
    `
}

export function setupReservasForm() {
  const saveReserva = document.getElementById("save-reserva")
  const currentSession = getSession();

  saveReserva.addEventListener("click", async (e) => {
    const workspace = document.getElementById("workspace");
    const reason = document.getElementById("razon");
    const hourStart = document.getElementById("hourStart");
    const hourEnd = document.getElementById("hourEnd");
    const date = document.getElementById("date")
    e.preventDefault()
    e.stopPropagation()

    console.log(reason.value)


    if (!reason.value) {
      emptyReservaForm()
      return;
    }

    const createNewReserva = {
      userId: currentSession.id,
      workspace: workspace.value,
      reason: reason.value,
      status: "pendiente"
    }

    if (!hourEnd.value || !hourStart.value || !date.value) {
      const dt = new Date()
      const Hour = dt.getHours()
      const ndHour = dt.getHours()
      const ddate = dt.getDate()
      createNewReserva.startHour = Hour
      createNewReserva.endHour=ndHour+1
      createNewReserva.date=ddate
      
    }
     console.log(createNewReserva)
    const newReserva = await createReserva(createNewReserva)
  })
}