
import { createUser, getUserByEmail } from '../../services/users.service';
import { renderRouter } from '../../router/router';
import { createdUserNoti,emptyMessage,userExisting } from '../../utils/notifications';


export function renderRegister() {
  return `
    <main class="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
      <section class="hidden border-r border-blue-100 bg-blue-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <a class="text-xl font-black tracking-tight" href="/">TaskFlowSPA</a>
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Nuevo usuario</p>
          <h1 class="mt-4 text-5xl font-black tracking-tight">Crea tu cuenta y empieza a organizar tu flujo.</h1>
          <p class="mt-5 max-w-md text-lg leading-8 text-blue-50">
            Esta vista permite enseñar el registro como parte del alcance funcional antes de llevarlo al flujo SPA definitivo.
          </p>
        </div>
        <p class="text-sm text-blue-100">Interfaz base del modulo de autenticacion.</p>
      </section>

      <section class="flex items-center justify-center px-6 py-10">
        <div class="w-full max-w-xl rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-100/70">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Registro</p>
              <h2 class="mt-2 text-3xl font-black text-slate-900">Crear cuenta</h2>
            </div>
            <a class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" href="/login">Ya tengo cuenta</a>
          </div>

          <form id="register-form" class="mt-8 grid gap-5">
            <div class="grid gap-5 md:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-medium text-slate-700" for="register-name">Nombre</label>
                <input id="register-name" type="text" placeholder="Ana" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium text-slate-700" for="register-lastname">Apellido</label>
                <input id="register-lastname" type="text" placeholder="Torres" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
              </div>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="register-email">Correo</label>
              <input id="register-email" type="email" placeholder="usuario@taskflow.com" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
            </div>

            <div class="grid gap-5 md:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-medium text-slate-700" for="register-password">Contrasena</label>
                <input id="register-password" type="password" placeholder="Crea una contrasena" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium text-slate-700" for="register-role">Rol</label>
                <select id="register-role" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none">
                  <option>USER</option>
                  <option>ADMIN</option>
                </select>
              </div>
            </div>

            <a id ="register" class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500" href="/login">
              Registrarme
            </a>
          </form>
        </div>
      </section>
    </main>

    `
}

export function setupRegister() {

  const btnRegister = document.getElementById("register")

  btnRegister.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation()

    const form = document.getElementById('register-form')
    const nombre = document.getElementById('register-name').value.trim()
    const apellido = document.getElementById('register-lastname').value.trim()
    let emailInput = document.getElementById('register-email').value.trim()
    const password = document.getElementById('register-password').value.trim()
    const role = document.getElementById('register-role')

    if (!nombre || !apellido || !emailInput || !password) {
      emptyMessage();
      form.reset();
      return;
    }

    const existingUser = await getUserByEmail(emailInput);

    if (existingUser.length > 0) {
      userExisting();
      form.reset();
      return;
    }

    const newUser = {
      name: nombre,
      lastname: apellido,
      password: password,
      role: [role.value]
    }

    let emailValue = emailInput.toLowerCase();

    
    const tieneDominio = /@[a-z0-9.-]+\.[a-z]{2,}$/.test(emailValue);

    
    if (!tieneDominio) {
      
      if (emailValue.endsWith('@')) {
        emailValue = emailValue.slice(0, -1);
      }
      emailValue = `${emailValue}@gmail.com`;
    }

    
    console.log("Correo final a guardar:", emailValue);



    const response = await createUser(newUser);

    if (response) {
      createdUserNoti()
    }

    window.history.pushState({}, "", "/login")
    renderRouter()

  })
}



