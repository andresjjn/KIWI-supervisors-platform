import Swal from "sweetalert2";

var axios = require("axios");

export default async function assignHourOfADay (day, hour, id) {
    try {
        let responseSwal = await Swal.fire({
            title: "Estás seguro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, agregarme!",
        });

        if (responseSwal.isConfirmed) {
            const dataUser = `{\n    "id": "${id}"}`
            try {
                const config = {
                    method: "patch",
                    url: `${process.env.REACT_APP_API_URL}days/${day}/hours/${hour}/slots`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: dataUser,
                };
                const res = await axios(config);
                console.log(res);
                if (res.data.status === 'Success') {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Hora asignada correctamente",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "No hay cupos o ya esta asignado a esta hora",
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
