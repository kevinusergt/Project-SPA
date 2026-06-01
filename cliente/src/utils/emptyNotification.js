import Swal from 'sweetalert2'

export function emptyMessage() {
    return Swal.fire({
        text: 'No puede estar vacio',
        icon: 'error',
        footer: 'Llene los campos',
        confirmButtonText: 'Cool'
    });
}