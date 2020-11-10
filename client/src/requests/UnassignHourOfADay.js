import Swal from "sweetalert2";

var axios = require("axios");

/**
 * unassignHourOfADay - Remove a user from a assigned hour of work
 * @param {number} day Day in format YYYYMMDD
 * @param {*} hour Hour to unassign
 * @param {*} id Id of the user to unassign
 */
export default async function unassignHourOfADay (day, hour, id) {
    // Notify warning before unassign user
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

        // Try to unnassign user to a hour
        if (responseSwal.isConfirmed) {
            try {
                const res = await axios.delete(`${process.env.REACT_APP_API_URL}days/${day}/hours/${hour}/slots/${id}`);

                // Notify on success
                if (res.data.status === 'Success') {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        heightAuto: false,
                        title: "Removido perfectamente",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else { // Notify on Error
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
