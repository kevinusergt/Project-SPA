
import { renderRouter } from "../router/router"
import { userDontExisting,incorrectPassword } from "../utils/notifications"
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
    
    const lowerEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if(!lowerEmail || !normalizedPassword){
        throw new Error("Debes ingresar correo y contraseña")
    };

    const userExisting = await getUserByEmail(lowerEmail);

    if(userExisting.length < 1){
        userDontExisting();
        throw new Error("El usuario no existe");
    };

    const userPassword = userExisting[0];

    if (userPassword.password !== normalizedPassword) {
        incorrectPassword();
        throw new Error("contraseña incorrecta");
    }

    saveSession(userPassword);
    return userPassword;

}


export function sessionLogout() {
    removeSession();
    window.history.pushState({}, "", "/"); 
    renderRouter()
}