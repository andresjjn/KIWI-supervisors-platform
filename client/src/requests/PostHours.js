import Swal from "sweetalert2";

var axios = require("axios");

/**
 * postHours - Create work Hours on database
 * @param {number[]} daysInfo Array with the days
 * @param {number[]} hourInfo Array with the hours to create
 * @param {number} available quantity of supervisors per hour
 * @param {number} price value of every hour
 */
export default async function postHours(daysInfo, hourInfo, available, price) {
    // Notify on incomplete data info
    if (daysInfo.length === 0 || hourInfo.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            heightAuto: false,
            text: 'No hay ningun día u hora seleccionada!'
        });
        return;
    }

    // Notify while create hours
    Swal.fire({
        title: 'Espere mientras se crean los Horarios!',
        text: 'No recargue la página',
        showConfirmButton: false,
        heightAuto: false,
        showCancelButton: false,
        allowOutsideClick: false,
        willOpen: () => {
            Swal.showLoading()
        }
    });

    for (const day of daysInfo) {
        for (const hour of hourInfo) {
            const dataHour = `{\n    "available": ${available},\n    "price": ${price}\n}`;
            console.log(dataHour);

            const configHour = {
                method: "post",
                url: `${process.env.REACT_APP_API_URL}days/${day}/hours/${hour}/slots`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: dataHour,
            };

            await axios(configHour)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    // Notify on success
    Swal.fire({
        title: 'Horarios creados!',
        icon: 'success',
        heightAuto: false,
        showDenyButton: false,
    });
    return true;
};
