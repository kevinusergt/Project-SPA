
import { renderRouter } from "../router/router";
import { getSession, removeSession } from "../services/auth.service";
import { getReservas, getUserReservas } from "../services/reservas.service";
import { logoutSessionNoti } from "../utils/notifications";

export function renderHome() {
  const user = getSession();
  return `
    <div class="flex">

       <aside
       class="w-64 bg-slate-900 text-white h-screen p-5"
        >
        <h2 class="text-2xl font-bold mb-8">
          SPA Base
        </h2>

        <nav class="flex flex-col gap-4">

          <a href="/home" class="px-3 py-1 bg-gray-500 rounded-xl" data-link>
            Home
          </a>

          <button
            id="logoutBtn"
            class="text-left cursor-pointer text-red-400 hover:text-white hover:bg-red-400 px-3 py-1 rounded-xl"
          >
            Cerrar sesión
          </button>

        </nav>

      </aside>

      <main class="flex-1 p bg-slate-100 min-h-screen">

        <div class="">

          <h1 class="text-sm font-bold">
            Bienvenido ${user?.name}
          </h1>

          <p class="text-orange-900">
            Rol: ${user?.role}
          </p>

        </div>

        ${user?.role === "admin"
      ? `
              <section
                class="bg-white p-5 rounded-lg shadow mb-6"
              >
                <h2 class="font-bold text-xl mb-2">
                  Panel Administrador
                </h2>

                <p>
                  Puedes visualizar todas las reservas.
                </p>

                <button
                  id= "view-reservas" class="mt-3 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Gestionar Reservas
                </button>

              </section>
            `
      : `
              <section
                class="bg-white p-5"
              >
                <h2 class="font-bold text-xl mb-2">
                  Panel Usuario
                </h2>

                <p>
                  Puedes visualizar únicamente tus reservas.
                </p>

                <button
                  id="new-reserva" class="mt-3 bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Nueva Reserva
                </button>

              </section>
            `
    }

        <section
          class="bg-white p-5 rounded-lg shadow"
        >

          <div
            class="flex justify-between items-center mb-4"
          >
            <h2 class="font-bold text-xl">
              Reservas
            </h2>

            <span
              class="text-sm text-slate-500"
            >
              ${user?.role === "admin"
      ? "Mostrando todas las reservas"
      : "Mostrando únicamente tus reservas"
    }
            </span>
          </div>

          <div
            id="reservationsContainer"
            class="grid gap-4 md:grid-cols-2"
          >
            <div class="w-full text-center py-8 col-span-2">
              <p class="text-emerald-800">
                Cargando reservas ...
              </p>
            </div>
          </div>

        </section>

      </main>

    </div>
    `
}


export async function setupHome() {
  const containerReservas = document.getElementById("reservationsContainer");
  const logOut = document.getElementById("logoutBtn");
  const currentSession = getSession()

  logOut.addEventListener("click", async (e) => {
    e.preventDefault;
    e.stopPropagation;

    const confirm = await logoutSessionNoti();
    if (confirm.isConfirmed) {
      removeSession();
      sessionStorage.removeItem("reservas")
      renderRouter()
    }
  })

  if (currentSession.role === "user") {
    
    const reservas = await getUserReservas(currentSession.id)
    containerReservas.innerHTML = ""
    reservas.forEach(reserva => {
      containerReservas.innerHTML += ` 
      <article
      class="rounded"
      >
      <h3 class="font-bold text-lg">
        ${reserva.workspace}
      </h3>

      <div class="">

        <p>
          Fecha:
          ${reserva.date}
        </p>

        <p>
          Horario:
          ${reserva.startHour}
          -
          ${reserva.endHour}
        </p>

        <p>
          Motivo:
          ${reserva.reason}
        </p>

        <p>
          Estado:
          <span class="">
            ${reserva.status}
          </span>
        </p>

      </div>
    </article>
    `
      const newReserva = document.getElementById("new-reserva")
      newReserva.addEventListener("click", () => {
        window.history.pushState({}, "", "/reservasForm");
        renderRouter()
      })
    });
  } else {
    const manageReservas = document.getElementById("view-reservas");
    manageReservas.addEventListener("click", ()=>{
      window.history.pushState({},"","/manageReservas");
      renderRouter()
    })

    const reservas = await getReservas()
    sessionStorage.setItem("reservas", JSON.stringify(reservas))

    containerReservas.innerHTML = ""
    reservas.forEach(reserva => {
      containerReservas.innerHTML += ` 
          <article
            class="rounded"
          >
            <h3 class="font-bold text-lg">
            ${reserva.workspace}
            </h3>

            <div class="">

              <p>
              Fecha:
              ${reserva.date}
              </p>

              <p>
              Horario:
              ${reserva.startHour}
              -
              ${reserva.endHour}
              </p>

              <p>
              Motivo:
              ${reserva.reason}
              </p>

              <p>
              Estado:
              <span class="">
              ${reserva.status}
              </span>
              </p>

            </div>
          </article>
                    `
    });

  }




}