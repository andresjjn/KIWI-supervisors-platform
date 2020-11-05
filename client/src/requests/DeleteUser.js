import Swal from "sweetalert2";

var axios = require("axios");

export default async function deleteUser(user) {
    try {
        let responseSwal = await Swal.fire({
            title: "Estás seguro?",
            text: `Eliminaras a la cuenta asociada a ${user.email}`,
            icon: "warning",
            heightAuto: false,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, elimínalo!",
        });

        if (responseSwal.isConfirmed) {
            var options = {
                method: 'DELETE',
                url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${user.user_id}`,
                headers: { authorization: `Bearer ${process.env.REACT_APP_MGMT_API_ACCESS_TOKEN}` },
                scope: 'delete:users',
            };

            try {
                await axios.request(options)
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    heightAuto: false,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                });
                Toast.fire({
                    icon: 'success',
                    title: 'Cuenta eliminada!'
                });
                return true;
            } catch (error) {
                console.log(error);
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    heightAuto: false,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                });
                Toast.fire({
                    icon: 'error',
                    title: 'Error al eliminar!'
                });
                return false;
            }
        }
    } catch {
        return false;
    }
}
