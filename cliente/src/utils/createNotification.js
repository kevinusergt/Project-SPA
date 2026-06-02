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

export function updatedUserNoti(){
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