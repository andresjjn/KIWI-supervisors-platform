import Swal from "sweetalert2";

var axios = require("axios");

export default async function deleteHourOfADay (day, hour) {
    try {
        let responseSwal = await Swal.fire({
            title: "Estás seguro?",
            text: "Puedes perder supervisores asignados!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminala!",
        });

        if (responseSwal.isConfirmed) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}days/${day}/hours/${hour}`);
                Swal.fire({
                    position: "center",
                    icon: "success",
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
};
