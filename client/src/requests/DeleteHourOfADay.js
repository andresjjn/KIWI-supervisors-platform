import Swal from "sweetalert2";

var axios = require("axios");

/**
 * deleteHourOfADay - Delete a hour of a day
 * @param {number} day Day in format YYYYMMDD
 * @param {number} hour Hour to be deleted
 */
export default async function deleteHourOfADay (day, hour) {
    // Notify warning before delete hour
    try {
        let responseSwal = await Swal.fire({
            title: "Estás seguro?",
            text: "Puedes perder supervisores asignados!",
            icon: "warning",
            heightAuto: false,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminala!",
        });

        // If confirm button is pressed try to delete hour
        if (responseSwal.isConfirmed) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}days/${day}/hours/${hour}`);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    heightAuto: false,
                    title: "Hora eliminada correctamente",
                    showConfirmButton: false,
                    timer: 1500,
                });
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
}
