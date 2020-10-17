import Swal from "sweetalert2";

var axios = require("axios");

const deleteHourOfADay = async (day, hour) => {
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

        var config = {
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}days/${day}/hours/${hour}`,
            headers: {},
            data: '',
        };

        if (responseSwal.isConfirmed) {
            try {
                await axios(config);
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

export default deleteHourOfADay;
