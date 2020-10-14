import reloadPage from "./ReloadPage";

var axios = require("axios");


const postDays = async(dayDate, hours, slots) => {
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
        for (const hour of hours) {
            const dataHour = `{\n    "hour": ${hour},\n    "available": ${slots}\n}`;
            console.log(dataHour);

            const configHour = {
                method: "post",
                url: `${process.env.REACT_APP_API_URL}days/${day}/hours`,
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
    reloadPage();
};

export default postDays;
