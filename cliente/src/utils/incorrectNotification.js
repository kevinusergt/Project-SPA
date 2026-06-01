import Swal from 'sweetalert2'

export function incorrectPassword() {
    return Swal.fire({
        text: 'contraseña incorrecta',
        icon: 'error',
        showConfirmButton: false,
        timer: 800
    });
}