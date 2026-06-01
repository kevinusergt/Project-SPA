import Swal from 'sweetalert2'

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