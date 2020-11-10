import Swal from "sweetalert2";

var axios = require("axios");

/**
 * assignHourOfADay - Assign a User with supervisor role to a specific date
 * @param {number} day Day in format YYYYMMDD
 * @param {number} hour Hour to be assigned
 * @param {string} id User id
 */
export default async function assignHourOfADay (day, hour, id) {
    // Notify warning before assign user
    try {
        let responseSwal = await Swal.fire({
            title: "Estás seguro?",
            icon: "warning",
            heightAuto: false,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, agregarme!",
        });

        // If confirm button is pressed try to assign the user to a date
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
                // Notify on success or failure
                if (res.data.status === 'Success') {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        heightAuto: false,
                        title: "Hora asignada correctamente",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        heightAuto: false,
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
