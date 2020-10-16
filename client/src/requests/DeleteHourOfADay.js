import Swal from "sweetalert2";

var axios = require("axios");

const deleteHourOfADay = (dayDate, element) => {
    Swal.fire({
        title: "Estás seguro?",
        text: "No podras recuperarla!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminala!",
    }).then((result) => {
        // axios(config)
        //         .then(function (response) {
        //             Swal.fire({
        //                 position: "center",
        //                 icon: "success",
        //                 title: "Hora eliminada correctamente",
        //                 showConfirmButton: false,
        //                 timer: 1500,
        //             });
        //             return true;
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //             Swal.fire({
        //                 position: "top-end",
        //                 icon: "error",
        //                 title: "Error al eliminar la hora",
        //                 showConfirmButton: false,
        //                 timer: 1500,
        //             });
        //         });
    });
};

export default deleteHourOfADay;
