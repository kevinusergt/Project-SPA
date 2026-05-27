const userSession = "session-actual"
export function saveSession(user){
    localStorage.setItem(userSession, JSON.stringify(user))
}

export function getSession(){
    localStorage.getItem(userSession)
}

export function removeSession(){
    localStorage.removeItem(userSession)
}

export async function loginSession(email,password) {
    return
}