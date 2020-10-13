import Swal from 'sweetalert2'

var axios = require("axios");

const postDays = (dayDate, hours, slots) => {
    // var config = {
    //     method: "get",
    //     url: `http://localhost:5000/api/v1/days/${dayDate[0]}`,
    //     headers: {},
    // };

    // axios(config)
    //     .then(function (response) {
    //         console.log(JSON.stringify(response.data));
    //     })
    //     .catch(function (error) {
    //         if (error.response.data.error === "Day not found") {
    //             console.log('No existe el dia')
    //         }
    //     });

    for (const day of dayDate) {
        var data = JSON.stringify({ date: day });

        var config = {
            method: "post",
            url: `${process.env.REACT_APP_API_URL}days/`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(day);

        for (const hour of hours) {
            data = `{\n    "hour": ${hour},\n    "available": ${slots}\n}`;
            console.log(data)

            config = {
                method: "post",
                url: `${process.env.REACT_APP_API_URL}days/${day}/hours`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
};

export default postDays;
