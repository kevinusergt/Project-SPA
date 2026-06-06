import {renderHome, setupHome} from "../views/home.js"
import {renderLogin, setupLogin} from "../views/auth/login.js"
import { renderNotFound } from "../views/not-found.js"
import { renderReservasForm, setupReservasForm} from "../views/reservas/reservasForm.js"
import { renderManageReservas, setupManageReservas } from "../views/admin/manageReservas.js"


export const routes = {
    "/": {
        render: renderLogin,
        requiresAuth: false,
        setup: setupLogin
    },
    "/home": {
        render: renderHome,
        requiresAuth: true,
        setup: setupHome
    },
    "/reservasForm":{
        render:renderReservasForm,
        requiresAuth: true,
        setup: setupReservasForm
    },
    "/manageReservas":{
        render:renderManageReservas,
        requiresAuth: true,
        setup: setupManageReservas
    }
    
}

export const notFoundedView = renderNotFound