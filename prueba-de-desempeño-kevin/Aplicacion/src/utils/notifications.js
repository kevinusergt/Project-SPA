import Swal from 'sweetalert2'

export function incorrectPassword() {
    return Swal.fire({
        text: 'contraseña incorrecta',
        icon: 'error',
        showConfirmButton: false,
        timer: 800
    });
}

export function userExisting() {
    return Swal.fire({
        text: 'usuario ya existe',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
    });
}


export function userDontExisting() {
    return Swal.fire({
        text: 'usuario no existe',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000
    });
}

export function emptyMessage() {
    return Swal.fire({
        text: 'No puede estar vacio',
        icon: 'error',
        confirmButtonText: 'OK'
    });
}

export function emptyReservaForm() {
    return Swal.fire({
        text: 'No puede dejar los campos vacios',
        icon: 'error',
        confirmButtonText: 'OK'
    });
}

export function createdUserNoti() {
    return Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Usuario creado",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
    });
}

export function updatedUserNoti() {
    return Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Usuario actualizado",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    });
}

export function issuesCreateTask() {
    return Swal.fire({
        text: 'Error al crear la tarea',
        icon: 'error',
        showConfirmButton: false,
        timer: 900
    });
}
export function issuesFetchTask() {
    return Swal.fire({
        text: 'Error para mostrar las tareas',
        icon: 'error',
        showConfirmButton: false,
        timer: 900
    });
}

export function deleteTaskNoti(){
    return Swal.fire({
        icon: "warning",
        title: "¿Eliminar tarea?",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
      });
}

export function logoutSessionNoti(){
    return Swal.fire({
        icon: "warning",
        title: "¿Desea cerrar sesion?",
        showCancelButton: true,
        confirmButtonText: "Sí, salir",
        cancelButtonText: "Cancelar"
      });
}