import Swal from "sweetalert2";

var axios = require("axios");

export default async function unassignHourOfADay (day, hour, id) {
    try {
        let responseSwal = await Swal.fire({
            title: "Estás seguro?",
            icon: "warning",
            heightAuto: false,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, removerme!",
        });

        if (responseSwal.isConfirmed) {
            try {
                const res = await axios.delete(`${process.env.REACT_APP_API_URL}days/${day}/hours/${hour}/slots/${id}`);
                console.log(res);
                if (res.data.status === 'Success') {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        heightAuto: false,
                        title: "Removido perfectamente",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        heightAuto: false,
                        title: "Falló al removerse",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
                return true;
            } catch {
                return false;
            }
        }
        if (responseSwal.isDismissed) {
            return false;
        }
    } catch {
        return false;
    }
};
