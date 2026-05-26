import {renderHome} from "../views/home.js"
import { renderAdmin, setupAdmin } from "../views/admin/admin.js"
import {renderLogin, setupLogin} from "../views/auth/login.js"
import {renderRegister, setupRegister} from "../views/auth/register.js"
import {renderDashboard, setupDashboard} from "../views/app/dashboard.js"
import {renderTasks, setupTasks} from "../views/tasks/tasks.js"
import{renderTaskForm, setupTaskForm} from "../views/tasks/task-form.js"
import {renderProfile, setupProfile} from "../views/app/profile.js"
import { renderNotFound } from "../views/not-found.js"


export const routes = {
    "/": {
        render: renderHome
    },
    "/login": {
        render: renderLogin,
        requiresAuth: false,
        setup: setupLogin
    },
    "/register": {
        render: renderRegister,
        requiresAuth: false,
        setup: setupRegister
    },
    "/dashboard": {
        render: renderDashboard,
        requiresAuth: true,
        setup: setupDashboard
    },
    "/tasks": {
        render: renderTasks,
        requiresAuth: true,
        setup: setupTasks
    },
    "/profile": {
        render: renderProfile,
        requiresAuth: true,
        setup: setupProfile
    },
    "/admin": {
        render: renderAdmin,
        requiresAuth: true,
        setup: setupAdmin,
        allowedRoles: ["ADMIN"]
    },
    "/task-form":{
        render: renderTaskForm,
        setup: setupTaskForm,
        requiresAuth: true
    }
}

export const notFoundedView = renderNotFound