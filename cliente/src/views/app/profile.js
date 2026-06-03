import { renderRouter } from "../../router/router";
import { getSession, saveSession, sessionLogout } from "../../services/auth.service";
import { deleteUser, updateUser } from "../../services/users.service";
import { updatedUserNoti } from "../../utils/notifications";

export function renderProfile() {
  return `
        <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a class="text-xl font-black text-blue-900" href="/">TaskFlowSPA</a>
        <nav class="hidden gap-3 md:flex">
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/dashboard">Dashboard</a>
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/tasks">Tareas</a>
          <a class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/profile">Perfil</a>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-6 py-10">
      <section class="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <aside class="rounded-[2rem] bg-blue-600 p-8 text-white shadow-xl shadow-blue-100">
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Cuenta</p>
          <h1 class="mt-3 text-4xl font-black tracking-tight">Mi perfil</h1>
          <p class="mt-4 text-blue-50">El usuario puede actualizar sus datos personales y gestionar su propia cuenta dentro del sistema.</p>
        </aside>

        <section class="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-50">
          <form class="grid gap-5">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="name">Nombre</label>
              <input id="name" type="text" value="Ana Torres" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="profile-email">Correo</label>
              <input id="profile-email" type="email" value="ana@taskflow.com" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="password-new">Nueva contrasena</label>
              <input id="password-new" type="password" placeholder="Actualiza tu contrasena" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
            </div>
            <div class="flex flex-col gap-3 pt-2 sm:flex-row">
              <a id= "save-changes" class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500" href="/profile">Guardar cambios</a>
              <a id= "delete-account" class="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50" href="/login">Eliminar mi cuenta</a>
            </div>
          </form>
        </section>
      </section>
    </main>
    `
}

export function setupProfile() {
  const inputName = document.getElementById("name");
  const inputEmail = document.getElementById("profile-email");
  const inputPassword = document.getElementById("password-new");
  const currentSession = getSession();

  inputName.value = `${currentSession.name} ${currentSession.lastname}`.trim();
  inputEmail.value = currentSession.email.trim();

  const saveChanges = document.getElementById("save-changes");
  const deleteAccount = document.getElementById("delete-account");

  saveChanges.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const nameParts = inputName.value.trim().split(' ');

    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ');

    const updates = {
      name: firstName,
      email: inputEmail.value.toLowerCase().trim(),
    }

    if (!lastName) {
      updates.lastname = currentSession.lastname
    } else {
      updates.lastname = lastName
    };

    if (inputPassword.value.trim()) {
      updates.password = inputPassword.value.trim()
    }

    try {
      const updatedUser = await updateUser(currentSession.id, updates)

      saveSession({ ...currentSession, ...updates });
      updatedUserNoti();
      window.history.pushState({},"", "/dashboard");
      renderRouter()

    } catch (error) {
      console.error(error)
    }

  })

  deleteAccount.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    deleteUser(currentSession.id);
    sessionLogout()
  })

}