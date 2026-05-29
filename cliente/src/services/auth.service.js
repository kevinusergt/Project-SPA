import { renderRouter } from "../router/router"
import { getUserByEmail } from "./users.service"

const userSession = "session-actual"
export function saveSession(user){
    localStorage.setItem(userSession, JSON.stringify(user))
}

export function getSession(){
    const sessionGet = localStorage.getItem(userSession)
    return JSON.parse(sessionGet)
}

export function removeSession(){
    localStorage.removeItem(userSession)
}

export async function loginSession(email,password) {
    
    const lowerEmail = email.trim().toLowercase();
    const normalizedPassword = password.trim();

    if(!lowerEmail || !normalizedPassword){
        throw new Error("Debes ingresar correo y contraseña")
    };

    const userExisting = getUserByEmail(lowerEmail);

    if(!userExisting){
        throw new Error("El usuario no existe")
    };

    window.history.replaceState({},"","/dashboard")
    renderRouter

}