import { renderRouter } from "../../router/router";
import { loginSession } from "../../services/auth.service";
import { emptyMessage } from "../../utils/notifications";

export function renderLogin() {
    return ` 
    <div class="min-h-screen flex justify-center items-center bg-slate-100">

      <div class="bg-white p-8 rounded-lg shadow w-96">

        <h1 class="text-3xl font-bold mb-5">
          Login
        </h1>

        <form id="loginForm">

          <input
            id="email"
            type="email"
            name="email"
            placeholder="Correo"
            class="border w-full p-2 rounded mb-3"
          >

          <input
            id="password"
            type="password"
            name="password"
            placeholder="Contraseña"
            class="border w-full p-2 rounded mb-4"
          >

          <button
            id="login" class="bg-blue-600 text-white w-full py-2 rounded"
          >
            Ingresar
          </button>

        </form>

      </div>

    </div>
    `
}

export function setupLogin(){
  const login = document.getElementById("login");

  login.addEventListener("click", async (e)=>{
    e.preventDefault();
    e.stopPropagation();

    const email = document.getElementById('email')?.value ?? "" ;
    const password = document.getElementById('password')?.value ?? "";

    if(!email || !password){
      emptyMessage();
      return;
    }

    const user = await loginSession(email, password);
    window.history.pushState({},"","/home");
    renderRouter()

    if(!user){
      throw new Error("Error para acceder"); 
    }
    
  })
}