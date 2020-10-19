import Swal from "sweetalert2";

var axios = require("axios");


const deleteDaysResquest = (dayDate) => {
    for (let i = 0; i < dayDate.length; i++) {
        var config = {
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}days/${dayDate[i]}`,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data.message));
            })
            .catch(function (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "El dia no existe!",
                });
            });
    }
};

export default deleteDaysResquest;
