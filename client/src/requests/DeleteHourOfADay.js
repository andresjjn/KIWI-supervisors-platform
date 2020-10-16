import Swal from "sweetalert2";
import reloadPage from "./ReloadPage";

var axios = require("axios");

const deleteHourOfADay = (dayDate, hour) => {
   var data = "";

   var config = {
       method: "delete",
       url: `${process.env.REACT_APP_API_URL}days/${dayDate}/hours/${hour}`,
       headers: {},
       data: data,
   };
    
    console.log(config.url)
    
    Swal.fire({
        title: "Estás seguro?",
        text: "No podras recuperarla!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminala!",
    }).then((result) => {
        if (result.isConfirmed) {
            axios(config)
                .then(function (response) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Hora eliminada correctamente",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setTimeout(reloadPage, 1500);
                })
                .catch(function (error) {
                    console.log(error);
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Error al eliminar la hora",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                });
        }
    });
};

export default deleteHourOfADay;
