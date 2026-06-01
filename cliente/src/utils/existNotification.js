import Swal from 'sweetalert2'

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